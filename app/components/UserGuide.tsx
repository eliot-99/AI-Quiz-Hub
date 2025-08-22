'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GuideStep {
  title: string;
  description: string;
  icon: string;
  tips?: string[];
}

const guideSteps: GuideStep[] = [
  {
    title: "Choose Your Topic",
    description: "Enter any subject you want to learn about. The AI will generate questions tailored to your chosen topic.",
    icon: "🎯",
    tips: [
      "Be specific for better questions (e.g., 'JavaScript Arrays' vs 'Programming')",
      "Try topics like: Science, History, Technology, Literature, Sports",
      "Mix different subjects to test your general knowledge"
    ]
  },
  {
    title: "Select Difficulty",
    description: "Pick the challenge level that matches your knowledge and goals.",
    icon: "📊",
    tips: [
      "Easy: Perfect for beginners or quick reviews",
      "Medium: Balanced challenge for most learners",
      "Hard: Advanced concepts for experts"
    ]
  },
  {
    title: "Take the Quiz",
    description: "Answer 50 AI-generated multiple choice questions with a 30-second timer per question.",
    icon: "⏱️",
    tips: [
      "Read questions carefully before selecting answers",
      "Don't worry if time runs out - you can still continue",
      "Trust your first instinct if you're unsure"
    ]
  },
  {
    title: "Review Results",
    description: "See your score, performance analysis, and detailed explanations for each question.",
    icon: "📈",
    tips: [
      "Check the detailed review to learn from mistakes",
      "Use performance insights to identify knowledge gaps",
      "Retake quizzes to track your improvement"
    ]
  }
];

export default function UserGuide({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentGuide = guideSteps[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="backdrop-blur-xl bg-dark-800/90 border border-gray-600/30 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white font-poppins">
            How to Use Quiz Hub
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          {guideSteps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  index <= currentStep
                    ? 'bg-accent-500 text-white'
                    : 'bg-gray-600 text-gray-400'
                }`}
              >
                {index + 1}
              </div>
              {index < guideSteps.length - 1 && (
                <div
                  className={`w-12 h-1 mx-2 transition-colors ${
                    index < currentStep ? 'bg-accent-500' : 'bg-gray-600'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <div className="text-6xl mb-4">{currentGuide.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-4 font-poppins">
              {currentGuide.title}
            </h3>
            <p className="text-lg text-gray-300 mb-6 font-nunito leading-relaxed">
              {currentGuide.description}
            </p>

            {/* Tips */}
            {currentGuide.tips && (
              <div className="bg-dark-700/50 border border-gray-600/30 rounded-2xl p-6 text-left">
                <h4 className="font-semibold text-accent-400 mb-3 font-poppins">
                  💡 Pro Tips:
                </h4>
                <ul className="space-y-2">
                  {currentGuide.tips.map((tip, index) => (
                    <li key={index} className="text-gray-300 font-nunito flex items-start">
                      <span className="text-accent-400 mr-2">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all ${
              currentStep === 0
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
            } font-poppins`}
          >
            Previous
          </button>

          <span className="text-gray-400 font-nunito">
            {currentStep + 1} of {guideSteps.length}
          </span>

          <button
            onClick={nextStep}
            className="px-6 py-3 bg-gradient-to-r from-accent-500 to-electric-500 text-white rounded-2xl font-semibold hover:from-accent-600 hover:to-electric-600 transition-all font-poppins"
          >
            {currentStep === guideSteps.length - 1 ? 'Get Started!' : 'Next'}
          </button>
        </div>

        {/* Skip Option */}
        <div className="text-center mt-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors font-nunito"
          >
            Skip guide
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}