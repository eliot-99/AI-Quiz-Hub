"use client";

import React, { useEffect, useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import EnhancedAudioManager from "./components/EnhancedAudioManager";
import VantaNetworkBackground from "./components/VantaNetworkBackground";
import UserGuide from "./components/UserGuide";
import PlayButton from "./components/PlayButton";

// Supported languages for the quiz
type Language = "english" | "hindi" | "bengali";

// Available difficulty levels and UI metadata
const difficultyLevels = [
  {
    value: "easy",
    label: "Easy",
    gradient: "from-neon-400 to-neon-600",
    description: "Perfect for beginners",
    icon: "🌱",
  },
  {
    value: "medium",
    label: "Medium",
    gradient: "from-electric-400 to-electric-600",
    description: "Balanced challenge",
    icon: "⚡",
  },
  {
    value: "hard",
    label: "Hard",
    gradient: "from-accent-400 to-accent-600",
    description: "Expert level",
    icon: "🔥",
  },
] as const;

export default function HomePage() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [questionCount, setQuestionCount] = useState(50);
  const [timePerQuestion, setTimePerQuestion] = useState(30);
  const [language, setLanguage] = useState<Language>("english");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const onLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  const handleStartQuiz = async () => {
    if (!topic.trim()) {
      // Add shake animation to topic input
      const input = document.getElementById("topic-input");
      if (input) {
        input.classList.add("animate-pulse");
        setTimeout(() => input.classList.remove("animate-pulse"), 1000);
      }
      return;
    }

    setIsLoading(true);

    // Store quiz configuration
    const quizConfig = {
      topic: topic.trim(),
      difficulty,
      questionCount,
      timePerQuestion,
      language,
    };

    sessionStorage.setItem("quizConfig", JSON.stringify(quizConfig));

    // Play start sound
    if ((window as any).playClickSound) {
      (window as any).playClickSound();
    }

    // Navigate to quiz page
    router.push("/quiz");
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen relative overflow-visible isolate">
        <VantaNetworkBackground />
        <EnhancedAudioManager page="home" />

        <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-2xl"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12"
            >
              <div className="relative inline-block w-full max-w-2xl mx-auto">
                {/* Card */}
                <div className="relative rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl px-12 py-12 overflow-hidden">
                  {/* Water Ripples Effect */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Ripple 1 - Center */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      animate={{
                        scale: [0, 2.5],
                        opacity: [0.6, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    >
                      <div className="w-32 h-32 rounded-full border-2 border-blue-400/30"></div>
                    </motion.div>

                    {/* Ripple 2 - Center (delayed) */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      animate={{
                        scale: [0, 2.5],
                        opacity: [0.5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 1,
                      }}
                    >
                      <div className="w-32 h-32 rounded-full border-2 border-purple-400/25"></div>
                    </motion.div>

                    {/* Ripple 3 - Center (more delayed) */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      animate={{
                        scale: [0, 2.5],
                        opacity: [0.4, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 2,
                      }}
                    >
                      <div className="w-32 h-32 rounded-full border-2 border-indigo-400/20"></div>
                    </motion.div>

                    {/* Secondary Ripple - Top Left */}
                    <motion.div
                      className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2"
                      animate={{
                        scale: [0, 1.8],
                        opacity: [0.4, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 0.5,
                      }}
                    >
                      <div className="w-24 h-24 rounded-full border border-cyan-400/25"></div>
                    </motion.div>

                    {/* Secondary Ripple - Bottom Right */}
                    <motion.div
                      className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2"
                      animate={{
                        scale: [0, 1.5],
                        opacity: [0.3, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 2.5,
                      }}
                    >
                      <div className="w-20 h-20 rounded-full border border-emerald-400/20"></div>
                    </motion.div>

                    {/* Small Ripple - Top Right */}
                    <motion.div
                      className="absolute top-1/3 right-1/3 translate-x-1/2 -translate-y-1/2"
                      animate={{
                        scale: [0, 1.2],
                        opacity: [0.5, 0],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: 1.8,
                      }}
                    >
                      <div className="w-16 h-16 rounded-full border border-violet-400/30"></div>
                    </motion.div>
                  </div>

                  <h1 className="font-poppins text-5xl md:text-6xl font-extrabold leading-tight text-center text-white relative z-10">
                    AI Quiz
                    <span className="text-indigo-400"> Hub</span>
                  </h1>

                  <p className="mt-4 text-center text-gray-300 font-nunito text-lg md:text-xl leading-relaxed relative z-10">
                    Challenge yourself with AI-generated questions on any topic.
                    <br />
                    <span className="mt-2 inline-block text-indigo-300 font-semibold tracking-wide">
                      Elegant. Immersive. Intelligent.
                    </span>
                  </p>

                  <div className="mt-5 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 relative z-10" />
                </div>
              </div>
            </motion.div>

            {/* Main Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Topic Input */}
              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-200 mb-3 font-poppins">
                  🎯 Choose Your Topic
                </label>
                <motion.input
                  id="topic-input"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., JavaScript, World History, Physics, Literature..."
                  className="w-full px-6 py-4 bg-dark-800/50 border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 text-lg font-nunito focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
                  whileFocus={{ scale: 1.02 }}
                  onKeyPress={(e) => e.key === "Enter" && handleStartQuiz()}
                />
              </div>

              {/* Settings Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Left Side - Difficulty Selection */}
                <div>
                  <label className="block text-lg font-semibold text-gray-200 mb-3 font-poppins">
                    ⚡ Difficulty Level
                  </label>
                  <div className="space-y-4 pt-2 pb-8">
                    {difficultyLevels.map((level) => (
                      <motion.button
                        key={level.value}
                        onClick={() => setDifficulty(level.value)}
                        className={`w-full p-5 rounded-xl border-2 transition-all duration-300 font-nunito ${
                          difficulty === level.value
                            ? "border-accent-500 bg-accent-500/20 text-white"
                            : "border-gray-600/50 bg-dark-800/30 text-gray-300 hover:border-accent-400/50 hover:bg-accent-500/10"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{level.icon}</span>
                            <div className="text-left">
                              <div className="font-semibold">{level.label}</div>
                              <div className="text-sm opacity-75">{level.description}</div>
                            </div>
                          </div>
                          {difficulty === level.value && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center"
                            >
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Right Side - Other Settings */}
                <div className="space-y-9">
                  {/* Language Selection */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-200 mb-3 font-poppins">
                      🌐 Language
                    </label>
                    <div className="relative">
                      <select
                        value={language}
                        onChange={onLanguageChange}
                        className="select-no-arrow w-full pl-4 pr-10 py-3 bg-dark-800/60 border border-gray-600/50 rounded-2xl text-white font-nunito focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-transparent cursor-pointer hover:bg-dark-700/60 transition-colors"
                      >
                        <option value="english">English</option>
                        <option value="hindi">Hindi (हिन्दी)</option>
                        <option value="bengali">Bengali (বাংলা)</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Question Count */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-200 mb-3 font-poppins">
                      📊 Number of Questions
                    </label>
                    <div className="relative">
                      <select
                        value={questionCount}
                        onChange={(e) => setQuestionCount(Number(e.target.value))}
                        className="select-no-arrow w-full pl-4 pr-10 py-3 bg-dark-800/60 border border-gray-600/50 rounded-2xl text-white font-nunito focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-transparent cursor-pointer hover:bg-dark-700/60 transition-colors"
                      >
                        <option value={10}>10 Questions (Quick)</option>
                        <option value={25}>25 Questions (Standard)</option>
                        <option value={50}>50 Questions (Complete)</option>
                        <option value={100}>100 Questions (Marathon)</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Time Per Question */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-200 mb-3 font-poppins">
                      ⏱️ Time Per Question
                    </label>
                    <div className="relative">
                      <select
                        value={timePerQuestion}
                        onChange={(e) => setTimePerQuestion(Number(e.target.value))}
                        className="select-no-arrow w-full pl-4 pr-10 py-3 bg-dark-800/60 border border-gray-600/50 rounded-2xl text-white font-nunito focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-transparent cursor-pointer hover:bg-dark-700/60 transition-colors"
                      >
                        <option value={15}>15 seconds (Speed)</option>
                        <option value={30}>30 seconds (Standard)</option>
                        <option value={60}>60 seconds (Relaxed)</option>
                        <option value={120}>2 minutes (Research)</option>
                        <option value={0}>No time limit</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <div className="flex justify-center">
                <div className="scale-95 hover:scale-100 transition-transform">
                  <PlayButton
                    label={isLoading ? "LOADING" : "START QUIZ"}
                    onClick={handleStartQuiz}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 grid grid-cols-3 gap-4 text-center"
              >
                <div className="p-3 bg-dark-800/30 rounded-xl border border-gray-600/30">
                  <div className="text-2xl font-bold text-accent-400 font-poppins">{questionCount}</div>
                  <div className="text-sm text-gray-400 font-nunito">Questions</div>
                </div>
                <div className="p-3 bg-dark-800/30 rounded-xl border border-gray-600/30">
                  <div className="text-2xl font-bold text-electric-400 font-poppins">
                    {timePerQuestion === 0 ? "∞" : `${timePerQuestion}s`}
                  </div>
                  <div className="text-sm text-gray-400 font-nunito">Per Question</div>
                </div>
                <div className="p-3 bg-dark-800/30 rounded-xl border border-gray-600/30">
                  <div className="text-2xl font-bold text-neon-400 font-poppins">
                    {timePerQuestion === 0 ? "∞" : `${Math.ceil((questionCount * timePerQuestion) / 60)}m`}
                  </div>
                  <div className="text-sm text-gray-400 font-nunito">Total Time</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-center mt-8"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
                <button
                  onClick={() => setShowGuide(true)}
                  className="text-accent-400 hover:text-accent-300 font-semibold transition-colors font-nunito text-lg"
                >
                  📖 How to Use Quiz Hub
                </button>
                <span className="hidden sm:inline text-gray-600">•</span>
                <button
                  onClick={() => router.push('/about')}
                  className="text-accent-400 hover:text-accent-300 font-semibold transition-colors font-nunito text-lg"
                >
                  👨‍💻 Know About This Project
                </button>
              </div>
              <p className="text-gray-500 font-nunito">Powered by Llama AI • Designed & Developed By Saptarshi • Built with 💜</p>
            </motion.div>
          </motion.div>
        </div>

        {/* User Guide Modal */}
        {showGuide && <UserGuide onClose={() => setShowGuide(false)} />}
      </div>
    </>
  );
}