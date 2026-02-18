import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Character } from '@/data/animeData';
import FavoriteButton from './FavoriteButton';

interface CharacterCardProps {
  character: Character;
  animeId: string;
  index: number;
}

const CharacterCard = ({ character, animeId, index }: CharacterCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -12, scale: 1.03 }}
      className="group relative glass-card rounded-2xl overflow-hidden"
    >
      {/* Character Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <motion.img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.15 }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90" />
        
        {/* Top Bar */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 flex items-center justify-between">
          {character.rank && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 + 0.3 }}
              className="flex items-center gap-1 px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-full bg-primary/90 text-primary-foreground text-[9px] sm:text-xs font-bold shadow-lg shadow-primary/30"
            >
              <Star className="w-2 h-2 sm:w-3 sm:h-3" />
              {character.rank}
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 + 0.4 }}
          >
            <FavoriteButton animeId={animeId} characterId={character.id} size="sm" />
          </motion.div>
        </div>

        {/* Glow Effect */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          initial={false}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/40 rounded-full blur-3xl" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
        {/* Role */}
        <p className="text-[9px] sm:text-xs text-primary font-semibold uppercase tracking-wider mb-0.5 sm:mb-1">
          {character.role}
        </p>
        
        {/* Name */}
        <h3 className="font-display text-xs sm:text-lg lg:text-xl font-bold mb-0.5 sm:mb-1 text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
          {character.name}
        </h3>
        
        {/* Native Name - hidden on mobile */}
        {character.nativeName && (
          <p className="text-xs text-muted-foreground mb-3 hidden sm:block">
            {character.nativeName}
          </p>
        )}
        
        {/* CTA */}
        <Link to={`/anime/${animeId}/character/${character.id}`}>
          <motion.button
            whileHover={{ x: 5, scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors group/btn"
          >
            Voir Profil
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-2" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CharacterCard;
