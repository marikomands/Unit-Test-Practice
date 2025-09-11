import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ToDoList from "../src/ToDoList";

describe("updateToDoList", () => {
  test("show default to do list", () => {
    render(<ToDoList />);
    expect(screen.getByText("My Tasks")).toBeInTheDocument();
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Write unit tests")).toBeInTheDocument();
    expect(screen.getByText("Drink coffee")).toBeInTheDocument();
    expect(screen.getByLabelText("Drink coffee")).toBeChecked();
    expect(screen.getByLabelText("Learn React")).not.toBeChecked();
    expect(screen.getByLabelText("Write unit tests")).not.toBeChecked();
    expect(screen.getByText("1 of 3 tasks done")).toBeInTheDocument();
  });

  test("toggle task done status", async () => {
    render(<ToDoList />);
    await userEvent.click(screen.getByLabelText("Learn React"));
    expect(screen.getByLabelText("Learn React")).toBeChecked();
    expect(screen.getByText("2 of 3 tasks done")).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText("Drink coffee"));
    expect(screen.getByLabelText("Drink coffee")).not.toBeChecked();
    expect(screen.getByText("1 of 3 tasks done")).toBeInTheDocument();
  });

  test("complete all tasks", async () => {
    render(<ToDoList />);
    // const checkboxes = screen.getAllByRole("checkbox");

    // for (const box of checkboxes) {
    //   if (!box.checked) {
    //     await userEvent.click(box);
    //   }
    // }
    // expect(screen.getByText("All tasks completed! 🎉")).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText("Learn React"));
    const learnReact = screen.getByLabelText("Learn React");
    expect(learnReact).toBeChecked();
    expect(screen.getByLabelText("Write unit tests")).not.toBeChecked();

    await userEvent.click(screen.getByLabelText("Write unit tests"));
    const writeUnitTests = screen.getByLabelText("Write unit tests");
    expect(writeUnitTests).toBeChecked();
    expect(screen.getByLabelText("Drink coffee")).toBeChecked();
    expect(screen.getByText("All tasks completed! 🎉")).toBeInTheDocument();
  });
});
