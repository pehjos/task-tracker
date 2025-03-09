import { FC } from "react";
import { BsClock } from "react-icons/bs";
import { formatDate } from "../../utils";

interface ExpandedDetailsProps {
  title: string;
  dueDate: string;
  description: string;
}

export const ExpandedDetails: FC<ExpandedDetailsProps> = ({ title, dueDate, description }) => (
  <div className="mt-4 space-y-3">
    <h2 className="text-start text-base font-semibold leading-tight transition-colors duration-200 text-slate-700">
      {title}
    </h2>
    <p className="text-start text-sm text-slate-600 leading-relaxed">{description}</p>

    {/* Due Date */}
    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
      <div className="text-xs font-medium text-slate-500 mb-1">Due Date</div>
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <BsClock className="size-4 text-slate-400" />
        {formatDate(dueDate)}
      </div>
    </div>
  </div>
);
