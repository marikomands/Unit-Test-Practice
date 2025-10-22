import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import UserProfile from "../../src/APICalls/UserProfile/UserProfileAxiosWithRoute";
import {
  mockSaveSuccessNotes,
  mockUserFetchSucceedResponse,
  mockSaveErrorNotes,
} from "../../_mocks_/UserProfileAxios";
import SaveSuccess from "../../src/APICalls/UserProfile/SaveSuccess";
import SaveError from "../../src/APICalls/UserProfile/SaveError";
import axios from "axios";
// import { act } from "react";
import "@testing-library/jest-dom";

jest.mock("axios");

describe("UserProfileAxiosWithRoutes Component", () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  test("navigates to success page after clicking save button", async () => {
    // Mock axios response
    axios.get.mockResolvedValueOnce(mockUserFetchSucceedResponse);
    axios.post.mockResolvedValueOnce(mockSaveSuccessNotes);

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/success" element={<SaveSuccess />} />
        </Routes>
      </MemoryRouter>
    );

    // let textarea;
    // await waitFor(() => {
    //   textarea = screen.getByPlaceholderText(/Add notes about this user.../i);
    //   expect(textarea).toBeInTheDocument();
    // });

    const textarea = await screen.findByPlaceholderText(
      /Add notes about this user.../i
    );
    expect(textarea).toBeInTheDocument();

    await userEvent.type(textarea, "Test note");

    const button = screen.getByRole("button", { name: /Save Notes/i });

    await userEvent.click(button);

    const successMessage = await screen.findByText(/Saved Successfully!/i);
    expect(successMessage).toBeInTheDocument();
  });

  test("shows error message on failed save", async () => {
    axios.get.mockResolvedValueOnce(mockUserFetchSucceedResponse);
    axios.post.mockRejectedValueOnce(mockSaveErrorNotes);

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/error" element={<SaveError />} />
        </Routes>
      </MemoryRouter>
    );

    const textarea = await screen.findByPlaceholderText(
      /Add notes about this user.../i
    );
    expect(textarea).toBeInTheDocument();

    await userEvent.type(textarea, "Test note");

    const button = screen.getByRole("button", { name: /Save Notes/i });

    await userEvent.click(button);

    const errorMessage = await screen.findByText(
      /Failed to save user profile and notes/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
