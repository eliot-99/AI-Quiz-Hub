'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import EnhancedAudioManager from '../components/EnhancedAudioManager';
import VantaNetworkBackground from '../components/VantaNetworkBackground';
import { CelebrationEffects } from '../components/ConfettiAnimation';
import PlayButton from '../components/PlayButton';

interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface QuizStats {
  startTime: number;
  questionTimes: number[];
  totalTime: number;
  averageTime: number;
  fastestTime: number;
  slowestTime: number;
}

interface QuizResults {
  topic: string;
  difficulty: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  percentage: number;
  userAnswers: string[];
  questions: Question[];
  stats: QuizStats;
}

export default function ResultsPage() {
  const [results, setResults] = useState<QuizResults | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'review'>('overview');
  const router = useRouter();

  useEffect(() => {
    // Get results from sessionStorage
    const resultsStr = sessionStorage.getItem('quizResults');
    if (!resultsStr) {
      router.push('/');
      return;
    }

    const quizResults = JSON.parse(resultsStr);
    setResults(quizResults);

    // Animate score counter
    const targetScore = quizResults.percentage;
    const duration = 2000; // 2 seconds
    const increment = targetScore / (duration / 30); // 30fps
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetScore) {
        current = targetScore;
        clearInterval(timer);
        // Play success sound and show celebration when animation completes
        if ((window as any).playSuccessSound) {
          (window as any).playSuccessSound();
        }
        setShowCelebration(true);
      }
      setAnimatedScore(Math.floor(current));
    }, 30);

    return () => clearInterval(timer);
  }, [router]);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900">
        <VantaNetworkBackground />
        <EnhancedAudioManager page="results" />
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Loading results...</h2>
        </div>
      </div>
    );
  }

  const getPerformanceMessage = () => {
    if (results.correctAnswers >= results.totalQuestions * 0.8) {
      return { message: "Excellent Work! 🎉", color: "text-neon-400", description: "Outstanding performance!" };
    } else if (results.correctAnswers >= results.totalQuestions * 0.6) {
      return { message: "Good Try! 👍", color: "text-electric-400", description: "Well done, keep it up!" };
    } else if (results.correctAnswers >= results.totalQuestions * 0.4) {
      return { message: "Keep Practicing! 💪", color: "text-gold-400", description: "You're on the right track!" };
    } else {
      return { message: "Room for Improvement 📚", color: "text-accent-400", description: "Don't give up, practice makes perfect!" };
    }
  };

  const performance = getPerformanceMessage();
  
  const getPerformanceLevel = () => {
    if (results.correctAnswers >= results.totalQuestions * 0.8) return 'excellent';
    if (results.correctAnswers >= results.totalQuestions * 0.6) return 'good';
    return 'fair';
  };

  const pieData = [
    { name: 'Correct', value: results.correctAnswers, color: '#22c55e' },
    { name: 'Incorrect', value: results.incorrectAnswers, color: '#ef4444' }
  ];

  const timeData = results.stats.questionTimes.map((time, index) => ({
    question: index + 1,
    time: Math.round(time / 1000), // Convert to seconds
  }));

  const getDetailedAnalysis = () => {
    const avgTime = Math.round(results.stats.averageTime / 1000);
    const fastestTime = Math.round(results.stats.fastestTime / 1000);
    const slowestTime = Math.round(results.stats.slowestTime / 1000);
    const accuracy = results.percentage;
    
    const analysis = {
      speed: avgTime <= 15 ? 'Fast' : avgTime <= 30 ? 'Moderate' : 'Slow',
      consistency: (slowestTime - fastestTime) <= 10 ? 'Very Consistent' : (slowestTime - fastestTime) <= 20 ? 'Consistent' : 'Variable',
      accuracy: accuracy >= 80 ? 'Excellent' : accuracy >= 60 ? 'Good' : accuracy >= 40 ? 'Fair' : 'Needs Improvement',
      recommendations: [] as string[]
    };

    // Generate recommendations
    if (accuracy < 60) {
      analysis.recommendations.push("Focus on understanding core concepts");
      analysis.recommendations.push("Review incorrect answers carefully");
    }
    if (avgTime > 45) {
      analysis.recommendations.push("Practice time management");
      analysis.recommendations.push("Work on quick decision making");
    }
    if ((slowestTime - fastestTime) > 30) {
      analysis.recommendations.push("Maintain consistent pace throughout");
    }
    if (accuracy >= 80 && avgTime <= 20) {
      analysis.recommendations.push("Try harder difficulty levels");
      analysis.recommendations.push("Explore advanced topics");
    }

    return analysis;
  };

  const analysis = getDetailedAnalysis();

  return (
    <div className="min-h-screen bg-dark-900 overflow-hidden">
      <VantaNetworkBackground />
      <EnhancedAudioManager page="results" />
      <CelebrationEffects 
        show={showCelebration} 
        performance={getPerformanceLevel() as 'excellent' | 'good' | 'fair'} 
      />
      
      <div className="relative z-10 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl font-bold text-white mb-4 font-poppins">Quiz Results</h1>
            <p className="text-xl text-gray-400 font-nunito">
              {results.topic} • {results.difficulty} Level
            </p>
          </motion.div>

          {/* Score Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="relative mx-auto max-w-xl">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 h-32 w-32 bg-electric-500/20 blur-3xl rounded-full pointer-events-none" />
              <div className="p-[2px] rounded-3xl bg-gradient-to-r from-accent-500/50 via-electric-500/40 to-neon-500/50 shadow-[0_0_40px_rgba(99,102,241,0.25)]">
                <div className="relative rounded-3xl backdrop-blur-xl bg-dark-800/60 border border-white/10 px-8 py-10 text-center">
                  <p className="text-sm uppercase tracking-widest text-gray-400 mb-3 font-poppins">Overall Score</p>
                  <div className="text-7xl md:text-8xl font-extrabold mb-2 font-poppins">
                    <span className="bg-gradient-to-r from-accent-400 via-electric-400 to-neon-400 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(99,102,241,0.25)]">
                      {animatedScore}%
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-300 mb-6 font-nunito">
                    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm">
                      <span className="text-white font-semibold">{results.correctAnswers}</span>
                      <span className="mx-1 text-gray-400">/</span>
                      <span className="text-gray-300">{results.totalQuestions}</span>
                    </span>
                    <span className="text-sm text-gray-400">correct answers</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className={`inline-flex items-center rounded-full px-4 py-2 text-base md:text-lg font-semibold ${performance.color} bg-white/10`}>
                      {performance.message}
                    </span>
                  </div>
                  <p className="text-gray-400 font-nunito">{performance.description}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mb-8"
          >
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-2 flex space-x-2">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'performance', label: 'Performance', icon: '⚡' },
                { id: 'review', label: 'Review', icon: '📝' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 font-nunito ${
                    activeTab === tab.id
                      ? 'bg-accent-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Score Breakdown */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-6 font-poppins">Score Breakdown</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                          strokeWidth={0}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" strokeWidth={0} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1e293b', 
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            color: 'white'
                          }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/15 border border-green-500/20">
                      <span className="w-3.5 h-3.5 rounded-sm bg-green-500"></span>
                      <span className="text-green-300 font-nunito font-semibold">Correct ({results.correctAnswers})</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/15 border border-red-500/20">
                      <span className="w-3.5 h-3.5 rounded-sm bg-red-500"></span>
                      <span className="text-red-300 font-nunito font-semibold">Incorrect ({results.incorrectAnswers})</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-6 font-poppins">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-dark-800/30 rounded-xl">
                      <span className="text-gray-300 font-nunito">Total Time</span>
                      <span className="text-white font-bold font-poppins">
                        {Math.round(results.stats.totalTime / 60000)}m {Math.round((results.stats.totalTime % 60000) / 1000)}s
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-dark-800/30 rounded-xl">
                      <span className="text-gray-300 font-nunito">Average Time</span>
                      <span className="text-white font-bold font-poppins">
                        {Math.round(results.stats.averageTime / 1000)}s
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-dark-800/30 rounded-xl">
                      <span className="text-gray-300 font-nunito">Fastest Answer</span>
                      <span className="text-neon-400 font-bold font-poppins">
                        {Math.round(results.stats.fastestTime / 1000)}s
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-dark-800/30 rounded-xl">
                      <span className="text-gray-300 font-nunito">Slowest Answer</span>
                      <span className="text-accent-400 font-bold font-poppins">
                        {Math.round(results.stats.slowestTime / 1000)}s
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="space-y-8">
                {/* Performance Analysis */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-6 font-poppins">Performance Analysis</h3>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 bg-dark-800/30 rounded-xl">
                      <div className="text-3xl font-bold text-electric-400 mb-2 font-poppins">{analysis.speed}</div>
                      <div className="text-gray-300 font-nunito">Answer Speed</div>
                    </div>
                    <div className="text-center p-6 bg-dark-800/30 rounded-xl">
                      <div className="text-3xl font-bold text-neon-400 mb-2 font-poppins">{analysis.consistency}</div>
                      <div className="text-gray-300 font-nunito">Consistency</div>
                    </div>
                    <div className="text-center p-6 bg-dark-800/30 rounded-xl">
                      <div className="text-3xl font-bold text-accent-400 mb-2 font-poppins">{analysis.accuracy}</div>
                      <div className="text-gray-300 font-nunito">Accuracy</div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-dark-800/30 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-white mb-4 font-poppins">💡 Recommendations</h4>
                    <div className="space-y-3">
                      {analysis.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                          <span className="text-gray-300 font-nunito">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Time Chart */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-6 font-poppins">Response Time Analysis</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={timeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis 
                          dataKey="question" 
                          stroke="#9ca3af"
                          tick={{ fill: '#9ca3af' }}
                        />
                        <YAxis 
                          stroke="#9ca3af"
                          tick={{ fill: '#9ca3af' }}
                          label={{ value: 'Time (seconds)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9ca3af' } }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1e293b', 
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            color: 'white'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="time" 
                          stroke="#d946ef" 
                          strokeWidth={3}
                          dot={{ fill: '#d946ef', strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: '#d946ef', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'review' && (
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
                <h3 className="text-2xl font-bold text-white mb-6 font-poppins">Question Review</h3>
                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {results.questions.map((question, index) => {
                    const userAnswer = results.userAnswers[index];
                    const isCorrect = userAnswer === question.answer;
                    
                    return (
                      <div key={index} className={`p-6 rounded-xl border-2 ${
                        isCorrect ? 'border-neon-500/30 bg-neon-500/10' : 'border-red-500/30 bg-red-500/10'
                      }`}>
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="text-lg font-semibold text-white font-poppins flex-1">
                            {index + 1}. {question.question}
                          </h4>
                          <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                            isCorrect ? 'bg-neon-500 text-white' : 'bg-red-500 text-white'
                          }`}>
                            {isCorrect ? '✓' : '✗'}
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="text-gray-300 font-nunito">
                            <span className="font-semibold">Your answer:</span> 
                            <span className={isCorrect ? 'text-neon-400' : 'text-red-400'}> {userAnswer || 'No answer'}</span>
                          </div>
                          {!isCorrect && (
                            <div className="text-gray-300 font-nunito">
                              <span className="font-semibold">Correct answer:</span> 
                              <span className="text-neon-400"> {question.answer}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="text-sm text-gray-400 font-nunito">
                          <span className="font-semibold">Explanation:</span> {question.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center space-x-20 md:space-x-24 mt-12"
          >
            <div className="scale-95 hover:scale-100 transition-transform">
              <PlayButton
                label="NEW QUIZ"
                onClick={() => router.push('/')}
              />
            </div>
            <div className="scale-95 hover:scale-100 transition-transform">
              <PlayButton
                label="RETAKE"
                onClick={() => router.push('/quiz')}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}