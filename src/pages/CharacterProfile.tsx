import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Users, 
  Swords, 
  Heart, 
  Info, 
  Shield,
  UserCircle,
  Quote
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import StatBar from '@/components/StatBar';
import SkillCard from '@/components/SkillCard';
import { getCharacterById, getAnimeById } from '@/data/animeData';

type Section = 'about' | 'affiliation' | 'status' | 'relationships' | 'skills';

const CharacterProfile = () => {
  const { animeId, characterId } = useParams<{ animeId: string; characterId: string }>();
  const [activeSection, setActiveSection] = useState<Section>('about');
  
  const anime = animeId ? getAnimeById(animeId) : undefined;
  const character = animeId && characterId ? getCharacterById(animeId, characterId) : undefined;

  if (!character || !anime) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Personnage non trouvé</h1>
          <Link to="/" className="text-primary hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const themeColors: Record<string, string> = {
    'theme-haikyuu': 'hsl(35, 100%, 50%)',
    'theme-solo-leveling': 'hsl(250, 100%, 65%)',
    'theme-hunter': 'hsl(145, 80%, 45%)',
    'theme-naruto': 'hsl(25, 100%, 50%)',
    'theme-demon-slayer': 'hsl(355, 90%, 55%)',
    'theme-jujutsu': 'hsl(280, 100%, 60%)',
  };

  const sections: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: 'about', label: 'ABOUT', icon: <Info className="w-4 h-4" /> },
    { id: 'affiliation', label: 'AFFILIATION', icon: <Users className="w-4 h-4" /> },
    { id: 'status', label: 'STATUS', icon: <UserCircle className="w-4 h-4" /> },
    { id: 'relationships', label: 'RELATIONSHIPS', icon: <Heart className="w-4 h-4" /> },
    { id: 'skills', label: 'SKILLS', icon: <Swords className="w-4 h-4" /> },
  ];

  const stats = [
    { label: 'Power', value: character.stats.power },
    { label: 'Speed', value: character.stats.speed },
    { label: 'Technique', value: character.stats.technique },
    { label: 'Intelligence', value: character.stats.intelligence },
    { label: 'Stamina', value: character.stats.stamina },
    { label: 'Agility', value: character.stats.agility },
  ];

  return (
    <div className={`min-h-screen bg-background ${anime.theme}`}>
      <ParticleBackground 
        particleCount={60} 
        color={themeColors[anime.theme] || 'hsl(35, 100%, 50%)'} 
      />
      <Navbar />

      <main className="relative pt-20 lg:pt-24 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="py-6"
          >
            <Link
              to={`/anime/${animeId}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Retour aux personnages</span>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-12 pb-20">
            {/* Main Content */}
            <div className="order-2 lg:order-1">
              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col lg:flex-row gap-8 mb-12"
              >
                {/* Character Image */}
                <div className="relative w-full lg:w-80 shrink-0">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden glass-card glow-border">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Rank Badge */}
                  {character.rank && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute -top-3 -right-3 flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30"
                    >
                      <Star className="w-4 h-4" />
                      {character.rank}
                    </motion.div>
                  )}
                </div>

                {/* Character Info */}
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Title */}
                    <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">
                      {character.title}
                    </p>

                    {/* Name */}
                    <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black mb-2 text-foreground leading-tight">
                      {character.name}
                    </h1>

                    {/* Native Name */}
                    {character.nativeName && (
                      <p className="text-xl text-muted-foreground mb-4 font-medium">
                        ({character.nativeName})
                      </p>
                    )}

                    {/* Role */}
                    <div className="flex items-center gap-2 mb-6">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{character.role}</span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {character.description}
                    </p>

                    {/* Stats */}
                    <div className="space-y-4">
                      <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider">
                        Statistiques
                      </h3>
                      <div className="grid gap-3">
                        {stats.map((stat, index) => (
                          <StatBar
                            key={stat.label}
                            label={stat.label}
                            value={stat.value}
                            delay={index * 0.1}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Content Sections */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-2xl p-6 lg:p-8"
                >
                  {activeSection === 'about' && (
                    <div className="space-y-6">
                      <h3 className="font-display text-xl font-bold gradient-text">Biographie</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {character.fullBio}
                      </p>
                      
                      {character.quotes.length > 0 && (
                        <div className="mt-8">
                          <h4 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <Quote className="w-5 h-5 text-primary" />
                            Citations Mémorables
                          </h4>
                          <div className="space-y-4">
                            {character.quotes.map((quote, index) => (
                              <motion.blockquote
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="pl-4 border-l-2 border-primary text-muted-foreground italic"
                              >
                                {quote}
                              </motion.blockquote>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeSection === 'affiliation' && (
                    <div className="space-y-6">
                      <h3 className="font-display text-xl font-bold gradient-text">Affiliation</h3>
                      <div className="grid gap-4">
                        <div className="glass p-4 rounded-xl">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Équipe / Organisation</p>
                          <p className="text-lg font-semibold text-foreground">{character.affiliation.team}</p>
                        </div>
                        <div className="glass p-4 rounded-xl">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Rôle</p>
                          <p className="text-lg font-semibold text-foreground">{character.affiliation.role}</p>
                        </div>
                        <div className="glass p-4 rounded-xl">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Alliés Principaux</p>
                          <div className="flex flex-wrap gap-2">
                            {character.affiliation.allies.map((ally) => (
                              <span
                                key={ally}
                                className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm"
                              >
                                {ally}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'status' && (
                    <div className="space-y-6">
                      <h3 className="font-display text-xl font-bold gradient-text">Status</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          { label: 'Statut', value: character.status.status },
                          { label: 'Âge', value: character.status.age },
                          { label: 'Anniversaire', value: character.status.birthday },
                          { label: 'Taille', value: character.status.height },
                          { label: 'Poids', value: character.status.weight },
                          { label: 'Groupe Sanguin', value: character.status.bloodType },
                        ].map((item) => (
                          <div key={item.label} className="glass p-4 rounded-xl">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                              {item.label}
                            </p>
                            <p className="text-lg font-semibold text-foreground">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSection === 'relationships' && (
                    <div className="space-y-6">
                      <h3 className="font-display text-xl font-bold gradient-text">Relations</h3>
                      <div className="grid gap-4">
                        {character.relationships.map((rel, index) => (
                          <motion.div
                            key={rel.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-4 rounded-xl flex items-center gap-4"
                          >
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                              <Heart className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{rel.name}</p>
                              <p className="text-sm text-muted-foreground">{rel.type}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSection === 'skills' && (
                    <div className="space-y-6">
                      <h3 className="font-display text-xl font-bold gradient-text">Compétences</h3>
                      <div className="grid gap-4">
                        {character.skills.map((skill, index) => (
                          <SkillCard key={skill.name} skill={skill} index={index} />
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sidebar Navigation */}
            <div className="order-1 lg:order-2">
              <div className="lg:sticky lg:top-28">
                <motion.nav
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card rounded-2xl p-4 space-y-2"
                >
                  {sections.map((section) => (
                    <motion.button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium uppercase tracking-wider transition-all ${
                        activeSection === section.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {section.icon}
                      {section.label}
                      {activeSection === section.id && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-2 h-2 rounded-full bg-primary-foreground"
                        />
                      )}
                    </motion.button>
                  ))}
                </motion.nav>

                {/* Quick Stats Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="glass-card rounded-2xl p-4 mt-4"
                >
                  <h4 className="font-display text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
                    Anime
                  </h4>
                  <Link
                    to={`/anime/${animeId}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <img
                      src={anime.image}
                      alt={anime.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{anime.title}</p>
                      <p className="text-xs text-muted-foreground">{anime.characters.length} personnages</p>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CharacterProfile;
