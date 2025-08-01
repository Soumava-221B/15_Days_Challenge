import type { Theme, Todo } from "../App";

type TodoListProps = {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  theme: Theme;
};

export const TodoList = ({ todos, toggleTodo, deleteTodo, theme }: TodoListProps) => {
  if (todos.length === 0) {
    return <p className="text-gray-500 text-center py-4">No todos found</p>;
  }

  const themeTextClasses = {
    light: {
      completed: 'text-gray-400',
      active: 'text-gray-800',
    },
    dark: {
      completed: 'text-gray-500',
      active: 'text-gray-200',
    },
    blue: {
      completed: 'text-blue-300',
      active: 'text-blue-800',
    },
    green: {
      completed: 'text-green-300',
      active: 'text-green-800',
    },
    purple: {
      completed: 'text-purple-300',
      active: 'text-purple-800',
    },
  };

  return (
    <ul className="divide-y divide-gray-200">
      {todos.map((todo) => (
        <li key={todo.id} className="py-3 flex items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="h-5 w-5 text-blue-500 rounded mr-3"
          />
          <span
            className={`flex-1 ${todo.completed ? `line-through ${themeTextClasses[theme].completed}` : themeTextClasses[theme].active}`}
          >
            {todo.text}
          </span>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};