import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { ActionButtons } from "../../../components/ui-kits/ActionButtons";

describe("ActionButtons Component", () => {
  it("renders the action button (three dots menu)", () => {
    const deleteTask = vi.fn();
    const handleOnEditClick = vi.fn();
    const setIsMenuOpen = vi.fn();

    render(
      <ActionButtons
        deleteTask={deleteTask}
        handleOnEditClick={handleOnEditClick}
        isMenuOpen={false}
        setIsMenuOpen={setIsMenuOpen}
      />
    );

   
    const actionButton = screen.getByLabelText("Open action menu");
    expect(actionButton).toBeInTheDocument();
  });

  it("opens the menu when clicking the action button", () => {
    const deleteTask = vi.fn();
    const handleOnEditClick = vi.fn();
    const setIsMenuOpen = vi.fn();

    render(
      <ActionButtons
        deleteTask={deleteTask}
        handleOnEditClick={handleOnEditClick}
        isMenuOpen={false}
        setIsMenuOpen={setIsMenuOpen}
      />
    );

    const actionButton = screen.getByLabelText("Open action menu");
    fireEvent.click(actionButton);

    // Expect setIsMenuOpen to be called
    expect(setIsMenuOpen).toHaveBeenCalledTimes(1);
  });

  it("calls handleOnEditClick when clicking Edit", () => {
    const deleteTask = vi.fn();
    const handleOnEditClick = vi.fn();
    const setIsMenuOpen = vi.fn();

    render(
      <ActionButtons
        deleteTask={deleteTask}
        handleOnEditClick={handleOnEditClick}
        isMenuOpen={true} 
        setIsMenuOpen={setIsMenuOpen}
      />
    );

    const editButton = screen.getByLabelText("Edit task");
    fireEvent.click(editButton);

    // Expect handleOnEditClick to be called
    expect(handleOnEditClick).toHaveBeenCalledTimes(1);
  });

  it("calls deleteTask when clicking Delete", () => {
    const deleteTask = vi.fn();
    const handleOnEditClick = vi.fn();
    const setIsMenuOpen = vi.fn();

    render(
      <ActionButtons
        deleteTask={deleteTask}
        handleOnEditClick={handleOnEditClick}
        isMenuOpen={true} 
        setIsMenuOpen={setIsMenuOpen}
      />
    );

    const deleteButton = screen.getByLabelText("Delete task");
    fireEvent.click(deleteButton);


    expect(deleteTask).toHaveBeenCalledTimes(1);
  });
});
