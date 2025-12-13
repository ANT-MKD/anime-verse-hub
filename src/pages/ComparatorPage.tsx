import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import { getAllCharacters, Character } from '@/data/animeData';
import { X, Plus, Swords, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const ComparatorPage = () => {
  const allCharacters = useMemo(() => getAllCharacters(), []);
  const [selectedCharacters, setSelectedCharacters] = useState<(Character & { animeId: string; animeTitle: string; animeTheme: string })[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  const addCharacter = (char: Character & { animeId: string; animeTitle: string; animeTheme: string }) => {
    if (selectedCharacters.length < 4 && !selectedCharacters.find(c => c.id === char.id)) {
      setSelectedCharacters([...selectedCharacters, char]);
    }
    setShowSelector(false);
  };

  const removeCharacter = (charId: string) => {
    setSelectedCharacters(selectedCharacters.filter(c => c.id !== charId));
  };

  const statLabels = {
    power: 'Puissance',
    speed: 'Vitesse',
    technique: 'Technique',
    intelligence: 'Intelligence',
    stamina: 'Endurance',
    agility: 'Agilité'
  };

  const getStatColor = (value: number) => {
    if (value >= 90) return 'from-green-500 to-emerald-400';
    if (value >= 75) return 'from-blue-500 to-cyan-400';
    if (value >= 60) return 'from-yellow-500 to-amber-400';
    return 'from-red-500 to-orange-400';
  };

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground particleCount={30} />
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Link to="/characters" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Retour aux personnages
            </Link>
            <h1 className="font-display text-4xl lg:text-6xl font-bold mb-4">
              <span className="gradient-text">COMPARATEUR</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Comparez les stats de vos personnages préférés (jusqu'à 4)
            </p>
          </motion.div>

          {/* Selected Characters Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
            {[0, 1, 2, 3].map((index) => {
              const char = selectedCharacters[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "relative glass-card rounded-2xl overflow-hidden aspect-[3/4]",
                    char ? char.animeTheme : ''
                  )}
                >
                  {char ? (
                    <>
                      <img 
                        src={char.image} 
                        alt={char.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      <button
                        onClick={() => removeCharacter(char.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-destructive/80 hover:bg-destructive transition-colors z-10"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-xs text-primary font-medium">{char.animeTitle}</p>
                        <h3 className="font-display text-sm lg:text-base font-bold text-foreground truncate">{char.name}</h3>
                        <p className="text-xs text-muted-foreground">{char.role}</p>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => setShowSelector(true)}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-3 hover:bg-muted/20 transition-colors"
                    >
                      <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center">
                        <Plus className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <span className="text-sm text-muted-foreground">Ajouter</span>
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Stats Comparison */}
          {selectedCharacters.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6 lg:p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <Swords className="w-6 h-6 text-primary" />
                <h2 className="font-display text-xl lg:text-2xl font-bold">Comparaison des Stats</h2>
              </div>

              <div className="space-y-6">
                {Object.entries(statLabels).map(([key, label]) => (
                  <div key={key} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {selectedCharacters.map((char) => {
                        const value = char.stats[key as keyof typeof char.stats];
                        const isHighest = Math.max(...selectedCharacters.map(c => c.stats[key as keyof typeof c.stats])) === value;
                        return (
                          <div key={char.id} className={cn("space-y-1", char.animeTheme)}>
                            <div className="flex items-center justify-between">
                              <span className="text-xs truncate">{char.name.split(' ')[0]}</span>
                              <span className={cn("text-sm font-bold", isHighest && "text-primary")}>{value}</span>
                            </div>
                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${value}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={cn(
                                  "h-full rounded-full bg-gradient-to-r",
                                  isHighest ? "from-primary to-primary/80" : getStatColor(value)
                                )}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Score */}
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-display text-lg font-bold mb-4">Score Total</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {selectedCharacters.map((char) => {
                    const total = Object.values(char.stats).reduce((a, b) => a + b, 0);
                    const average = Math.round(total / 6);
                    return (
                      <div key={char.id} className={cn("glass-card rounded-xl p-4 text-center", char.animeTheme)}>
                        <p className="text-xs text-muted-foreground mb-1">{char.name.split(' ')[0]}</p>
                        <p className="font-display text-3xl font-bold gradient-text">{average}</p>
                        <p className="text-xs text-muted-foreground">moyenne</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {selectedCharacters.length < 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">Sélectionnez au moins 2 personnages pour comparer leurs stats</p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Character Selector Modal */}
      <AnimatePresence>
        {showSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowSelector(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-2xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold">Choisir un personnage</h2>
                <button onClick={() => setShowSelector(false)} className="p-2 hover:bg-muted rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {allCharacters
                  .filter(c => !selectedCharacters.find(s => s.id === c.id))
                  .map((char) => (
                    <motion.button
                      key={char.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addCharacter(char)}
                      className="relative group aspect-[3/4] rounded-lg overflow-hidden"
                    >
                      <img src={char.image} alt={char.name} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <p className="text-[10px] text-primary/80">{char.animeTitle}</p>
                        <p className="text-xs font-medium truncate">{char.name}</p>
                      </div>
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComparatorPage;
