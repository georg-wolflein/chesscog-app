import React from "react";
import { render, screen } from "@testing-library/react";
import Recognition from "./Recognition";

it("renders the file upload", async () => {
  render(<Recognition />);
  expect(screen.getByText(/choose a file/i)).toBeInTheDocument();
});
