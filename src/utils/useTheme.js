import { useEffect, useState } from "react";

const THEME_KEY = "theme";

// Optional: map theme to browser UI color (address bar etc.)
const themeColors = {
  light: "#ffffff",
  dark: "#121212",
};

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);

    // Update browser theme color (mobile address bar)
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", themeColors[theme]);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};
