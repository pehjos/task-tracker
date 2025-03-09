import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { PriorityLabel } from "../../../components/ui-kits/PriorityLabel";

describe("PriorityLabel Component", () => {
  it("renders the correct label for Low priority", () => {
    render(<PriorityLabel priority="Low" />);
    expect(screen.getByText(/low priority/i)).toBeInTheDocument();
  });

  it("renders the correct label for Medium priority", () => {
    render(<PriorityLabel priority="Medium" />);
    expect(screen.getByText(/medium priority/i)).toBeInTheDocument();
  });

  it("renders the correct label for High priority", () => {
    render(<PriorityLabel priority="High" />);
    expect(screen.getByText(/high priority/i)).toBeInTheDocument();
  });

  it("applies correct styles for Low priority", () => {
    render(<PriorityLabel priority="Low" />);
    const label = screen.getByText(/low priority/i);
    expect(label).toHaveClass("text-blue-700 bg-blue-100");
  });

  it("applies correct styles for Medium priority", () => {
    render(<PriorityLabel priority="Medium" />);
    const label = screen.getByText(/medium priority/i);
    expect(label).toHaveClass("text-yellow-700 bg-yellow-100");
  });

  it("applies correct styles for High priority", () => {
    render(<PriorityLabel priority="High" />);
    const label = screen.getByText(/high priority/i);
    expect(label).toHaveClass("text-red-700 bg-red-100");
  });
});
