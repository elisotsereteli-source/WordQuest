export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export const ALL_BADGES: Badge[] = [
  {
    id: 'first_quest',
    name: 'First Expedition',
    description: 'Complete your first vocabulary quest.',
    icon: '🧭',
  },
  {
    id: 'a1_cleared',
    name: 'Wayfarer (A1)',
    description: 'Master the Travel Quest in Voyager\'s Bay.',
    icon: '🏝️',
  },
  {
    id: 'a2_cleared',
    name: 'Conversationalist (A2)',
    description: 'Conquer Daily Conversation in Sunlit Commons.',
    icon: '🏡',
  },
  {
    id: 'b1_cleared',
    name: 'Guild Master (B1)',
    description: 'Master Business and Work in Merchant\'s Reach.',
    icon: '🏛️',
  },
  {
    id: 'b2_cleared',
    name: 'Cyber Specialist (B2)',
    description: 'Overcome the Technology Quest atop Silicon Spire.',
    icon: '⚡',
  },
  {
    id: 'c1_cleared',
    name: 'Grand Savant (C1)',
    description: 'Solve Nature and Science inside Cosmic Caldera.',
    icon: '🌌',
  },
  {
    id: 'word_master',
    name: 'Lexicon Champion',
    description: 'Master 30 or more vocabulary words across the archipelago.',
    icon: '👑',
  },
  {
    id: 'storyteller',
    name: 'Grand Chronicler',
    description: 'Successfully complete any Quest Story challenge.',
    icon: '📜',
  },
  {
    id: 'perfectionist',
    name: 'Flawless Seeker',
    description: 'Score 100% on any challenge without making a single error.',
    icon: '⭐',
  },
  {
    id: 'xp_hunter',
    name: 'Treasury of Knowledge',
    description: 'Accumulate over 500 XP points in your adventure.',
    icon: '💎',
  },
];

export interface PlayerProgress {
  playerName: string;
  avatar: string;
  xp: number;
  completedQuests: number;
  highScore: number;
  masteredWords: string[];
  unlockedBadges: string[];
  soundEnabled: boolean;
  unlockedQuestIds: string[];
  completedQuestIds: string[];
  activeQuestId: string;
}

const STORAGE_KEY = 'wordquest_player_progress_v2';

const DEFAULT_PROGRESS: PlayerProgress = {
  playerName: 'Valiant Explorer',
  avatar: '🧭',
  xp: 120, // Starter XP to get moving
  completedQuests: 0,
  highScore: 0,
  masteredWords: [],
  unlockedBadges: [],
  soundEnabled: true,
  unlockedQuestIds: ['quest-travel'], // Travel (A1) unlocked by default!
  completedQuestIds: [],
  activeQuestId: 'quest-travel',
};

export function getRankTitle(level: number): string {
  if (level <= 1) return 'Novice Explorer';
  if (level === 2) return 'A1 Wayfarer';
  if (level === 3) return 'A2 Communicator';
  if (level === 4) return 'B1 Strategist';
  if (level === 5) return 'B2 Tech Pioneer';
  if (level === 6) return 'C1 Master Savant';
  return 'Legend of WordQuest';
}

export function calculateLevel(xp: number): {
  level: number;
  currentLevelXp: number;
  xpForNextLevel: number;
  progressPercent: number;
  rankTitle: string;
} {
  const XP_PER_LEVEL = 150;
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const currentLevelXp = xp % XP_PER_LEVEL;
  const xpForNextLevel = XP_PER_LEVEL;
  const progressPercent = Math.min(100, Math.round((currentLevelXp / xpForNextLevel) * 100));
  const rankTitle = getRankTitle(level);

  return {
    level,
    currentLevelXp,
    xpForNextLevel,
    progressPercent,
    rankTitle,
  };
}

export function loadProgress(): PlayerProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      masteredWords: Array.isArray(parsed.masteredWords) ? parsed.masteredWords : [],
      unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : [],
      unlockedQuestIds: Array.isArray(parsed.unlockedQuestIds) && parsed.unlockedQuestIds.length > 0
        ? parsed.unlockedQuestIds
        : ['quest-travel'],
      completedQuestIds: Array.isArray(parsed.completedQuestIds) ? parsed.completedQuestIds : [],
      activeQuestId: parsed.activeQuestId || 'quest-travel',
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: PlayerProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save progress to localStorage', err);
  }
}

export function resetProgress(): PlayerProgress {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore error
  }
  return DEFAULT_PROGRESS;
}
