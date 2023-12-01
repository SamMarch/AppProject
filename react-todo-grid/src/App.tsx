import React, { useState } from 'react';
import TodoList from './TodoList';

const App: React.FC = () => {
  const [todos, setTodos] = useState([
    { id: '1', text: 'Task 1', priority: 1, urgency: 2 },
    { id: '2', text: 'Task 2', priority: 2, urgency: 1 },
    // Add more tasks as needed
  ]);

  const handleDrop = (id: string, targetList: 'priority' | 'urgency') => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, [targetList]: todo[targetList] + 1 } : todo
    );
    setTodos(updatedTodos);
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      <TodoList title="Low Priority" items={todos.filter((todo) => todo.priority === 1)} onDrop={handleDrop} />
      <TodoList title="Medium Priority" items={todos.filter((todo) => todo.priority === 2)} onDrop={handleDrop} />
      <TodoList title="High Priority" items={todos.filter((todo) => todo.priority === 3)} onDrop={handleDrop} />
    </div>
  );
};

export default App;
