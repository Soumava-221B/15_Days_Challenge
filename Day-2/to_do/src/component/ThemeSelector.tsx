import type { Theme } from "../App";

type ThemeSelectorProps = {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeSelector = ({ currentTheme, setTheme }: ThemeSelectorProps) => {
  const themes: Theme[] = ['light', 'dark', 'blue', 'green', 'purple'];
  
  const themeColors = {
    light: 'bg-gray-200',
    dark: 'bg-gray-800',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
  };

  return (
    <div className="flex space-x-1">
      {themes.map((theme) => (
        <button
          key={theme}
          onClick={() => setTheme(theme)}
          className={`w-6 h-6 rounded-full ${themeColors[theme]} ${currentTheme === theme ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
          title={theme.charAt(0).toUpperCase() + theme.slice(1)}
          aria-label={`${theme} theme`}
        />
      ))}
    </div>
  );
};