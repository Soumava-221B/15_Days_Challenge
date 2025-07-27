import type { FilterType } from "../App";

type TodoFilterProps = {
  currentFilter: FilterType;
  setFilter: (filter: FilterType) => void;
};

export const TodoFilter = ({ currentFilter, setFilter }: TodoFilterProps) => {
  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className="flex justify-center space-x-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setFilter(filter)}
          className={`px-3 py-1 rounded-md text-sm ${
            currentFilter === filter
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};