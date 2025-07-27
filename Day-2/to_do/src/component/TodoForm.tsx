import { useState } from 'react';
import type { Theme } from '../App';

type TodoFormProps = {
  addTodo: (text: string) => void;
  theme: Theme;
};

export const TodoForm = ({ addTodo, theme }: TodoFormProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  const themeButtonClasses = {
    light: 'bg-blue-500 hover:bg-blue-600',
    dark: 'bg-blue-500 hover:bg-blue-700',
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-500"
        />
        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeButtonClasses[theme]}`}
        >
          Add
        </button>
      </div>
    </form>
  );
};