import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AnimeTheme = 
  | 'default'
  | 'naruto'
  | 'jujutsu'
  | 'demon-slayer'
  | 'onepiece'
  | 'mha'
  | 'hunter'
  | 'solo-leveling'
  | 'aot'
  | 'dragonball'
  | 'deathnote'
  | 'bleach'
  | 'haikyuu';

export const themeInfo: Record<AnimeTheme, { name: string; color: string }> = {
  default: { name: 'Par défaut', color: 'hsl(35, 100%, 50%)' },
  naruto: { name: 'Naruto', color: 'hsl(25, 100%, 50%)' },
  jujutsu: { name: 'Jujutsu Kaisen', color: 'hsl(280, 100%, 60%)' },
  'demon-slayer': { name: 'Demon Slayer', color: 'hsl(355, 90%, 55%)' },
  onepiece: { name: 'One Piece', color: 'hsl(200, 100%, 50%)' },
  mha: { name: 'My Hero Academia', color: 'hsl(145, 70%, 45%)' },
  hunter: { name: 'Hunter x Hunter', color: 'hsl(145, 80%, 45%)' },
  'solo-leveling': { name: 'Solo Leveling', color: 'hsl(250, 100%, 65%)' },
  aot: { name: 'Attack on Titan', color: 'hsl(30, 80%, 40%)' },
  dragonball: { name: 'Dragon Ball', color: 'hsl(35, 100%, 55%)' },
  deathnote: { name: 'Death Note', color: 'hsl(0, 70%, 40%)' },
  bleach: { name: 'Bleach', color: 'hsl(210, 100%, 50%)' },
  haikyuu: { name: 'Haikyuu', color: 'hsl(35, 100%, 50%)' },
};

interface ThemeContextType {
  theme: AnimeTheme;
  setTheme: (theme: AnimeTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'anime-theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<AnimeTheme>('default');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as AnimeTheme | null;
    if (stored && themeInfo[stored]) {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    // Remove all theme classes
    Object.keys(themeInfo).forEach((t) => {
      root.classList.remove(`theme-${t}`);
    });
    // Add current theme class
    if (theme !== 'default') {
      root.classList.add(`theme-${theme}`);
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (newTheme: AnimeTheme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
