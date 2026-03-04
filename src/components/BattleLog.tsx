import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Character } from '@/data/animeData';
import { cn } from '@/lib/utils';
import { Heart, Shield, Swords, Zap, Flame, Wind, Star } from 'lucide-react';

type FighterChar = Character & { animeId: string; animeTitle: string; animeTheme: string };

export interface BattleRound {
  round: number;
  attackerSlot: 1 | 2;
  skillUsed: string;
  skillType: string;
  damage: number;
  isCritical: boolean;
  isBlocked: boolean;
  narration: string;
  hp1After: number;
  hp2After: number;
}

export interface BattleResult {
  rounds: BattleRound[];
  winner: 1 | 2;
  maxHp1: number;
  maxHp2: number;
}

// Generate the full battle simulation
export function simulateBattle(fighter1: FighterChar, fighter2: FighterChar): BattleResult {
  const maxHp1 = 100 + fighter1.stats.stamina * 1.5 + fighter1.stats.power * 0.5;
  const maxHp2 = 100 + fighter2.stats.stamina * 1.5 + fighter2.stats.power * 0.5;
  let hp1 = maxHp1;
  let hp2 = maxHp2;

  const rounds: BattleRound[] = [];
  const fighters = [fighter1, fighter2] as const;
  
  // Who goes first based on speed + agility
  let currentAttacker: 1 | 2 = (fighter1.stats.speed + fighter1.stats.agility) >= (fighter2.stats.speed + fighter2.stats.agility) ? 1 : 2;

  const attackVerbs = ['lance', 'déchaîne', 'exécute', 'libère', 'utilise'];
  const critVerbs = ['DÉVASTATEUR', 'CRITIQUE', 'SURPUISSANT', 'FATAL'];
  const blockVerbs = ['esquive partiellement', 'bloque avec difficulté', 'encaisse et riposte', 'résiste à'];
  const dmgDescLow = ['effleure', 'touche légèrement', 'gratte'];
  const dmgDescMed = ['frappe solidement', 'touche en plein', 'percute violemment'];
  const dmgDescHigh = ['écrase', 'pulvérise', 'anéantit la garde de'];

  const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  let roundNum = 0;
  const maxRounds = 12;

  while (hp1 > 0 && hp2 > 0 && roundNum < maxRounds) {
    roundNum++;
    const attacker = fighters[currentAttacker - 1];
    const defender = fighters[currentAttacker === 1 ? 1 : 0];
    const defenderSlot = currentAttacker === 1 ? 2 : 1;

    // Pick a skill (cycle through available skills)
    const skillPool = attacker.skills.length > 0 ? attacker.skills : [{ name: 'Attaque de base', type: 'Attack' as const, description: '', level: 50 }];
    const skill = skillPool[(roundNum - 1) % skillPool.length];

    // Calculate damage
    const atkStat = attacker.stats.power * 0.4 + attacker.stats.technique * 0.3 + (skill.level || 50) * 0.3;
    const defStat = defender.stats.stamina * 0.3 + defender.stats.agility * 0.3 + defender.stats.speed * 0.2 + defender.stats.intelligence * 0.2;
    
    const isCritical = Math.random() < (attacker.stats.technique / 400 + 0.08);
    const isBlocked = Math.random() < (defender.stats.agility / 350 + 0.05);
    
    let baseDmg = Math.max(5, atkStat * (0.7 + Math.random() * 0.6) - defStat * 0.3);
    if (isCritical) baseDmg *= 1.8;
    if (isBlocked) baseDmg *= 0.4;
    // Skill type bonus
    if (skill.type === 'Ultimate') baseDmg *= 1.4;
    if (skill.type === 'Attack') baseDmg *= 1.1;
    
    const damage = Math.round(baseDmg);
    
    // Apply damage
    if (defenderSlot === 2) {
      hp2 = Math.max(0, hp2 - damage);
    } else {
      hp1 = Math.max(0, hp1 - damage);
    }

    // Build narration
    const attackerName = attacker.name.split(' ')[0];
    const defenderName = defender.name.split(' ')[0];
    const verb = pick(attackVerbs);
    let narration = '';

    if (isCritical) {
      narration = `💥 ${attackerName} ${verb} "${skill.name}" — COUP ${pick(critVerbs)} ! ${damage} dégâts !`;
    } else if (isBlocked) {
      narration = `🛡️ ${defenderName} ${pick(blockVerbs)} "${skill.name}" de ${attackerName}. ${damage} dégâts seulement.`;
    } else {
      const dmgLevel = damage > 35 ? pick(dmgDescHigh) : damage > 18 ? pick(dmgDescMed) : pick(dmgDescLow);
      narration = `⚔️ ${attackerName} ${verb} "${skill.name}" et ${dmgLevel} ${defenderName}. ${damage} dégâts.`;
    }

    rounds.push({
      round: roundNum,
      attackerSlot: currentAttacker,
      skillUsed: skill.name,
      skillType: skill.type,
      damage,
      isCritical,
      isBlocked,
      narration,
      hp1After: Math.round(hp1),
      hp2After: Math.round(hp2),
    });

    currentAttacker = currentAttacker === 1 ? 2 : 1;
  }

  const winner: 1 | 2 = hp1 > hp2 ? 1 : hp2 > hp1 ? 2 : (Math.random() > 0.5 ? 1 : 2);

  return { rounds, winner, maxHp1: Math.round(maxHp1), maxHp2: Math.round(maxHp2) };
}

/* ============ Battle Log Display Component ============ */

interface BattleLogProps {
  fighter1: FighterChar;
  fighter2: FighterChar;
  result: BattleResult;
}

const HealthBar = ({ current, max, label, align = 'left' }: { current: number; max: number; label: string; align?: 'left' | 'right' }) => {
  const pct = Math.max(0, (current / max) * 100);
  const color = pct > 60 ? 'bg-emerald-500' : pct > 30 ? 'bg-amber-500' : 'bg-red-500';
  const glowColor = pct > 60 ? 'shadow-emerald-500/40' : pct > 30 ? 'shadow-amber-500/40' : 'shadow-red-500/40';

  return (
    <div className={cn("flex flex-col gap-1", align === 'right' && "items-end")}>
      <div className="flex items-center gap-2 text-xs">
        <Heart className="w-3 h-3 text-red-400" />
        <span className="font-display font-bold text-foreground">{label}</span>
        <span className="text-muted-foreground">{Math.round(current)}/{Math.round(max)}</span>
      </div>
      <div className="w-full h-3 rounded-full bg-muted/50 overflow-hidden backdrop-blur-sm border border-border/30">
        <motion.div
          className={cn("h-full rounded-full shadow-lg", color, glowColor)}
          initial={{ width: '100%' }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

const SkillTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'Attack': return <Swords className="w-3.5 h-3.5 text-red-400" />;
    case 'Defense': return <Shield className="w-3.5 h-3.5 text-blue-400" />;
    case 'Ultimate': return <Flame className="w-3.5 h-3.5 text-orange-400" />;
    case 'Support': return <Heart className="w-3.5 h-3.5 text-emerald-400" />;
    case 'Passive': return <Wind className="w-3.5 h-3.5 text-sky-400" />;
    default: return <Zap className="w-3.5 h-3.5 text-primary" />;
  }
};

export const BattleLogDisplay = ({ fighter1, fighter2, result }: BattleLogProps) => {
  const [visibleRounds, setVisibleRounds] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  // Reveal rounds progressively
  useEffect(() => {
    if (visibleRounds < result.rounds.length) {
      const timer = setTimeout(() => {
        setVisibleRounds(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else if (visibleRounds === result.rounds.length && !showResult) {
      const timer = setTimeout(() => setShowResult(true), 600);
      return () => clearTimeout(timer);
    }
  }, [visibleRounds, result.rounds.length, showResult]);

  // Auto-scroll
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [visibleRounds, showResult]);

  const currentRound = result.rounds[visibleRounds - 1];
  const currentHp1 = currentRound ? currentRound.hp1After : result.maxHp1;
  const currentHp2 = currentRound ? currentRound.hp2After : result.maxHp2;

  const winnerName = result.winner === 1 ? fighter1.name : fighter2.name;
  const loserName = result.winner === 1 ? fighter2.name : fighter1.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      {/* HP Bars Header */}
      <div className="p-4 lg:p-6 border-b border-border/30 bg-muted/10">
        <div className="grid grid-cols-2 gap-4 lg:gap-8">
          <HealthBar current={currentHp1} max={result.maxHp1} label={fighter1.name.split(' ')[0]} align="left" />
          <HealthBar current={currentHp2} max={result.maxHp2} label={fighter2.name.split(' ')[0]} align="right" />
        </div>
      </div>

      {/* Battle Log */}
      <div ref={logRef} className="p-4 lg:p-6 max-h-[400px] overflow-y-auto space-y-3">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-3"
        >
          <p className="font-display text-lg font-bold gradient-text">⚔️ {fighter1.name.split(' ')[0]} VS {fighter2.name.split(' ')[0]}</p>
          <p className="text-xs text-muted-foreground mt-1">Le combat commence !</p>
        </motion.div>

        {/* Rounds */}
        <AnimatePresence>
          {result.rounds.slice(0, visibleRounds).map((round) => {
            const isLeft = round.attackerSlot === 1;
            return (
              <motion.div
                key={round.round}
                initial={{ opacity: 0, x: isLeft ? -30 : 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className={cn(
                  "flex gap-3 items-start",
                  isLeft ? "flex-row" : "flex-row-reverse"
                )}
              >
                {/* Round badge */}
                <div className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border",
                  round.isCritical
                    ? "bg-red-500/20 border-red-500/50 text-red-400"
                    : round.isBlocked
                      ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                      : "bg-muted/50 border-border/50 text-muted-foreground"
                )}>
                  R{round.round}
                </div>

                {/* Message bubble */}
                <div className={cn(
                  "flex-1 rounded-xl p-3 max-w-[80%]",
                  isLeft
                    ? "bg-primary/10 border border-primary/20 rounded-tl-none"
                    : "bg-accent/30 border border-accent/20 rounded-tr-none",
                  round.isCritical && "ring-1 ring-red-500/30"
                )}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <SkillTypeIcon type={round.skillType} />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {round.skillType}
                    </span>
                    {round.isCritical && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold ml-auto">
                        CRITIQUE ×1.8
                      </span>
                    )}
                    {round.isBlocked && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold ml-auto">
                        BLOQUÉ
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{round.narration}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Zap className="w-3 h-3 text-primary" />
                    <span className={cn(
                      "text-xs font-bold",
                      round.damage > 35 ? "text-red-400" : round.damage > 18 ? "text-amber-400" : "text-muted-foreground"
                    )}>
                      -{round.damage} HP
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Loading indicator while rounds are revealing */}
        {visibleRounds < result.rounds.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center py-2"
          >
            <div className="flex gap-1.5">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Final Result */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative mt-4 py-6 px-4 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/30 text-center overflow-hidden"
            >
              {/* Sparkle effect */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-primary"
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${20 + (i % 3) * 25}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
              <Star className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="font-display text-xl lg:text-2xl font-bold gradient-text mb-1">
                🏆 {winnerName} remporte le combat !
              </p>
              <p className="text-sm text-muted-foreground">
                {loserName.split(' ')[0]} est K.O. après {result.rounds.length} rounds
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
