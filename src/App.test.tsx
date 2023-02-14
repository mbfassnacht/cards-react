import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { AppProvider, contextDefaultValues } from "./context/AppContext";

test("renders hint element when no selectedCard", () => {
  render(
    <AppProvider>
      <App />
    </AppProvider>
  );

  const hintElement = screen.getByText(
    "Select a card to see the transactions related to this card."
  );
  expect(hintElement).toBeInTheDocument();
});

test("do not renders hint element a card is selected", () => {
  render(
    <AppProvider
      presetValue={{
        ...contextDefaultValues,
        selectedCard: { id: "dasdasdas", description: "hellooo" },
      }}
    >
      <App />
    </AppProvider>
  );

  expect(
    screen.queryByText(
      "Select a card to see the transactions related to this card."
    )
  ).toBeNull();
});
