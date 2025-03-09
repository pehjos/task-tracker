import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../../components/Button";
import { describe, it, expect, vi } from "vitest";
import { BiPlus } from "react-icons/bi";

describe("Button Component", () => {
  it("renders without crashing", () => {
    render(<Button label="Click Me" type="button" />);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("displays the correct label", () => {
    render(<Button label="Submit" type="submit" />);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("handles click events correctly", () => {
    const onClick = vi.fn();
    render(<Button label="Click" type="button" onClick={onClick} />);
    
    const button = screen.getByRole("button", { name: /click/i });
    fireEvent.click(button);
    
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("supports an icon", () => {
    render(<Button label="Add" type="button" icon={<BiPlus data-testid="button-icon" />} />);
    expect(screen.getByTestId("button-icon")).toBeInTheDocument();
  });

  it("applies styles correctly", () => {
    render(<Button label="Styled" type="button" styles="bg-blue-500 text-white" />);
    const button = screen.getByRole("button", { name: /styled/i });
    expect(button).toHaveClass("bg-blue-500", "text-white");
  });

  it("has correct ARIA attributes", () => {
    render(<Button label="Aria Button" type="button" arialLabel="Custom Aria Label" />);
    const button = screen.getByRole("button", { name: "Custom Aria Label" });
    expect(button).toHaveAttribute("aria-label", "Custom Aria Label");
  });
});
