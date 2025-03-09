import { render, screen, fireEvent } from "@testing-library/react";
import { EmptyTasks } from "../../components/EmptyTasks";
import { describe, it, expect, vi } from "vitest";

describe("EmptyTasks Component", () => {
  it("renders without crashing", () => {
    render(<EmptyTasks toggleForm={() => {}} />);
    expect(screen.getByText(/Your Task List Awaits/i)).toBeInTheDocument();
  });

  it("displays correct headings and text", () => {
    render(<EmptyTasks toggleForm={() => {}} />);
    
    expect(screen.getByRole("heading", { name: /your task list awaits/i })).toBeInTheDocument();
    expect(screen.getByText(/Turn your ideas into tasks and get things done/i)).toBeInTheDocument();
  });

  it("renders icons correctly", () => {
    render(<EmptyTasks toggleForm={() => {}} />);
    
    expect(screen.getByTestId("task-icon")).toBeInTheDocument();
    expect(screen.getByTestId("sparkles-icon")).toBeInTheDocument();
  });

  it("handles 'Create First Task' button click", () => {
    const toggleFormMock = vi.fn();
    render(<EmptyTasks toggleForm={toggleFormMock} />);

    const button = screen.getByRole("button", { name: /create first task/i });
    fireEvent.click(button);

    expect(toggleFormMock).toHaveBeenCalledTimes(1);
  });
});
