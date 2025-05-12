import React from "react";
import Seat from "./Seat";

function Table({ seats, onDropCard, onRemoveCard }) {
  const seatLabels = ["UTG", "UTG+1", "MP", "LJ", "HJ", "CO", "BTN", "SB", "BB"];

// Generate evenly spaced positions in a circle
const seatPositions = seatLabels.map((pos, i) => {
  const angleDeg = (360 / seatLabels.length) * i - 90; // Start from top center
  const angleRad = (angleDeg * Math.PI) / 180;
  const radiusY = 45; // Adjust for table height
  const radiusX = 45; // Adjust for table width

  const top = 50 + radiusY * Math.sin(angleRad); // center + offset
  const left = 50 + radiusX * Math.cos(angleRad);

  return {
    pos,
    top: `${top}%`,
    left: `${left}%`,
  };
});

  return (
    <div className="table-container">
      <div className="table-oval">
      {seatPositions.map(({ pos, top, left }) => (
  <div
    key={pos}
    className="seat-position"
    style={{ top, left }}
  >
    <Seat
      position={pos}
      cards={seats[pos]}
      onDropCard={onDropCard}
      onRemoveCard={onRemoveCard}
    />
  </div>
))}
      </div>
    </div>
  );
}

export default Table;
