import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SearchFilter } from "../../components/SearchFilter";
import { Priority } from "../../types/taskTypes";

describe("SearchFilter Component", () => {
  it("renders without crashing", () => {
    render(<SearchFilter handleSearch={() => {}} handleFilter={() => {}} />);
    expect(screen.getByPlaceholderText(/search tasks/i)).toBeInTheDocument();
  });

  it("updates search input and calls handleSearch", () => {
    const handleSearchMock = vi.fn();
    render(<SearchFilter handleSearch={handleSearchMock} handleFilter={() => {}} />);

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "Meeting" } });

    expect(searchInput).toHaveValue("Meeting");
    
    fireEvent.submit(searchInput);
    expect(handleSearchMock).toHaveBeenCalledTimes(1);
    expect(handleSearchMock).toHaveBeenCalledWith("Meeting");
  });

  it("handles filter selection correctly", () => {
    const handleFilterMock = vi.fn();
    render(<SearchFilter handleSearch={() => {}} handleFilter={handleFilterMock} />);

  
    const mediumFilter = screen.getByRole("checkbox", { name: "Medium" });
    fireEvent.click(mediumFilter);

    expect(handleFilterMock).toHaveBeenCalledTimes(1);
    expect(handleFilterMock).toHaveBeenCalledWith("Medium" as Priority);
  });

  it("ensures 'All' filter is active by default", () => {
    render(<SearchFilter handleSearch={() => {}} handleFilter={() => {}} />);

    const allFilter = screen.getByRole("checkbox", { name: "All" });
    expect(allFilter).toBeChecked();
  });

  it("switches active filter when a different filter is clicked", () => {
    render(<SearchFilter handleSearch={() => {}} handleFilter={() => {}} />);

    const allFilter = screen.getByRole("checkbox", { name: "All" });
    const highFilter = screen.getByRole("checkbox", { name: "High" });

    expect(allFilter).toBeChecked();
    fireEvent.click(highFilter);

    expect(allFilter).not.toBeChecked();
    expect(highFilter).toBeChecked();
  });
});
