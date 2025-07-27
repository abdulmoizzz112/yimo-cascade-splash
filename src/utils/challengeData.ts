import { Challenge } from '@/types/challenges';

export const MENTAL_HEALTH_CHALLENGES: Challenge[] = [
  // Gratitude Challenges
  {
    id: 'gratitude-1',
    type: 'gratitude',
    title: 'Three Good Things',
    description: 'List three things you\'re grateful for today',
    prompt: 'What are three things that made you smile or feel grateful today?',
    icon: '🙏',
    color: 'bg-gradient-cosmic',
    yimoReward: 3
  },
  {
    id: 'gratitude-2',
    type: 'gratitude',
    title: 'People Appreciation',
    description: 'Think of someone who made your day better',
    prompt: 'Who is someone in your life you appreciate? What did they do that made a difference?',
    icon: '💝',
    color: 'bg-yimo-pink',
    yimoReward: 2
  },

  // Mindfulness Challenges
  {
    id: 'mindfulness-1',
    type: 'mindfulness',
    title: '5-4-3-2-1 Grounding',
    description: 'Ground yourself using your senses',
    prompt: 'Name: 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste',
    icon: '🧘',
    color: 'bg-yimo-green',
    yimoReward: 5
  },
  {
    id: 'mindfulness-2',
    type: 'mindfulness',
    title: 'Breathing Space',
    description: 'Take 10 deep breaths mindfully',
    prompt: 'Take 10 slow, deep breaths. Focus only on your breathing. How do you feel now?',
    icon: '🌬️',
    color: 'bg-yimo-blue',
    yimoReward: 2,
    timeLimit: 60
  },

  // Kindness Challenges
  {
    id: 'kindness-1',
    type: 'kindness',
    title: 'Random Act of Kindness',
    description: 'Do something kind for someone else',
    prompt: 'What kind act did you do today? It can be as simple as a smile or holding a door!',
    icon: '💖',
    color: 'bg-gradient-playful',
    yimoReward: 4
  },
  {
    id: 'kindness-2',
    type: 'kindness',
    title: 'Self-Compassion',
    description: 'Be kind to yourself',
    prompt: 'What would you say to comfort a good friend? Now say those same words to yourself.',
    icon: '🤗',
    color: 'bg-yimo-purple',
    yimoReward: 3
  },

  // Self-Care Challenges
  {
    id: 'selfcare-1',
    type: 'selfcare',
    title: 'Digital Detox',
    description: 'Take a 15-minute break from screens',
    prompt: 'How did you spend your screen-free time? What did you notice?',
    icon: '📱❌',
    color: 'bg-yimo-orange',
    yimoReward: 3,
    timeLimit: 900 // 15 minutes
  },
  {
    id: 'selfcare-2',
    type: 'selfcare',
    title: 'Move Your Body',
    description: 'Do any physical activity for 5 minutes',
    prompt: 'What movement did you do? How does your body feel now?',
    icon: '🏃‍♀️',
    color: 'bg-yimo-yellow',
    yimoReward: 2
  },

  // Affirmation Challenges
  {
    id: 'affirmation-1',
    type: 'affirmation',
    title: 'Personal Strength',
    description: 'Identify one of your strengths',
    prompt: 'What is one thing you like about yourself? Describe a time when this strength helped you.',
    icon: '💪',
    color: 'bg-gradient-sunset',
    yimoReward: 2
  },
  {
    id: 'affirmation-2',
    type: 'affirmation',
    title: 'Progress Celebration',
    description: 'Acknowledge your growth',
    prompt: 'What is something you\'ve improved at recently, no matter how small?',
    icon: '🌟',
    color: 'bg-yimo-green',
    yimoReward: 3
  }
];

export const getRandomChallenge = (): Challenge => {
  const randomIndex = Math.floor(Math.random() * MENTAL_HEALTH_CHALLENGES.length);
  return MENTAL_HEALTH_CHALLENGES[randomIndex];
};

export const getChallengeByType = (type: Challenge['type']): Challenge[] => {
  return MENTAL_HEALTH_CHALLENGES.filter(challenge => challenge.type === type);
};