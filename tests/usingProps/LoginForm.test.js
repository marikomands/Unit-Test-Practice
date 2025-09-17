import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import LoginForm from "../../src/usingProps/LoginForm";
// props(onAdd) from parent component
describe("submit login form ", () => {
  test("loaded login form ", () => {
    render(<LoginForm onLogin={jest.fn()} />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeEnabled();
  });

  test("calls onLogin with email and password when submitted and reset the form", async () => {
    const mockOnLogin = jest.fn();
    render(<LoginForm onLogin={mockOnLogin} />);
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });
    await userEvent.type(emailInput, "marijo_ttt@hotmail.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(loginButton);
    expect(mockOnLogin).toHaveBeenCalledWith({
      email: "marijo_ttt@hotmail.com",
      password: "password123",
    });
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
  });
});
