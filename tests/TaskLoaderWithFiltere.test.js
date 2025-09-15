import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { successFetch, errorFetch } from "../_mocks_/fetch";
import TaskLoader from "../src/TaskLoaderWithFilter";

// const mockTasks = [
//   { id: 1, text: "Buy groceries" },
//   { id: 2, text: "Do homework" },
//   { id: 3, text: "Call mom" },
// ];

// Another option
// fetch をモック化
// beforeEach(() => {
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       ok: true,
//       json: () => Promise.resolve(mockTasks),
//     })
//   );
// });

// Anotherway of writing API fetching mock
// const successFetch = () =>
//   Promise.resolve({
//     ok: true,
//     json: () => Promise.resolve(mockTasks),
//   });

// const errorFetch = () =>
//   Promise.resolve({
//     ok: false,
//     status: 500,
//     json: async () => ({ message: "Internal Server Error" }),
//   });

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test("fetching succeeded", async () => {
  fetch.mockImplementation(successFetch);
  render(<TaskLoader />);
  await waitFor(() => {
    expect(screen.getByText("Mocked Task")).toBeInTheDocument();
    expect(screen.getByText("Collecting Kids")).toBeInTheDocument();
    expect(screen.getByText("Cook Dinner")).toBeInTheDocument();
  });
});

test("show only filterd text", async () => {
  fetch.mockImplementation(successFetch);
  render(<TaskLoader />);
  expect(await screen.findByText("Mocked Task")).toBeInTheDocument();
  expect(await screen.findByText);
  expect(await screen.findByText("Collecting Kids")).toBeInTheDocument();
  const input = screen.getByPlaceholderText("Search tasks...");
  await userEvent.type(input, "Mocked Task");
  expect(screen.getByText("Mocked Task")).toBeInTheDocument();
  expect(screen.queryByText("Collecting Kids")).not.toBeInTheDocument();
  expect(screen.queryByText("Cook Dinner")).not.toBeInTheDocument();
});

test("No tasks match the filter", async () => {
  fetch.mockImplementation(successFetch);
  render(<TaskLoader />);
  const input = await screen.findByPlaceholderText("Search tasks...");
  await userEvent.type(input, "study coding");
  expect(await screen.findByText("No tasks found.")).toBeInTheDocument();
});

test("fetching failed", async () => {
  fetch.mockImplementation(errorFetch);
  render(<TaskLoader />);
  expect(await screen.findByRole("alert")).toHaveTextContent("Failed to fetch");
});
