import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import { Sparkles, Heart, Zap, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground particleCount={30} />
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-display text-4xl lg:text-6xl font-black mb-4">
              <span className="gradient-text">À PROPOS</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Bienvenue sur AnimeVerse, votre encyclopédie ultime des personnages d'anime.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 rounded-2xl mb-8"
          >
            <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary" />
              Notre Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              AnimeVerse a été créé par des fans, pour des fans. Notre objectif est de fournir une plateforme 
              immersive et détaillée permettant d'explorer vos personnages d'anime préférés. Des statistiques 
              de combat aux relations entre personnages, nous couvrons tout ce que vous devez savoir.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Heart, title: 'Favoris', desc: 'Sauvegardez vos personnages préférés pour y accéder rapidement.' },
              { icon: Zap, title: 'IA Assistant', desc: 'Discutez avec notre AnimeBot pour des infos sur vos personnages favoris.' },
              { icon: Users, title: 'Profils Détaillés', desc: 'Stats, compétences, relations - tout est là.' },
              { icon: Sparkles, title: 'Design Immersif', desc: 'Une expérience visuelle inspirée des meilleurs jeux.' }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass-card p-6 rounded-xl"
              >
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-display font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
