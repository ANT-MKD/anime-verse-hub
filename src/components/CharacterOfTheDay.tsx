import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Calendar } from 'lucide-react';
import { getAllCharacters } from '@/data/animeData';
import { cn } from '@/lib/utils';

const CharacterOfTheDay = () => {
  const allCharacters = useMemo(() => getAllCharacters(), []);
  
  const characterOfTheDay = useMemo(() => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = seed % allCharacters.length;
    return allCharacters[index];
  }, [allCharacters]);

  const characterOfTheWeek = useMemo(() => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(((today.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);
    const seed = today.getFullYear() * 100 + weekNumber;
    const index = (seed * 7) % allCharacters.length;
    return allCharacters[index];
  }, [allCharacters]);

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            <span className="gradient-text">À LA UNE</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Character of the Day */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={cn("glass-card rounded-2xl overflow-hidden group", characterOfTheDay.animeTheme)}
          >
            <div className="relative aspect-[3/4] sm:aspect-[16/9]">
              <img 
                src={characterOfTheDay.image} 
                alt={characterOfTheDay.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary/90 text-primary-foreground text-[9px] sm:text-sm font-medium">
                <Star className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Personnage du Jour</span>
                <span className="sm:hidden">Du Jour</span>
              </div>
            </div>
            <div className="p-3 sm:p-6">
              <p className="text-[10px] sm:text-sm text-primary font-medium mb-0.5 sm:mb-1">{characterOfTheDay.animeTitle}</p>
              <h3 className="font-display text-sm sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">{characterOfTheDay.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4 line-clamp-2 hidden sm:block">{characterOfTheDay.description}</p>
              <Link 
                to={`/anime/${characterOfTheDay.animeId}/character/${characterOfTheDay.id}`}
                className="inline-flex items-center gap-1 sm:gap-2 text-primary hover:gap-2 sm:hover:gap-3 transition-all text-[10px] sm:text-base"
              >
                Voir le profil
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Character of the Week */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={cn("glass-card rounded-2xl overflow-hidden group", characterOfTheWeek.animeTheme)}
          >
            <div className="relative aspect-[3/4] sm:aspect-[16/9]">
              <img 
                src={characterOfTheWeek.image} 
                alt={characterOfTheWeek.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-secondary text-secondary-foreground text-[9px] sm:text-sm font-medium">
                <Calendar className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Personnage de la Semaine</span>
                <span className="sm:hidden">Semaine</span>
              </div>
            </div>
            <div className="p-3 sm:p-6">
              <p className="text-[10px] sm:text-sm text-primary font-medium mb-0.5 sm:mb-1">{characterOfTheWeek.animeTitle}</p>
              <h3 className="font-display text-sm sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">{characterOfTheWeek.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4 line-clamp-2 hidden sm:block">{characterOfTheWeek.description}</p>
              <Link 
                to={`/anime/${characterOfTheWeek.animeId}/character/${characterOfTheWeek.id}`}
                className="inline-flex items-center gap-1 sm:gap-2 text-primary hover:gap-2 sm:hover:gap-3 transition-all text-[10px] sm:text-base"
              >
                Voir le profil
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CharacterOfTheDay;
