import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';

interface FavoriteButtonProps {
  animeId: string;
  characterId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const FavoriteButton = ({ animeId, characterId, className = '', size = 'md' }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favoriteKey = `${animeId}-${characterId}`;
  const isLiked = isFavorite(favoriteKey);

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <motion.button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(favoriteKey);
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`${sizes[size]} rounded-full flex items-center justify-center transition-all duration-300 ${
        isLiked 
          ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
          : 'bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-red-500 hover:bg-red-500/10 border border-border'
      } ${className}`}
    >
      <motion.div
        initial={false}
        animate={isLiked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart className={`${iconSizes[size]} ${isLiked ? 'fill-current' : ''}`} />
      </motion.div>
    </motion.button>
  );
};

export default FavoriteButton;
