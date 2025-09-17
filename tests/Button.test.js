import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ParentComponentOfButton from "../src/button/ParentComponentOfButton";

test("renders with label", async () => {
  render(<ParentComponentOfButton />);
  expect(await screen.findByText("Click me")).toBeInTheDocument();
  expect(await screen.findByText("Reset")).toBeInTheDocument();
});

test("calls onClick when clicked", async () => {
  render(<ParentComponentOfButton />);
  await userEvent.click(screen.getByText("Click me"));
  expect(await screen.findByText("Clicked")).toBeInTheDocument();
  const buttons = screen.getAllByRole("button");
  expect(buttons[0]).toBeDisabled();
});

test("label changed to Click me when clicked reset button", async () => {
  render(<ParentComponentOfButton />);
  const buttons = screen.getAllByRole("button");
  expect(buttons[0]).not.toBeDisabled();
  await userEvent.click(buttons[0]);
  expect(await screen.findByText("Clicked")).toBeInTheDocument();
  expect(buttons[0]).toBeDisabled();
  await userEvent.click(buttons[1]);
  expect(await screen.findByText("Click me")).toBeInTheDocument();
  expect(buttons[0]).not.toBeDisabled();
});

test("is disabled when clicked main button", async () => {
  render(<ParentComponentOfButton />);
  const buttons = screen.getAllByRole("button");
  expect(buttons[0]).not.toBeDisabled();
  await userEvent.click(buttons[0]);
  expect(buttons[0]).toBeDisabled();
});
