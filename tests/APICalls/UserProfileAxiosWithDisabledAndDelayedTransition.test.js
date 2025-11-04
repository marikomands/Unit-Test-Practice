import React from "react";
import axios from "axios";
import { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {
  mockUserFetchSucceedResponse,
  mockUserSaveSucceedResponse,
  mockSaveErrorNotes,
} from "../../_mocks_/UserProfileAxiosDisabledAndDelayedTransition";
import { SaveSuccess } from "../../src/APICalls/UserProfile/SaveSuccessWithUserLocation";
import { SaveError } from "../../src/APICalls/UserProfile/SaveErrorWithoutUseLocation";
import UserProfileAxiosWithDisabledAndDelayedTransition from "../../src/APICalls/UserProfile/UserProfileAxiosWithDisabledAndDelayedTransition";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock("axios");

describe("API Calls with Disabled and Delayed Transition", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("disabled button when there is no notes and while saving", async () => {
    axios.get.mockResolvedValue(mockUserFetchSucceedResponse);
    axios.post.mockResolvedValue(mockUserSaveSucceedResponse);
    render(<UserProfileAxiosWithDisabledAndDelayedTransition />, {
      wrapper: MemoryRouter,
    });

    const button = await screen.findByRole("button", {
      name: /Save Notes/i,
    });
    expect(button).toBeDisabled();

    const notesInput = screen.getByLabelText(/notes:/i);
    expect(notesInput).toBeInTheDocument();

    await userEvent.type(notesInput, "Hello, this is a note about Kaito.");

    expect(button).not.toBeDisabled();

    await userEvent.click(button);

    expect(
      await screen.findByRole("button", { name: /Saving.../i })
    ).toBeDisabled();
  });

  test("navigate to success page after 1 second delay on successful save", async () => {
    // jest.useFakeTimers();

    axios.get.mockResolvedValue(mockUserFetchSucceedResponse);
    axios.post.mockResolvedValue(mockUserSaveSucceedResponse);
    // jest.useRealTimers();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={<UserProfileAxiosWithDisabledAndDelayedTransition />}
          />
          <Route path="/success" element={<SaveSuccess />} />
          {/* <Route path="/error" element={<SaveError />} /> */}
        </Routes>
      </MemoryRouter>
    );

    const name = await screen.findByText(/Kaito Mands/);
    expect(name).toBeInTheDocument();
    console.log("name:", name.textContent);

    const notesInput = screen.getByLabelText(/notes:/i);
    expect(notesInput).toBeInTheDocument();

    console.log("notesInput before typing:", notesInput.value);

    await userEvent.type(notesInput, "Hello, this is a note about Kaito.");

    await waitFor(() => {
      console.log("notesInput value:", notesInput.value);

      expect(notesInput.value).toBe("Hello, this is a note about Kaito.");
    });

    const button = await screen.findByRole("button", { name: /Save Notes/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();

    await userEvent.click(button);

    // await act(async () => {
    //   jest.runAllTimers();
    //   // jest.advanceTimersByTime(1000);
    // });
    // await Promise.resolve();
    // await Promise.resolve();
    // await Promise.resolve();

    // await Promise.resolve(); // Allow any pending promises to resolve
    await new Promise((r) => setTimeout(r, 1000)); // wait for 1seconds
    await waitFor(() =>
      expect(screen.getByText(/Success!/i)).toBeInTheDocument()
    );
    expect(
      screen.getByText(/User profile and notes saved successfully/i)
    ).toBeInTheDocument();

    // userFakeTimers　didn't work, so replaced with waitFor timeout
    // await waitFor(
    //   () =>
    //     expect(
    //       screen.getByText(/User profile and notes saved successfully/i)
    //     ).toBeInTheDocument(),
    //   { timeout: 2000 }
    // );

    // jest.useRealTimers();
  }, 10000);

  test("navigate to error page after 1 second delay on failed save", async () => {
    axios.get.mockResolvedValue(mockUserFetchSucceedResponse);
    axios.post.mockRejectedValue(mockSaveErrorNotes);
    //   jest.useFakeTimers();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={<UserProfileAxiosWithDisabledAndDelayedTransition />}
          />
          <Route path="/error" element={<SaveError />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText(/Kaito Mands/);

    await userEvent.type(
      screen.getByPlaceholderText("Add notes about this user..."),
      "Hello, this is a note about Kaito."
    );

    const button = screen.getByRole("button", { name: /Save Notes/i });

    await userEvent.click(button);

    //   act(() => {
    //     jest.advanceTimersByTime(1000);
    //   });

    //   await Promise.resolve(); // Allow any pending promises to resolve

    await new Promise((r) => setTimeout(r, 1000)); // wait for 1seconds
    await waitFor(() =>
      expect(
        screen.getByText(/Failed to save user profile and notes/i)
      ).toBeInTheDocument()
    );
  });
});
// useFakeTimers　didn't work in these tests, so replaced with waitFor timeout
