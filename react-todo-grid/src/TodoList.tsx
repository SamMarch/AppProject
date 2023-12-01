import React from 'react';
import { useDrop } from 'react-dnd';
import TodoItem, { TodoItemProps } from './TodoItem';

interface TodoListProps {
  title: string;
  items: TodoItemProps[];
  onDrop: (id: string, targetList: 'priority' | 'urgency') => void;
}

const TodoList: React.FC<TodoListProps> = ({ title, items, onDrop }) => {
  const [, drop] = useDrop({
    accept: 'TODO_ITEM',
    drop: (item: { id: string }) => onDrop(item.id, 'priority'), // Provide a default value or handle differently as needed
  });

  return (
    <div style={{ flex: 1, minWidth: '200px', padding: '16px', border: '1px solid #ddd' }} ref={drop}>
      <h2>{title}</h2>
      {items.map((item) => (
        <TodoItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default TodoList;
