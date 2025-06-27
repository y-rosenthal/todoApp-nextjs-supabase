import { useState, useEffect } from "react";
import {
  Achievement,
  UserAchievement,
  Streak,
  GamificationStats,
  ProductivityGoal,
  Leaderboard,
  GamificationState,
  GamificationActions,
  StreakType,
  LeaderboardPeriod,
  DEFAULT_ACHIEVEMENTS,
  AchievementCategory,
  GoalType,
  GoalPeriod
} from "@/types/gamification";

interface UseGamificationReturn extends GamificationState, GamificationActions {}

// Mock data for development
const MOCK_STATS: GamificationStats = {
  total_points: 1250,
  total_achievements: 5,
  current_level: 3,
  tasks_completed_today: 4,
  tasks_completed_this_week: 18,
  tasks_completed_this_month: 67,
  longest_streak: 14,
  current_streak: 7
};

const MOCK_STREAKS: Streak[] = [
  {
    id: "streak-1",
    user_id: "user-1",
    type: StreakType.DAILY_TASKS,
    current_count: 7,
    longest_count: 14,
    last_activity_date: new Date().toISOString(),
    is_active: true,
    freeze_count: 2
  },
  {
    id: "streak-2", 
    user_id: "user-1",
    type: StreakType.WEEKLY_GOALS,
    current_count: 3,
    longest_count: 8,
    last_activity_date: new Date(Date.now() - 86400000).toISOString(),
    is_active: true,
    freeze_count: 1
  }
];

const MOCK_GOALS: ProductivityGoal[] = [
  {
    id: "goal-1",
    user_id: "user-1",
    type: GoalType.TASKS_PER_DAY,
    target_value: 5,
    current_value: 4,
    period: GoalPeriod.DAILY,
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 86400000).toISOString(),
    is_active: true
  },
  {
    id: "goal-2",
    user_id: "user-1", 
    type: GoalType.TASKS_PER_WEEK,
    target_value: 25,
    current_value: 18,
    period: GoalPeriod.WEEKLY,
    start_date: new Date(Date.now() - 6 * 86400000).toISOString(),
    end_date: new Date(Date.now() + 86400000).toISOString(),
    is_active: true
  }
];

const MOCK_LEADERBOARD: Leaderboard[] = [
  {
    user_id: "user-1",
    user_name: "You",
    score: 1250,
    rank: 3,
    period: LeaderboardPeriod.WEEKLY
  },
  {
    user_id: "user-2",
    user_name: "ProductivityGuru",
    score: 1890,
    rank: 1,
    period: LeaderboardPeriod.WEEKLY
  },
  {
    user_id: "user-3",
    user_name: "TaskMaster",
    score: 1567,
    rank: 2,
    period: LeaderboardPeriod.WEEKLY
  }
];

export function useGamification(userId?: string): UseGamificationReturn {
  const [state, setState] = useState<GamificationState>({
    achievements: DEFAULT_ACHIEVEMENTS.map((achievement, index) => ({
      ...achievement,
      id: `achievement-${index + 1}`
    })),
    userAchievements: [
      {
        user_id: "user-1",
        achievement_id: "achievement-1",
        unlocked_at: new Date(Date.now() - 86400000 * 7).toISOString(),
        progress: 100
      },
      {
        user_id: "user-1", 
        achievement_id: "achievement-2",
        unlocked_at: new Date(Date.now() - 86400000 * 3).toISOString(),
        progress: 100
      },
      {
        user_id: "user-1",
        achievement_id: "achievement-3",
        unlocked_at: new Date().toISOString(),
        progress: 100
      }
    ],
    streaks: MOCK_STREAKS,
    stats: MOCK_STATS,
    goals: MOCK_GOALS,
    leaderboard: MOCK_LEADERBOARD,
    isLoading: false,
    error: null
  });

  // Achievement actions
  const checkAchievements = async (userId: string): Promise<void> => {
    console.log("TODO: Implement checkAchievements for user:", userId);
    // This would typically:
    // 1. Get user's task completion data
    // 2. Check against all achievement requirements
    // 3. Unlock any newly earned achievements
    // 4. Update user's achievement progress
  };

  const unlockAchievement = async (userId: string, achievementId: string): Promise<void> => {
    console.log("TODO: Implement unlockAchievement:", { userId, achievementId });
    
    // Mock implementation
    const newUserAchievement: UserAchievement = {
      user_id: userId,
      achievement_id: achievementId,
      unlocked_at: new Date().toISOString(),
      progress: 100
    };
    
    setState(prev => ({
      ...prev,
      userAchievements: [...prev.userAchievements, newUserAchievement],
      stats: {
        ...prev.stats,
        total_achievements: prev.stats.total_achievements + 1,
        total_points: prev.stats.total_points + 100 // Mock points
      }
    }));
  };

  // Streak actions
  const updateStreak = async (userId: string, streakType: StreakType): Promise<void> => {
    console.log("TODO: Implement updateStreak:", { userId, streakType });
    
    // Mock implementation
    setState(prev => ({
      ...prev,
      streaks: prev.streaks.map(streak => 
        streak.user_id === userId && streak.type === streakType
          ? {
              ...streak,
              current_count: streak.current_count + 1,
              longest_count: Math.max(streak.longest_count, streak.current_count + 1),
              last_activity_date: new Date().toISOString()
            }
          : streak
      )
    }));
  };

  const freezeStreak = async (userId: string, streakId: string): Promise<void> => {
    console.log("TODO: Implement freezeStreak:", { userId, streakId });
    
    // Mock implementation
    setState(prev => ({
      ...prev,
      streaks: prev.streaks.map(streak =>
        streak.id === streakId && streak.freeze_count > 0
          ? { ...streak, freeze_count: streak.freeze_count - 1 }
          : streak
      )
    }));
  };

  // Goal actions
  const createGoal = async (goal: Omit<ProductivityGoal, 'id' | 'current_value'>): Promise<void> => {
    console.log("TODO: Implement createGoal:", goal);
    
    // Mock implementation
    const newGoal: ProductivityGoal = {
      ...goal,
      id: `goal-${Date.now()}`,
      current_value: 0
    };
    
    setState(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }));
  };

  const updateGoalProgress = async (goalId: string, progress: number): Promise<void> => {
    console.log("TODO: Implement updateGoalProgress:", { goalId, progress });
    
    // Mock implementation
    setState(prev => ({
      ...prev,
      goals: prev.goals.map(goal =>
        goal.id === goalId
          ? { ...goal, current_value: progress }
          : goal
      )
    }));
  };

  // Stats actions
  const refreshStats = async (userId: string): Promise<void> => {
    console.log("TODO: Implement refreshStats for user:", userId);
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Mock loading delay
    setTimeout(() => {
      setState(prev => ({ ...prev, isLoading: false }));
    }, 1000);
  };

  // Leaderboard actions
  const getLeaderboard = async (period: LeaderboardPeriod): Promise<void> => {
    console.log("TODO: Implement getLeaderboard for period:", period);
    
    // Mock implementation - filter by period
    const filteredLeaderboard = MOCK_LEADERBOARD.map(entry => ({
      ...entry,
      period
    }));
    
    setState(prev => ({
      ...prev,
      leaderboard: filteredLeaderboard
    }));
  };

  // Helper functions for components
  const getUnlockedAchievements = () => {
    return state.userAchievements.map(ua => 
      state.achievements.find(a => a.id === ua.achievement_id)
    ).filter(Boolean) as Achievement[];
  };

  const getAchievementProgress = (achievementId: string): number => {
    const userAchievement = state.userAchievements.find(ua => ua.achievement_id === achievementId);
    return userAchievement?.progress || 0;
  };

  const getCurrentLevel = (): number => {
    // Simple level calculation based on points
    return Math.floor(state.stats.total_points / 500) + 1;
  };

  const getPointsToNextLevel = (): number => {
    const currentLevel = getCurrentLevel();
    const pointsForNextLevel = currentLevel * 500;
    return pointsForNextLevel - state.stats.total_points;
  };

  // Initialize data on mount
  useEffect(() => {
    if (userId) {
      refreshStats(userId);
    }
  }, [userId]);

  return {
    // State
    ...state,
    
    // Actions
    checkAchievements,
    unlockAchievement,
    updateStreak,
    freezeStreak,
    createGoal,
    updateGoalProgress,
    refreshStats,
    getLeaderboard,
    
    // Helper functions (extending the interface)
    getUnlockedAchievements,
    getAchievementProgress,
    getCurrentLevel,
    getPointsToNextLevel
  } as UseGamificationReturn & {
    getUnlockedAchievements: () => Achievement[];
    getAchievementProgress: (achievementId: string) => number;
    getCurrentLevel: () => number;
    getPointsToNextLevel: () => number;
  };
}