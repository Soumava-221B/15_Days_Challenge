import { useState, useEffect } from 'react';
import { TodoList } from './component/TodoList';
import { TodoForm } from './component/TodoForm';
import { TodoFilter } from './component/TodoFilter';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type FilterType = 'all' | 'active' | 'completed';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Todo List
        </h1>
        <TodoForm addTodo={addTodo} />
        <TodoFilter currentFilter={filter} setFilter={setFilter} />
        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
        {todos.length > 0 && (
          <p className="text-sm text-gray-500 mt-4">
            {todos.filter((t) => !t.completed).length} items left
          </p>
        )}
      </div>
    </div>
  );
};