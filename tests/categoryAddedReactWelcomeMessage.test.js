import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import WelcomeMessage from "../src/categoryAddedReactWelcomeMessage";

describe("WelcomeMessageByRoleByClickingLoginButton", () => {
  console.log("WelcomeMessage:", WelcomeMessage);
  test("shows guest message by default ", async () => {
    render(<WelcomeMessage />);
    expect(await screen.findByText("Welcome, guest!")).toBeInTheDocument();
  });

  test("shows welcome back message after clicking button Admin", async () => {
    render(<WelcomeMessage />);
    await userEvent.click(screen.getByText("Log in as Admin"));
    expect(await screen.findByText("Welcome back, admin!")).toBeInTheDocument();
  });

  test("shows welcome back message after clicking button Member", async () => {
    render(<WelcomeMessage />);
    await userEvent.click(screen.getByText("Log in as Member"));
    expect(
      await screen.findByText("Welcome back, member!")
    ).toBeInTheDocument();
  });

  test("shows welcome back message after clicking button Guest", async () => {
    render(<WelcomeMessage />);
    await userEvent.click(screen.getByText("Log in as Guest"));
    expect(await screen.findByText("Welcome back!")).toBeInTheDocument();
  });
});
