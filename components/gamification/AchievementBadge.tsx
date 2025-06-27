import { Achievement, AchievementRarity } from "@/types/gamification";
import { Badge } from "@/components/ui/badge";

interface AchievementBadgeProps {
  achievement: Achievement;
  isUnlocked?: boolean;
  progress?: number;
  showProgress?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const AchievementBadge = ({
  achievement,
  isUnlocked = false,
  progress = 0,
  showProgress = false,
  size = "md",
  onClick
}: AchievementBadgeProps) => {
  const getRarityColor = (rarity: AchievementRarity): string => {
    switch (rarity) {
      case AchievementRarity.COMMON:
        return "bg-gray-100 text-gray-800 border-gray-300";
      case AchievementRarity.RARE:
        return "bg-blue-100 text-blue-800 border-blue-300";
      case AchievementRarity.EPIC:
        return "bg-purple-100 text-purple-800 border-purple-300";
      case AchievementRarity.LEGENDARY:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getSizeClasses = (size: "sm" | "md" | "lg"): string => {
    switch (size) {
      case "sm":
        return "w-16 h-16 text-xs";
      case "md":
        return "w-20 h-20 text-sm";
      case "lg":
        return "w-24 h-24 text-base";
      default:
        return "w-20 h-20 text-sm";
    }
  };

  const getIconSize = (size: "sm" | "md" | "lg"): string => {
    switch (size) {
      case "sm":
        return "text-xl";
      case "md":
        return "text-2xl";
      case "lg":
        return "text-3xl";
      default:
        return "text-2xl";
    }
  };

  return (
    <div
      className={`
        relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200
        ${isUnlocked ? "cursor-pointer hover:scale-105" : "opacity-50 cursor-not-allowed"}
        ${getRarityColor(achievement.rarity)}
        ${onClick && isUnlocked ? "hover:shadow-lg" : ""}
      `}
      onClick={onClick && isUnlocked ? onClick : undefined}
    >
      {/* Achievement Icon Circle */}
      <div
        className={`
          relative flex items-center justify-center rounded-full border-2
          ${getSizeClasses(size)}
          ${isUnlocked ? "bg-white shadow-md" : "bg-gray-100"}
        `}
      >
        <span className={getIconSize(size)}>
          {achievement.icon}
        </span>
        
        {/* Progress Ring (if showing progress and not fully unlocked) */}
        {showProgress && progress < 100 && (
          <div className="absolute inset-0 rounded-full">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeOpacity="0.2"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${progress} 100`}
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
        
        {/* Unlocked Indicator */}
        {isUnlocked && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        )}
      </div>

      {/* Achievement Info */}
      <div className="text-center">
        <h4 className="font-semibold text-sm line-clamp-1">
          {achievement.name}
        </h4>
        <p className="text-xs opacity-75 line-clamp-2 mt-1">
          {achievement.description}
        </p>
        
        {/* Points Badge */}
        <Badge variant="secondary" className="mt-2 text-xs">
          {achievement.points} pts
        </Badge>
        
        {/* Progress Text */}
        {showProgress && progress < 100 && (
          <div className="mt-1 text-xs opacity-75">
            {progress}% Complete
          </div>
        )}
      </div>
      
      {/* Rarity Indicator */}
      <div className="absolute top-1 left-1">
        <Badge variant="outline" className="text-xs px-1 py-0">
          {achievement.rarity}
        </Badge>
      </div>
    </div>
  );
};

export default AchievementBadge;