// Gamification & Productivity Streaks Types
// PIX-20: Gamification & Productivity Streaks Implementation

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  requirement: AchievementRequirement;
  points: number;
  rarity: AchievementRarity;
  unlockedAt?: string;
}

export interface UserAchievement {
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
  progress?: number;
}

export interface Streak {
  id: string;
  user_id: string;
  type: StreakType;
  current_count: number;
  longest_count: number;
  last_activity_date: string;
  is_active: boolean;
  freeze_count: number; // Number of freeze tokens available
}

export interface StreakFreeze {
  id: string;
  user_id: string;
  streak_id: string;
  freeze_date: string;
  reason?: string;
}

export interface GamificationStats {
  total_points: number;
  total_achievements: number;
  current_level: number;
  tasks_completed_today: number;
  tasks_completed_this_week: number;
  tasks_completed_this_month: number;
  longest_streak: number;
  current_streak: number;
}

export interface ProductivityGoal {
  id: string;
  user_id: string;
  type: GoalType;
  target_value: number;
  current_value: number;
  period: GoalPeriod;
  start_date: string;
  end_date: string;
  is_active: boolean;
  reward_achievement_id?: string;
}

export interface Leaderboard {
  user_id: string;
  user_name: string;
  user_avatar?: string;
  score: number;
  rank: number;
  period: LeaderboardPeriod;
}

// Enums
export enum AchievementCategory {
  TASKS = "tasks",
  STREAKS = "streaks", 
  PRODUCTIVITY = "productivity",
  SOCIAL = "social",
  MILESTONES = "milestones"
}

export enum AchievementRarity {
  COMMON = "common",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary"
}

export enum StreakType {
  DAILY_TASKS = "daily_tasks",
  WEEKLY_GOALS = "weekly_goals",
  TASK_COMPLETION = "task_completion",
  LOGIN = "login"
}

export enum GoalType {
  TASKS_PER_DAY = "tasks_per_day",
  TASKS_PER_WEEK = "tasks_per_week",
  TASKS_PER_MONTH = "tasks_per_month",
  STREAK_DAYS = "streak_days",
  PRODUCTIVITY_HOURS = "productivity_hours"
}

export enum GoalPeriod {
  DAILY = "daily",
  WEEKLY = "weekly", 
  MONTHLY = "monthly",
  YEARLY = "yearly"
}

export enum LeaderboardPeriod {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  ALL_TIME = "all_time"
}

// Achievement Requirements (flexible system)
export interface AchievementRequirement {
  type: "task_count" | "streak_days" | "consecutive_days" | "label_variety" | "speed_completion";
  value: number;
  conditions?: {
    label?: string;
    time_limit?: number; // in minutes
    consecutive?: boolean;
  };
}

// Gamification State Management
export interface GamificationState {
  achievements: Achievement[];
  userAchievements: UserAchievement[];
  streaks: Streak[];
  stats: GamificationStats;
  goals: ProductivityGoal[];
  leaderboard: Leaderboard[];
  isLoading: boolean;
  error: string | null;
}

export interface GamificationActions {
  // Achievement actions
  checkAchievements: (userId: string) => Promise<void>;
  unlockAchievement: (userId: string, achievementId: string) => Promise<void>;
  
  // Streak actions
  updateStreak: (userId: string, streakType: StreakType) => Promise<void>;
  freezeStreak: (userId: string, streakId: string) => Promise<void>;
  
  // Goal actions
  createGoal: (goal: Omit<ProductivityGoal, 'id' | 'current_value'>) => Promise<void>;
  updateGoalProgress: (goalId: string, progress: number) => Promise<void>;
  
  // Stats actions
  refreshStats: (userId: string) => Promise<void>;
  
  // Leaderboard actions
  getLeaderboard: (period: LeaderboardPeriod) => Promise<void>;
}

// Predefined Achievements
export const DEFAULT_ACHIEVEMENTS: Omit<Achievement, 'id'>[] = [
  {
    name: "First Steps",
    description: "Complete your first task",
    icon: "🎯",
    category: AchievementCategory.TASKS,
    requirement: { type: "task_count", value: 1 },
    points: 10,
    rarity: AchievementRarity.COMMON
  },
  {
    name: "Getting Started",
    description: "Complete 10 tasks",
    icon: "📋",
    category: AchievementCategory.TASKS,
    requirement: { type: "task_count", value: 10 },
    points: 50,
    rarity: AchievementRarity.COMMON
  },
  {
    name: "Productivity Master",
    description: "Complete 100 tasks",
    icon: "⚡",
    category: AchievementCategory.TASKS,
    requirement: { type: "task_count", value: 100 },
    points: 500,
    rarity: AchievementRarity.RARE
  },
  {
    name: "Streak Starter",
    description: "Maintain a 7-day task completion streak",
    icon: "🔥",
    category: AchievementCategory.STREAKS,
    requirement: { type: "streak_days", value: 7 },
    points: 100,
    rarity: AchievementRarity.COMMON
  },
  {
    name: "Consistency Champion",
    description: "Maintain a 30-day task completion streak",
    icon: "👑",
    category: AchievementCategory.STREAKS,
    requirement: { type: "streak_days", value: 30 },
    points: 1000,
    rarity: AchievementRarity.EPIC
  },
  {
    name: "Speed Demon",
    description: "Complete 5 tasks in under 30 minutes",
    icon: "⚡",
    category: AchievementCategory.PRODUCTIVITY,
    requirement: { 
      type: "speed_completion", 
      value: 5,
      conditions: { time_limit: 30 }
    },
    points: 200,
    rarity: AchievementRarity.RARE
  },
  {
    name: "Well Organized",
    description: "Use 5 different task labels in a single day",
    icon: "🗂️",
    category: AchievementCategory.PRODUCTIVITY,
    requirement: { type: "label_variety", value: 5 },
    points: 150,
    rarity: AchievementRarity.RARE
  }
];