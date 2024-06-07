import React, { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import App from "../src/App";

// Mock axios
jest.mock("axios");

describe("App Component", () => {
  it("should render the search input", () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText("username");
    expect(inputElement).toBeInTheDocument();
  });

  it("should handle input change and debounce", async () => {
    jest.useFakeTimers();

    render(<App />);
    const inputElement = screen.getByPlaceholderText("username");

    fireEvent.change(inputElement, { target: { value: "testuser" } });
    expect(axios).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => expect(axios).toHaveBeenCalled());
  });

  it("should handle empty username input", async () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText("username");

    fireEvent.change(inputElement, { target: { value: "" } });

    await waitFor(() => {
      expect(screen.getByTestId("app-github-search-name").textContent).toEqual(
        "No Name"
      );
      expect(screen.getByTestId("app-github-search-bio").textContent).toEqual(
        "No Bio"
      );
    });
  });

  it("should handle API error", async () => {
    axios.mockRejectedValueOnce(new Error("API Error"));

    render(<App />);
    const inputElement = screen.getByPlaceholderText("username");

    fireEvent.change(inputElement, { target: { value: "testuser" } });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(screen.getByTestId("app-github-search-name").textContent).toEqual(
        "No Name"
      );
      expect(screen.getByTestId("app-github-search-bio").textContent).toEqual(
        "No Bio"
      );
    });
  });
});
