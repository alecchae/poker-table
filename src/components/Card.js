import React, { useEffect } from "react";
import { useDrag } from "react-dnd";

function Card({ card, onDragStart }) {
  const [{ isDragging }, drag, preview] = useDrag({
    type: "CARD",
    item: { card },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (isDragging) {
      onDragStart(card);
    }
  }, [isDragging, card, onDragStart]);

  return (
    <div ref={drag} className="card" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <img src={`/cards/${card}.png`} alt={card} className="card-img" />
    </div>
  );
}

export default Card;
