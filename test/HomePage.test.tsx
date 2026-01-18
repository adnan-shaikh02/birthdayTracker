import React from "react";
import "@testing-library/jest-dom";
import HomePage from "../src/HomePage";
import {
  describe,
  it,
  expect,
  render,
  screen,
  waitFor,
} from "./baseTestSetupFile";

describe("HomePage Component", () => {
  it("should render HomePage Navbar Title Correctly", async () => {
    // Arrange & Act
    // Render the HomePage component
    render(<HomePage />);

    // Wait for the loader to finish
    await waitFor(
      () => {
        expect(screen.getByTestId("navbar-component")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // Assert
    const element = screen.getByText(/Event Diaries/i);
    expect(element).toBeInTheDocument();
  });

  it("should render HomePage Toogle Correctly", async () => {
    // Arrange
    render(<HomePage />);

    // Wait for the loader to finish
    await waitFor(
      () => {
        expect(screen.getByTestId("navbar-component")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // Act
    const element = screen.getByTestId("toggle-switch");

    // Assert
    expect(element).toBeInTheDocument();
  });

  it("should contain navbar, TitleContent and Calendar Component by default on load", async () => {
    // Arrange
    render(<HomePage />);

    // Wait for the loader to finish and components to appear
    await waitFor(
      () => {
        expect(screen.getByTestId("navbar-component")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    // Act
    const navbarElement = screen.getByTestId("navbar-component");
    const titleContentElement = screen.getByTestId("titlecontent-component");
    const calendarElement = screen.getByTestId("calendar-component");

    // Assert
    expect(navbarElement).toBeInTheDocument();
    expect(titleContentElement).toBeInTheDocument();
    expect(calendarElement).toBeInTheDocument();
  });

  it("should switch between Calendar and AgGrid component on toggle switch", async () => {
    // Arrange
    render(<HomePage />);

    // Wait for the loader to finish and content to appear
    await waitFor(
      () => {
        expect(screen.getByTestId("calendar-component")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );

    const toggleSwitch = screen.getByTestId(
      "toggle-switch",
    ) as HTMLInputElement;

    // Act & Assert
    // Initially, Calendar component should be present
    expect(screen.getByTestId("calendar-component")).toBeInTheDocument();

    // Toggle the switch
    toggleSwitch.click();

    // After toggling, AgGrid component should be present
    await waitFor(() => {
      expect(screen.getByTestId("aggrid-component")).toBeInTheDocument();
    });
  });
});
