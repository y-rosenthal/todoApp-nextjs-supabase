interface LevelProgressProps {
  currentLevel: number;
  totalPoints: number;
  pointsToNextLevel: number;
  compact?: boolean;
}

const LevelProgress = ({
  currentLevel,
  totalPoints,
  pointsToNextLevel,
  compact = false
}: LevelProgressProps) => {
  const pointsForCurrentLevel = (currentLevel - 1) * 500;
  const pointsForNextLevel = currentLevel * 500;
  const progressInCurrentLevel = totalPoints - pointsForCurrentLevel;
  const totalPointsNeededForLevel = pointsForNextLevel - pointsForCurrentLevel;
  const progressPercentage = (progressInCurrentLevel / totalPointsNeededForLevel) * 100;

  const getLevelIcon = (level: number): string => {
    if (level >= 50) return "👑"; // King/Queen
    if (level >= 40) return "💎"; // Diamond
    if (level >= 30) return "🏆"; // Trophy
    if (level >= 20) return "⭐"; // Star
    if (level >= 10) return "🥇"; // Gold Medal
    if (level >= 5) return "🥈"; // Silver Medal
    return "🥉"; // Bronze Medal
  };

  const getLevelTitle = (level: number): string => {
    if (level >= 50) return "Productivity Royalty";
    if (level >= 40) return "Diamond Achiever";
    if (level >= 30) return "Champion";
    if (level >= 20) return "Expert";
    if (level >= 10) return "Veteran";
    if (level >= 5) return "Apprentice";
    return "Beginner";
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getLevelIcon(currentLevel)}</span>
          <div>
            <div className="font-semibold text-purple-800">
              Level {currentLevel}
            </div>
            <div className="text-sm text-purple-600">
              {getLevelTitle(currentLevel)}
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-xs text-purple-600 mt-1">
            {pointsToNextLevel} XP to level {currentLevel + 1}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-lg border">
      {/* Level Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{getLevelIcon(currentLevel)}</div>
          <div>
            <h3 className="text-2xl font-bold text-purple-800">
              Level {currentLevel}
            </h3>
            <p className="text-purple-600">{getLevelTitle(currentLevel)}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-purple-600">Total XP</div>
          <div className="text-xl font-semibold text-purple-800">
            {totalPoints.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Progress to Next Level */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-purple-700">
            Progress to Level {currentLevel + 1}
          </span>
          <span className="text-sm text-purple-600">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        
        <div className="w-full h-4 bg-purple-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 transition-all duration-700 ease-out rounded-full relative"
            style={{ width: `${progressPercentage}%` }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-sm text-purple-600">
          <span>{progressInCurrentLevel} XP</span>
          <span>{pointsToNextLevel} XP needed</span>
          <span>{totalPointsNeededForLevel} XP</span>
        </div>
      </div>

      {/* Level Benefits Preview */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-white/60 rounded-lg">
          <div className="text-sm font-medium text-purple-700 mb-1">
            Current Benefits
          </div>
          <div className="text-xs text-purple-600">
            • Daily streak freezes: {Math.floor(currentLevel / 5)}
            <br />
            • Bonus achievements unlocked
          </div>
        </div>
        
        <div className="p-3 bg-white/60 rounded-lg">
          <div className="text-sm font-medium text-purple-700 mb-1">
            Next Level Preview
          </div>
          <div className="text-xs text-purple-600">
            • {getLevelIcon(currentLevel + 1)} {getLevelTitle(currentLevel + 1)}
            <br />
            • Additional perks & rewards
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="mt-4 p-3 bg-white/40 rounded-lg border border-purple-200">
        <div className="text-sm text-purple-700 text-center">
          {progressPercentage >= 80 
            ? "🔥 Almost there! Keep up the great work!"
            : progressPercentage >= 50
            ? "💪 You're making great progress!"
            : "🚀 Every task completed gets you closer to the next level!"
          }
        </div>
      </div>
    </div>
  );
};

export default LevelProgress;