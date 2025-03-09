import { FC } from "react";

interface PriorityLabelProps {
  priority: "Low" | "Medium" | "High";
}

const priorityStyles = {
  Low: { text: "text-blue-700", bg: "bg-blue-100" },
  Medium: { text: "text-yellow-700", bg: "bg-yellow-100" },
  High: { text: "text-red-700", bg: "bg-red-100" },
};

export const PriorityLabel: FC<PriorityLabelProps> = ({ priority }) => (
  <span
    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:shadow-md hover:scale-105 
      ${priorityStyles[priority].bg} ${priorityStyles[priority].text}`}
  >
    {priority} Priority
  </span>
);
