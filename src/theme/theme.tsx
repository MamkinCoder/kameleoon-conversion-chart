import React, { createContext, useContext, useEffect, useState } from "react";
import { type Theme, THEME } from "./types";

type ResolvedTheme = Exclude<Theme, "system">;

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return THEME.DAY;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEME.NIGHT
    : THEME.DAY;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return THEME.SYSTEM;
    const saved = localStorage.getItem("theme");
    return saved === THEME.DAY ||
      saved === THEME.NIGHT ||
      saved === THEME.SYSTEM
      ? (saved as Theme)
      : THEME.SYSTEM;
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(
    getSystemTheme()
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    const applyTheme = (value: Theme) => {
      const actual: ResolvedTheme =
        value === THEME.SYSTEM ? getSystemTheme() : value;

      setResolvedTheme(actual);
      document.documentElement.dataset.theme = actual;
    };

    applyTheme(theme);

    if (theme !== THEME.SYSTEM || typeof window === "undefined") return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => applyTheme(THEME.SYSTEM);

    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
}
