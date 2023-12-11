// src/App.tsx
import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import ItemList from './ItemList';

const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

interface Item {
  id: string;
  content: string;
}

const App = () => {
  const [items, setItems] = useState<Item[]>(() => {
    const savedItems = localStorage.getItem('items');
    if (savedItems) {
      return JSON.parse(savedItems);
    } else {
      return getItems(10);
    }
  });

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);

    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ItemList items={items} />
    </DragDropContext>
  );
};

export default App;