import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Calendar } from 'lucide-react';
import { getAllCharacters } from '@/data/animeData';
import { cn } from '@/lib/utils';

const CharacterOfTheDay = () => {
  const allCharacters = useMemo(() => getAllCharacters(), []);
  
  const characterOfTheDay = useMemo(() => {
    // Use date as seed for consistent daily character
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = seed % allCharacters.length;
    return allCharacters[index];
  }, [allCharacters]);

  const characterOfTheWeek = useMemo(() => {
    // Use week number as seed
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

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Character of the Day */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={cn("glass-card rounded-2xl overflow-hidden group", characterOfTheDay.animeTheme)}
          >
            <div className="relative aspect-[16/9]">
              <img 
                src={characterOfTheDay.image} 
                alt={characterOfTheDay.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-sm font-medium">
                <Star className="w-4 h-4" />
                Personnage du Jour
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-primary font-medium mb-1">{characterOfTheDay.animeTitle}</p>
              <h3 className="font-display text-xl lg:text-2xl font-bold mb-2">{characterOfTheDay.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{characterOfTheDay.description}</p>
              <Link 
                to={`/anime/${characterOfTheDay.animeId}/character/${characterOfTheDay.id}`}
                className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
              >
                Voir le profil
                <ArrowRight className="w-4 h-4" />
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
            <div className="relative aspect-[16/9]">
              <img 
                src={characterOfTheWeek.image} 
                alt={characterOfTheWeek.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                <Calendar className="w-4 h-4" />
                Personnage de la Semaine
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-primary font-medium mb-1">{characterOfTheWeek.animeTitle}</p>
              <h3 className="font-display text-xl lg:text-2xl font-bold mb-2">{characterOfTheWeek.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{characterOfTheWeek.description}</p>
              <Link 
                to={`/anime/${characterOfTheWeek.animeId}/character/${characterOfTheWeek.id}`}
                className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
              >
                Voir le profil
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CharacterOfTheDay;
