"use client";

import { useGamification } from "@/hooks/useGamification";
import AchievementBadge from "@/components/gamification/AchievementBadge";
import StreakDisplay from "@/components/gamification/StreakDisplay";
import ProgressChart from "@/components/gamification/ProgressChart";
import LevelProgress from "@/components/gamification/LevelProgress";
import { GoalType } from "@/types/gamification";

export default function GamificationPage() {
  const {
    achievements,
    userAchievements,
    streaks,
    stats,
    goals,
    leaderboard,
    isLoading,
    freezeStreak,
    getUnlockedAchievements,
    getAchievementProgress,
    getCurrentLevel,
    getPointsToNextLevel
  } = useGamification("user-1");

  const unlockedAchievements = getUnlockedAchievements();
  const currentLevel = getCurrentLevel();
  const pointsToNextLevel = getPointsToNextLevel();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-40 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎮 Gamification Dashboard
          </h1>
          <p className="text-gray-600">
            Track your achievements, streaks, and productivity progress
          </p>
        </div>

        {/* Level Progress - Full Width */}
        <div className="mb-8">
          <LevelProgress
            currentLevel={currentLevel}
            totalPoints={stats.total_points}
            pointsToNextLevel={pointsToNextLevel}
          />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.total_achievements}
                </div>
                <div className="text-sm text-gray-600">Achievements</div>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-white rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔥</span>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.current_streak}
                </div>
                <div className="text-sm text-gray-600">Current Streak</div>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-white rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📅</span>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.tasks_completed_today}
                </div>
                <div className="text-sm text-gray-600">Tasks Today</div>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-white rounded-lg border shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.tasks_completed_this_month}
                </div>
                <div className="text-sm text-gray-600">This Month</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Achievements & Goals */}
          <div className="lg:col-span-2 space-y-8">
            {/* Achievements Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                🏆 Achievements
              </h2>
              
              {/* Recent Achievements */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Recently Unlocked
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {unlockedAchievements.slice(0, 4).map((achievement) => (
                    <AchievementBadge
                      key={achievement.id}
                      achievement={achievement}
                      isUnlocked={true}
                      size="md"
                    />
                  ))}
                </div>
              </div>

              {/* All Achievements Grid */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  All Achievements ({unlockedAchievements.length}/{achievements.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {achievements.map((achievement) => {
                    const isUnlocked = userAchievements.some(
                      ua => ua.achievement_id === achievement.id
                    );
                    const progress = getAchievementProgress(achievement.id);
                    
                    return (
                      <AchievementBadge
                        key={achievement.id}
                        achievement={achievement}
                        isUnlocked={isUnlocked}
                        progress={progress}
                        showProgress={!isUnlocked && progress > 0}
                        size="sm"
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Goals Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                🎯 Current Goals
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.filter(goal => goal.is_active).map((goal) => {
                  const getGoalColor = (type: GoalType) => {
                    switch (type) {
                      case GoalType.TASKS_PER_DAY: return "blue";
                      case GoalType.TASKS_PER_WEEK: return "green";
                      case GoalType.TASKS_PER_MONTH: return "purple";
                      default: return "orange";
                    }
                  };

                  const getGoalIcon = (type: GoalType) => {
                    switch (type) {
                      case GoalType.TASKS_PER_DAY: return "📅";
                      case GoalType.TASKS_PER_WEEK: return "📊";
                      case GoalType.TASKS_PER_MONTH: return "🗓️";
                      default: return "🎯";
                    }
                  };

                  return (
                    <ProgressChart
                      key={goal.id}
                      current={goal.current_value}
                      target={goal.target_value}
                      label={goal.type.replace(/_/g, ' ').toUpperCase()}
                      icon={getGoalIcon(goal.type)}
                      color={getGoalColor(goal.type) as any}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Streaks & Leaderboard */}
          <div className="space-y-8">
            {/* Streaks Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                🔥 Streaks
              </h2>
              <div className="space-y-4">
                {streaks.map((streak) => (
                  <StreakDisplay
                    key={streak.id}
                    streak={streak}
                    onFreeze={freezeStreak}
                    compact={true}
                  />
                ))}
              </div>
            </div>

            {/* Leaderboard Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                🏅 Weekly Leaderboard
              </h2>
              <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                {leaderboard.map((entry, index) => (
                  <div
                    key={entry.user_id}
                    className={`flex items-center gap-3 p-4 border-b last:border-b-0 ${
                      entry.user_id === "user-1" ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 font-semibold text-sm">
                      {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : entry.rank}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        {entry.user_name}
                        {entry.user_id === "user-1" && (
                          <span className="text-blue-600 text-sm ml-1">(You)</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {entry.score.toLocaleString()} points
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 p-6 bg-white rounded-lg border text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Keep up the great work! 🚀
          </h3>
          <p className="text-gray-600">
            Complete more tasks to unlock achievements, maintain streaks, and climb the leaderboard.
          </p>
        </div>
      </div>
    </div>
  );
}