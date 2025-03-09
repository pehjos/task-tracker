import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { ToggleExpand } from "../../../components/ui-kits/ToggleExpand";

describe("ToggleExpand Component", () => {
  it("renders 'Less' when expanded", () => {
    render(<ToggleExpand isExpanded={true} />);
    expect(screen.getByText(/less/i)).toBeInTheDocument();
  });

  it("renders 'More' when not expanded", () => {
    render(<ToggleExpand isExpanded={false} />);
    expect(screen.getByText(/more/i)).toBeInTheDocument();
  });

  it("renders the correct icon when expanded", () => {
    render(<ToggleExpand isExpanded={true} />);
   
  });

  it("renders the correct icon when collapsed", () => {
    render(<ToggleExpand isExpanded={false} />);
   
  });
});
