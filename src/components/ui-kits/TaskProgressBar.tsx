import { FC } from "react";

interface TaskProgressBarProps {
  priority: "Low" | "Medium" | "High";
}

const priorityStyles = {
  Low: { progress: "from-blue-500 via-indigo-500 to-purple-500", width: "40%" },
  Medium: { progress: "from-yellow-400 via-yellow-500 to-orange-500", width: "50%" },
  High: { progress: "from-red-500 via-red-600 to-red-700", width: "100%" },
};

export const TaskProgressBar: FC<TaskProgressBarProps> = ({ priority }) => (
  <div className="relative h-1.5 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-50" />
    <div
      data-testid="progress-bar"
      className={`absolute inset-0 bg-gradient-to-r ${priorityStyles[priority].progress} transition-all duration-1000`}
      style={{ width: priorityStyles[priority].width }}
    />
  </div>
);
