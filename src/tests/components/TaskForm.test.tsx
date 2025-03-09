import { render, screen, fireEvent } from "@testing-library/react";
import { TaskForm } from "../../components/TaskForm";
import { describe, it, expect, vi } from "vitest";
import { Task } from "../../types/taskTypes";
import { TaskProvider } from "../../context/TaskContext"; 

const renderWithProvider = (taskToEdit: Task | null = null): ReturnType<typeof render> => {
  const mockAddTask = vi.fn();
  const mockEditTask = vi.fn();
  const mockToggleForm = vi.fn();
  const mockSetTaskToEdit = vi.fn();

  return render(
    <TaskProvider>
      <TaskForm
        addTask={mockAddTask}
        editTask={mockEditTask}
        toggleForm={mockToggleForm}
        setTaskToEdit={mockSetTaskToEdit}
        taskToEdit={taskToEdit}
      />
    </TaskProvider>
  );
};

describe("TaskForm Component", () => {
  it("renders correctly", () => {
    renderWithProvider();
    expect(screen.getByText(/Add New Task/i)).toBeInTheDocument();
  });

  it("closes the form when cancel is clicked", () => {
    renderWithProvider();
    

  });

  it("calls `addTask` when submitting a new task", () => {
    const { container } = renderWithProvider();
    
    fireEvent.change(screen.getByPlaceholderText(/enter task title/i), { target: { value: "New Task" } });
    fireEvent.change(screen.getByPlaceholderText(/enter task description/i), { target: { value: "Task Description" } });
    expect(container).toMatchSnapshot();
  });

  
});
