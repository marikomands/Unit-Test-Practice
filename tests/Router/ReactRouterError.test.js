import { render } from "@testing-library/react";
import React from "react";
import App from "../../src/reactRouter/App";

test("throws error when Router is missing", () => {
  // suppress console.error for cleaner test output
  const spy = jest.spyOn(console, "error").mockImplementation(() => {});

  expect(() => render(<App />)).toThrow(
    /useRoutes\(\) may be used only in the context of a <Router>/
  );

  spy.mockRestore();
});

// test("確認用：Appを直接レンダリング", () => {
//   render(<App />);
