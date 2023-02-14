import React from "react";
import { useAppContext } from "../context/AppContext";
import styled from "styled-components";
import { Card } from "../types/card";
import { fetchCards } from "../Server";

interface StyledCardProps {
  color: string;
}

function Cards() {
  const { cards, cardsColors, setSelectedCard, setCards, setFilter } =
    useAppContext();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadInitialData() {
      try {
        const cards = (await fetchCards()) as Card[];
        setCards(cards);
      } catch {
        // do something with error message, no needed for the coding challenge
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your cards</h2>
      <StyledCardsList>
        {cards.map((card) => (
          <StyledCard
            data-testid="card"
            onClick={() => {
              setSelectedCard(card);
              setFilter("");
            }}
            key={card.id}
            color={cardsColors[card.id]}
          >
            <p>{card.description}</p>
            <p>{card.id}</p>
          </StyledCard>
        ))}
      </StyledCardsList>
    </div>
  );
}

const StyledCardsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: space-between;
  padding: 0px;
`;

const StyledCard = styled.li<StyledCardProps>`
  width: 280px;
  height: 155px;
  border-radius: 20px;
  color: white;
  padding: 20px;
  font-size: 24px;
  background-color: ${(props) => `#${props.color}`};
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`;

export default Cards;
