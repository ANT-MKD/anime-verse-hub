import { motion } from 'framer-motion';
import { Skill } from '@/data/animeData';
import { Sword, Shield, Heart, Sparkles } from 'lucide-react';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const typeIcons = {
  Attack: Sword,
  Defense: Shield,
  Support: Heart,
  Passive: Sparkles,
};

const typeColors = {
  Attack: 'from-red-500/20 to-orange-500/20 border-red-500/30',
  Defense: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  Support: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  Passive: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
};

const SkillCard = ({ skill, index }: SkillCardProps) => {
  const Icon = typeIcons[skill.type];
  const colorClass = typeColors[skill.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative glass-card p-5 rounded-xl bg-gradient-to-br ${colorClass} overflow-hidden group`}
    >
      {/* Skill Orb */}
      <div className="flex items-start gap-4">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
          className="skill-orb shrink-0"
        >
          <Icon className="w-6 h-6 text-primary-foreground" />
        </motion.div>

        <div className="flex-1 min-w-0">
          {/* Skill Name */}
          <h4 className="font-display text-sm lg:text-base font-bold text-foreground mb-1">
            {skill.name}
          </h4>

          {/* Type Badge */}
          <span className="inline-block px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium mb-2">
            {skill.type}
          </span>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {skill.description}
          </p>

          {/* Level Bar */}
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-muted-foreground">Maîtrise</span>
              <span className="text-xs font-bold text-primary">{skill.level}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1.2, delay: index * 0.15 + 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default SkillCard;
