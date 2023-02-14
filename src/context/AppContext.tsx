import { createContext, useContext, ReactNode, useState } from "react";
import { Transaction } from "../types/transaction";
import { Card } from "../types/card";

export enum CardColor {
  COLOR_1 = "2a9d8f",
  COLOR_2 = "264653",
  COLOR_3 = "e9c46a",
  COLOR_4 = "f4a261",
  COLOR_5 = "e76f51",
}

export const cardColors = Object.values(CardColor);

type AppContextType = {
  cards: Card[];
  cardsColors: Record<string, CardColor>;
  transactions: Transaction[];
  selectedCard: Card | undefined;
  filter: string;
  setFilter: (filter: string) => void;
  setCards: (cards: Card[]) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setSelectedCard: (selectedCard: Card) => void;
};

export const contextDefaultValues: AppContextType = {
  cards: [],
  cardsColors: {},
  transactions: [],
  selectedCard: undefined,
  filter: "",
  setFilter: () => {},
  setCards: () => {},
  setTransactions: () => {},
  setSelectedCard: () => {},
};

const AppContext = createContext<AppContextType>(contextDefaultValues);

export function useAppContext() {
  return useContext(AppContext);
}

type Props = {
  children: ReactNode;
  presetValue?: AppContextType;
};

export function AppProvider({ children, presetValue }: Props) {
  const [cards, _setCards] = useState<Card[]>(
    presetValue?.cards || contextDefaultValues.cards
  );
  const [transactions, _setTransactions] = useState<Transaction[]>(
    presetValue?.transactions || contextDefaultValues.transactions
  );
  const [filter, _setFilter] = useState<string>(
    presetValue?.filter || contextDefaultValues.filter
  );

  const [cardsColors, setCardsColors] = useState<Record<string, CardColor>>(
    contextDefaultValues.cardsColors
  );

  const [selectedCard, _setSelectedCard] = useState<Card | undefined>(
    presetValue?.selectedCard || contextDefaultValues.selectedCard
  );

  const setCards = (cards: Card[]) => {
    const colors: Record<string, CardColor> = {};
    cards.forEach((card, index) => {
      colors[card.id] = cardColors[index % 5];
    });
    setCardsColors(colors);
    _setCards(cards);
  };

  const setTransactions = (transactions: Transaction[]) => {
    _setTransactions(transactions);
  };

  const setFilter = (filter: string) => {
    _setFilter(filter);
  };

  const setSelectedCard = (selectedCard: Card) => {
    _setSelectedCard(selectedCard);
  };

  const value = {
    cards,
    cardsColors,
    transactions,
    selectedCard,
    filter,
    setFilter,
    setCards,
    setTransactions,
    setSelectedCard,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
