import React, { useState, useEffect, useCallback, useRef } from 'react';
import Yimo from './Yimo';

interface YimoData {
  id: string;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  color: string;
  size: number;
}

const YimoPlayground: React.FC = () => {
  const [yimos, setYimos] = useState<YimoData[]>([]);
  const [isActive, setIsActive] = useState(false);
  const animationRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  const createYimo = useCallback((x?: number, y?: number): YimoData => {
    const colors = ['pink', 'blue', 'green', 'purple', 'orange', 'yellow'];
    const size = Math.random() * 40 + 30; // 30-70px
    
    return {
      id: `yimo-${Date.now()}-${Math.random()}`,
      x: x ?? Math.random() * (window.innerWidth - size),
      y: y ?? Math.random() * (window.innerHeight - size),
      velocityX: (Math.random() - 0.5) * 4, // -2 to 2
      velocityY: (Math.random() - 0.5) * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      size
    };
  }, []);

  const spawnInitialYimo = useCallback(() => {
    const initialYimo = createYimo(
      window.innerWidth / 2,
      window.innerHeight / 2
    );
    setYimos([initialYimo]);
    setIsActive(true);
  }, [createYimo]);

  const updateYimos = useCallback(() => {
    setYimos(prevYimos => {
      const newYimos: YimoData[] = [];
      
      prevYimos.forEach(yimo => {
        let newX = yimo.x + yimo.velocityX;
        let newY = yimo.y + yimo.velocityY;
        let newVelocityX = yimo.velocityX;
        let newVelocityY = yimo.velocityY;
        let shouldSpawn = false;

        // Check collision with edges and spawn new yimos
        if (newX <= 0 || newX >= window.innerWidth - yimo.size) {
          newVelocityX = -newVelocityX;
          newX = newX <= 0 ? 0 : window.innerWidth - yimo.size;
          shouldSpawn = true;
        }
        
        if (newY <= 0 || newY >= window.innerHeight - yimo.size) {
          newVelocityY = -newVelocityY;
          newY = newY <= 0 ? 0 : window.innerHeight - yimo.size;
          shouldSpawn = true;
        }

        // Add the bounced yimo
        newYimos.push({
          ...yimo,
          x: newX,
          y: newY,
          velocityX: newVelocityX,
          velocityY: newVelocityY
        });

        // Spawn new yimo on collision (but limit total count)
        if (shouldSpawn && newYimos.length < 50) {
          const spawnedYimo = createYimo();
          newYimos.push(spawnedYimo);
        }
      });

      return newYimos;
    });
  }, [createYimo]);

  useEffect(() => {
    if (isActive) {
      const animate = () => {
        updateYimos();
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, updateYimos]);

  const resetPlayground = () => {
    setYimos([]);
    setIsActive(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleYimoClick = (clickedYimo: YimoData) => {
    // Create a burst of new yimos around the clicked one
    const burstCount = 3;
    const newYimos: YimoData[] = [];
    
    for (let i = 0; i < burstCount; i++) {
      const angle = (i / burstCount) * Math.PI * 2;
      const distance = 100;
      const newYimo = createYimo(
        clickedYimo.x + Math.cos(angle) * distance,
        clickedYimo.y + Math.sin(angle) * distance
      );
      newYimos.push(newYimo);
    }
    
    setYimos(prev => [...prev, ...newYimos]);
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-background overflow-hidden"
      style={{ userSelect: 'none' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--yimo-pink)) 0%, transparent 50%), 
                             radial-gradient(circle at 80% 20%, hsl(var(--yimo-blue)) 0%, transparent 50%), 
                             radial-gradient(circle at 40% 80%, hsl(var(--yimo-green)) 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Controls */}
      <div className="absolute top-8 left-8 z-50 space-y-4">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border/50">
          <h1 className="text-2xl font-bold bg-gradient-playful bg-clip-text text-transparent mb-2">
            Yimo Playground
          </h1>
          <p className="text-muted-foreground text-sm mb-4">
            Watch yimos multiply when they hit screen edges!
          </p>
          <div className="flex gap-2">
            {!isActive ? (
              <button
                onClick={spawnInitialYimo}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors animate-pulse-glow"
              >
                Start Playing! 🚀
              </button>
            ) : (
              <button
                onClick={resetPlayground}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
              >
                Reset 🔄
              </button>
            )}
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Yimos active: <span className="font-bold text-foreground">{yimos.length}</span>
          </div>
        </div>
      </div>

      {/* Yimos */}
      {yimos.map((yimo) => (
        <div 
          key={yimo.id}
          onClick={() => handleYimoClick(yimo)}
          className="animate-bounce-in"
        >
          <Yimo {...yimo} />
        </div>
      ))}

      {/* Instructions */}
      {yimos.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-float">
            <div className="text-6xl mb-4 animate-wiggle">🌟</div>
            <h2 className="text-3xl font-bold bg-gradient-cosmic bg-clip-text text-transparent mb-2">
              Welcome to Yimo World!
            </h2>
            <p className="text-muted-foreground">
              Click "Start Playing" to begin the magical multiplication
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default YimoPlayground;