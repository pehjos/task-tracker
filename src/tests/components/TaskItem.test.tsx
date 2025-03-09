import { render, screen,} from "@testing-library/react";
import { TaskItem } from "../../components/TaskItem";
import { describe, it, expect, vi } from "vitest";
import { Task } from "../../types/taskTypes";
import { TaskProvider } from "../../context/TaskContext";

const mockDeleteTask = vi.fn();
const mockSetTaskToEdit = vi.fn();


const sampleTask: Task = {
  id: 1,
  title: "Sample Task",
  description: "This is a sample task description.",
  dueDate: "2025-12-01",
  priority: "Medium",
};

const renderWithProvider = (): ReturnType<typeof render> => {
  return render(
    <TaskProvider>
      <TaskItem
        task={sampleTask}
        deleteTask={mockDeleteTask}
        handleOnEditClick={mockSetTaskToEdit}
      />
    </TaskProvider>
  );
};

describe("TaskItem Component", () => {
  it("renders the task item correctly", () => {
    renderWithProvider();
    expect(screen.getByText(sampleTask.title)).toBeInTheDocument();
    expect(screen.getByText(sampleTask.description)).toBeInTheDocument();
    expect(screen.getByText(/Medium Priority/i)).toBeInTheDocument();
  });

 
});
