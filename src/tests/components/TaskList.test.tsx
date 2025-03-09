import { render, screen,} from "@testing-library/react";
import { TaskList } from "../../components/TaskList";
import { describe, it, expect, vi } from "vitest";
import { Task } from "../../types/taskTypes";
import { TaskProvider } from "../../context/TaskContext";

const mockToggleForm = vi.fn();
const mockDeleteTask = vi.fn();
const mockHandleOnEditClick = vi.fn();

const sampleTasks: Task[] = [
  {
    id: 1,
    title: "Task One",
    description: "First sample task",
    dueDate: "2025-12-01",
    priority: "Medium",
  },
  {
    id: 2,
    title: "Task Two",
    description: "Second sample task",
    dueDate: "2025-12-02",
    priority: "High",
  },
];

const renderWithProvider = (tasks: Task[]): ReturnType<typeof render> => {
  return render(
    <TaskProvider>
      <TaskList
        tasks={tasks}
        toggleForm={mockToggleForm}
        handleOnEditClick={mockHandleOnEditClick}
        deleteTask={mockDeleteTask}
      />
    </TaskProvider>
  );
};

describe("TaskList Component", () => {
  it("renders empty state when there are no tasks", () => {
    renderWithProvider([]);

    expect(screen.getByText(/your task list awaits/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create first task/i })).toBeInTheDocument();
  });

  it("renders a list of tasks correctly", () => {
    renderWithProvider(sampleTasks);

    expect(screen.getByText("Task One")).toBeInTheDocument();
    expect(screen.getByText("Task Two")).toBeInTheDocument();
  });

});
