'use client';

import { motion } from 'framer-motion';

interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
}

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  isSubmitting: boolean;
  timeLeft: number;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  isSubmitting,
  timeLeft,
  questionNumber,
  totalQuestions
}: QuestionCardProps) {
  
  const getOptionColor = (option: string) => {
    if (!selectedAnswer) return 'border-gray-200 bg-white/60 hover:border-primary-300 hover:bg-primary-50';
    if (selectedAnswer === option) return 'border-primary-500 bg-primary-100 text-primary-800';
    return 'border-gray-200 bg-gray-50 text-gray-500';
  };

  const getTimeColor = () => {
    if (timeLeft > 20) return 'text-mint-600';
    if (timeLeft > 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="glass-morphism rounded-3xl p-8 md:p-12 shadow-2xl"
    >
      {/* Question Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-lavender-500 flex items-center justify-center text-white font-bold text-lg">
            {questionNumber}
          </div>
          <div>
            <div className="text-sm text-gray-600 font-nunito">Question {questionNumber} of {totalQuestions}</div>
            <div className={`text-lg font-semibold ${getTimeColor()} font-poppins`}>
              {timeLeft}s remaining
            </div>
          </div>
        </div>
        
        {/* Timer Circle */}
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-gray-200"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <motion.path
              className={getTimeColor()}
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              strokeLinecap="round"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              initial={{ strokeDasharray: "100, 100" }}
              animate={{ strokeDasharray: `${(timeLeft / 30) * 100}, 100` }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-sm font-bold ${getTimeColor()}`}>{timeLeft}</span>
          </div>
        </div>
      </div>

      {/* Question */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed font-poppins">
          {question.question}
        </h2>
      </motion.div>

      {/* Options */}
      <div className="space-y-4 mb-8">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            onClick={() => onAnswerSelect(option)}
            disabled={isSubmitting}
            className={`w-full p-4 md:p-6 text-left border-2 rounded-2xl transition-all duration-300 ${getOptionColor(option)} ${
              isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            }`}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-4 font-bold">
                {String.fromCharCode(65 + index)}
              </div>
              <span className="text-lg font-medium font-nunito">{option}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Next Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex justify-end"
      >
        <motion.button
          onClick={onNext}
          disabled={!selectedAnswer && timeLeft > 0}
          className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
            selectedAnswer || timeLeft === 0
              ? 'bg-gradient-to-r from-primary-500 to-lavender-500 text-white hover:from-primary-600 hover:to-lavender-600 glow-effect'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } font-poppins`}
          whileHover={selectedAnswer || timeLeft === 0 ? { scale: 1.05 } : {}}
          whileTap={selectedAnswer || timeLeft === 0 ? { scale: 0.95 } : {}}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : questionNumber === totalQuestions ? (
            'Finish Quiz 🎉'
          ) : (
            'Next Question →'
          )}
        </motion.button>
      </motion.div>

      {/* Skip Notice */}
      {!selectedAnswer && timeLeft > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-4 text-sm text-gray-500 font-nunito"
        >
          Select an answer or wait for time to run out to continue
        </motion.div>
      )}
    </motion.div>
  );
}