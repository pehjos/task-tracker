import { FC } from "react";
import { EmptyTasks } from "./EmptyTasks";
import { TaskItem } from "./TaskItem";
import { Task } from "../types/taskTypes";

interface TaskListProps {
  tasks: Task[];
  toggleForm: (open?: boolean) => void;
  handleOnEditClick: (selectedTask: Task) => void;
  deleteTask: (id: number) => void;
}

export const TaskList: FC<TaskListProps> = ({ tasks, toggleForm, handleOnEditClick, deleteTask, }) => {
  return (
    <div className="flex flex-col gap-3">
      {tasks.length === 0 ? (
        <EmptyTasks toggleForm={toggleForm} />
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            handleOnEditClick={handleOnEditClick}
          />
        ))
      )}
    </div>
  );
};
