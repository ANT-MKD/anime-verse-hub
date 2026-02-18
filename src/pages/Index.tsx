import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import AnimeCard from '@/components/AnimeCard';
import CharacterOfTheDay from '@/components/CharacterOfTheDay';
import InteractiveFeatures from '@/components/InteractiveFeatures';
import { animeData } from '@/data/animeData';
import { Sparkles, ChevronDown } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <ParticleBackground particleCount={40} />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Découvrez vos personnages préférés</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-display text-5xl sm:text-6xl lg:text-8xl font-black mb-6 leading-tight"
            >
              <span className="text-foreground">ANIME</span>
              <br />
              <span className="gradient-text glow-text">VERSE</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Explorez les profils détaillés de vos personnages d'anime favoris.
              Statistiques, compétences, relations et bien plus encore.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="#animes"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-shadow"
              >
                Explorer les Animes
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl glass border border-border hover:border-primary/50 text-foreground font-semibold text-lg transition-colors"
              >
                En savoir plus
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-muted-foreground"
            >
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
      </section>

      {/* Anime Grid Section */}
      <section id="animes" className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">ANIMES</span>{' '}
              <span className="gradient-text">POPULAIRES</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Sélectionnez un anime pour découvrir tous ses personnages en détail
            </p>
          </motion.div>

          {/* Anime Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {animeData.map((anime, index) => (
              <AnimeCard key={anime.id} anime={anime} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Character of the Day/Week */}
      <CharacterOfTheDay />

      {/* Interactive Features */}
      <InteractiveFeatures />

      {/* Features Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">FONCTIONNALITÉS</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Profils Détaillés',
                description: 'Découvrez chaque personnage en profondeur avec biographie, statistiques et relations.',
                icon: '📊',
              },
              {
                title: 'Skills & Abilities',
                description: 'Explorez les compétences uniques de chaque personnage avec leurs effets détaillés.',
                icon: '⚔️',
              },
              {
                title: 'Design Immersif',
                description: 'Une expérience visuelle unique inspirée des meilleures interfaces gaming.',
                icon: '✨',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="glass-card p-8 rounded-2xl text-center group"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-display text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-display text-xl font-bold gradient-text">
              ANIMEVERSE
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 AnimeVerse. Créé avec passion pour les fans d'anime.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
