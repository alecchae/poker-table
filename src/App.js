// App.js
import React, { useState, useRef, useEffect } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDropCard = (position, card) => {
  setSeats((prevSeats) => {
    const seat = prevSeats[position];

    // ❌ Reject: seat already has 2 cards or this card
    if (seat.includes(card) || seat.length >= 2) {
      // Restore to top
      setAvailableCards((prevAvailable) => {
        if (!prevAvailable.includes(card)) {
          return [...prevAvailable, card].sort(cardSort);
        }
        return prevAvailable;
      });

      return prevSeats; // No change
    }

    // ✅ Accept: add card to seat
    setAvailableCards((prevAvailable) =>
      prevAvailable.filter((c) => c !== card)
    );

    return {
      ...prevSeats,
      [position]: [...seat, card],
    };
  });

  setDraggedCard(null);
};


  const handleRemoveCard = (fromPosition, card) => {
    if (fromPosition) {
      setSeats((prev) => ({
        ...prev,
        [fromPosition]: prev[fromPosition].filter((c) => c !== card),
      }));
    }

    // Add back to top if not already there
    setAvailableCards((prev) => {
      if (!prev.includes(card)) {
        return [...prev, card].sort(cardSort);
      }
      return prev;
    });

    setDraggedCard(null);
  };

  const handleRemoveCommunityCard = (stage, card) => {
  setCommunity((prev) => ({
    ...prev,
    [stage]: prev[stage].filter((c) => c !== card)
  }));

  // Optionally return card to top bar
  if (!availableCards.includes(card)) {
    setAvailableCards((prev) => [...prev, card].sort(cardSort));
  }
};

const handleDropCommunityCard = (stage, card, limit) => {
  const current = communityRef.current[stage];

  // ❌ Reject if full or already added
  if (current.includes(card) || current.length >= limit) {
    // ✅ Restore it back to top if it was dragged
    if (!availableCards.includes(card)) {
      setAvailableCards((prev) => [...prev, card].sort(cardSort));
    }
    setDraggedCard(null);
    return;
  }

  // ✅ Accept card
  setCommunity((prev) => ({
    ...prev,
    [stage]: [...prev[stage], card],
  }));

  setAvailableCards((prev) => prev.filter((c) => c !== card));
  setDraggedCard(null);
};


  const handleReset = () => {
  setSeats(initialSeats);
  setAvailableCards(fullDeck);
  setCommunity({
    flop: [],
    turn: [],
    river: []
  });
  setDraggedCard(null);
};

  const handleDragStart = (card) => {
    setDraggedCard(card);
    // Remove from top immediately
    //setAvailableCards((prev) => prev.filter((c) => c !== card));
  };

  const returnCardToTop = (card) => {
    setAvailableCards((prev) => {
      if (!prev.includes(card)) {
        return [...prev, card].sort(cardSort);
      }
      return prev;
    });
    setDraggedCard(null);
  };

  const cardSort = (a, b) => fullDeck.indexOf(a) - fullDeck.indexOf(b);

  const [community, setCommunity] = useState({
  flop: [],
  turn: [],
  river: [],
});
const communityRef = useRef(community);

// Keep it updated
useEffect(() => {
  communityRef.current = community;
}, [community]);


  const [, dropRef] = useDrop(() => ({
    accept: "CARD",
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        returnCardToTop(item.card);
      }
      setDraggedCard(null);
    },
  }));

  return (
  <div className={`app ${sidebarOpen ? "with-sidebar" : ""}`} ref={dropRef}>
    {/* Sidebar Panel */}
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <h2>Analysis</h2>
      {/* Put solver results, stats, etc. here */}
    </div>

    {/* Sidebar Toggle Tab */}
    <div className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
      {sidebarOpen ? "⮞" : "⮜"}
    </div>

    {/* Top Card Bar */}
    <div className="card-bar no-scroll">
      {availableCards.map((card) => (
        <Card key={card} card={card} onDragStart={handleDragStart} />
      ))}
    </div>

    {/* Poker Table */}
    <Table
      seats={seats}
      onDropCard={handleDropCard}
      onRemoveCard={handleRemoveCard}
      returnCardToTop={returnCardToTop}
      community={community}
      onDropCommunityCard={handleDropCommunityCard}
      onRemoveCommunityCard={handleRemoveCommunityCard}
    />

    {/* Reset Button */}
    <button onClick={handleReset} className="reset-button">Reset Table</button>
  </div>
);
}

export default AppWrapper;
