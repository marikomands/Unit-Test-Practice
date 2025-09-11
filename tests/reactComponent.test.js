import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import WelcomeMessage from "../src/reactComponent";

test("shows guest message by default", () => {
  render(<WelcomeMessage />);
  const message = screen.getByText("Welcome, guest!");
  expect(message).toBeInTheDocument();
});

test("shows welcome back message after clicking button", async () => {
  render(<WelcomeMessage />);
  await userEvent.click(screen.getByText("Log in"));

  const changeMessage = screen.getByText("Welcome back!");
  expect(changeMessage).toBeInTheDocument();
});

// we need anyc because we need to wait userEvent.lcik() asynchronousl
// DOMが変わらなくて探す場合は、同期処理になる。
