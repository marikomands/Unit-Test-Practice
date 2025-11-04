import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Profile from "../../src/APICalls/Profile";
import {
  successFetchAndSave,
  uccessFetchButAuthenticationError,
  networkFetchError,
} from "../../_mocks_/profileFetch";

global.fetch = jest.fn();

describe("fetch profile data with auth", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("fetch user profile with valid token successfully ", async () => {
    fetch.mockImplementation(successFetch);
    render(<Profile token="valid_token" />);
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("https://api.example.com/profile", {
        headers: { Authorization: "Bearer valid_token" },
      });
    });
    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(
      await screen.findByText("Email: john_doe@hotmail.com")
    ).toBeInTheDocument();
  });

  test("fetch user profile with invalid token failed", async () => {
    fetch.mockImplementation(successFetchButAuthenticationError);
    render(<Profile token="invalid_token" />);
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("https://api.example.com/profile", {
        headers: { Authorization: "Bearer invalid_token" },
      });
    });
    expect(await screen.findByText("Unauthorized")).toBeInTheDocument();
  });

  test("fetch user profile with network error", async () => {
    fetch.mockImplementation(networkFetchError);
    render(<Profile token="any_token" />);
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("https://api.example.com/profile", {
        headers: { Authorization: "Bearer any_token" },
      });
    });
    expect(await screen.findByText("Network error")).toBeInTheDocument();
  });
});
