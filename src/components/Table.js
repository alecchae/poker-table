import React from "react";
import { useDrop } from "react-dnd";
import Seat from "./Seat";
import CommunityDropZone from "./CommunityDropZone";

function Table({
  seats,
  onDropCard,
  onRemoveCard,
  returnCardToTop,
  community,
  onDropCommunityCard,
  onRemoveCommunityCard,
}) {
  const seatLabels = ["UTG", "UTG+1", "MP", "LJ", "HJ", "CO", "BTN", "SB", "BB"];

  // Generate evenly spaced positions in a circle
  const seatPositions = seatLabels.map((pos, i) => {
    const angleDeg = (360 / seatLabels.length) * i - 90; // Start from top center
    const angleRad = (angleDeg * Math.PI) / 180;
    const radiusY = 45;
    const radiusX = 45;
    const top = 50 + radiusY * Math.sin(angleRad);
    const left = 50 + radiusX * Math.cos(angleRad);
    return { pos, top: `${top}%`, left: `${left}%` };
  });

  return (
    <div className="table-container">
      <div className="table-oval">
        {/* Community Cards Center Drop */}
        <div className="community-cards">
  <CommunityDropZone
    stage="flop"
    cards={community.flop}
    limit={3}
    onDropCard={onDropCommunityCard}
    onRemoveCard={onRemoveCommunityCard}
  />
  <CommunityDropZone
    stage="turn"
    cards={community.turn}
    limit={1}
    onDropCard={onDropCommunityCard}
    onRemoveCard={onRemoveCommunityCard}
  />
  <CommunityDropZone
    stage="river"
    cards={community.river}
    limit={1}
    onDropCard={onDropCommunityCard}
    onRemoveCard={onRemoveCommunityCard}
  />
</div>

        {/* Seat Positions */}
        {seatPositions.map(({ pos, top, left }) => (
          <div key={pos} className="seat-position" style={{ top, left }}>
            <Seat
              position={pos}
              cards={seats[pos]}
              onDropCard={onDropCard}
              onRemoveCard={onRemoveCard}
              returnCardToTop={returnCardToTop}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
