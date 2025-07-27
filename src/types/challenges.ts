export interface Challenge {
  id: string;
  type: 'gratitude' | 'mindfulness' | 'kindness' | 'selfcare' | 'affirmation';
  title: string;
  description: string;
  prompt: string;
  icon: string;
  color: string;
  yimoReward: number; // How many yimos this challenge spawns
  timeLimit?: number; // Optional time limit in seconds
}

export interface ChallengeProgress {
  challengeId: string;
  completed: boolean;
  completedAt?: Date;
  userResponse?: string;
}

export interface UserProgress {
  totalChallengesCompleted: number;
  streakDays: number;
  lastCompletedDate?: Date;
  completedChallenges: ChallengeProgress[];
}