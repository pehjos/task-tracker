export type Priority = "Low" | "Medium" | "High";

export interface Task {
  id: number; 
  title: string; 
  description: string; 
  priority: Priority;
  dueDate: string; 
}

export interface TaskContextType {
  tasks: Task[];
  displayedTasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  editTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  handleSearch: (searchTerm: string) => void;
  handleFilter: (priority: Priority | "all") => void;
  isLoading: boolean;
  showForm: boolean;
  toggleForm: (open?: boolean) => void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  taskToEdit: Task | null;
  setTaskToEdit: (task: Task | null) => void;
}

