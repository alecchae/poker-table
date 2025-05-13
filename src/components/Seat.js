import React from "react";
import { useDrop } from "react-dnd";
import SeatCard from "./SeatCard";

function Seat({ position, cards, onDropCard, onRemoveCard }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (item) => {
  onDropCard(position, item.card);
},
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`seat ${isOver ? "seat-hover" : ""}`}>
      <div className="seat-label">{position}</div>
      <div className="seat-cards">
        {cards.map((card, idx) => (
          <SeatCard
            key={idx}
            card={card}
            from={position}
            onRightClick={onRemoveCard}
          />
        ))}
      </div>
    </div>
  );
}

export default Seat;
