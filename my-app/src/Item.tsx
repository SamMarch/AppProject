// src/Item.tsx
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface ItemProps {
    item: { id: string; content: string };
    index: number;
}

const Item: React.FC<ItemProps> = ({ item, index }) => (
    <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="draggable-item"
            >
                {item.content}
            </div>
        )}
    </Draggable>
);

export default Item;