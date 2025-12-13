import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import { getAllCharacters, Character } from '@/data/animeData';
import { ArrowLeft, Swords, Zap, RefreshCcw, Crown, X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const BattleSimulator = () => {
  const allCharacters = useMemo(() => getAllCharacters(), []);
  const [fighter1, setFighter1] = useState<(Character & { animeId: string; animeTitle: string; animeTheme: string }) | null>(null);
  const [fighter2, setFighter2] = useState<(Character & { animeId: string; animeTitle: string; animeTheme: string }) | null>(null);
  const [showSelector, setShowSelector] = useState<1 | 2 | null>(null);
  const [battleState, setBattleState] = useState<'idle' | 'fighting' | 'result'>('idle');
  const [winner, setWinner] = useState<1 | 2 | null>(null);
  const [battleLog, setBattleLog] = useState<string[]>([]);

  const selectFighter = (char: Character & { animeId: string; animeTitle: string; animeTheme: string }) => {
    if (showSelector === 1) {
      setFighter1(char);
    } else if (showSelector === 2) {
      setFighter2(char);
    }
    setShowSelector(null);
    setBattleState('idle');
    setWinner(null);
    setBattleLog([]);
  };

  const calculateScore = (char: Character) => {
    const { power, speed, technique, intelligence, stamina, agility } = char.stats;
    const base = power * 0.25 + speed * 0.15 + technique * 0.2 + intelligence * 0.15 + stamina * 0.15 + agility * 0.1;
    const randomFactor = 0.85 + Math.random() * 0.3; // 85% - 115%
    return Math.round(base * randomFactor);
  };

  const startBattle = () => {
    if (!fighter1 || !fighter2) return;
    
    setBattleState('fighting');
    setBattleLog([]);
    
    const logs: string[] = [];
    logs.push(`⚔️ ${fighter1.name} VS ${fighter2.name}`);
    logs.push('Le combat commence !');

    setTimeout(() => {
      const score1 = calculateScore(fighter1);
      const score2 = calculateScore(fighter2);
      
      logs.push(`${fighter1.name.split(' ')[0]} utilise ${fighter1.skills[0]?.name || 'une attaque puissante'} !`);
      logs.push(`${fighter2.name.split(' ')[0]} contre avec ${fighter2.skills[0]?.name || 'sa technique spéciale'} !`);
      
      if (score1 > score2) {
        logs.push(`💥 ${fighter1.name.split(' ')[0]} porte le coup final !`);
        logs.push(`🏆 ${fighter1.name} remporte le combat !`);
        setWinner(1);
      } else if (score2 > score1) {
        logs.push(`💥 ${fighter2.name.split(' ')[0]} porte le coup final !`);
        logs.push(`🏆 ${fighter2.name} remporte le combat !`);
        setWinner(2);
      } else {
        logs.push('⚡ Les deux combattants sont à égalité !');
        setWinner(Math.random() > 0.5 ? 1 : 2);
      }
      
      setBattleLog(logs);
      setBattleState('result');
    }, 2000);
  };

  const resetBattle = () => {
    setBattleState('idle');
    setWinner(null);
    setBattleLog([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground particleCount={40} />
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            <h1 className="font-display text-4xl lg:text-6xl font-bold mb-4">
              <span className="gradient-text">QUI GAGNERAIT ?</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Simulez des combats épiques entre vos personnages préférés
            </p>
          </motion.div>

          {/* Battle Arena */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-5 gap-4 lg:gap-8 items-center mb-8">
              {/* Fighter 1 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "col-span-2 relative glass-card rounded-2xl overflow-hidden aspect-[3/4]",
                  fighter1?.animeTheme,
                  winner === 1 && "ring-4 ring-primary animate-glow"
                )}
              >
                {fighter1 ? (
                  <>
                    <img src={fighter1.image} alt={fighter1.name} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    <button
                      onClick={() => setShowSelector(1)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors z-10"
                    >
                      <RefreshCcw className="w-4 h-4" />
                    </button>
                    {winner === 1 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 left-3 p-2 rounded-full bg-primary z-10"
                      >
                        <Crown className="w-5 h-5 text-primary-foreground" />
                      </motion.div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-xs text-primary font-medium">{fighter1.animeTitle}</p>
                      <h3 className="font-display text-lg lg:text-xl font-bold">{fighter1.name}</h3>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => setShowSelector(1)}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 hover:bg-muted/20 transition-colors"
                  >
                    <Plus className="w-12 h-12 text-muted-foreground" />
                    <span className="text-muted-foreground">Choisir</span>
                  </button>
                )}
              </motion.div>

              {/* VS */}
              <div className="col-span-1 flex flex-col items-center justify-center">
                <motion.div
                  animate={battleState === 'fighting' ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 0.5, repeat: battleState === 'fighting' ? Infinity : 0 }}
                  className="relative"
                >
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary/20 flex items-center justify-center">
                    <Swords className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
                  </div>
                  {battleState === 'fighting' && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-primary"
                      animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>
                <span className="font-display text-2xl lg:text-3xl font-bold mt-2 gradient-text">VS</span>
              </div>

              {/* Fighter 2 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "col-span-2 relative glass-card rounded-2xl overflow-hidden aspect-[3/4]",
                  fighter2?.animeTheme,
                  winner === 2 && "ring-4 ring-primary animate-glow"
                )}
              >
                {fighter2 ? (
                  <>
                    <img src={fighter2.image} alt={fighter2.name} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    <button
                      onClick={() => setShowSelector(2)}
                      className="absolute top-3 left-3 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors z-10"
                    >
                      <RefreshCcw className="w-4 h-4" />
                    </button>
                    {winner === 2 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-primary z-10"
                      >
                        <Crown className="w-5 h-5 text-primary-foreground" />
                      </motion.div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-right">
                      <p className="text-xs text-primary font-medium">{fighter2.animeTitle}</p>
                      <h3 className="font-display text-lg lg:text-xl font-bold">{fighter2.name}</h3>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => setShowSelector(2)}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 hover:bg-muted/20 transition-colors"
                  >
                    <Plus className="w-12 h-12 text-muted-foreground" />
                    <span className="text-muted-foreground">Choisir</span>
                  </button>
                )}
              </motion.div>
            </div>

            {/* Battle Button */}
            <div className="flex justify-center mb-8">
              {battleState === 'idle' && fighter1 && fighter2 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startBattle}
                  className="flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg shadow-lg shadow-primary/30"
                >
                  <Zap className="w-6 h-6" />
                  COMBAT !
                </motion.button>
              )}
              {battleState === 'result' && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetBattle}
                  className="flex items-center gap-3 px-8 py-4 rounded-xl glass border border-border font-bold text-lg"
                >
                  <RefreshCcw className="w-5 h-5" />
                  Rejouer
                </motion.button>
              )}
            </div>

            {/* Battle Log */}
            <AnimatePresence>
              {battleLog.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <h3 className="font-display text-lg font-bold mb-4">Journal de Combat</h3>
                  <div className="space-y-2">
                    {battleLog.map((log, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.3 }}
                        className={cn(
                          "text-sm",
                          log.includes('🏆') ? 'text-primary font-bold text-lg' : 'text-muted-foreground'
                        )}
                      >
                        {log}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
            onClick={() => setShowSelector(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass-card rounded-2xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold">Choisir le combattant {showSelector}</h2>
                <button onClick={() => setShowSelector(null)} className="p-2 hover:bg-muted rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {allCharacters.map((char) => (
                  <motion.button
                    key={char.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => selectFighter(char)}
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

export default BattleSimulator;
