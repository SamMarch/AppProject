import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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

  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      // Generate a unique ID for the new todo item
      const newTodoItem = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        priority: 1, // Set a default priority, adjust as needed
        urgency: 1, // Set a default urgency, adjust as needed
      };

      // Update the state to include the new todo item
      setTodos([...todos, newTodoItem]);

      // Clear the input field
      setNewTodo('');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      <DndProvider backend={HTML5Backend}>
        <TodoList title="Low Priority" items={todos.filter((todo) => todo.priority === 1)} onDrop={handleDrop} />
        <TodoList title="Medium Priority" items={todos.filter((todo) => todo.priority === 2)} onDrop={handleDrop} />
        <TodoList title="High Priority" items={todos.filter((todo) => todo.priority === 3)} onDrop={handleDrop} />
      </DndProvider>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
  );
};

export default App;
