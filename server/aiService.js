const axios = require('axios');

// Simple in-memory cache with TTL and basic LRU-like eviction
class SimpleCache {
  constructor({ ttlMs = 6 * 60 * 60 * 1000, maxEntries = 100 } = {}) {
    this.ttlMs = ttlMs;
    this.maxEntries = maxEntries;
    this.map = new Map();
  }
  _now() {
    return Date.now();
  }
  _purgeExpired() {
    for (const [key, entry] of this.map) {
      if (this._now() - entry.timestamp > this.ttlMs) {
        this.map.delete(key);
      }
    }
  }
  get(key) {
    this._purgeExpired();
    const entry = this.map.get(key);
    if (!entry) return null;
    // refresh recency
    this.map.delete(key);
    this.map.set(key, { ...entry, timestamp: entry.timestamp });
    return entry.value;
  }
  set(key, value) {
    this._purgeExpired();
    this.map.set(key, { value, timestamp: this._now() });
    if (this.map.size > this.maxEntries) {
      // delete oldest inserted (first key)
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }
  }
}

class AIService {
  constructor() {
    // Support multiple env var names just in case
    this.llamaApiKey = process.env.LLama_API_KEY || process.env.LLAMA_API_KEY || process.env.OPENROUTER_API_KEY;

    // Model and generation settings (smaller, faster defaults)
    this.model = process.env.LLAMA_MODEL || 'meta-llama/llama-3.1-8b-instruct';
    this.temperature = Number(process.env.LLAMA_TEMPERATURE || 0.3);
    this.maxTokens = parseInt(process.env.LLAMA_MAX_TOKENS || '1200', 10);
    this.defaultBatchSize = parseInt(process.env.LLAMA_BATCH_SIZE || '10', 10);
    this.maxParallel = parseInt(process.env.LLAMA_MAX_PARALLEL || '3', 10);

    // Cache
    const ttlMs = parseInt(process.env.CACHE_TTL_MS || `${6 * 60 * 60 * 1000}`, 10);
    this.cache = new SimpleCache({ ttlMs, maxEntries: 200 });

    if (this.llamaApiKey) {
      console.log(`✅ Llama (OpenRouter) API initialized — model: ${this.model}`);
    } else {
      console.warn('❌ Llama API key missing. Set LLama_API_KEY (or LLAMA_API_KEY) in .env');
    }
  }

  // Public simple API (kept for compatibility)
  async generateQuestions(topic, difficulty, count = 50, language = 'english', options = {}) {
    if (!this.llamaApiKey) {
      throw new Error('Llama API key not configured');
    }

    const { batchSize, parallel } = options;
    const resolvedBatch = Math.max(1, Math.min(batchSize || this.defaultBatchSize, count));
    const resolvedParallel = Math.max(1, parallel || this.maxParallel);

    // Try cache first (topic+difficulty+language). If cached size >= count, slice and return.
    const cacheKey = this._cacheKey(topic, difficulty, language);
    const cached = this.cache.get(cacheKey);
    if (cached && Array.isArray(cached) && cached.length >= count) {
      return cached.slice(0, count);
    }

    // Generate using batched + parallel requests
    const combined = await this.generateQuestionsInBatches(topic, difficulty, count, language, {
      batchSize: resolvedBatch,
      maxParallel: resolvedParallel
    });

    // Store/extend cache with the full combined set
    if (!cached || combined.length > cached.length) {
      this.cache.set(cacheKey, combined);
    }

    return combined;
  }

  // Batched/parallel generation with optional per-batch callback (for streaming)
  async generateQuestionsInBatches(topic, difficulty, totalCount, language = 'english', opts = {}) {
    const batchSize = Math.max(1, Math.min(opts.batchSize || this.defaultBatchSize, totalCount));
    const maxParallel = Math.max(1, opts.maxParallel || this.maxParallel);
    const onBatch = typeof opts.onBatch === 'function' ? opts.onBatch : null;

    // Prepare tasks
    const batches = Math.ceil(totalCount / batchSize);
    const tasks = Array.from({ length: batches }, (_, i) => async () => {
      try {
        const thisBatchSize = i === batches - 1 ? totalCount - i * batchSize : batchSize;
        const prompt = this.createPrompt(topic, difficulty, thisBatchSize, language);
        const questions = await this._callOpenRouter(prompt);
        const formatted = this.validateAndFormatQuestions(questions, topic, difficulty);
        if (onBatch) {
          onBatch(formatted, { index: i, totalBatches: batches });
        }
        return formatted;
      } catch (err) {
        console.warn(`⚠️  Batch ${i + 1}/${batches} failed:`, err?.message || err);
        return [];
      }
    });

    const results = await this._runWithConcurrency(tasks, maxParallel);
    // Flatten and trim to totalCount
    const combined = results.flat().slice(0, totalCount);

    // Deduplicate by question text (basic)
    const seen = new Set();
    const deduped = [];
    for (const q of combined) {
      const key = q.question.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        deduped.push(q);
      }
      if (deduped.length === totalCount) break;
    }

    return deduped;
  }

  async _runWithConcurrency(taskFns, limit) {
    const results = new Array(taskFns.length);
    let nextIndex = 0;
    const workers = Array.from({ length: Math.min(limit, taskFns.length) }, async () => {
      while (true) {
        const current = nextIndex++;
        if (current >= taskFns.length) break;
        results[current] = await taskFns[current]();
      }
    });
    await Promise.all(workers);
    return results;
  }

  async _callOpenRouter(prompt) {
    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You create high-quality multiple-choice questions with 4 options. Return ONLY valid JSON.'
            },
            { role: 'user', content: prompt }
          ],
          temperature: this.temperature,
          max_tokens: this.maxTokens
        },
        {
          headers: {
            Authorization: `Bearer ${this.llamaApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const content = (response.data?.choices?.[0]?.message?.content || '').trim();
      if (!content) {
        throw new Error('Empty response from Llama API');
      }

      // Parse JSON robustly to handle common model formatting issues
      const questions = this._robustJsonParse(content);
      return questions;
    } catch (error) {
      console.error('Error generating Llama questions:', error?.message || error);
      throw error;
    }
  }

  // Concise prompt to speed up processing
  createPrompt(topic, difficulty, count, language = 'english') {
    const difficultyDescriptions = {
      easy: 'basic',
      medium: 'intermediate',
      hard: 'advanced'
    };

    return (
      `Generate ${count} multiple-choice questions on "${topic}" at ${difficulty} (${difficultyDescriptions[difficulty] || difficulty}) difficulty.\n` +
      `- Language: ${language}.\n` +
      `- Each question has exactly 4 short, distinct options (plain strings).\n` +
      `- Exactly one correct option.\n` +
      `- Include a brief explanation.\n` +
      `- Avoid "All of the above"/"None of the above" and repetitions.\n` +
      `Return ONLY JSON array with objects: {"question","options","answer","explanation"}. No markdown.`
    );
  }

  validateAndFormatQuestions(questions, topic, difficulty) {
    if (!Array.isArray(questions)) {
      throw new Error('Questions must be an array');
    }

    return questions.map((q, index) => {
      if (!q.question || !Array.isArray(q.options) || !q.answer) {
        throw new Error(`Invalid question structure at index ${index}`);
      }
      if (q.options.length !== 4) {
        throw new Error(`Question ${index + 1} must have exactly 4 options`);
      }
      if (!q.options.includes(q.answer)) {
        throw new Error(`Answer for question ${index + 1} must be one of the options`);
      }

      return {
        question: String(q.question).trim(),
        options: q.options.map((opt) => String(opt).trim()),
        answer: String(q.answer).trim(),
        explanation:
          q.explanation?.toString().trim() || `This is the correct answer for this ${difficulty} level question about ${topic}.`
      };
    });
  }

  // Optional: keep quality checker for server logs/reporting
  validateQuestionQuality(questions) {
    const issues = [];
    questions.forEach((q, index) => {
      // Duplicate question check
      const duplicates = questions.filter((other) => other.question.toLowerCase() === q.question.toLowerCase());
      if (duplicates.length > 1) issues.push(`Duplicate question at index ${index}`);

      // Similar options check
      const similar = q.options.filter((opt, i) =>
        q.options.some((other, j) => i !== j && (opt.toLowerCase().includes(other.toLowerCase()) || other.toLowerCase().includes(opt.toLowerCase())))
      );
      if (similar.length > 0) issues.push(`Similar options in question ${index + 1}`);

      if (q.question.length < 10) issues.push(`Question ${index + 1} is too short`);
      if (q.question.length > 200) issues.push(`Question ${index + 1} is too long`);
    });
    return issues;
  }

  _cacheKey(topic, difficulty, language) {
    return [String(topic).trim().toLowerCase(), String(difficulty).trim().toLowerCase(), String(language).trim().toLowerCase()].join('|');
  }

  // Attempt to parse a variety of malformed-but-fixable JSON shapes
  _robustJsonParse(raw) {
    let content = String(raw).trim();

    // 1) Strip markdown fences if present
    content = content.replace(/```json\n?|\n?```/g, '').trim();

    // 2) If it looks like multiple JSON objects concatenated, wrap as array
    // Detect pattern: }\s*{ between objects
    const looksLikeConcatObjects = /}\s*{/.test(content) && !content.trim().startsWith('[');
    if (looksLikeConcatObjects) {
      content = `[${content.replace(/}\s*{/g, '},{')}]`;
    }

    // 3) Ensure it is an array. If single object, wrap it.
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (_) {
      // Try to extract JSON array substring if extra text around
      const arrayMatch = content.match(/\[([\s\S]*)\]/);
      if (arrayMatch) {
        try {
          parsed = JSON.parse(content.substring(content.indexOf('['), content.lastIndexOf(']') + 1));
        } catch (err2) {
          console.error('Failed to parse Llama response:', raw);
          throw new Error('Invalid JSON format from Llama API');
        }
      } else {
        // Try object fallback
        const objStart = content.indexOf('{');
        const objEnd = content.lastIndexOf('}');
        if (objStart !== -1 && objEnd !== -1 && objEnd > objStart) {
          const objStr = content.substring(objStart, objEnd + 1);
          try {
            const single = JSON.parse(objStr);
            parsed = Array.isArray(single) ? single : [single];
          } catch (err3) {
            console.error('Failed to parse Llama response:', raw);
            throw new Error('Invalid JSON format from Llama API');
          }
        } else {
          console.error('Failed to parse Llama response:', raw);
          throw new Error('Invalid JSON format from Llama API');
        }
      }
    }

    if (!Array.isArray(parsed)) {
      parsed = [parsed];
    }

    return parsed;
  }
}

module.exports = AIService;
