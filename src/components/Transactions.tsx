import React from "react";
import { useAppContext } from "../context/AppContext";
import styled from "styled-components";
import { fetchTransactionsForCard } from "../Server";
import { Transaction } from "../types/transaction";
import { Card } from "../types/card";

function Transactions() {
  const { transactions, cardsColors, selectedCard, setTransactions, filter } =
    useAppContext();
  const [filteredTransaction, setFilteredTransaction] = React.useState<
    Transaction[]
  >([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadTransactions(card: Card) {
      try {
        setLoading(true);
        const transactions = (await fetchTransactionsForCard(
          card.id
        )) as Transaction[];
        setTransactions(transactions);
        setFilteredTransaction(transactions);
      } catch {
        // do something with error message, no needed for the coding challenge
      } finally {
        setLoading(false);
      }
    }

    if (selectedCard) {
      loadTransactions(selectedCard);
    }
  }, [selectedCard]);

  React.useEffect(() => {
    if (filter.trim() === "") {
      setFilteredTransaction(transactions);
    } else {
      setFilteredTransaction(
        transactions.filter(
          (transaction) => transaction.amount >= Number.parseFloat(filter)
        )
      );
    }
  }, [filter]);

  if (loading) {
    return <StyledTransactionsList>Loading...</StyledTransactionsList>;
  }

  return (
    <StyledTransactionsList>
      {filteredTransaction.map((transaction) => {
        return (
          <StyledTransaction
            data-testid="transaction"
            key={transaction.id}
            color={cardsColors[selectedCard!.id]}
          >
            <p>{transaction.description}</p>
            <p>{transaction.amount}</p>
          </StyledTransaction>
        );
      })}
    </StyledTransactionsList>
  );
}

const StyledTransactionsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: center;
  padding: 0px;
`;

const StyledTransaction = styled.li`
  width: 100%;
  border-radius: 10px;
  color: white;
  padding: 10px;
  background-color: ${(props) => `#${props.color}`};
  margin: 10px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default Transactions;
