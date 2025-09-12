import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { successFetch, errorFetch } from "../_mocks_/fetch";
import TaskLoader from "../src/TaskLoader";

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test("成功時の表示", async () => {
  fetch.mockImplementation(successFetch);
  render(<TaskLoader />);
  expect(await screen.findByText("Mocked Task")).toBeInTheDocument();
  expect(screen.getByText("Collecting Kids")).toBeInTheDocument();
  expect(screen.getByText("Cook Dinner")).toBeInTheDocument();
});
// mockimplementation ha jext.fn(0が呼ばれた時にしてほしい内容)
test("失敗時の表示", async () => {
  fetch.mockImplementation(errorFetch);
  render(<TaskLoader />);
  expect(await screen.findByRole("alert")).toHaveTextContent("Failed to fetch");
  // expect(await screen.findByText("Failed to fetch")).toBeInTheDocument();
});
