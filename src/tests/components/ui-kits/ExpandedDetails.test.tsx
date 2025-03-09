import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { ExpandedDetails } from "../../../components/ui-kits/ExpandedDetails";
import { formatDate } from "../../../utils";

describe("ExpandedDetails Component", () => {
  it("renders the task title, description, and due date", () => {
    const task = {
      title: "Test Task",
      description: "This is a test description.",
      dueDate: "2025-03-10",
    };

    render(<ExpandedDetails title={task.title} description={task.description} dueDate={task.dueDate} />);

    
    expect(screen.getByText(task.title)).toBeInTheDocument();

   
    expect(screen.getByText(task.description)).toBeInTheDocument();

   
    expect(screen.getByText(formatDate(task.dueDate))).toBeInTheDocument();
  });

  it("renders the due date section correctly", () => {
    render(<ExpandedDetails title="Sample" description="Test" dueDate="2025-03-15" />);

   
    expect(screen.getByText("Due Date")).toBeInTheDocument();

  
  });
});
