'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { playClickSound, playSuccessSound, playErrorSound } from '../utils/audioUtils';

interface AudioManagerProps {
  page?: 'home' | 'quiz' | 'results';
}

export default function EnhancedAudioManager({ page = 'home' }: AudioManagerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<'home' | 'quiz'>('home');
  const [showControls, setShowControls] = useState(true);
  
  const homeBgmRef = useRef<HTMLAudioElement>(null);
  const quizBgmRef = useRef<HTMLAudioElement>(null);
  
  const pathname = usePathname();

  useEffect(() => {
    // Initialize audio elements
    const initializeAudio = () => {
      // Background music
      if (homeBgmRef.current) {
        homeBgmRef.current.loop = true;
        homeBgmRef.current.volume = 0.3;
      }
      
      if (quizBgmRef.current) {
        quizBgmRef.current.loop = true;
        quizBgmRef.current.volume = 0.25;
      }

      setIsLoaded(true);
    };

    initializeAudio();

    // Auto-hide controls after 5 seconds
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Switch background music based on page
    const switchBackgroundMusic = async () => {
      if (!isLoaded) return;

      try {
        // Determine which track should play
        const shouldPlayQuiz = pathname === '/quiz';
        const newTrack = shouldPlayQuiz ? 'quiz' : 'home';

        if (newTrack === currentTrack) return;

        // Fade out current track
        const currentAudio = currentTrack === 'home' ? homeBgmRef.current : quizBgmRef.current;
        const newAudio = newTrack === 'home' ? homeBgmRef.current : quizBgmRef.current;

        if (currentAudio && !currentAudio.paused) {
          const fadeOut = setInterval(() => {
            if (currentAudio.volume > 0.05) {
              currentAudio.volume = Math.max(0, currentAudio.volume - 0.05);
            } else {
              currentAudio.pause();
              currentAudio.currentTime = 0;
              clearInterval(fadeOut);
            }
          }, 100);
        }

        // Fade in new track
        if (newAudio && !isMuted) {
          newAudio.volume = 0;
          await newAudio.play();
          
          const fadeIn = setInterval(() => {
            const targetVolume = newTrack === 'home' ? 0.3 : 0.25;
            if (newAudio.volume < targetVolume - 0.05) {
              newAudio.volume = Math.min(targetVolume, newAudio.volume + 0.05);
            } else {
              newAudio.volume = targetVolume;
              clearInterval(fadeIn);
            }
          }, 100);
        }

        setCurrentTrack(newTrack);
      } catch (error) {
        console.log('Audio playback failed:', error);
      }
    };

    switchBackgroundMusic();
  }, [pathname, isLoaded, isMuted, currentTrack]);

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    if (newMutedState) {
      // Mute all audio
      if (homeBgmRef.current) homeBgmRef.current.pause();
      if (quizBgmRef.current) quizBgmRef.current.pause();
    } else {
      // Resume appropriate background music
      const audioToPlay = currentTrack === 'home' ? homeBgmRef.current : quizBgmRef.current;
      if (audioToPlay) {
        audioToPlay.play().catch(console.log);
      }
    }
  };

  // Global sound effect functions
  useEffect(() => {
    const handleClickSound = () => {
      if (!isMuted) {
        playClickSound();
      }
    };

    const handleSuccessSound = () => {
      if (!isMuted) {
        playSuccessSound();
      }
    };

    const handleErrorSound = () => {
      if (!isMuted) {
        playErrorSound();
      }
    };

    // Make functions globally available
    (window as any).playClickSound = handleClickSound;
    (window as any).playSuccessSound = handleSuccessSound;
    (window as any).playErrorSound = handleErrorSound;

    return () => {
      delete (window as any).playClickSound;
      delete (window as any).playSuccessSound;
      delete (window as any).playErrorSound;
    };
  }, [isMuted]);

  return (
    <>
      {/* Audio Elements */}
      <audio ref={homeBgmRef} preload="auto">
        <source src="/Audio/Home_Bgm.mp3" type="audio/mpeg" />
      </audio>
      
      <audio ref={quizBgmRef} preload="auto">
        <source src="/Audio/Quiz_Bgm.mp3" type="audio/mpeg" />
      </audio>

      {/* Audio Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-4 right-4 z-50 md:top-6 md:right-6"
          >
            <div className="backdrop-blur-xl bg-dark-800/80 border border-gray-600/30 rounded-2xl p-3 md:p-4 shadow-xl max-w-xs">
              {/* Mobile: Vertical Layout, Desktop: Horizontal Layout */}
              <div className="flex flex-col space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                {/* Current Track Indicator */}
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${!isMuted ? 'bg-neon-400 animate-pulse' : 'bg-gray-500'}`} />
                  <span className="text-xs md:text-sm text-gray-300 font-nunito">
                    {currentTrack === 'home' ? '🏠 Home' : '🎯 Quiz'} BGM
                  </span>
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between md:justify-start md:space-x-2">
                  {/* Mute Toggle */}
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-xl bg-dark-700/50 hover:bg-dark-600/50 transition-colors"
                    title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                  >
                    {isMuted ? (
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-neon-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </button>

                  {/* Hide Controls */}
                  <button
                    onClick={() => setShowControls(false)}
                    className="p-2 rounded-xl bg-dark-700/50 hover:bg-dark-600/50 transition-colors"
                    title="Hide Controls"
                  >
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show Controls Button (when hidden) */}
      {!showControls && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowControls(true)}
          className="fixed top-4 right-4 z-50 md:top-6 md:right-6 p-2 md:p-3 backdrop-blur-xl bg-dark-800/80 border border-gray-600/30 rounded-xl shadow-xl hover:bg-dark-700/80 transition-colors"
          title="Show Audio Controls"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </motion.button>
      )}
    </>
  );
}