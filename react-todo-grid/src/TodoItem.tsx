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
    item: { id, originalPriority: priority, originalUrgency: urgency },
  });

  return (
    <div ref={drag} className="todo-item">
      <strong>{text}</strong>
      <div className="priority">Priority: {priority}</div>
      <div className="urgency">Urgency: {urgency}</div>
    </div>
  );
};

export default TodoItem;
