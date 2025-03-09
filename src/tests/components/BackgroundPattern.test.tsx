import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BackgroundPattern } from "../../components/BackgroundPattern";
import "@testing-library/jest-dom";

describe("BackgroundPattern Component", () => {
  it("renders without crashing", () => {
    render(<BackgroundPattern />);
    expect(screen.getByTestId("background-pattern")).toBeInTheDocument();
  });

  it("contains the grid pattern", () => {
    render(<BackgroundPattern />);
    expect(screen.getByTestId("grid-pattern")).toBeInTheDocument();
  });

  it("contains all accent shapes", () => {
    render(<BackgroundPattern />);
    expect(screen.getAllByTestId("accent-shape")).toHaveLength(3);
  });

  it("displays all icons correctly", () => {
    render(<BackgroundPattern />);
  
  });
});
