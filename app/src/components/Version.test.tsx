import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Version from "./Version";
import { API } from "../core/api";

it("renders the correct version numbers", async () => {
  var apiFunc = jest.spyOn(API, "getVersion").mockImplementationOnce(() => {
    return Promise.resolve({
      chesscog: "1.2.3",
      api: "4.5.6",
    });
  });
  render(<Version />);
  await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));
  expect(apiFunc).toHaveBeenCalled();
  const chesscogVersion = screen.getByText(/chesscog v1.2.3/i);
  const apiVersion = screen.getByText(/api v4.5.6/i);
  expect(chesscogVersion).toBeInTheDocument();
  expect(apiVersion).toBeInTheDocument();
});
