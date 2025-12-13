import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Character, getAnimeById } from '@/data/animeData';
import { cn } from '@/lib/utils';

interface RelationshipGraphProps {
  character: Character;
  animeId: string;
  theme: string;
}

const RelationshipGraph = ({ character, animeId, theme }: RelationshipGraphProps) => {
  const anime = getAnimeById(animeId);
  
  const relatedCharacters = useMemo(() => {
    if (!anime) return [];
    return character.relationships.map(rel => {
      const found = anime.characters.find(c => 
        c.name.toLowerCase().includes(rel.name.toLowerCase().split(' ')[0]) ||
        rel.name.toLowerCase().includes(c.name.toLowerCase().split(' ')[0])
      );
      return { ...rel, character: found };
    });
  }, [anime, character.relationships]);

  const getRelationColor = (type: string) => {
    const lower = type.toLowerCase();
    if (lower.includes('ami') || lower.includes('partenaire') || lower.includes('ally')) return 'from-green-500 to-emerald-400';
    if (lower.includes('rival')) return 'from-yellow-500 to-orange-400';
    if (lower.includes('ennemi') || lower.includes('antagonist')) return 'from-red-500 to-rose-400';
    if (lower.includes('mentor') || lower.includes('sensei')) return 'from-blue-500 to-cyan-400';
    if (lower.includes('famille') || lower.includes('frère') || lower.includes('sœur')) return 'from-purple-500 to-pink-400';
    if (lower.includes('amour') || lower.includes('love')) return 'from-pink-500 to-rose-400';
    return 'from-muted-foreground to-muted';
  };

  return (
    <div className={cn("glass-card rounded-2xl p-6", theme)}>
      <h3 className="font-display text-xl font-bold mb-6 gradient-text">Graphe de Relations</h3>
      
      <div className="relative">
        {/* Central Character */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary shadow-lg shadow-primary/30">
              <img src={character.image} alt={character.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold whitespace-nowrap">
              {character.name.split(' ')[0]}
            </div>
          </motion.div>
        </div>

        {/* Relationships */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {relatedCharacters.map((rel, index) => (
            <motion.div
              key={rel.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connection Line */}
              <div className={cn(
                "absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-4 -mt-4 bg-gradient-to-b",
                getRelationColor(rel.type)
              )} />
              
              {rel.character ? (
                <Link 
                  to={`/anime/${animeId}/character/${rel.character.id}`}
                  className="block glass rounded-xl p-4 hover:bg-muted/30 transition-colors group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={cn(
                      "w-16 h-16 rounded-full overflow-hidden mb-2 ring-2",
                      `ring-gradient-to-r ${getRelationColor(rel.type).replace('from-', 'ring-').split(' ')[0]}`
                    )}>
                      <img 
                        src={rel.character.image} 
                        alt={rel.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <p className="text-sm font-medium truncate w-full">{rel.name}</p>
                    <p className={cn(
                      "text-xs px-2 py-0.5 rounded-full bg-gradient-to-r",
                      getRelationColor(rel.type),
                      "text-white mt-1"
                    )}>
                      {rel.type}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="glass rounded-xl p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
                      <span className="text-2xl">👤</span>
                    </div>
                    <p className="text-sm font-medium truncate w-full">{rel.name}</p>
                    <p className={cn(
                      "text-xs px-2 py-0.5 rounded-full bg-gradient-to-r",
                      getRelationColor(rel.type),
                      "text-white mt-1"
                    )}>
                      {rel.type}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelationshipGraph;
