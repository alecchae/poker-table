import React from "react";
import { useDrag } from "react-dnd";

function DraggableCard({ card, from, onRightClick }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { card, from },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent right-click menu
    onRightClick(from, card);
  };

  return (
    <div
      ref={drag}
      onContextMenu={handleContextMenu}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img
        src={`/cards/${card}.png`}
        alt={card}
        className="card-img-large"
      />
    </div>
  );
}

export default DraggableCard;
