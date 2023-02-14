import React from "react";
import Cards from "./components/Cards";
import Transactions from "./components/Transactions";
import styled from "styled-components";
import Filter from "./components/Filter";
import { useAppContext } from "./context/AppContext";
import GlobalStyle from "./globalStyles";

function App() {
  const { selectedCard } = useAppContext();

  return (
    <StyledAppContainer>
      <GlobalStyle />
      <Cards />
      {selectedCard && (
        <>
          <Filter /> <Transactions />
        </>
      )}
      {!selectedCard && (
        <p>
          <strong>Hint: </strong>Select a card to see the transactions related
          to this card.
        </p>
      )}
    </StyledAppContainer>
  );
}

const StyledAppContainer = styled.div`
  margin: 0 auto;
  max-width: 800px;
  border: 1px solid black;
  padding: 20px;
`;

export default App;
