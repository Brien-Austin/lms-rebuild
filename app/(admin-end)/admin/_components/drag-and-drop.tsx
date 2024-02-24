'use client'
import React, { useState, DragEvent } from 'react';

interface SimpleDragAndDropProps {
  items: string[];
}

const SimpleDragAndDrop: React.FC<SimpleDragAndDropProps> = ({ items: initialItems }) => {
  const [items, setItems] = useState(initialItems);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, targetIndex: number) => {
    e.preventDefault();

    if (draggedIndex === null) {
      return;
    }

    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(targetIndex, 0, draggedItem);

    setItems(updatedItems);
    setDraggedIndex(null);
  };

  return (
    <div>
      <h2>Simple Drag and Drop</h2>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimpleDragAndDrop;
