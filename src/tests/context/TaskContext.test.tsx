import { renderHook, act } from "@testing-library/react";
import { TaskProvider, useTasks } from "../../context/TaskContext";
import { Task, } from "../../types/taskTypes";
import { getTasksFromLocalStorage, saveTasksToLocalStorage } from "../../utils/localStorage";
import { describe, it, expect, beforeEach } from "vitest";
import { vi, Mock } from "vitest";

vi.mock("../../utils/localStorage", () => ({
    getTasksFromLocalStorage: vi.fn(),
    saveTasksToLocalStorage: vi.fn(),
  }));
  
  describe("TaskContext", () => {
    beforeEach(() => {
      vi.resetAllMocks(); // Reset mocks before each test
    });
  
    it("loads tasks from local storage on mount", () => {
      const storedTasks: Task[] = [
        { id: 1, title: "Task 1", description: "First task", dueDate: "2025-12-01", priority: "Medium" },
        { id: 2, title: "Task 2", description: "Second task", dueDate: "2025-12-02", priority: "High" },
      ];
      (getTasksFromLocalStorage as Mock).mockReturnValue(storedTasks);
  
      const { result } = renderHook(() => useTasks(), { wrapper: TaskProvider });
  
      const expectedTasks = storedTasks.slice().sort((a, b) => b.id - a.id); 
      expect(result.current.tasks).toEqual(expectedTasks);

    });
  
    it("adds a new task", () => {
      const { result } = renderHook(() => useTasks(), { wrapper: TaskProvider });
  
      act(() => {
        result.current.addTask({
          title: "New Task",
          description: "A new task",
          dueDate: "2025-12-05",
          priority: "Low",
        });
      });
  
      expect(result.current.tasks.length).toBe(1);
      expect(result.current.tasks[0].title).toBe("New Task");
      expect(saveTasksToLocalStorage).toHaveBeenCalled();
    });
  
    it("deletes a task", () => {
      const { result } = renderHook(() => useTasks(), { wrapper: TaskProvider });
  
      act(() => {
        result.current.addTask({
          title: "Task to Delete",
          description: "This will be deleted",
          dueDate: "2025-12-06",
          priority: "Medium",
        });
      });
  
      const taskId = result.current.tasks[0].id;
  
      act(() => {
        result.current.deleteTask(taskId);
      });
  
      expect(result.current.tasks).not.toContainEqual(expect.objectContaining({ id: taskId }));
      expect(saveTasksToLocalStorage).toHaveBeenCalled();
    });
  
    it("filters tasks by priority", () => {
      const { result } = renderHook(() => useTasks(), { wrapper: TaskProvider });
  
      act(() => {
        result.current.addTask({ title: "Task 1", description: "", dueDate: "2025-12-07", priority: "Low" });
        result.current.addTask({ title: "Task 2", description: "", dueDate: "2025-12-08", priority: "High" });
      });
  
      act(() => {
        result.current.handleFilter("High");
      });
  
      const filteredTasks = result.current.tasks.filter(task => task.priority === "High");
      expect(result.current.displayedTasks.length).toBe(filteredTasks.length);
    });
  
    it("searches tasks by title", () => {
      const { result } = renderHook(() => useTasks(), { wrapper: TaskProvider });
  
      act(() => {
        result.current.addTask({ title: "Meeting Notes", description: "Work-related", dueDate: "2025-12-09", priority: "Medium" });
        result.current.addTask({ title: "Workout Plan", description: "Exercise", dueDate: "2025-12-10", priority: "Low" });
      });
  
      act(() => {
        result.current.handleSearch("meeting");
      });
  
      
    });
  });