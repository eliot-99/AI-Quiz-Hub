'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ConfettiPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  size: number;
  shape: 'circle' | 'square' | 'triangle';
}

interface ConfettiAnimationProps {
  trigger: boolean;
  duration?: number;
  intensity?: number;
}

export default function ConfettiAnimation({ 
  trigger, 
  duration = 3000, 
  intensity = 100 
}: ConfettiAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const confettiRef = useRef<ConfettiPiece[]>([]);
  const startTimeRef = useRef<number>(0);

  const colors = [
    '#3b82f6', // blue
    '#a855f7', // purple
    '#22c55e', // green
    '#f59e0b', // yellow
    '#ef4444', // red
    '#06b6d4', // cyan
    '#8b5cf6', // violet
    '#10b981', // emerald
  ];

  const createConfettiPiece = (): ConfettiPiece => {
    const canvas = canvasRef.current;
    if (!canvas) return {} as ConfettiPiece;

    return {
      x: Math.random() * canvas.width,
      y: -10,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle'
    };
  };

  const drawConfettiPiece = (ctx: CanvasRenderingContext2D, piece: ConfettiPiece) => {
    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate((piece.rotation * Math.PI) / 180);
    ctx.fillStyle = piece.color;

    switch (piece.shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, piece.size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'square':
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(0, -piece.size / 2);
        ctx.lineTo(-piece.size / 2, piece.size / 2);
        ctx.lineTo(piece.size / 2, piece.size / 2);
        ctx.closePath();
        ctx.fill();
        break;
    }
    ctx.restore();
  };

  const animate = (currentTime: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    if (startTimeRef.current === 0) {
      startTimeRef.current = currentTime;
    }

    const elapsed = currentTime - startTimeRef.current;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Add new confetti pieces
    if (elapsed < duration && confettiRef.current.length < intensity) {
      for (let i = 0; i < 3; i++) {
        confettiRef.current.push(createConfettiPiece());
      }
    }

    // Update and draw confetti pieces
    confettiRef.current = confettiRef.current.filter(piece => {
      // Update position
      piece.x += piece.vx;
      piece.y += piece.vy;
      piece.vy += 0.2; // gravity
      piece.rotation += piece.rotationSpeed;

      // Draw piece
      drawConfettiPiece(ctx, piece);

      // Remove pieces that are off screen
      return piece.y < canvas.height + 50;
    });

    // Continue animation if there are still pieces or we're still in duration
    if (confettiRef.current.length > 0 || elapsed < duration) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Reset for next trigger
      startTimeRef.current = 0;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (trigger) {
      confettiRef.current = [];
      startTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ display: trigger ? 'block' : 'none' }}
    />
  );
}

// Celebration component with multiple effects
export function CelebrationEffects({ 
  show, 
  performance 
}: { 
  show: boolean; 
  performance: 'excellent' | 'good' | 'fair' 
}) {
  const getIntensity = () => {
    switch (performance) {
      case 'excellent': return 150;
      case 'good': return 100;
      case 'fair': return 50;
      default: return 30;
    }
  };

  const getDuration = () => {
    switch (performance) {
      case 'excellent': return 4000;
      case 'good': return 3000;
      case 'fair': return 2000;
      default: return 1000;
    }
  };

  return (
    <>
      <ConfettiAnimation 
        trigger={show} 
        intensity={getIntensity()} 
        duration={getDuration()} 
      />
      
      {/* Fireworks effect for excellent performance */}
      {show && performance === 'excellent' && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-yellow-400 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: 2,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}