import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (characterId: string) => void;
  removeFavorite: (characterId: string) => void;
  isFavorite: (characterId: string) => boolean;
  toggleFavorite: (characterId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'animeverse_favorites';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (characterId: string) => {
    setFavorites(prev => {
      if (prev.includes(characterId)) return prev;
      return [...prev, characterId];
    });
  };

  const removeFavorite = (characterId: string) => {
    setFavorites(prev => prev.filter(id => id !== characterId));
  };

  const isFavorite = (characterId: string) => favorites.includes(characterId);

  const toggleFavorite = (characterId: string) => {
    if (isFavorite(characterId)) {
      removeFavorite(characterId);
    } else {
      addFavorite(characterId);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
