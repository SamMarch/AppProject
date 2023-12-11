// src/ItemList.tsx
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';

interface ItemListProps {
    items: { id: string; content: string }[];
    deleteItem: (id: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, deleteItem }) => (
    <Droppable droppableId="droppable">
        {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((item, index) => (
                    <Item key={item.id} item={item} index={index} deleteItem={deleteItem} />
                ))}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
);

export default ItemList;