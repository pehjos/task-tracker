import { useEffect, useState, FC } from "react";
import { useTasks } from "../context/TaskContext"; 
import { Task } from "../types/taskTypes";
import { Button } from "./Button";




interface TaskFormProps {
  addTask: (task: Omit<Task, "id">) => void;
  editTask: (task: Task) => void;
  taskToEdit: Task | null;
  toggleForm: (open?: boolean) => void;
  setTaskToEdit: (task: Task | null) => void;
}

export const TaskForm: FC<TaskFormProps> =() => {
  const { addTask, editTask, toggleForm, taskToEdit, setTaskToEdit } = useTasks(); // ✅ Use context
  const [task, setTask] = useState<Task>({
    id: Date.now(), // Temporary ID
    title: "",
    description: "",
    priority: "Low",
    dueDate: "", 
  });

  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>({});

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    } else {
      setTask({
        id: Date.now(),
        title: "",
        description: "",
        priority: "Low",
        dueDate: "",
      });
    }
  }, [taskToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const errors: { title?: string; dueDate?: string } = {};
  
    if (!task.title.trim()) errors.title = "Title is required";
    if (!task.dueDate) errors.dueDate = "Due date is required";
  
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const closeForm = (): void => {
    toggleForm(false); 
    setTask({ id: Date.now(), title: "", description: "", priority: "Low", dueDate: "" }); 
    setTaskToEdit(null); 
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!validateForm()) return;

    if (taskToEdit) {
      editTask({ ...taskToEdit, ...task });
    } else {
      addTask(task);
    }

    closeForm();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-60 flex items-center justify-center z-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-lg transform transition-all duration-300 sm:max-w-xl">
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">
          {taskToEdit ? "Edit Task" : "Add New Task"}
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Task Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-600 text-left">Title*</label>
            <input  id="title" name="title"
              type="text"
              value={task.title}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-md shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-150"
              placeholder="Enter task title"
              required
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          {/* Task Description */}
          <div>
            <label className="block text-sm font-medium text-gray-600 text-left">Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-md shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-150"
              placeholder="Enter task description"
            />
          </div>

          {/* Task Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-600 text-left">Priority</label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-md shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-150"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Task Due Date  */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-600 text-left">Due Date *</label>
            <input
              type="date"
              name="dueDate"
              id="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 bg-gray-100 rounded-md shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-150"
              required
            />
            {errors.dueDate && <p className="text-sm text-red-500">{errors.dueDate}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              label="Cancel"
               data-testid="cancel-button"
              onClick={closeForm}
              styles="px-6 py-2 bg-white text-gray-700 rounded-md shadow-sm hover:bg-gray-100 border border-gray-300 transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transform hover:-translate-y-0.5"
            />
            <Button
           
              type="submit"
              label={taskToEdit ? "Save Changes" : "Add Task"}
              onClick={undefined}
              styles="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md shadow-md hover:shadow-lg hover:shadow-purple-400/50 transition duration-150 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
