import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import CharacterCard from '@/components/CharacterCard';
import { getAnimeById } from '@/data/animeData';

const AnimeCharacters = () => {
  const { animeId } = useParams<{ animeId: string }>();
  const anime = animeId ? getAnimeById(animeId) : undefined;

  if (!anime) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Anime non trouvé</h1>
          <Link to="/" className="text-primary hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  // Get theme color for particles
  const themeColors: Record<string, string> = {
    'theme-haikyuu': 'hsl(35, 100%, 50%)',
    'theme-solo-leveling': 'hsl(250, 100%, 65%)',
    'theme-hunter': 'hsl(145, 80%, 45%)',
    'theme-naruto': 'hsl(25, 100%, 50%)',
    'theme-demon-slayer': 'hsl(355, 90%, 55%)',
    'theme-jujutsu': 'hsl(280, 100%, 60%)',
  };

  return (
    <div className={`min-h-screen bg-background ${anime.theme}`}>
      <ParticleBackground 
        particleCount={50} 
        color={themeColors[anime.theme] || 'hsl(35, 100%, 50%)'} 
      />
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative pt-20 lg:pt-24">
        {/* Banner Image */}
        <div className="relative h-[40vh] lg:h-[50vh] overflow-hidden">
          <img
            src={anime.banner}
            alt={anime.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 lg:px-8 pb-12">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Retour aux animes</span>
              </Link>
            </motion.div>

            {/* Anime Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {anime.titleJapanese && (
                <p className="text-primary text-sm font-medium mb-2">
                  {anime.titleJapanese}
                </p>
              )}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-black mb-4 text-foreground">
                {anime.title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mb-4">
                {anime.description}
              </p>
              <div className="flex items-center gap-2 text-primary">
                <Users className="w-5 h-5" />
                <span className="font-medium">{anime.characters.length} Personnages</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Characters Grid */}
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              <span className="gradient-text">PERSONNAGES</span>
            </h2>
            <p className="text-muted-foreground mt-2">
              Sélectionnez un personnage pour voir son profil complet
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {anime.characters.map((character, index) => (
              <CharacterCard
                key={character.id}
                character={character}
                animeId={anime.id}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnimeCharacters;
