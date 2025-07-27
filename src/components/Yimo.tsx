import React from 'react';
import { cn } from '@/lib/utils';

interface YimoProps {
  id: string;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  color: string;
  size: number;
}

const Yimo: React.FC<YimoProps> = ({ x, y, color, size }) => {
  const colors = [
    'bg-yimo-pink',
    'bg-yimo-blue', 
    'bg-yimo-green',
    'bg-yimo-purple',
    'bg-yimo-orange',
    'bg-yimo-yellow'
  ];

  const gradients = [
    'bg-gradient-playful',
    'bg-gradient-cosmic',
    'bg-gradient-sunset'
  ];

  const bgClass = Math.random() > 0.5 ? 
    colors[Math.floor(Math.random() * colors.length)] : 
    gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <div
      className={cn(
        "absolute rounded-full transition-all duration-100 ease-linear",
        "animate-float animate-pulse-glow cursor-pointer",
        "border-2 border-white/30 backdrop-blur-sm",
        "flex items-center justify-center font-bold text-white",
        "hover:animate-wiggle hover:scale-110",
        "shadow-2xl",
        bgClass
      )}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size * 0.3}px`,
        animationDelay: `${Math.random() * 2}s`,
        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
      }}
    >
      <span className="drop-shadow-lg">🌟</span>
    </div>
  );
};

export default Yimo;