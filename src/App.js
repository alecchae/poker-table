import React, { useState } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from "./components/Card";
import Table from "./components/Table";
import "./styles.css";

const positions = ["UTG", "UTG+1", "MP", "LJ", "HJ", "CO", "BTN", "SB", "BB"];

const fullDeck = [];
["C", "D", "H", "S"].forEach((suit) => {
  ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"].forEach((rank) => {
    fullDeck.push(`${rank}${suit}`);
  });
});

function AppWrapper() {
  return (
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  );
}

function App() {
  const initialSeats = positions.reduce((acc, pos) => ({ ...acc, [pos]: [] }), {});
  const [seats, setSeats] = useState(initialSeats);
  const [availableCards, setAvailableCards] = useState(fullDeck);
  const [draggedCard, setDraggedCard] = useState(null);

  const handleDropCard = (position, card) => {
    setSeats((prev) => {
      if (prev[position].includes(card) || prev[position].length >= 2) return prev;
      return { ...prev, [position]: [...prev[position], card] };
    });
  };

  const handleRemoveCard = (fromPosition, card) => {
    setSeats((prev) => ({
      ...prev,
      [fromPosition]: prev[fromPosition].filter((c) => c !== card),
    }));
    setAvailableCards((prev) => [...prev, card].sort(cardSort));
  };

  const handleReset = () => {
    setSeats(initialSeats);
    setAvailableCards(fullDeck);
    setDraggedCard(null);
  };

  const handleDragStart = (card) => {
    setAvailableCards((prev) => prev.filter((c) => c !== card));
    setDraggedCard(card);
  };

  const cardSort = (a, b) => fullDeck.indexOf(a) - fullDeck.indexOf(b);

  const [, dropRef] = useDrop(() => ({
    accept: "CARD",
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        setAvailableCards((prev) => [...prev, item.card].sort(cardSort));
      }
      setDraggedCard(null);
    },
  }));

  return (
    <div className="app" ref={dropRef}>
      <div className="top-bar">
        <button onClick={handleReset} className="reset-button">Reset Table</button>
      </div>

      <div className="card-bar no-scroll">
        {availableCards.map((card) => (
          <Card key={card} card={card} onDragStart={handleDragStart} />
        ))}
      </div>

      <Table
        seats={seats}
        onDropCard={(pos, card) => {
          handleDropCard(pos, card);
          setDraggedCard(null);
        }}
        onRemoveCard={handleRemoveCard}
      />
    </div>
  );
}

export default AppWrapper;
