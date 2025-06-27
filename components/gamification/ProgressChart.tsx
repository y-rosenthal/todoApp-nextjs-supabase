interface ProgressChartProps {
  current: number;
  target: number;
  label: string;
  icon?: string;
  color?: "blue" | "green" | "purple" | "orange";
  showPercentage?: boolean;
}

const ProgressChart = ({
  current,
  target,
  label,
  icon,
  color = "blue",
  showPercentage = true
}: ProgressChartProps) => {
  const percentage = Math.min((current / target) * 100, 100);
  const isComplete = current >= target;

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-100",
          fill: "bg-blue-500",
          text: "text-blue-600"
        };
      case "green":
        return {
          bg: "bg-green-100",
          fill: "bg-green-500",
          text: "text-green-600"
        };
      case "purple":
        return {
          bg: "bg-purple-100",
          fill: "bg-purple-500",
          text: "text-purple-600"
        };
      case "orange":
        return {
          bg: "bg-orange-100",
          fill: "bg-orange-500",
          text: "text-orange-600"
        };
      default:
        return {
          bg: "bg-blue-100",
          fill: "bg-blue-500",
          text: "text-blue-600"
        };
    }
  };

  const colors = getColorClasses(color);

  return (
    <div className="p-4 bg-white rounded-lg border">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <h4 className="font-medium text-gray-800">{label}</h4>
        </div>
        {isComplete && (
          <span className="text-green-500 text-lg">✅</span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className={`w-full h-3 ${colors.bg} rounded-full overflow-hidden`}>
          <div
            className={`h-full ${colors.fill} transition-all duration-500 ease-out rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className={`font-semibold ${colors.text}`}>
            {current} / {target}
          </span>
          {showPercentage && (
            <span className="text-gray-600">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
        
        {!isComplete && (
          <span className="text-gray-600">
            {target - current} remaining
          </span>
        )}
      </div>

      {/* Complete message */}
      {isComplete && (
        <div className="mt-2 text-sm text-green-600 font-medium">
          🎉 Goal completed!
        </div>
      )}
    </div>
  );
};

export default ProgressChart;