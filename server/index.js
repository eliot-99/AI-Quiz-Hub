const express = require('express');
const cors = require('cors');
require('dotenv').config();
const AIService = require('./aiService');

const app = express();
const PORT = process.env.PORT || 3001;
const aiService = new AIService();

// Middleware
app.use(cors());
app.use(express.json());



// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Quiz API is running' });
});

app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { topic, difficulty, questionCount = 50, language = 'english' } = req.body;

    if (!topic || !difficulty) {
      return res.status(400).json({ 
        error: 'Topic and difficulty are required' 
      });
    }

    // Validate difficulty
    const validDifficulties = ['easy', 'medium', 'hard'];
    if (!validDifficulties.includes(difficulty.toLowerCase())) {
      return res.status(400).json({ 
        error: 'Difficulty must be easy, medium, or hard' 
      });
    }

    // Validate language
    const validLanguages = ['english', 'hindi', 'bengali'];
    const lang = String(language || 'english').toLowerCase();
    if (!validLanguages.includes(lang)) {
      return res.status(400).json({ 
        error: 'Language must be english, hindi, or bengali' 
      });
    }

    // Validate question count
    if (questionCount < 1 || questionCount > 100) {
      return res.status(400).json({ 
        error: 'Question count must be between 1 and 100' 
      });
    }

    console.log(`🎯 Generating ${questionCount} questions about "${topic}" at ${difficulty} level (${lang})...`);

    // Generate questions using AI service
    const questions = await aiService.generateQuestions(topic, difficulty.toLowerCase(), questionCount, lang);

    // Validate question quality
    const qualityIssues = aiService.validateQuestionQuality(questions);
    if (qualityIssues.length > 0) {
      console.warn('⚠️  Quality issues detected:', qualityIssues);
    }

    console.log(`✅ Successfully generated ${questions.length} questions`);

    res.json({
      success: true,
      data: {
        topic,
        difficulty: difficulty.toLowerCase(),
        questionCount: questions.length,
        questions,
        qualityScore: Math.max(0, 100 - qualityIssues.length * 10) // Simple quality score
      }
    });

  } catch (error) {
    console.error('❌ Error generating quiz:', error);
    res.status(500).json({ 
      error: 'Failed to generate quiz questions',
      message: error.message 
    });
  }
});

app.post('/api/submit-quiz', async (req, res) => {
  try {
    const { questions, userAnswers, topic, difficulty } = req.body;

    if (!questions || !userAnswers) {
      return res.status(400).json({ 
        error: 'Questions and user answers are required' 
      });
    }

    // Calculate results
    let correctCount = 0;
    const results = questions.map((question, index) => {
      const userAnswer = userAnswers[index];
      const isCorrect = userAnswer === question.answer;
      if (isCorrect) correctCount++;

      return {
        questionIndex: index,
        question: question.question,
        userAnswer,
        correctAnswer: question.answer,
        isCorrect,
        explanation: question.explanation
      };
    });

    const score = (correctCount / questions.length) * 100;
    
    // Determine performance level
    let performanceLevel;
    if (score >= 80) performanceLevel = 'excellent';
    else if (score >= 60) performanceLevel = 'good';
    else if (score >= 40) performanceLevel = 'fair';
    else performanceLevel = 'needs_improvement';

    res.json({
      success: true,
      data: {
        topic,
        difficulty,
        totalQuestions: questions.length,
        correctAnswers: correctCount,
        score: score.toFixed(1),
        performanceLevel,
        results
      }
    });

  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ 
      error: 'Failed to process quiz submission',
      message: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Quiz API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;