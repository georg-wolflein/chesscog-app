import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders the try it out link", () => {
  render(<App />);
  const linkElements = screen.getAllByText(/try it out/i);
  expect(linkElements.length > 0);
});

it("renders the title", () => {
  render(<App />);
  const titleElement = screen.getByText(
    /recognise chess positions using computer vision/i
  );
  expect(titleElement).toBeInTheDocument();
});
