import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import CharacterCard from '@/components/CharacterCard';
import Pagination from '@/components/Pagination';
import { getAllCharacters } from '@/data/animeData';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Heart, Sparkles } from 'lucide-react';

const ITEMS_PER_PAGE = 8;

const FavoritesPage = () => {
  const allCharacters = getAllCharacters();
  const { favorites, isFavorite } = useFavorites();
  const [currentPage, setCurrentPage] = useState(1);

  const favoriteCharacters = allCharacters.filter(char => 
    isFavorite(`${char.animeId}-${char.id}`)
  );

  const totalPages = Math.ceil(favoriteCharacters.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCharacters = favoriteCharacters.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground particleCount={40} color="hsl(340, 80%, 60%)" />
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-10 h-10 text-primary fill-primary" />
              <h1 className="font-display text-4xl lg:text-6xl font-black">
                <span className="gradient-text">MES FAVORIS</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Votre collection personnelle de personnages favoris. 
              {favoriteCharacters.length > 0 && (
                <span className="text-primary font-medium"> {favoriteCharacters.length} personnage{favoriteCharacters.length > 1 ? 's' : ''} sauvegardé{favoriteCharacters.length > 1 ? 's' : ''}.</span>
              )}
            </p>
          </motion.div>

          {favoriteCharacters.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 glass-card rounded-2xl"
            >
              <div className="relative inline-block mb-6">
                <Heart className="w-24 h-24 text-muted-foreground/30" />
                <Sparkles className="w-8 h-8 text-primary absolute -top-2 -right-2 animate-pulse" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-3">Aucun favori pour le moment</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Explorez les personnages et cliquez sur le cœur pour les ajouter à vos favoris
              </p>
              <motion.a
                href="/characters"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium"
              >
                <Sparkles className="w-4 h-4" />
                Découvrir les personnages
              </motion.a>
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

export default FavoritesPage;
