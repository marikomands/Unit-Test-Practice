import React, { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import AddtaskForm from "../src/AddTaskForm";
// props(onAdd) from parent component
describe("AddTaskForm", () => {
  test("onAdd is called when a text is sent ", async () => {
    const mockOnAdd = jest.fn();
    render(<AddtaskForm onAdd={mockOnAdd} />);
    const input = screen.getByPlaceholderText("Enter task");
    const button = screen.getByText("Add");
    await userEvent.type(input, "New Task");
    await userEvent.click(button);
    expect(mockOnAdd).toHaveBeenCalledWith("New Task");
    expect(input).toHaveValue("");
  });

  test("shows error message when submitting empty form", async () => {
    render(<AddtaskForm onAdd={jest.fn()} />);
    await userEvent.click(screen.getByText("Add"));
    expect(screen.getByRole("alert")).toHaveTextContent("Task cannot be empty");
  });

  test("clears error message when typing after an error and new text is called", async () => {
    const mockOnAdd = jest.fn();
    render(<AddtaskForm onAdd={mockOnAdd} />);
    const input = screen.getByPlaceholderText("Enter task");
    const button = screen.getByText("Add");
    await userEvent.click(button);
    expect(screen.getByRole("alert")).toHaveTextContent("Task cannot be empty");
    await userEvent.type(input, "Fix bug");
    await userEvent.click(button);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(mockOnAdd).toHaveBeenCalledWith("Fix bug");
    expect(input).toHaveValue("");
  });
});
