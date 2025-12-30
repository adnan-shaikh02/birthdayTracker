import React from "react";
import "@testing-library/jest-dom";
import HomePage from "../src/HomePage";
import { describe, it, expect, render, screen } from "./baseTestSetupFile";

describe("HomePage Component", () => {
  it("should render HomePage Navbar Title Correctly", () => {
    // Arrange & Act
    // Render the HomePage component
    render(<HomePage />);

    // Assert
    const element = screen.getByText(/Event Diaries/i);
    expect(element).toBeInTheDocument();
  });

    it("should render HomePage Toogle Correctly", () => {
    // Arrange
    render(<HomePage />);

    // Act
    const element = screen.getByTestId("toggle-switch");
    
    // Assert
    expect(element).toBeInTheDocument();
  });

  it("should contain navbar, TitleContent and Calendar Component by default on load", () => {
    // Arrange
    render(<HomePage />);

    // Act
    const navbarElement = screen.getByTestId("navbar-component");
    const titleContentElement = screen.getByTestId("titlecontent-component");
    const calendarElement = screen.getByTestId("calendar-component");

    expect(navbarElement).toBeInTheDocument();
    expect(titleContentElement).toBeInTheDocument();
    expect(calendarElement).toBeInTheDocument();
  });

  it("should switch between Calendar and AgGrid component on toggle switch", () => {
    // Arrange
    render(<HomePage />);
    const toggleSwitch = screen.getByTestId("toggle-switch") as HTMLInputElement;

    // Act & Assert
    // Initially, Calendar component should be present
    expect(screen.getByTestId("calendar-component")).toBeInTheDocument();

    // Toggle the switch
    toggleSwitch.click();

    // After toggling, AgGrid component should be present
    expect(screen.getByTestId("aggrid-component")).toBeInTheDocument();
  });
});