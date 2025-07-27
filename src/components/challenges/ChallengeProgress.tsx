import React from 'react';
import { UserProgress } from '@/types/challenges';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ChallengeProgressProps {
  userProgress: UserProgress;
}

export const ChallengeProgress: React.FC<ChallengeProgressProps> = ({ userProgress }) => {
  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return '🔥🔥🔥';
    if (streak >= 14) return '🔥🔥';
    if (streak >= 7) return '🔥';
    if (streak >= 3) return '⭐';
    if (streak >= 1) return '✨';
    return '🌱';
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border border-border/50 p-4">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          🧠 Mental Wellness Progress
        </h3>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">Challenges Completed</p>
            <p className="text-2xl font-bold text-primary">
              {userProgress.totalChallengesCompleted}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-muted-foreground">Daily Streak</p>
            <p className="text-2xl font-bold text-orange-500 flex items-center gap-1">
              {userProgress.streakDays}
              <span className="text-lg">{getStreakEmoji(userProgress.streakDays)}</span>
            </p>
          </div>
        </div>

        {userProgress.streakDays >= 3 && (
          <div className="flex flex-wrap gap-1">
            {userProgress.streakDays >= 7 && (
              <Badge variant="secondary" className="text-xs">
                🌟 Week Warrior
              </Badge>
            )}
            {userProgress.streakDays >= 14 && (
              <Badge variant="secondary" className="text-xs">
                💎 Mindful Master
              </Badge>
            )}
            {userProgress.streakDays >= 30 && (
              <Badge variant="secondary" className="text-xs">
                🏆 Wellness Champion
              </Badge>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          {userProgress.lastCompletedDate && (
            <p>Last challenge: {userProgress.lastCompletedDate.toLocaleDateString()}</p>
          )}
        </div>
      </div>
    </Card>
  );
};