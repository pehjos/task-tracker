import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getTasksFromLocalStorage, saveTasksToLocalStorage } from "../../utils/localStorage";
import { Task } from "../../types/taskTypes";

// Mock Data
const mockTasks: Task[] = [
  { id: 1, title: "Test Task 1", description: "Description 1", priority: "Medium", dueDate: "2025-12-01" },
  { id: 2, title: "Test Task 2", description: "Description 2", priority: "High", dueDate: "2025-12-02" },
];

describe("LocalStorage Utils", () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "getItem");
    vi.spyOn(Storage.prototype, "setItem");
    vi.spyOn(console, "error").mockImplementation(() => {}); 
  });

  afterEach(() => {
    vi.restoreAllMocks(); 
    localStorage.clear();
  });

  describe("getTasksFromLocalStorage", () => {
    it("returns an empty array when no tasks are found", () => {
      (Storage.prototype.getItem as ReturnType<typeof vi.fn>).mockReturnValue(null);
      expect(getTasksFromLocalStorage()).toEqual([]);
    });

    it("retrieves tasks from localStorage correctly", () => {
      (Storage.prototype.getItem as ReturnType<typeof vi.fn>).mockReturnValue(JSON.stringify(mockTasks));
      expect(getTasksFromLocalStorage()).toEqual(mockTasks);
    });

    it("handles invalid JSON data gracefully", () => {
      (Storage.prototype.getItem as ReturnType<typeof vi.fn>).mockReturnValue("invalid-json");
      expect(getTasksFromLocalStorage()).toEqual([]);
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("saveTasksToLocalStorage", () => {
    it("saves tasks to localStorage correctly", () => {
      saveTasksToLocalStorage(mockTasks);
      expect(localStorage.setItem).toHaveBeenCalledWith("tasks", JSON.stringify(mockTasks));
    });

    it("handles errors when saving to localStorage", () => {
      (Storage.prototype.setItem as ReturnType<typeof vi.fn>).mockImplementation(() => {
        throw new Error("Storage quota exceeded");
      });
      saveTasksToLocalStorage(mockTasks);
      expect(console.error).toHaveBeenCalledWith("Error saving tasks to localStorage:", expect.any(Error));
    });
  });
});
