import React from "react";
import { render, screen } from "@testing-library/react";
import FileUpload from "./FileUpload";

it("renders the file upload text", async () => {
  render(<FileUpload />);
  expect(screen.getByText(/choose a file/i)).toBeInTheDocument();
  expect(screen.getByText(/or drag it here/i)).toBeInTheDocument();
});
