import { getByRole, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
// ↑は、expect(...).toBeInTheDocument()を使うために必要
import ReactRouter from "../../src/reactRouter/ReactRouter";

describe("ReactRouter Component", () => {
  test("show Home Page", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ReactRouter />
      </MemoryRouter>
    );
    expect(await screen.findByText("Home Page")).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: "Go to About" })
    ).toBeInTheDocument();
  });

  test("navigate to About Page", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ReactRouter />
      </MemoryRouter>
    );
    await userEvent.click(screen.getByRole("link", { name: "Go to About" }));
    expect(await screen.findByText("About Page")).toBeInTheDocument();
  });
});
