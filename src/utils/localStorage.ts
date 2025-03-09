 
import { Task } from "../types/taskTypes";

/**
 * Retrieves tasks from localStorage.
 * @returns {Task[]} - Array of tasks or an empty array if none are found.
 */
export const getTasksFromLocalStorage = (): Task[] => {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const storedTasks = localStorage.getItem("tasks");

      // If storedTasks is empty or not found, return an empty array
      if (storedTasks && storedTasks !== "[]") {
        return JSON.parse(storedTasks) as Task[];
      }
    } catch (error) {
      console.error("Failed to parse tasks from localStorage:", error);
    }
  }
  return [];
};

/**
 * Saves tasks to localStorage.
 * @param {Task[]} tasks - The array of tasks to store.
 */
export const saveTasksToLocalStorage = (tasks: Task[]): void => {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }
};
