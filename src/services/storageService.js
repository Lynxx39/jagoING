// Local Storage & User State Management Service

const STORAGE_KEY = 'jagoin_user_data_v1';

export const RANKS = [
  { level: 1, title: 'Novice Scout', minXP: 0, badge: '🌱' },
  { level: 2, title: 'Curious Explorer', minXP: 100, badge: '🧭' },
  { level: 3, title: 'Vocabulary Apprentice', minXP: 250, badge: '📜' },
  { level: 4, title: 'Grammar Knight', minXP: 500, badge: '🛡️' },
  { level: 5, title: 'Listening Ninja', minXP: 850, badge: '🎧' },
  { level: 6, title: 'Fluent Speaker', minXP: 1300, badge: '🗣️' },
  { level: 7, title: 'Master Linguist', minXP: 1900, badge: '🔮' },
  { level: 8, title: 'Grandmaster Scholar', minXP: 2700, badge: '👑' },
];

export const INITIAL_ACHIEVEMENTS = [
  { id: 'first_step', title: 'Langkah Pertama', desc: 'Selesaikan latihan pertama kamu', icon: '🎯', unlocked: false, xpReward: 50 },
  { id: 'streak_3', title: 'Membara 3 Hari', desc: 'Pertahankan 3 hari streak belajar', icon: '🔥', unlocked: false, xpReward: 100 },
  { id: 'flashcard_master', title: 'Master Flashcard', desc: 'Hafalkan 10 kosakata SRS', icon: '🧠', unlocked: false, xpReward: 75 },
  { id: 'listening_pro', title: 'Telinga Tajam', desc: 'Dapatkan skor 100% pada Listening Lab', icon: '👂', unlocked: false, xpReward: 80 },
  { id: 'exam_champion', title: 'Juara Mock Exam', desc: 'Selesaikan Mock Exam dengan nilai > 80', icon: '🏆', unlocked: false, xpReward: 150 },
  { id: 'voice_speaker', title: 'Pemberani Suara', desc: 'Gunakan Speech Coach 5 kali', icon: '🎙️', unlocked: false, xpReward: 90 },
  { id: 'roleplay_star', title: 'Bintang Percakapan', desc: 'Selesaikan 1 sesi AI Roleplay', icon: '💬', unlocked: false, xpReward: 85 },
];

export const INITIAL_DAILY_QUESTS = [
  { id: 'q_vocab', title: 'Review 5 Flashcards', target: 5, current: 0, completed: false, xp: 30 },
  { id: 'q_listening', title: 'Selesaikan 1 Sesi Listening', target: 1, current: 0, completed: false, xp: 40 },
  { id: 'q_grammar', title: 'Selesaikan 1 Topik Grammar', target: 1, current: 0, completed: false, xp: 35 },
  { id: 'q_exam', title: 'Kerjakan Kuis Cepat / Mock Exam', target: 1, current: 0, completed: false, xp: 50 }
];

export function getStoredUserData() {
  if (typeof window === 'undefined') return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultUserData();

    const data = JSON.parse(raw);
    // Update streak check
    checkAndUpdateStreak(data);
    return data;
  } catch (e) {
    console.error('Error loading stored user data:', e);
    return getDefaultUserData();
  }
}

export function saveUserData(data) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving user data:', e);
  }
}

export function getDefaultUserData() {
  const today = new Date().toISOString().split('T')[0];
  return {
    name: 'Pelajar Pintar',
    selectedLevel: 'SMP', // 'SD', 'SMP', 'SMA'
    xp: 60,
    streak: 1,
    lastActiveDate: today,
    freezeCount: 1,
    achievements: INITIAL_ACHIEVEMENTS,
    dailyQuests: INITIAL_DAILY_QUESTS,
    soundEnabled: true,
    darkMode: true,
    srsCards: {},
    examHistory: [],
    completedGrammarTopics: [],
    studyTimeSeconds: 120
  };
}

function checkAndUpdateStreak(data) {
  const today = new Date().toISOString().split('T')[0];
  const lastActive = data.lastActiveDate;

  if (lastActive === today) return;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (lastActive === yesterdayStr) {
    data.streak += 1;
    data.lastActiveDate = today;
  } else {
    // Missed a day
    if (data.freezeCount > 0) {
      data.freezeCount -= 1; // Protected by freeze
      data.lastActiveDate = today;
    } else {
      data.streak = 1;
      data.lastActiveDate = today;
    }
  }

  // Reset daily quests if it's a new day
  data.dailyQuests = INITIAL_DAILY_QUESTS.map(q => ({ ...q, current: 0, completed: false }));
}

export function calculateRank(xp) {
  let currentRank = RANKS[0];
  let nextRank = RANKS[1];

  for (let i = 0; i < RANKS.length; i++) {
    if (xp >= RANKS[i].minXP) {
      currentRank = RANKS[i];
      nextRank = RANKS[i + 1] || null;
    }
  }

  const currentLevelMin = currentRank.minXP;
  const nextLevelMin = nextRank ? nextRank.minXP : currentRank.minXP + 1000;
  const progressPercent = Math.min(
    100,
    Math.round(((xp - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100)
  );

  return {
    currentRank,
    nextRank,
    progressPercent,
    xpToNext: nextRank ? nextRank.minXP - xp : 0
  };
}
