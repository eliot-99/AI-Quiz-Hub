'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SystemStatus {
  frontend: 'online' | 'offline';
  backend: 'online' | 'offline';
  openai: 'available' | 'unavailable' | 'unknown';
  gemini: 'available' | 'unavailable' | 'unknown';
}

export default function StatusDashboard() {
  const [status, setStatus] = useState<SystemStatus>({
    frontend: 'online',
    backend: 'offline',
    openai: 'unknown',
    gemini: 'unknown'
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    checkSystemStatus();
    const interval = setInterval(checkSystemStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const checkSystemStatus = async () => {
    try {
      // Check backend health
      const response = await fetch('/api/health');
      if (response.ok) {
        const data = await response.json();
        setStatus(prev => ({
          ...prev,
          backend: 'online',
          // Backend should return AI status in the future
          openai: 'available', // Assume available if backend is running
          gemini: 'available'
        }));
      } else {
        setStatus(prev => ({
          ...prev,
          backend: 'offline',
          openai: 'unavailable',
          gemini: 'unavailable'
        }));
      }
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        backend: 'offline',
        openai: 'unavailable',
        gemini: 'unavailable'
      }));
    }
  };

  const getStatusColor = (serviceStatus: string) => {
    switch (serviceStatus) {
      case 'online':
      case 'available':
        return 'text-mint-600 bg-mint-100';
      case 'offline':
      case 'unavailable':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getStatusIcon = (serviceStatus: string) => {
    switch (serviceStatus) {
      case 'online':
      case 'available':
        return '✅';
      case 'offline':
      case 'unavailable':
        return '❌';
      default:
        return '⚠️';
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 p-3 bg-dark-800/80 backdrop-blur-md rounded-full shadow-lg hover:bg-dark-700/90 transition-all z-40 border border-gray-600/30"
        title="System Status"
      >
        <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="fixed bottom-4 left-4 backdrop-blur-xl bg-dark-800/90 border border-gray-600/30 rounded-2xl p-6 shadow-xl z-40 min-w-80"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white font-poppins">System Status</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 rounded-full hover:bg-gray-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-3">
        {/* Frontend Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-300 font-nunito">Frontend</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status.frontend)}`}>
            {getStatusIcon(status.frontend)} {status.frontend}
          </span>
        </div>

        {/* Backend Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-300 font-nunito">Backend API</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status.backend)}`}>
            {getStatusIcon(status.backend)} {status.backend}
          </span>
        </div>

        {/* OpenAI Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-300 font-nunito">OpenAI</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status.openai)}`}>
            {getStatusIcon(status.openai)} {status.openai}
          </span>
        </div>

        {/* Gemini Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-300 font-nunito">Gemini AI</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status.gemini)}`}>
            {getStatusIcon(status.gemini)} {status.gemini}
          </span>
        </div>
      </div>

      {/* Refresh Button */}
      <button
        onClick={checkSystemStatus}
        className="w-full mt-4 px-3 py-2 bg-accent-500 text-white rounded-lg text-sm font-medium hover:bg-accent-600 transition-colors font-nunito"
      >
        Refresh Status
      </button>

      {/* Info */}
      <div className="mt-3 text-xs text-gray-400 font-nunito">
        {status.backend === 'offline' ? (
          <p>⚠️ Backend offline - using mock questions</p>
        ) : (
          <p>✅ All systems operational</p>
        )}
      </div>
    </motion.div>
  );
}