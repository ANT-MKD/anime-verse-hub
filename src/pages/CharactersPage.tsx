import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import CharacterCard from '@/components/CharacterCard';
import { getAllCharacters } from '@/data/animeData';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Heart, Users } from 'lucide-react';
import { useState } from 'react';

const CharactersPage = () => {
  const allCharacters = getAllCharacters();
  const { favorites, isFavorite } = useFavorites();
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const displayedCharacters = showFavoritesOnly
    ? allCharacters.filter(char => isFavorite(`${char.animeId}-${char.id}`))
    : allCharacters;

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
              Tous les personnages de notre base de données. Ajoutez-les à vos favoris!
            </p>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFavoritesOnly(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  !showFavoritesOnly ? 'bg-primary text-primary-foreground' : 'glass'
                }`}
              >
                <Users className="w-4 h-4" />
                Tous ({allCharacters.length})
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFavoritesOnly(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  showFavoritesOnly ? 'bg-primary text-primary-foreground' : 'glass'
                }`}
              >
                <Heart className="w-4 h-4" />
                Favoris ({favorites.length})
              </motion.button>
            </div>
          </motion.div>

          {displayedCharacters.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg">Aucun favori pour le moment</p>
              <p className="text-sm text-muted-foreground">Cliquez sur le cœur d'un personnage pour l'ajouter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedCharacters.map((character, index) => (
                <CharacterCard
                  key={`${character.animeId}-${character.id}`}
                  character={character}
                  animeId={character.animeId}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CharactersPage;
