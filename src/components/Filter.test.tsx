import React from "react";
import { render, screen } from "@testing-library/react";
import Filter from "./Filter";
import { AppProvider } from "../context/AppContext";

test("renders a label with Amount Filter", () => {
  render(
    <AppProvider>
      <Filter />
    </AppProvider>
  );

  const labelElement = screen.getByLabelText("Amount Filter");
  expect(labelElement).toBeInTheDocument();
});

test("renders an input", () => {
  render(
    <AppProvider>
      <Filter />
    </AppProvider>
  );

  const labelElement = screen.getByTestId("filter-input");
  expect(labelElement).toBeInTheDocument();
});
