import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import AnimeCard from '@/components/AnimeCard';
import { animeData } from '@/data/animeData';
import { Filter, Grid, List } from 'lucide-react';

const AnimesPage = () => {
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
              <span className="gradient-text">TOUS LES ANIMES</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Explorez notre collection d'animes et découvrez les profils détaillés de chaque personnage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {animeData.map((anime, index) => (
              <AnimeCard key={anime.id} anime={anime} index={index} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnimesPage;
