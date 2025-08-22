'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  message?: string;
  submessage?: string;
  progress?: number;
}

export default function LoadingScreen({ 
  message = "Generating Your Quiz", 
  submessage = "AI is creating personalized questions...",
  progress = 0 
}: LoadingScreenProps) {
  const [dots, setDots] = useState('');
  const [currentTip, setCurrentTip] = useState(0);

  const loadingTips = [
    "💡 Did you know? AI can generate questions on virtually any topic!",
    "🎯 Tip: Try different difficulty levels to challenge yourself",
    "📚 Fun fact: Each quiz is uniquely generated just for you",
    "🚀 Pro tip: Review wrong answers to learn faster",
    "🎨 The calm design helps you focus better on learning",
    "🔊 Enable sound for a more immersive experience",
    "📊 Check your detailed results after the quiz",
    "🎉 Challenge yourself with harder topics as you improve"
  ];

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    const tipsInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % loadingTips.length);
    }, 3000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(tipsInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center backdrop-blur-xl bg-white/5 border border-white/10 p-12 rounded-3xl max-w-lg mx-4 shadow-2xl"
      >
        {/* Main Loading Animation */}
        <motion.div
          className="mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 border-4 border-gray-600 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-accent-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-transparent border-t-electric-500 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
            <div className="absolute inset-4 border-4 border-transparent border-t-neon-500 rounded-full animate-spin"></div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h2 className="text-3xl font-bold text-white mb-2 font-poppins">
            {message}{dots}
          </h2>
          <p className="text-gray-300 font-nunito text-lg">
            {submessage}
          </p>
        </motion.div>

        {/* Progress Bar */}
        {progress > 0 && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-500 to-electric-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-sm text-gray-400 mt-2 font-nunito">
              {Math.round(progress)}% Complete
            </div>
          </motion.div>
        )}

        {/* Loading Tips */}
        <motion.div
          key={currentTip}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-sm text-gray-300 font-nunito bg-dark-800/50 p-4 rounded-2xl border border-gray-600/30"
        >
          {loadingTips[currentTip]}
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent-400 rounded-full opacity-60 float-animation"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-electric-400 rounded-full opacity-60 float-animation" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 -right-6 w-4 h-4 bg-neon-400 rounded-full opacity-60 float-animation" style={{ animationDelay: '2s' }}></div>
      </motion.div>
    </div>
  );
}