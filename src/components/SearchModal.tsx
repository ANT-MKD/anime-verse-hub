import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Users, Tv, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { animeData, Character, Anime } from '@/data/animeData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  type: 'anime' | 'character';
  anime: Anime;
  character?: Character;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    animeData.forEach((anime) => {
      // Search in anime titles
      if (
        anime.title.toLowerCase().includes(searchQuery) ||
        anime.titleJapanese?.toLowerCase().includes(searchQuery)
      ) {
        searchResults.push({ type: 'anime', anime });
      }

      // Search in characters
      anime.characters.forEach((character) => {
        if (
          character.name.toLowerCase().includes(searchQuery) ||
          character.nativeName?.toLowerCase().includes(searchQuery) ||
          character.title.toLowerCase().includes(searchQuery)
        ) {
          searchResults.push({ type: 'character', anime, character });
        }
      });
    });

    setResults(searchResults.slice(0, 10));
  }, [query]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleResultClick = () => {
    setQuery('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
          >
            <div className="glass-card rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
              {/* Search Input */}
              <div className="flex items-center gap-4 p-4 border-b border-border/50">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher un anime ou personnage..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-lg"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-muted/50 transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {results.length > 0 ? (
                  <div className="p-2">
                    {results.map((result, index) => (
                      <motion.div
                        key={`${result.type}-${result.anime.id}-${result.character?.id || ''}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={
                            result.type === 'anime'
                              ? `/anime/${result.anime.id}`
                              : `/anime/${result.anime.id}/character/${result.character?.id}`
                          }
                          onClick={handleResultClick}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                            <img
                              src={result.type === 'anime' ? result.anime.image : result.character?.image}
                              alt={result.type === 'anime' ? result.anime.title : result.character?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              {result.type === 'anime' ? (
                                <Tv className="w-4 h-4 text-primary" />
                              ) : (
                                <Users className="w-4 h-4 text-primary" />
                              )}
                              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                                {result.type === 'anime' ? 'Anime' : 'Personnage'}
                              </span>
                            </div>
                            <p className="font-semibold text-foreground truncate">
                              {result.type === 'anime' ? result.anime.title : result.character?.name}
                            </p>
                            {result.type === 'character' && (
                              <p className="text-sm text-muted-foreground truncate">
                                {result.anime.title} • {result.character?.title}
                              </p>
                            )}
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ) : query.trim() ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Aucun résultat pour "{query}"</p>
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Tapez pour rechercher...</p>
                    <p className="text-sm mt-2">Animes, personnages, titres japonais...</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                <span>Appuyez sur <kbd className="px-2 py-1 rounded bg-muted">Échap</kbd> pour fermer</span>
                <span>{results.length} résultat{results.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;