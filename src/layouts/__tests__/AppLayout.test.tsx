import React from "react";
import { render, screen } from "@testing-library/react";
import AppLayout from "../AppLayout";

jest.mock("../NavBar", () => () => {
  return <div />;
});

it("renders with children", () => {
  render(<AppLayout>Children Text</AppLayout>);
  expect(screen.getByText("Children Text")).toBeInTheDocument();
});
