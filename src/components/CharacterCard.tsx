import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Character } from '@/data/animeData';

interface CharacterCardProps {
  character: Character;
  animeId: string;
  index: number;
}

const CharacterCard = ({ character, animeId, index }: CharacterCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative glass-card rounded-2xl overflow-hidden"
    >
      {/* Character Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        {/* Rank Badge */}
        {character.rank && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-bold"
          >
            <Star className="w-3 h-3" />
            {character.rank}
          </motion.div>
        )}

        {/* Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {/* Role */}
        <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
          {character.role}
        </p>
        
        {/* Name */}
        <h3 className="font-display text-lg lg:text-xl font-bold mb-1 text-foreground leading-tight">
          {character.name}
        </h3>
        
        {/* Native Name */}
        {character.nativeName && (
          <p className="text-xs text-muted-foreground mb-3">
            {character.nativeName}
          </p>
        )}
        
        {/* CTA */}
        <Link to={`/anime/${animeId}/character/${character.id}`}>
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/btn"
          >
            Voir Profil
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CharacterCard;
