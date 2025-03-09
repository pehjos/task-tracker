import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { TaskProgressBar } from "../../../components/ui-kits/TaskProgressBar";

describe("TaskProgressBar Component", () => {
  it("renders correctly for Low priority", () => {
    render(<TaskProgressBar priority="Low" />);
    const progressBar = screen.getByTestId("progress-bar"); 
    expect(progressBar).toHaveClass("from-blue-500 via-indigo-500 to-purple-500");
    expect(progressBar).toHaveStyle("width: 40%");
  });

  it("renders correctly for Medium priority", () => {
    render(<TaskProgressBar priority="Medium" />);
    const progressBar = screen.getByTestId("progress-bar");
    expect(progressBar).toHaveClass("from-yellow-400 via-yellow-500 to-orange-500");
    expect(progressBar).toHaveStyle("width: 50%");
  });

  it("renders correctly for High priority", () => {
    render(<TaskProgressBar priority="High" />);
    const progressBar = screen.getByTestId("progress-bar");
    expect(progressBar).toHaveClass("from-red-500 via-red-600 to-red-700");
    expect(progressBar).toHaveStyle("width: 100%");
  });
});
