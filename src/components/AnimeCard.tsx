import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Anime } from '@/data/animeData';

interface AnimeCardProps {
  anime: Anime;
  index: number;
}

const AnimeCard = ({ anime, index }: AnimeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl glass-card flex flex-row sm:flex-col"
    >
      {/* Image */}
      <div className="relative w-28 min-h-[120px] sm:w-full sm:aspect-[3/4] overflow-hidden shrink-0">
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r sm:bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative sm:absolute sm:bottom-0 sm:left-0 sm:right-0 p-4 sm:p-6 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {/* Japanese Title */}
          {anime.titleJapanese && (
            <p className="text-xs text-muted-foreground mb-1 font-medium tracking-wider">
              {anime.titleJapanese}
            </p>
          )}
          
          {/* Title */}
          <h3 className="font-display text-base sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 text-foreground group-hover:text-primary transition-colors">
            {anime.title}
          </h3>
          
          {/* Description */}
          <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4 line-clamp-2 hidden sm:block">
            {anime.description}
          </p>

          {/* Character Count */}
          <p className="text-xs text-primary mb-2 sm:mb-4">
            {anime.characters.length} personnages disponibles
          </p>
          
          {/* CTA Button */}
          <Link to={`/anime/${anime.id}`}>
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs sm:text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/btn"
            >
              Explorer
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1" />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/40 transition-colors hidden sm:block" />
    </motion.div>
  );
};

export default AnimeCard;
