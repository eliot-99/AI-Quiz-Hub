const axios = require('axios');

class AIService {
  constructor() {
    // Support multiple env var names just in case
    this.llamaApiKey = process.env.LLama_API_KEY || process.env.LLAMA_API_KEY || process.env.OPENROUTER_API_KEY;

    if (this.llamaApiKey) {
      console.log('✅ Llama (OpenRouter) API initialized');
    } else {
      console.warn('❌ Llama API key missing. Set LLama_API_KEY (or LLAMA_API_KEY) in .env');
    }
  }

  async generateQuestions(topic, difficulty, count = 50, language = 'english') {
    if (!this.llamaApiKey) {
      throw new Error('Llama API key not configured');
    }

    try {
      const prompt = this.createPrompt(topic, difficulty, count, language);

      // OpenRouter chat-completions API using Llama 3 model
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'meta-llama/llama-3.1-70b-instruct',
          messages: [
            {
              role: 'system',
              content:
                'You are an expert quiz creator. Generate high-quality multiple-choice questions with exactly 4 options each. Always respond with valid JSON only.'
            },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 4000
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

      // Parse JSON (strip markdown fences if any)
      let questions;
      try {
        const clean = content.replace(/```json\n?|\n?```/g, '');
        questions = JSON.parse(clean);
      } catch (err) {
        console.error('Failed to parse Llama response:', content);
        throw new Error('Invalid JSON format from Llama API');
      }

      // Validate/format
      return this.validateAndFormatQuestions(questions, topic, difficulty);
    } catch (error) {
      console.error('Error generating Llama questions:', error?.message || error);
      throw error;
    }
  }

  createPrompt(topic, difficulty, count, language = 'english') {
    const difficultyDescriptions = {
      easy: 'basic, beginner-friendly wording and examples',
      medium: 'intermediate level requiring some knowledge',
      hard: 'advanced level requiring deep understanding'
    };

    return `Generate exactly ${count} multiple-choice questions about "${topic}" at ${difficulty} difficulty level (${difficultyDescriptions[difficulty]}).

Language requirement:
- Write all questions, options, answers, and explanations in ${language}.

Strict requirements:
- Each question must have exactly 4 answer options as plain strings (no labels like A), B), numbers, or emojis)
- Options must be short, human-like, and mutually distinct
- Only one option is correct per question
- The "answer" field must be exactly one of the strings from the "options" array
- Include a concise explanation for the correct answer
- Cover different aspects of ${topic}; avoid repetition and trick answers like "All of the above" or "None of the above"
- Use clear, exam-style wording; keep easy questions similar to basic certification quizzes

Output format:
Return ONLY valid JSON (no markdown fences). The response must be a JSON array of objects with this exact shape:
[
  {
    "question": "Question text here?",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "answer": "Option 1",
    "explanation": "Brief explanation for why this is correct"
  }
]

Topic: ${topic}
Difficulty: ${difficulty}
Language: ${language}
Count: ${count}`;
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
}

module.exports = AIService;