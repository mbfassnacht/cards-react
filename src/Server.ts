import { cards } from "./mocks/cards";
import { transactions } from "./mocks/transactions";

// the timeout is just to simulate the server response time
export async function fetchCards(): Promise<unknown> {
  return new Promise((resolve) => setTimeout(() => resolve(cards), 300));
}

// the timeout is just to simulate the server response time
export async function fetchTransactionsForCard(
  cardId: string
): Promise<unknown> {
  console.log(`Fetching transactions for card id: ${cardId}`);
  return new Promise((resolve) =>
    setTimeout(() => {
      const transactionsForCard =
        transactions[cardId as keyof typeof transactions];
      resolve(transactionsForCard);
    }, 300)
  );
}
