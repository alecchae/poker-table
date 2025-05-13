import React from "react";
import { useDrop } from "react-dnd";

function CommunityDropZone({ stage, cards, limit, onDropCard, onRemoveCard }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (item) => {
      onDropCard(stage, item.card, limit);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="community-group" ref={drop}>
      <div className="label">{stage[0].toUpperCase() + stage.slice(1)}</div>
      <div className="card-row">
        {cards.map((card) => (
          <img
            key={card}
            src={`/cards/${card}.png`}
            alt={card}
            className="community-card"
            onContextMenu={(e) => {
              e.preventDefault();
              onRemoveCard(stage, card);
            }}
          />
        ))}
        {cards.length < limit &&
          Array.from({ length: limit - cards.length }).map((_, idx) => (
            <div key={idx} className="community-card placeholder" />
          ))}
      </div>
    </div>
  );
}

export default CommunityDropZone;
