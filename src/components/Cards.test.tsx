import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Cards from "./Cards";
import { AppProvider } from "../context/AppContext";
import { cards } from "../mocks/cards";

test("renders loading... when the cards are still not fetched", () => {
  render(
    <AppProvider>
      <Cards />
    </AppProvider>
  );

  const hintElement = screen.getByText("Loading...");
  expect(hintElement).toBeInTheDocument();
});

test("renders the cards after fetching the values from the API", async () => {
  render(
    <AppProvider>
      <Cards />
    </AppProvider>
  );

  await waitFor(() =>
    expect(screen.getAllByTestId("card")).toHaveLength(cards.length)
  );
});
