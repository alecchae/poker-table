import React from "react";
import { useDrop } from "react-dnd";

function DropZone({ onRemoveCard, children }) {
  useDrop(() => ({
    accept: "CARD",
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop && item.from) {
        onRemoveCard(item.from, item.card);
      }
    },
  }), []);

  return <div className="app">{children}</div>;
}

export default DropZone;
