import React, { useState, useEffect } from 'react';
import { Challenge } from '@/types/challenges';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ChallengeModalProps {
  challenge: Challenge | null;
  isOpen: boolean;
  onComplete: (response: string) => void;
  onSkip: () => void;
  onClose: () => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  challenge,
  isOpen,
  onComplete,
  onSkip,
  onClose
}) => {
  const [response, setResponse] = useState('');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!challenge?.timeLimit || !isOpen) return;

    setTimeLeft(challenge.timeLimit);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [challenge?.timeLimit, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setResponse('');
    }
  }, [isOpen]);

  if (!isOpen || !challenge) return null;

  const handleComplete = () => {
    if (response.trim()) {
      onComplete(response);
      setResponse('');
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getChallengeTypeColor = (type: Challenge['type']) => {
    switch (type) {
      case 'gratitude': return 'border-yimo-pink';
      case 'mindfulness': return 'border-yimo-blue';
      case 'kindness': return 'border-yimo-purple';
      case 'selfcare': return 'border-yimo-orange';
      case 'affirmation': return 'border-yimo-green';
      default: return 'border-primary';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className={cn(
        "w-full max-w-md bg-card/95 backdrop-blur-md border-2 animate-scale-in",
        getChallengeTypeColor(challenge.type)
      )}>
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="text-4xl mb-2">{challenge.icon}</div>
            <h2 className="text-xl font-bold text-foreground">{challenge.title}</h2>
            <p className="text-sm text-muted-foreground">{challenge.description}</p>
            {timeLeft !== null && timeLeft > 0 && (
              <div className="text-primary font-mono text-lg">
                ⏰ {formatTime(timeLeft)}
              </div>
            )}
          </div>

          {/* Challenge Prompt */}
          <div className="space-y-3">
            <p className="text-foreground font-medium">{challenge.prompt}</p>
            
            {challenge.type !== 'mindfulness' || !challenge.timeLimit ? (
              <Textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Share your thoughts here..."
                className="min-h-[100px] resize-none"
                disabled={timeLeft === 0}
              />
            ) : (
              <div className="text-center p-8 space-y-4">
                <div className="text-6xl animate-pulse">🫁</div>
                <p className="text-muted-foreground">
                  Focus on your breathing...
                </p>
                {timeLeft === 0 && (
                  <Textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="How do you feel after this breathing exercise?"
                    className="min-h-[80px] resize-none animate-fade-in"
                  />
                )}
              </div>
            )}
          </div>

          {/* Reward Info */}
          <div className="text-center p-3 bg-primary/10 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Complete this challenge to spawn{' '}
              <span className="font-bold text-primary">{challenge.yimoReward} new Yimo{challenge.yimoReward > 1 ? 's' : ''}</span>! 🌟
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onSkip}
              className="flex-1"
            >
              Skip
            </Button>
            <Button
              onClick={handleComplete}
              disabled={!response.trim() && (challenge.type !== 'mindfulness' || timeLeft !== 0)}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Complete (+{challenge.yimoReward} Yimos)
            </Button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>
      </Card>
    </div>
  );
};