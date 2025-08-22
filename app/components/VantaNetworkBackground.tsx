'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

// Color schemes - you can easily switch between these
const COLOR_SCHEMES = {
  // Elegant Purple & Blue
  elegant: {
    color: 0x8b5cf6,      // Purple-500
    backgroundColor: 0x0f172a, // Slate-900
    description: "Elegant Purple & Blue"
  },
  
  // Professional Blue
  professional: {
    color: 0x3b82f6,      // Blue-500  
    backgroundColor: 0x1e293b, // Slate-800
    description: "Professional Blue"
  },
  
  // Cyber Green
  cyber: {
    color: 0x10b981,      // Emerald-500
    backgroundColor: 0x064e3b, // Emerald-900
    description: "Cyber Green"
  },
  
  // Warm Gold
  warm: {
    color: 0xf59e0b,      // Amber-500
    backgroundColor: 0x451a03, // Amber-900
    description: "Warm Gold"
  },
  
  // Cool Teal
  cool: {
    color: 0x14b8a6,      // Teal-500
    backgroundColor: 0x134e4a, // Teal-800
    description: "Cool Teal"
  },
  
  // Deep Space
  space: {
    color: 0x6366f1,      // Indigo-500
    backgroundColor: 0x1e1b4b, // Indigo-900
    description: "Deep Space"
  }
};

// Choose your preferred color scheme here
const SELECTED_SCHEME = 'elegant'; // Change this to: elegant, professional, cyber, warm, cool, or space

export default function VantaNetworkBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Load Three.js and Vanta.js scripts
    const loadScripts = async () => {
      // Load Three.js
      if (!window.THREE) {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        threeScript.async = true;
        document.head.appendChild(threeScript);
        
        await new Promise((resolve) => {
          threeScript.onload = resolve;
        });
      }

      // Load Vanta.js NET effect
      if (!window.VANTA) {
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.net.min.js';
        vantaScript.async = true;
        document.head.appendChild(vantaScript);
        
        await new Promise((resolve) => {
          vantaScript.onload = resolve;
        });
      }

      // Get selected color scheme
      const scheme = COLOR_SCHEMES[SELECTED_SCHEME as keyof typeof COLOR_SCHEMES];

      // Initialize Vanta effect
      if (window.VANTA && vantaRef.current && !vantaEffect) {
        const effect = window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: scheme.color,
          backgroundColor: scheme.backgroundColor,
          points: 8.00,        // Optimal number of points
          maxDistance: 28.00,  // Good connection distance
          spacing: 22.00,      // Perfect spacing
          showDots: true,
          backgroundAlpha: 1.0
        });
        setVantaEffect(effect);
        
        // Log the current scheme for easy identification
        console.log(`🎨 Vanta Background: ${scheme.description}`);
      }
    };

    loadScripts().catch(console.error);

    // Cleanup function
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [mounted, vantaEffect]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  if (!mounted) return null;

  return (
    <div 
      ref={vantaRef} 
      className="fixed inset-0 z-0"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}