import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Transactions from "./Transactions";
import { AppProvider, contextDefaultValues } from "../context/AppContext";
import { cards } from "../mocks/cards";
import { transactions } from "../mocks/transactions";

test("renders loading... when the transactions are still not fetched", () => {
  render(
    <AppProvider>
      <Transactions />
    </AppProvider>
  );

  const hintElement = screen.getByText("Loading...");
  expect(hintElement).toBeInTheDocument();
});

test("renders the transactions after fetching the values from the API", async () => {
  render(
    <AppProvider
      presetValue={{
        ...contextDefaultValues,
        selectedCard: cards[1],
      }}
    >
      <Transactions />
    </AppProvider>
  );

  await waitFor(() =>
    expect(screen.getAllByTestId("transaction")).toHaveLength(
      transactions[cards[1].id as keyof typeof transactions].length
    )
  );
});

test("renders the correct amount content for transactions", async () => {
  render(
    <AppProvider
      presetValue={{
        ...contextDefaultValues,
        selectedCard: cards[1],
      }}
    >
      <Transactions />
    </AppProvider>
  );

  await waitFor(() => {
    const firstTransaction =
      transactions[cards[1].id as keyof typeof transactions][0];
    const transactionAmountElement = screen.getByText(firstTransaction.amount);
    expect(transactionAmountElement).toBeInTheDocument();
  });
});
