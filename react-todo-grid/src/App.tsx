import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TodoList from './TodoList';

const App: React.FC = () => {
  const [todos, setTodos] = useState([
    { id: '1', text: 'Default Task', priority: 2, urgency: 1 },
  ]);

  const handleDrop = (id: string, targetList: 'priority' | 'urgency') => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          let targetPriority = todo.priority;
          let targetUrgency = todo.urgency;
  
          if (targetList === 'priority') {
            // Increase priority only if it's not already at the maximum (3)
            // Decrease priority only if it's not already at the minimum (1)
            targetPriority = targetPriority < 3 ? targetPriority + 1 : targetPriority > 1 ? targetPriority - 1 : targetPriority;
          } else if (targetList === 'urgency') {
            // Increase urgency only if it's not already at the maximum (3)
            // Decrease urgency only if it's not already at the minimum (1)
            targetUrgency = targetUrgency < 3 ? targetUrgency + 1 : targetUrgency > 1 ? targetUrgency - 1 : targetUrgency;
          }
  
          return {
            ...todo,
            priority: targetPriority,
            urgency: targetUrgency,
          };
        }
        return todo;
      });
  
      return updatedTodos;
    });
  };  
  
  

  const handleAddTodo = () => {
    const newTodoItem = {
      id: Date.now().toString(),
      text: 'New Task',
      priority: 1,
      urgency: 1,
    };

    setTodos([newTodoItem, ...todos]);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '20px' }}>
      <DndProvider backend={HTML5Backend}>
        <TodoList
          title="Low Priority / Low Urgency"
          items={todos.filter((todo) => todo.priority === 1 && todo.urgency === 1)}
          onDrop={(id) => handleDrop(id, 'priority')}
        />
        <TodoList
          title="Medium Priority / Low Urgency"
          items={todos.filter((todo) => todo.priority === 2 && todo.urgency === 1)}
          onDrop={(id) => handleDrop(id, 'priority')}
        />
        <TodoList
          title="High Priority / Low Urgency"
          items={todos.filter((todo) => todo.priority === 3 && todo.urgency === 1)}
          onDrop={(id) => handleDrop(id, 'priority')}
        />
      </DndProvider>
      <div>
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
  );
};

export default App;
