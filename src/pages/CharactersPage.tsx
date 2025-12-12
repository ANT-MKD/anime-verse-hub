import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import CharacterCard from '@/components/CharacterCard';
import Pagination from '@/components/Pagination';
import { getAllCharacters } from '@/data/animeData';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 8;

const CharactersPage = () => {
  const allCharacters = getAllCharacters();
  const { favorites, isFavorite } = useFavorites();
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const displayedCharacters = showFavoritesOnly
    ? allCharacters.filter(char => isFavorite(`${char.animeId}-${char.id}`))
    : allCharacters;

  const totalPages = Math.ceil(displayedCharacters.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCharacters = displayedCharacters.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (favoritesOnly: boolean) => {
    setShowFavoritesOnly(favoritesOnly);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground particleCount={30} />
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="font-display text-4xl lg:text-6xl font-black mb-4">
              <span className="gradient-text">PERSONNAGES</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-6">
              Découvrez {allCharacters.length} personnages de notre base de données. Ajoutez-les à vos favoris!
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFilterChange(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  !showFavoritesOnly ? 'bg-primary text-primary-foreground' : 'glass hover:bg-primary/20'
                }`}
              >
                <Users className="w-4 h-4" />
                Tous ({allCharacters.length})
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFilterChange(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  showFavoritesOnly ? 'bg-primary text-primary-foreground' : 'glass hover:bg-primary/20'
                }`}
              >
                <Heart className="w-4 h-4" />
                Favoris ({favorites.length})
              </motion.button>
              <Link to="/favorites">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-primary/20 transition-colors"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  Page Favoris
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {paginatedCharacters.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg">Aucun favori pour le moment</p>
              <p className="text-sm text-muted-foreground">Cliquez sur le cœur d'un personnage pour l'ajouter</p>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedCharacters.map((character, index) => (
                  <CharacterCard
                    key={`${character.animeId}-${character.id}`}
                    character={character}
                    animeId={character.animeId}
                    index={index}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CharactersPage;
