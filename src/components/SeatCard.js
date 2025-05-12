import React from "react";

function SeatCard({ card, onRightClick, from }) {
  const handleContextMenu = (e) => {
    e.preventDefault();
    onRightClick(from, card);
  };

  return (
    <div onContextMenu={handleContextMenu}>
      <img
        src={`/cards/${card}.png`}
        alt={card}
        className="card-img-large"
      />
    </div>
  );
}

export default SeatCard;
