import { FC, useState } from "react";
import { Button } from "./Button";
import { useTasks } from "../context/TaskContext";
import { Task } from "../types/taskTypes";
import { TaskProgressBar } from "./ui-kits/TaskProgressBar";
import { PriorityLabel } from "./ui-kits/PriorityLabel";
import { ActionButtons } from "./ui-kits/ActionButtons";
import { ToggleExpand } from "./ui-kits/ToggleExpand";
import { ExpandedDetails } from "./ui-kits/ExpandedDetails";

interface TaskItemProps {
  task: Task;
  deleteTask: (id: number) => void;
  handleOnEditClick: (selectedTask: Task) => void;
}

export const TaskItem: FC<TaskItemProps> = ({ task }) => {
  const { deleteTask, setTaskToEdit, toggleForm } = useTasks();
  const { id, title, description, dueDate, priority } = task;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleEditClick = (): void => {
    setTaskToEdit(task);
    toggleForm(true);
    setIsMenuOpen(false);
  };

  return (
    <div className="group relative overflow-hidden shadow-md rounded-2xl transition-all duration-300 bg-white hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 border border-slate-100 hover:border-slate-200">
      
      {/* priority Progress Bar */}
      <TaskProgressBar priority={priority} />

      {/*Main Content */}
      <div className="px-5 py-4">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-start text-base font-semibold leading-tight transition-colors duration-200 text-slate-700 overflow-hidden whitespace-nowrap text-ellipsis">
              {title}
            </h2>
            {description && <p className="mt-1 text-start text-sm text-slate-500 line-clamp-2">{description}</p>}
          </div>

          {/*  Dropdown Action Buttons */}
          <ActionButtons deleteTask={() => deleteTask(id)} handleOnEditClick={handleEditClick} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>

        {isExpanded && <ExpandedDetails title={title} dueDate={dueDate} description={description} />}

        {/*  Priority Label + Expand Button */}
        <div className="relative mt-4 flex items-center gap-2 justify-between">
          <PriorityLabel priority={priority} />
          <Button
            type="button"
            label=""
            arialLabel={isExpanded ? "View less" : "View task"}
            onClick={() => setIsExpanded((prev) => !prev)}
            icon={<ToggleExpand isExpanded={isExpanded} />}
            styles="flex items-center gap-1 text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-lg hover:bg-blue-200 transition-all z-10"
          />
        </div>
      </div>
    </div>
  );
};
