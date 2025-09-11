import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import CounterMessage from "../src/CounterMessage";

describe("CounterMessage", () => {
  test("shows initial message and count", () => {
    render(<CounterMessage />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
    expect(screen.getByText("Start clicking!")).toBeInTheDocument();
  });

  test("increments count and shows 'Keep going!'", async () => {
    render(<CounterMessage />);
    await userEvent.click(screen.getByText("Increment"));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
    expect(screen.getByText("Keep going!")).toBeInTheDocument();
  });

  test("increments count to 5 and shows 'High count!'", async () => {
    render(<CounterMessage />);
    const button = screen.getByText("Increment");
    expect(button).toBeInTheDocument();

    for (let i = 1; i <= 5; i++) {
      await userEvent.click(button);
    }
    expect(screen.getByText("Count: 5")).toBeInTheDocument();
    expect(screen.getByText("High count!")).toBeInTheDocument();
  });
});
