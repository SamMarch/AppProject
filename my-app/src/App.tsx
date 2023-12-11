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

  const addItem = () => {
    const newItem = {
      id: `item-${Date.now()}`, // Use a timestamp to ensure uniqueness
      content: `item ${items.length}`,
    };

    setItems((prevItems) => [...prevItems, newItem]);
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <button onClick={addItem}>Add Item</button>
      <ItemList items={items} deleteItem={deleteItem} />
    </DragDropContext>
  );
};

export default App;