import { render, screen } from "@testing-library/react"; 
import App from "../../App"; 
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

describe("App Component", () => {
  it("renders the heading with correct text and styles", () => {
    render(<App />);

   
    const heading = screen.getByText(/hello/i);
    expect(heading).toBeInTheDocument();


    expect(heading).toHaveClass("text-3xl", "font-bold", "text-red-500", "underline");
  });
});
