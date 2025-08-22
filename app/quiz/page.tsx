'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import EnhancedAudioManager from '../components/EnhancedAudioManager';
import VantaNetworkBackground from '../components/VantaNetworkBackground';
import LoadingScreen from '../components/LoadingScreen';
import PlayButton from '../components/PlayButton';

interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface QuizConfig {
  topic: string;
  difficulty: string;
  questionCount: number;
  timePerQuestion: number;
}

interface QuizStats {
  startTime: number;
  questionTimes: number[];
  totalTime: number;
  averageTime: number;
  fastestTime: number;
  slowestTime: number;
}

export default function QuizPage() {
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quizStats, setQuizStats] = useState<QuizStats>({
    startTime: 0,
    questionTimes: [],
    totalTime: 0,
    averageTime: 0,
    fastestTime: 0,
    slowestTime: 0
  });
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Get quiz configuration from sessionStorage
    const configStr = sessionStorage.getItem('quizConfig');
    if (!configStr) {
      router.push('/');
      return;
    }

    const config = JSON.parse(configStr);
    setQuizConfig(config);
    setTimeLeft(config.timePerQuestion);
    
    // Initialize quiz stats
    setQuizStats(prev => ({
      ...prev,
      startTime: Date.now(),
      questionTimes: new Array(config.questionCount).fill(0)
    }));
    
    generateQuestions(config);
  }, [router]);

  useEffect(() => {
    if (!quizConfig || quizConfig.timePerQuestion <= 0) return;
    if (questions.length === 0) return; // wait until questions are loaded

    // reset any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setQuestionStartTime(Date.now());
    setTimeLeft(quizConfig.timePerQuestion);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Only advance if there is a current question
          if (questions[currentQuestionIndex]) {
            handleNextQuestion();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentQuestionIndex, quizConfig, questions.length]);

  const generateQuestions = async (config: QuizConfig) => {
    try {
      setIsLoading(true);

      // Call backend directly using env to avoid Next.js proxy issues
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiBase}/api/generate-quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: config.topic,
          difficulty: config.difficulty,
          questionCount: config.questionCount,
          language: (config as any).language || 'english',
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API error ${response.status}: ${text}`);
      }

      const data = await response.json();
      // Log and store raw API response for debugging/inspection
      console.log('Quiz API response:', data);
      try { sessionStorage.setItem('lastQuizApiResponse', JSON.stringify(data, null, 2)); } catch {}

      setQuestions(data.data.questions);
      setUserAnswers(new Array(data.data.questions.length).fill(''));
      setIsLoading(false);
      return;
    } catch (error) {
      console.error('Error generating questions:', error);

      // Fallback: generate simple local questions so the quiz remains usable
      try {
        const fallbackCount = config.questionCount || 10;
        const localQuestions: Question[] = Array.from({ length: fallbackCount }).map((_, i) => {
          const optA = `${config.topic} fact ${i + 1}A`;
          const optB = `${config.topic} fact ${i + 1}B`;
          const optC = `${config.topic} fact ${i + 1}C`;
          const optD = `${config.topic} fact ${i + 1}D`;
          return {
            question: `Sample question ${i + 1} about ${config.topic}?`,
            options: [optA, optB, optC, optD],
            answer: optA,
            explanation: `Placeholder explanation for ${config.topic}.`,
          };
        });
        setQuestions(localQuestions);
        setUserAnswers(new Array(localQuestions.length).fill(''));
      } catch {}

      setIsLoading(false);
    }
  };



  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    
    // Play click sound
    if ((window as any).playClickSound) {
      (window as any).playClickSound();
    }
  };

  const handleNextQuestion = () => {
    // Guard: do nothing if no questions yet
    if (!questions.length) return;

    // Record question time
    const questionTime = Date.now() - questionStartTime;
    const newQuestionTimes = [...quizStats.questionTimes];
    newQuestionTimes[currentQuestionIndex] = questionTime;
    
    setQuizStats(prev => ({
      ...prev,
      questionTimes: newQuestionTimes
    }));

    // Save current answer
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newAnswers);

    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Move to next question or finish quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    } else {
      finishQuiz(newAnswers, newQuestionTimes);
    }
  };

  const finishQuiz = (answers: string[], questionTimes: number[]) => {
    // Calculate final stats
    const totalTime = Date.now() - quizStats.startTime;
    const validTimes = questionTimes.filter(time => time > 0);
    const averageTime = validTimes.length > 0 ? validTimes.reduce((a, b) => a + b, 0) / validTimes.length : 0;
    const fastestTime = validTimes.length > 0 ? Math.min(...validTimes) : 0;
    const slowestTime = validTimes.length > 0 ? Math.max(...validTimes) : 0;

    const finalStats = {
      ...quizStats,
      questionTimes,
      totalTime,
      averageTime,
      fastestTime,
      slowestTime
    };

    // Calculate results
    const correctAnswers = answers.reduce((count, answer, index) => {
      return answer === questions[index]?.answer ? count + 1 : count;
    }, 0);

    const results = {
      topic: quizConfig?.topic,
      difficulty: quizConfig?.difficulty,
      totalQuestions: questions.length,
      correctAnswers,
      incorrectAnswers: questions.length - correctAnswers,
      percentage: Math.round((correctAnswers / questions.length) * 100),
      userAnswers: answers,
      questions,
      stats: finalStats
    };

    // Store results and navigate
    sessionStorage.setItem('quizResults', JSON.stringify(results));
    router.push('/results');
  };

  if (isLoading) {
    return (
      <>
        <VantaNetworkBackground />
        <EnhancedAudioManager page="home" />
        <LoadingScreen
          message="Generating Your Quiz"
          submessage={`AI is creating ${quizConfig?.questionCount || 50} personalized questions about ${quizConfig?.topic}...`}
        />
      </>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900">
        <VantaNetworkBackground />
        <EnhancedAudioManager page="quiz" />
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">No questions available</h2>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-dark-900 overflow-hidden">
      <VantaNetworkBackground />
      <EnhancedAudioManager page="quiz" />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 backdrop-blur-xl bg-white/5 border-b border-white/10"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div>
                <h1 className="text-2xl font-bold text-white font-poppins">{quizConfig?.topic}</h1>
                <p className="text-gray-400 font-nunito capitalize">{quizConfig?.difficulty} Level</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Timer */}
              {quizConfig && quizConfig.timePerQuestion > 0 && (
                <div className="flex items-center space-x-3">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={timeLeft <= 5 ? "#ef4444" : "#d946ef"}
                        strokeWidth="2"
                        strokeDasharray={`${(timeLeft / quizConfig.timePerQuestion) * 100}, 100`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-lg font-bold ${timeLeft <= 5 ? 'text-red-400' : 'text-white'}`}>
                        {timeLeft}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Progress */}
              <div className="text-right">
                <div className="text-lg font-bold text-white font-poppins">
                  {currentQuestionIndex + 1} / {questions.length}
                </div>
                <div className="text-sm text-gray-400 font-nunito">Questions</div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="max-w-4xl mx-auto mt-4">
            <div className="w-full bg-dark-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-500 to-electric-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Question Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-4xl w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
              >
                {/* Question */}
                <motion.h2
                  className="text-3xl font-bold text-white mb-8 font-poppins leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {currentQuestion.question}
                </motion.h2>

                {/* Options */}
                <div className="grid gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <motion.div
                      key={index}
                      className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 font-nunito text-lg cursor-pointer ${
                        selectedAnswer === option
                          ? 'border-indigo-500 bg-indigo-500/20 text-white'
                          : 'border-gray-600/50 bg-dark-800/30 text-gray-300 hover:border-indigo-400/50 hover:bg-indigo-500/10'
                      }`}
                      onClick={() => handleAnswerSelect(option)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {selectedAnswer === option && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center"
                          >
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Next Button */}
                <motion.div
                  className="mt-8 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="scale-95 hover:scale-100 transition-transform">
                    <PlayButton
                      label={currentQuestionIndex === questions.length - 1 ? 'FINISH' : 'NEXT'}
                      onClick={handleNextQuestion}
                      disabled={!selectedAnswer}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}