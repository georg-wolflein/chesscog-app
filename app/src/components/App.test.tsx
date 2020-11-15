import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders the try it out link", () => {
  render(<App />);
  const linkElement = screen.getByText(/try it out/i);
  expect(linkElement).toBeInTheDocument();
});

it("renders the title", () => {
  render(<App />);
  const titleElement = screen.getByText(
    /recognise chess positions using computer vision/i
  );
  expect(titleElement).toBeInTheDocument();
});
