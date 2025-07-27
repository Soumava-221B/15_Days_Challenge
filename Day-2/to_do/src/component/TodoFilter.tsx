import type { FilterType, Theme } from "../App";


type TodoFilterProps = {
  currentFilter: FilterType;
  setFilter: (filter: FilterType) => void;
  theme: Theme;
};

export const TodoFilter = ({ currentFilter, setFilter, theme }: TodoFilterProps) => {
  const filters: FilterType[] = ['all', 'active', 'completed'];

  const themeButtonClasses = {
    light: {
      active: 'bg-blue-500 text-white',
      inactive: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    },
    dark: {
      active: 'bg-blue-600 text-white',
      inactive: 'bg-gray-700 text-gray-200 hover:bg-gray-600',
    },
    blue: {
      active: 'bg-blue-500 text-white',
      inactive: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    },
    green: {
      active: 'bg-green-500 text-white',
      inactive: 'bg-green-100 text-green-800 hover:bg-green-200',
    },
    purple: {
      active: 'bg-purple-500 text-white',
      inactive: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    },
  };

  return (
    <div className="flex justify-center space-x-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setFilter(filter)}
          className={`px-3 py-1 rounded-md text-sm ${
            currentFilter === filter
              ? themeButtonClasses[theme].active
              : themeButtonClasses[theme].inactive
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
};