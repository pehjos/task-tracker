import { createContext, useContext, useState, useEffect, useMemo, ReactNode, JSX } from "react";
import { getTasksFromLocalStorage, saveTasksToLocalStorage } from "../utils/localStorage";
import { Task, Priority,TaskContextType } from "../types/taskTypes";

const TaskContext = createContext<TaskContextType | null>(null);

// Provider Component
export const TaskProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [displayedTasks, setDisplayedTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all"); 


  // Sort tasks by ID
  const sortedTasks = useMemo(() => tasks.slice().sort((a, b) => b.id - a.id), [tasks]);

  const updateTasks = (updatedTasks: Task[]): void => {
    const sortedUpdatedTasks = updatedTasks.slice().sort((a, b) => b.id - a.id); 
    setTasks(sortedUpdatedTasks);
    setDisplayedTasks(sortedUpdatedTasks);
  };

  const addTask = (task: Omit<Task, "id">): void => {
    if (task.title.trim()) {
      const newTask: Task = { ...task, id: Date.now() };
      updateTasks([...tasks, newTask]);
    }
  };

  const editTask = (updatedTask: Task): void => {
    updateTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (id: number): void => {
    updateTasks(tasks.filter((task) => task.id !== id));
  };
  const updateDisplayedTasks = (): void => {
    let filteredTasks = tasks;
  
    
    if (priorityFilter !== "all") {
      filteredTasks = filteredTasks.filter((task) => task.priority === priorityFilter);
    }
  
  
    if (searchTerm.trim()) {
      filteredTasks = filteredTasks.filter((task) => 
        task.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }
  
    setDisplayedTasks(filteredTasks); 
  };
  
  const handleSearch = (term: string): void => {
    setSearchTerm(term); 
  };
  
  const handleFilter = (priority: Priority | "all"): void => {
    setPriorityFilter(priority); 
  };
  
  
  

  const toggleForm = (open?: boolean): void => {
    setShowForm(open !== undefined ? open : !showForm);
  };
  useEffect(() => {
    updateDisplayedTasks();
  }, [searchTerm, priorityFilter, tasks]);
  

  useEffect(() => {
    const storedTasks = getTasksFromLocalStorage();
    if (storedTasks && storedTasks.length > 0) {
      setTasks(storedTasks);
      setDisplayedTasks(storedTasks);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveTasksToLocalStorage(tasks);
    }
  }, [tasks, isLoading]);

  return (
    <TaskContext.Provider
      value={{
        tasks: sortedTasks,
        displayedTasks,
        addTask,
        editTask,
        deleteTask,
        handleSearch,
        handleFilter,
        isLoading,
        showForm,
        toggleForm,
        taskToEdit,
        setTaskToEdit,
        setShowForm
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom Hook to Use Context
export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
