import React from "react";
import { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LocationSender from "../../src/APICalls/Geolocation";
import {
  mockGeolocation,
  mockPosition,
  successFetchAndSaved,
  successFetchAndErrorSaved,
  networkErrorFetch,
} from "../../_mocks_/APIGeolocation";
import "@testing-library/jest-dom";

beforeEach(() => {
  global.navigator.geolocation = mockGeolocation;
  global.fetch = jest.fn();
  jest.clearAllMocks();
});

test("fetch and saved ocation succeeded", async () => {
  mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
    success(mockPosition)
  );
  fetch.mockImplementationOnce(successFetchAndSaved);

  render(<LocationSender />);
  await act(async () => {
    await fireEvent.click(screen.getByText("Send Location"));
  });

  await waitFor(async () => {
    expect(screen.getByText("Location saved successfully")).toBeInTheDocument();
  });
});

test("fetch succeeded, but failed to save location", async () => {
  mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
    success(mockPosition)
  );
  fetch.mockImplementationOnce(successFetchAndErrorSaved);

  render(<LocationSender />);
  await act(async () => {
    await fireEvent.click(await screen.findByText("Send Location"));
  });
  expect(
    await screen.findByText("Failed to save location")
  ).toBeInTheDocument();
});

test("handles network error (fetch failed)", async () => {
  mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
    success(mockPosition)
  );
  fetch.mockImplementationOnce(networkErrorFetch);

  render(<LocationSender />);
  await act(async () => {
    await fireEvent.click(await screen.findByText("Send Location"));
  });
  expect(await screen.findByText("Network error")).toBeInTheDocument();
});

test("handles geolocation error", async () => {
  mockGeolocation.getCurrentPosition.mockImplementationOnce((_, error) =>
    error({ message: "Permission denied" })
  );
  //   error receiving about geolocation information
  render(<LocationSender />);
  await act(async () => {
    fireEvent.click(await screen.findByText("Send Location"));
  });
  expect(await screen.findByText("Permission denied")).toBeInTheDocument();
});

test("handles unsupported geolocation", async () => {
  Object.defineProperty(global.navigator, "geolocation", {
    value: undefined,
    configurable: true,
  });

  render(<LocationSender />);

  await act(async () => {
    await fireEvent.click(screen.getByText("Send Location"));
  });
  expect(
    await screen.findByText("Geolocation not supported")
  ).toBeInTheDocument();
});
