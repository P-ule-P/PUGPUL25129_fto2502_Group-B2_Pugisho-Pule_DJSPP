import React from "react";
import { useTheme } from "../utils/useTheme";

/**
 * Theme toggle button for light/dark mode
 */
export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} title="Toggle theme" className="theme-toggle">
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
};
