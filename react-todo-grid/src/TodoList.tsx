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
    drop: (item: { id: string }) => onDrop(item.id, 'priority'), // Adjust this line for 'urgency' if needed
  });

  return (
    <div ref={drop} className="todo-list">
      <h2>{title}</h2>
      {items.map((item) => (
        <TodoItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default TodoList;
