"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import EnhancedAudioManager from "../components/EnhancedAudioManager";
import VantaNetworkBackground from "../components/VantaNetworkBackground";
import PlayButton from "../components/PlayButton";
import Image from "next/image";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen relative overflow-visible isolate">
        <VantaNetworkBackground />
        <EnhancedAudioManager />

        <div className="relative z-10 min-h-screen p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 pt-8"
          >
            <div className="relative inline-block w-full max-w-4xl mx-auto">
              <div className="relative rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl px-12 py-12 overflow-hidden">
                {/* Water Ripples Effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {/* Main Center Ripple */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={{
                      scale: [0, 2.5],
                      opacity: [0.4, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  >
                    <div className="w-40 h-40 rounded-full border-2 border-blue-400/20"></div>
                  </motion.div>

                  {/* Secondary Ripples */}
                  <motion.div
                    className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2"
                    animate={{
                      scale: [0, 1.8],
                      opacity: [0.3, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 1,
                    }}
                  >
                    <div className="w-24 h-24 rounded-full border border-purple-400/15"></div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2"
                    animate={{
                      scale: [0, 1.5],
                      opacity: [0.3, 0],
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 2,
                    }}
                  >
                    <div className="w-20 h-20 rounded-full border border-indigo-400/15"></div>
                  </motion.div>
                </div>

                <h1 className="font-poppins text-4xl md:text-5xl font-extrabold leading-tight text-center text-white relative z-10">
                  About This
                  <span className="text-indigo-400"> Project</span>
                </h1>

                <p className="mt-4 text-center text-gray-300 font-nunito text-lg md:text-xl leading-relaxed relative z-10">
                  Discover the story behind AI Quiz Hub and meet the creator
                </p>

                <div className="mt-5 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 relative z-10" />
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Side - Project Information */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Project Overview */}
                <motion.div 
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Floating particles */}
                  <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                      className="absolute top-4 right-4 w-2 h-2 bg-indigo-400/30 rounded-full"
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-purple-400/40 rounded-full"
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.4, 0.9, 0.4],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    />
                  </div>

                  {/* Gradient border effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <motion.h2 
                    className="text-2xl font-bold text-white mb-6 font-poppins flex items-center relative z-10"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span 
                      className="text-3xl mr-3"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🚀
                    </motion.span>
                    Project Overview
                  </motion.h2>
                  <div className="space-y-4 text-gray-300 font-nunito leading-relaxed relative z-10">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <strong className="text-indigo-400 hover:text-indigo-300 transition-colors">AI Quiz Hub</strong> is an innovative, AI-powered quiz application that transforms the way people learn and test their knowledge. Built with cutting-edge technology, it offers an immersive and intelligent quiz experience.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      The platform leverages the power of <strong className="text-purple-400 hover:text-purple-300 transition-colors">Llama AI</strong> to generate dynamic, contextual questions on virtually any topic, making learning both engaging and personalized.
                    </motion.p>
                  </div>
                </motion.div>

                {/* Key Features */}
                <motion.div 
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl"
                    animate={{
                      background: [
                        "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.05))",
                        "linear-gradient(135deg, rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.05), rgba(59, 130, 246, 0.05))",
                        "linear-gradient(135deg, rgba(236, 72, 153, 0.05), rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))"
                      ]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />

                  <motion.h2 
                    className="text-2xl font-bold text-white mb-6 font-poppins flex items-center relative z-10"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span 
                      className="text-3xl mr-3"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      ✨
                    </motion.span>
                    Key Features
                  </motion.h2>
                  <div className="grid gap-4 relative z-10">
                    {[
                      { icon: "🤖", title: "AI-Powered Questions", desc: "Dynamic question generation using Llama AI", color: "from-blue-500/20 to-cyan-500/20" },
                      { icon: "🌍", title: "Multi-Language Support", desc: "English, Hindi, and Bengali language options", color: "from-green-500/20 to-emerald-500/20" },
                      { icon: "⚡", title: "Adaptive Difficulty", desc: "Easy, Medium, and Hard difficulty levels", color: "from-yellow-500/20 to-orange-500/20" },
                      { icon: "🎨", title: "Immersive Design", desc: "Beautiful UI with animated backgrounds and effects", color: "from-purple-500/20 to-pink-500/20" },
                      { icon: "🔊", title: "Audio Experience", desc: "Enhanced audio feedback and sound effects", color: "from-indigo-500/20 to-blue-500/20" },
                      { icon: "📊", title: "Real-time Scoring", desc: "Instant feedback and performance tracking", color: "from-red-500/20 to-rose-500/20" }
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className={`flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r ${feature.color} border border-white/5 hover:border-white/20 transition-all duration-300 group/item`}
                        whileHover={{ scale: 1.03, x: 5 }}
                      >
                        <motion.span 
                          className="text-2xl"
                          whileHover={{ scale: 1.3, rotate: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {feature.icon}
                        </motion.span>
                        <div>
                          <h3 className="font-semibold text-white font-poppins group-hover/item:text-indigo-300 transition-colors">{feature.title}</h3>
                          <p className="text-gray-400 text-sm font-nunito group-hover/item:text-gray-300 transition-colors">{feature.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Technology Stack */}
                <motion.div 
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Circuit-like animated lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                      className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                      animate={{ x: [-100, 400] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-purple-400/30 to-transparent"
                      animate={{ x: [100, -400] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 2 }}
                    />
                  </div>

                  <motion.h2 
                    className="text-2xl font-bold text-white mb-6 font-poppins flex items-center relative z-10"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span 
                      className="text-3xl mr-3"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      ⚙️
                    </motion.span>
                    Technology Stack
                  </motion.h2>
                  <div className="space-y-4 text-gray-300 font-nunito relative z-10">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      Built with modern technologies to ensure optimal performance and user experience.
                    </motion.p>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: "Next.js 14", color: "text-blue-400", bg: "from-blue-500/10 to-blue-600/10" },
                        { name: "React 18", color: "text-cyan-400", bg: "from-cyan-500/10 to-cyan-600/10" },
                        { name: "TypeScript", color: "text-blue-300", bg: "from-blue-400/10 to-blue-500/10" },
                        { name: "Tailwind CSS", color: "text-teal-400", bg: "from-teal-500/10 to-teal-600/10" },
                        { name: "Framer Motion", color: "text-purple-400", bg: "from-purple-500/10 to-purple-600/10" },
                        { name: "Llama AI", color: "text-green-400", bg: "from-green-500/10 to-green-600/10" },
                        { name: "Vanta.js", color: "text-pink-400", bg: "from-pink-500/10 to-pink-600/10" },
                        { name: "Web Audio API", color: "text-orange-400", bg: "from-orange-500/10 to-orange-600/10" }
                      ].map((tech, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                          className={`${tech.color} font-semibold font-nunito text-center p-3 rounded-lg bg-gradient-to-br ${tech.bg} border border-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer group/tech`}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            className="group-hover/tech:animate-pulse"
                            whileHover={{ textShadow: "0 0 8px currentColor" }}
                          >
                            {tech.name}
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Side - Creator Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
              >
                {/* Creator Profile */}
                <motion.div 
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated background orbs */}
                  <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                      className="absolute top-8 right-8 w-20 h-20 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute bottom-8 left-8 w-16 h-16 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    />
                  </div>

                  <motion.h2 
                    className="text-2xl font-bold text-white mb-6 font-poppins flex items-center relative z-10"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span 
                      className="text-3xl mr-3"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      👨‍💻
                    </motion.span>
                    Meet the Creator
                  </motion.h2>
                  
                  {/* Profile Image */}
                  <div className="flex flex-col items-center mb-6 relative z-10">
                    <motion.div 
                      className="w-32 h-32 rounded-full mb-4 border-4 border-violet-400/60 overflow-hidden relative group/image"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Pulse violet glow behind image */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-violet-500/30 blur-xl scale-150"
                        animate={{
                          scale: [1.5, 1.8, 1.5],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      
                      {/* Animated border */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover/image:opacity-100"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                      <Image
                        src="/assets/Asset1.png"
                        alt="Saptarshi Ghosh"
                        width={128}
                        height={128}
                        className="rounded-full object-cover w-full h-full relative z-10"
                      />
                    </motion.div>
                    <motion.h3 
                      className="text-2xl font-bold text-white font-poppins"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      Saptarshi Ghosh
                    </motion.h3>
                    <motion.p 
                      className="text-indigo-400 font-nunito"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      AI Developer & Designer
                    </motion.p>
                  </div>

                  <div className="space-y-4 text-gray-300 font-nunito leading-relaxed relative z-10">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      I'm <strong className="text-indigo-400 hover:text-indigo-300 transition-colors">Saptarshi Ghosh</strong>, a passionate developer with expertise in AI solutions and creative design. I'm passionate about developing cutting-edge AI solutions and creating impactful designs. As a Vice Chancellor's Award recipient and Lead Designer for Ureckon fest, I combine technical excellence with creative innovation to solve real-world problems through technology.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      Driven by a vision to make learning more accessible and engaging, I developed AI Quiz Hub as a platform that combines the power of AI with intuitive design to create an exceptional educational experience.
                    </motion.p>
                  </div>
                </motion.div>

                {/* Development Journey */}
                <motion.div 
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h2 
                    className="text-2xl font-bold text-white mb-6 font-poppins flex items-center relative z-10"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span 
                      className="text-3xl mr-3"
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🚀
                    </motion.span>
                    Development Journey
                  </motion.h2>
                  <div className="space-y-4 text-gray-300 font-nunito leading-relaxed relative z-10">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      The development of <strong className="text-indigo-400 hover:text-indigo-300 transition-colors">AI Quiz Hub</strong> was driven by a passion for creating educational technology that makes learning both engaging and accessible.
                    </motion.p>
                    <div className="space-y-3">
                      {[
                        { icon: "💡", title: "Concept & Planning", desc: "Ideation and architecture design for AI-powered quiz system", color: "from-yellow-400/20 to-orange-400/20" },
                        { icon: "⚡", title: "AI Integration", desc: "Implementing Llama AI for dynamic question generation", color: "from-blue-400/20 to-cyan-400/20" },
                        { icon: "🎨", title: "UI/UX Design", desc: "Creating immersive animations and responsive design", color: "from-purple-400/20 to-pink-400/20" },
                        { icon: "🔧", title: "Optimization", desc: "Performance tuning and user experience enhancement", color: "from-green-400/20 to-emerald-400/20" }
                      ].map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
                          className={`flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-r ${step.color} border border-white/5 hover:border-white/20 transition-all duration-300 group/step`}
                          whileHover={{ scale: 1.02, x: 5 }}
                        >
                          <motion.span 
                            className="text-lg"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {step.icon}
                          </motion.span>
                          <div>
                            <h4 className="font-semibold text-white group-hover/step:text-indigo-300 transition-colors">{step.title}</h4>
                            <p className="text-sm text-gray-400 group-hover/step:text-gray-300 transition-colors">{step.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Contact & Connect */}
                <motion.div 
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Network connection lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                      className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent"
                      animate={{ scaleX: [0, 1, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute bottom-1/4 right-0 w-full h-px bg-gradient-to-l from-transparent via-purple-400/20 to-transparent"
                      animate={{ scaleX: [0, 1, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    />
                  </div>

                  <motion.h2 
                    className="text-2xl font-bold text-white mb-3 font-poppins flex items-center relative z-10"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span 
                      className="text-3xl mr-3"
                      animate={{ 
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🤝
                    </motion.span>
                    Connect & Collaborate
                  </motion.h2>
                  <div className="space-y-4 text-gray-300 font-nunito relative z-10">
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      Interested in collaborating or have questions about the project? Feel free to reach out!
                    </motion.p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { href: "mailto:saptarshi0999@gmail.com", icon: "📧", label: "Email", color: "from-red-500/10 to-pink-500/10" },
                        { href: "https://github.com/eliot-99", icon: "🐙", label: "GitHub", color: "from-gray-500/10 to-slate-500/10", external: true },
                        { href: "https://www.linkedin.com/in/saptarshi-ghosh-rana/", icon: "💼", label: "LinkedIn", color: "from-blue-500/10 to-cyan-500/10", external: true },
                        { href: "https://portfolio-nine-snowy-55.vercel.app/", icon: "🌐", label: "Portfolio", color: "from-purple-500/10 to-indigo-500/10", external: true }
                      ].map((link, index) => (
                        <motion.a
                          key={index}
                          href={link.href}
                          {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                          className={`flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r ${link.color} border border-white/5 hover:border-white/20 transition-all duration-300 group/link`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                          whileHover={{ scale: 1.03, x: 5 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <motion.span 
                            className="text-2xl"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {link.icon}
                          </motion.span>
                          <span className="text-indigo-400 font-semibold group-hover/link:text-indigo-300 transition-colors">{link.label}</span>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Back to Home Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-center mt-12 mb-8 relative"
            >
              {/* Floating particles around button */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute top-4 left-1/4 w-1 h-1 bg-indigo-400/40 rounded-full"
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute top-8 right-1/3 w-1.5 h-1.5 bg-purple-400/40 rounded-full"
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </div>

              <motion.div 
                className="scale-95 hover:scale-100 transition-transform relative z-10"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <PlayButton
                  label="HOME"
                  onClick={() => router.push('/')}
                />
              </motion.div>
              
              <motion.p 
                className="mt-6 text-gray-500 font-nunito relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Powered by <span className="text-green-400 hover:text-green-300 transition-colors">Llama AI</span> • Designed & Developed By <span className="text-indigo-400 hover:text-indigo-300 transition-colors">Saptarshi</span> • Built with <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-purple-400"
                >💜</motion.span>
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}