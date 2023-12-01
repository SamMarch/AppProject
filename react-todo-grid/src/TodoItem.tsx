import React from 'react';
import { useDrag } from 'react-dnd';

export interface TodoItemProps {
  id: string;
  text: string;
  priority: number;
  urgency: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, priority, urgency }) => {
  const [, drag] = useDrag({
    type: 'TODO_ITEM',
    item: { id },
  });

  return (
    <div ref={drag} style={{ padding: '8px', border: '1px solid #ddd', marginBottom: '4px' }}>
      <strong>{text}</strong>
      <div>Priority: {priority}</div>
      <div>Urgency: {urgency}</div>
    </div>
  );
};

export default TodoItem;
