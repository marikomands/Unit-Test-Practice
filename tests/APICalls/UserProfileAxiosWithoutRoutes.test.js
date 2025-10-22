import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import axios from "axios";
import UserProfile from "../../src/APICalls/UserProfile/UserProfileAxiosWithoutRoute";
import {
  mockUserFetchSucceedResponse,
  mockUserFetchErrorResponse,
  mockSaveSuccessNotes,
  mockSaveErrorNotes,
} from "../../_mocks_/UserProfileAxios";
import { act } from "react";

jest.mock("axios");

describe("user profile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetch user profile successfully", async () => {
    const fetchStatus = axios.get.mockResolvedValueOnce(
      mockUserFetchSucceedResponse
    );
    render(<UserProfile />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await act(async () => {
      render(<UserProfile />);
    });

    expect(await screen.findByText("Mariko Mands")).toBeInTheDocument();
    expect(
      await screen.findByText("Email: mariko.mands@example.com")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Notes: Hello, this is a note about Mariko.")
    ).toBeInTheDocument();
  });

  test("save notes successfully", async () => {
    axios.get.mockResolvedValueOnce(mockUserFetchSucceedResponse);
    axios.post.mockResolvedValueOnce(mockSaveSuccessNotes);

    render(<UserProfile />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await act(async () => {
      render(<UserProfile />);
    });

    const button = await screen.findByRole("button", { name: "Save Notes" });
    expect(button).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(button);
    });

    expect(await screen.findByText("Mariko Mands")).toBeInTheDocument();
    expect(
      await screen.findByText("Email: mariko.mands@example.com")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Notes: Hello, this is a note about Mariko.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("User profile and notes saved successfully")
    ).toBeInTheDocument();
  });

  test("fetch user profile failed", async () => {
    axios.get.mockRejectedValueOnce(mockUserFetchErrorResponse);
    render(<UserProfile />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await act(async () => {
      render(<UserProfile />);
    });

    expect(
      await screen.findByText("Network error: Unable to fetch user data.")
    ).toBeInTheDocument();
    expect(await screen.findByText("Error Status: 500")).toBeInTheDocument();
  });

  test("save notes failed", async () => {
    axios.get.mockResolvedValueOnce(mockUserFetchSucceedResponse);
    axios.post.mockRejectedValueOnce(mockSaveErrorNotes);
    render(<UserProfile />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await act(async () => {
      render(<UserProfile />);
    });

    expect(await screen.findByText("Mariko Mands")).toBeInTheDocument();
    expect(
      await screen.findByText("Email: mariko.mands@example.com")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Notes: Hello, this is a note about Mariko.")
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(await screen.findByText("Save Notes"));
    });

    expect(
      await screen.findByText("Failed to save user profile and notes")
    ).toBeInTheDocument();

    expect(await screen.findByText("Error Status: 400")).toBeInTheDocument();
  });
});
