import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import { animeData, Character, Anime } from '@/data/animeData';
import { ArrowLeft, Swords, Zap, RefreshCcw, Crown, X, Plus, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { simulateBattle, BattleLogDisplay, BattleResult } from '@/components/BattleLog';

type FighterChar = Character & { animeId: string; animeTitle: string; animeTheme: string };

const BattleSimulator = () => {
  const [fighter1, setFighter1] = useState<FighterChar | null>(null);
  const [fighter2, setFighter2] = useState<FighterChar | null>(null);
  const [showSelector, setShowSelector] = useState<1 | 2 | null>(null);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [battleState, setBattleState] = useState<'idle' | 'fighting' | 'result'>('idle');
  const [winner, setWinner] = useState<1 | 2 | null>(null);
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);

  // For fighter 2, lock to the anime of fighter 1
  const selectorAnime = useMemo(() => {
    if (showSelector === 2 && fighter1) {
      return animeData.find(a => a.id === fighter1.animeId) || null;
    }
    return selectedAnime;
  }, [showSelector, fighter1, selectedAnime]);

  const isAnimeLockedForFighter2 = showSelector === 2 && fighter1 !== null;

  const selectAnime = (anime: Anime) => {
    setSelectedAnime(anime);
  };

  const selectFighter = (char: Character, anime: Anime) => {
    const fighterChar: FighterChar = {
      ...char,
      animeId: anime.id,
      animeTitle: anime.title,
      animeTheme: anime.theme,
    };
    if (showSelector === 1) {
      setFighter1(fighterChar);
      // Reset fighter 2 if anime changed
      if (fighter2 && fighter2.animeId !== anime.id) {
        setFighter2(null);
      }
    } else if (showSelector === 2) {
      setFighter2(fighterChar);
    }
    setShowSelector(null);
    setSelectedAnime(null);
    setBattleState('idle');
    setWinner(null);
    setBattleResult(null);
  };

  const startBattle = () => {
    if (!fighter1 || !fighter2) return;
    setBattleState('fighting');
    setBattleResult(null);

    // Simulate after a brief suspense delay
    setTimeout(() => {
      const result = simulateBattle(fighter1, fighter2);
      setBattleResult(result);
      setWinner(result.winner);
      setBattleState('result');
    }, 1500);
  };

  const resetBattle = () => {
    setBattleState('idle');
    setWinner(null);
    setBattleResult(null);
  };

  const openSelector = (slot: 1 | 2) => {
    setShowSelector(slot);
    setSelectedAnime(null);
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
              <FighterSlot
                fighter={fighter1}
                slot={1}
                winner={winner}
                onSelect={() => openSelector(1)}
              />

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
              <FighterSlot
                fighter={fighter2}
                slot={2}
                winner={winner}
                onSelect={() => openSelector(2)}
                disabled={!fighter1}
              />
            </div>

            {/* Info text when fighter1 selected but not fighter2 */}
            {fighter1 && !fighter2 && battleState === 'idle' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-sm text-muted-foreground mb-4"
              >
                Le combattant 2 sera choisi parmi les personnages de <span className="text-primary font-semibold">{fighter1.animeTitle}</span>
              </motion.p>
            )}

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
              {battleResult && fighter1 && fighter2 && (
                <BattleLogDisplay fighter1={fighter1} fighter2={fighter2} result={battleResult} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Selector Modal */}
      <AnimatePresence>
        {showSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => { setShowSelector(null); setSelectedAnime(null); }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass-card rounded-2xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  {selectorAnime && !isAnimeLockedForFighter2 && (
                    <button
                      onClick={() => setSelectedAnime(null)}
                      className="p-1.5 hover:bg-muted rounded-full transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  )}
                  <h2 className="font-display text-xl font-bold">
                    {isAnimeLockedForFighter2
                      ? `Choisir le combattant 2 — ${selectorAnime?.title}`
                      : selectorAnime
                        ? `${selectorAnime.title} — Choisir un personnage`
                        : `Combattant ${showSelector} — Choisir un anime`
                    }
                  </h2>
                </div>
                <button onClick={() => { setShowSelector(null); setSelectedAnime(null); }} className="p-2 hover:bg-muted rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Step 1: Anime selection (only for fighter 1, or if no anime locked) */}
              {!selectorAnime && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {animeData.map((anime) => (
                    <motion.button
                      key={anime.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => selectAnime(anime)}
                      className="relative group rounded-xl overflow-hidden aspect-[4/3] border border-border/50 hover:border-primary/50 transition-colors"
                    >
                      <img src={anime.image} alt={anime.title} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="font-display text-sm font-bold truncate">{anime.title}</p>
                        <p className="text-[10px] text-muted-foreground">{anime.characters.length} personnages</p>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-5 h-5 text-primary" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Step 2: Character selection */}
              {selectorAnime && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                  {selectorAnime.characters
                    .filter(char => {
                      // Exclude already selected fighter from same anime
                      if (showSelector === 2 && fighter1 && fighter1.animeId === selectorAnime.id) {
                        return char.id !== fighter1.id;
                      }
                      if (showSelector === 1 && fighter2 && fighter2.animeId === selectorAnime.id) {
                        return char.id !== fighter2.id;
                      }
                      return true;
                    })
                    .map((char) => (
                      <motion.button
                        key={char.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => selectFighter(char, selectorAnime)}
                        className="relative group aspect-[3/4] rounded-lg overflow-hidden border border-border/30 hover:border-primary/50 transition-colors"
                      >
                        <img src={char.image} alt={char.name} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <p className="text-xs font-medium truncate">{char.name}</p>
                        </div>
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------- Fighter Slot Component ---------- */
interface FighterSlotProps {
  fighter: FighterChar | null;
  slot: 1 | 2;
  winner: 1 | 2 | null;
  onSelect: () => void;
  disabled?: boolean;
}

const FighterSlot = ({ fighter, slot, winner, onSelect, disabled }: FighterSlotProps) => {
  const isWinner = winner === slot;
  const alignRight = slot === 2;

  return (
    <motion.div
      initial={{ opacity: 0, x: slot === 1 ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "col-span-2 relative glass-card rounded-2xl overflow-hidden aspect-[3/4]",
        fighter?.animeTheme,
        isWinner && "ring-4 ring-primary animate-glow",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      {fighter ? (
        <>
          <img src={fighter.image} alt={fighter.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <button
            onClick={onSelect}
            className={cn(
              "absolute top-3 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors z-10",
              alignRight ? "left-3" : "right-3"
            )}
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
          {isWinner && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={cn(
                "absolute top-3 p-2 rounded-full bg-primary z-10",
                alignRight ? "right-3" : "left-3"
              )}
            >
              <Crown className="w-5 h-5 text-primary-foreground" />
            </motion.div>
          )}
          <div className={cn("absolute bottom-0 left-0 right-0 p-4", alignRight && "text-right")}>
            <p className="text-xs text-primary font-medium">{fighter.animeTitle}</p>
            <h3 className="font-display text-lg lg:text-xl font-bold">{fighter.name}</h3>
          </div>
        </>
      ) : (
        <button
          onClick={onSelect}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 hover:bg-muted/20 transition-colors"
        >
          <Plus className="w-12 h-12 text-muted-foreground" />
          <span className="text-muted-foreground">Choisir</span>
        </button>
      )}
    </motion.div>
  );
};

export default BattleSimulator;
