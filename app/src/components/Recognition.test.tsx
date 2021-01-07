import React from "react";
import { render, screen } from "@testing-library/react";
import Recognition from "./Recognition";
import { BrowserRouter as Router } from "react-router-dom";

it("renders the file upload", async () => {
  render(
    <Router>
      <Recognition />
    </Router>
  );
  expect(screen.getByText(/choose a file/i)).toBeInTheDocument();
});
