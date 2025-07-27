import type { Todo } from "../App";

type TodoListProps = {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

export const TodoList = ({ todos, toggleTodo, deleteTodo }: TodoListProps) => {
  if (todos.length === 0) {
    return <p className="text-gray-500 text-center py-4">No todos found</p>;
  }

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
            className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
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