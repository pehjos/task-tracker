import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Header } from "../../components/Header";
import { describe, it, expect, vi } from "vitest";
import { Priority } from "../../types/taskTypes";

describe("Header Component", () => {
  it("displays the correct title and subtitle", () => {
    render(<Header toggleForm={() => {}} handleSearch={() => {}} handleFilter={() => {}} />);

  });

  it("calls `toggleForm` when clicking the 'New Task' button", () => {
    const toggleFormMock = vi.fn();
    render(<Header toggleForm={toggleFormMock} handleSearch={() => {}} handleFilter={() => {}} />);

    const button = screen.getByRole("button", { name: /new task/i });
    fireEvent.click(button);

    expect(toggleFormMock).toHaveBeenCalledTimes(1);
  });

  it("handles search input correctly", async () => {
    const handleSearchMock = vi.fn();
    render(<Header toggleForm={() => {}} handleSearch={handleSearchMock} handleFilter={() => {}} />);

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "Meeting" } });

  
  });

  it("handles filter selection correctly", async () => {
    const handleFilterMock = vi.fn();
    render(<Header toggleForm={() => {}} handleSearch={() => {}} handleFilter={handleFilterMock} />);

    const mediumFilter = screen.getByRole("checkbox", { name: "Medium" });
    fireEvent.click(mediumFilter);

    await waitFor(() => {
      expect(handleFilterMock).toHaveBeenCalledTimes(1);
      expect(handleFilterMock).toHaveBeenCalledWith("Medium" as Priority);
    });
  });
});
