import { useState, useEffect } from 'react';
import { ThemeSelector } from './component/ThemeSelector';
import { TodoForm } from './component/TodoForm';
import { TodoFilter } from './component/TodoFilter';
import { TodoList } from './component/TodoList';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type FilterType = 'all' | 'active' | 'completed';

export type Theme = 'light' | 'dark' | 'blue' | 'green' | 'purple';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState<FilterType>('all');
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme;
  }, [theme]);

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
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses[theme].background} py-8`}>
      <div className={`max-w-md mx-auto rounded-lg shadow-md overflow-hidden p-6 transition-colors duration-300 ${themeClasses[theme].container}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${themeClasses[theme].title}`}>
            Todo List
          </h1>
          <ThemeSelector currentTheme={theme} setTheme={setTheme} />
        </div>
        <TodoForm addTodo={addTodo} theme={theme} />
        <TodoFilter currentFilter={filter} setFilter={setFilter} theme={theme} />
        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          theme={theme}
        />
        {todos.length > 0 && (
          <p className={`text-sm mt-4 ${themeClasses[theme].counter}`}>
            {todos.filter((t) => !t.completed).length} items left
          </p>
        )}
      </div>
    </div>
  );
};

const themeClasses = {
  light: {
    background: 'bg-gray-100',
    container: 'bg-white',
    title: 'text-gray-800',
    counter: 'text-gray-500',
  },
  dark: {
    background: 'bg-gray-900',
    container: 'bg-gray-800',
    title: 'text-white',
    counter: 'text-gray-300',
  },
  blue: {
    background: 'bg-blue-50',
    container: 'bg-white',
    title: 'text-blue-800',
    counter: 'text-blue-600',
  },
  green: {
    background: 'bg-green-50',
    container: 'bg-white',
    title: 'text-green-800',
    counter: 'text-green-600',
  },
  purple: {
    background: 'bg-purple-50',
    container: 'bg-white',
    title: 'text-purple-800',
    counter: 'text-purple-600',
  },
};