import { Streak, StreakType } from "@/types/gamification";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface StreakDisplayProps {
  streak: Streak;
  onFreeze?: (streakId: string) => void;
  compact?: boolean;
}

const StreakDisplay = ({ 
  streak, 
  onFreeze, 
  compact = false 
}: StreakDisplayProps) => {
  const getStreakTypeInfo = (type: StreakType) => {
    switch (type) {
      case StreakType.DAILY_TASKS:
        return {
          label: "Daily Tasks",
          icon: "📅",
          description: "Complete at least one task each day"
        };
      case StreakType.WEEKLY_GOALS:
        return {
          label: "Weekly Goals",
          icon: "🎯",
          description: "Meet your weekly task goals"
        };
      case StreakType.TASK_COMPLETION:
        return {
          label: "Task Completion",
          icon: "✅",
          description: "Consistently complete tasks"
        };
      case StreakType.LOGIN:
        return {
          label: "Login Streak",
          icon: "🚪",
          description: "Visit the app daily"
        };
      default:
        return {
          label: "Streak",
          icon: "🔥",
          description: "Keep up the momentum!"
        };
    }
  };

  const typeInfo = getStreakTypeInfo(streak.type);
  const isToday = new Date(streak.last_activity_date).toDateString() === new Date().toDateString();
  const daysSinceActivity = Math.floor(
    (Date.now() - new Date(streak.last_activity_date).getTime()) / (1000 * 60 * 60 * 24)
  );

  const getStreakColor = () => {
    if (!streak.is_active) return "text-gray-500";
    if (streak.current_count >= 30) return "text-orange-500";
    if (streak.current_count >= 14) return "text-yellow-500";
    if (streak.current_count >= 7) return "text-blue-500";
    return "text-green-500";
  };

  const getStreakStatus = () => {
    if (!streak.is_active) return "Broken";
    if (daysSinceActivity > 1) return "At Risk";
    if (isToday) return "Active";
    return "Pending";
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
        <div className="text-2xl">{typeInfo.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{typeInfo.label}</span>
            <Badge variant={streak.is_active ? "default" : "secondary"}>
              {getStreakStatus()}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className={`font-semibold ${getStreakColor()}`}>
              🔥 {streak.current_count} days
            </span>
            <span>Best: {streak.longest_count}</span>
            {streak.freeze_count > 0 && (
              <span className="text-blue-600">❄️ {streak.freeze_count}</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg border shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{typeInfo.icon}</div>
          <div>
            <h3 className="font-semibold text-lg">{typeInfo.label}</h3>
            <p className="text-sm text-gray-600">{typeInfo.description}</p>
          </div>
        </div>
        <Badge variant={streak.is_active ? "default" : "secondary"}>
          {getStreakStatus()}
        </Badge>
      </div>

      {/* Current Streak */}
      <div className="mb-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className={`text-3xl font-bold ${getStreakColor()}`}>
            {streak.current_count}
          </span>
          <span className="text-lg text-gray-600">days</span>
          <span className="text-2xl">🔥</span>
        </div>
        
        {/* Progress visualization */}
        <div className="flex gap-1 mb-2">
          {Array.from({ length: Math.min(streak.current_count, 30) }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < streak.current_count ? "bg-orange-400" : "bg-gray-200"
              }`}
            />
          ))}
          {streak.current_count > 30 && (
            <span className="text-sm text-gray-500 ml-2">
              +{streak.current_count - 30} more
            </span>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-xl font-semibold text-gray-800">
            {streak.longest_count}
          </div>
          <div className="text-sm text-gray-600">Longest Streak</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-xl font-semibold text-blue-600">
            {streak.freeze_count}
          </div>
          <div className="text-sm text-gray-600">Freeze Tokens</div>
        </div>
      </div>

      {/* Actions */}
      {streak.is_active && daysSinceActivity > 0 && streak.freeze_count > 0 && onFreeze && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFreeze(streak.id)}
            className="flex items-center gap-2"
          >
            <span>❄️</span>
            Use Freeze Token
          </Button>
        </div>
      )}

      {/* Warning for at-risk streaks */}
      {streak.is_active && daysSinceActivity > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-800">
            <span>⚠️</span>
            <span className="text-sm">
              {daysSinceActivity === 1 
                ? "Complete a task today to keep your streak alive!"
                : `Your streak is at risk! ${daysSinceActivity} days since last activity.`
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreakDisplay;