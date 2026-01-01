import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, Trophy, Medal, Award, Crown, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import { getAllCharacters } from '@/data/animeData';
import { useTierListVotes } from '@/hooks/useTierListVotes';
import { cn } from '@/lib/utils';

type SortMode = 'votes' | 'power' | 'speed' | 'intelligence';

const TierListPage = () => {
  const allCharacters = getAllCharacters();
  const { votes, upvote, removeVote, hasVoted, getVoteCount, getTotalVotes } = useTierListVotes();
  const [sortMode, setSortMode] = useState<SortMode>('votes');
  const [selectedAnime, setSelectedAnime] = useState<string>('all');

  const animes = useMemo(() => {
    const unique = [...new Set(allCharacters.map((c) => c.animeTitle))];
    return ['all', ...unique];
  }, [allCharacters]);

  const sortedCharacters = useMemo(() => {
    let filtered = selectedAnime === 'all'
      ? allCharacters
      : allCharacters.filter((c) => c.animeTitle === selectedAnime);

    return [...filtered].sort((a, b) => {
      const keyA = `${a.animeId}-${a.id}`;
      const keyB = `${b.animeId}-${b.id}`;

      switch (sortMode) {
        case 'votes':
          return getVoteCount(keyB) - getVoteCount(keyA);
        case 'power':
          return b.stats.power - a.stats.power;
        case 'speed':
          return b.stats.speed - a.stats.speed;
        case 'intelligence':
          return b.stats.intelligence - a.stats.intelligence;
        default:
          return 0;
      }
    });
  }, [allCharacters, sortMode, selectedAnime, getVoteCount]);

  const getTierInfo = (rank: number) => {
    if (rank === 1) return { tier: 'S+', color: 'from-yellow-400 to-amber-600', icon: Crown };
    if (rank === 2) return { tier: 'S', color: 'from-gray-300 to-gray-500', icon: Trophy };
    if (rank === 3) return { tier: 'S', color: 'from-amber-600 to-amber-800', icon: Medal };
    if (rank <= 5) return { tier: 'A', color: 'from-purple-500 to-purple-700', icon: Award };
    if (rank <= 10) return { tier: 'A', color: 'from-blue-500 to-blue-700', icon: Star };
    if (rank <= 20) return { tier: 'B', color: 'from-green-500 to-green-700', icon: null };
    if (rank <= 30) return { tier: 'C', color: 'from-teal-500 to-teal-700', icon: null };
    return { tier: 'D', color: 'from-muted to-muted-foreground', icon: null };
  };

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground particleCount={25} />
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-4xl lg:text-6xl font-black mb-4">
              <span className="gradient-text">TIER LIST</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-2">
              Votez pour vos personnages préférés! {getTotalVotes()} votes au total.
            </p>
            <p className="text-sm text-muted-foreground">
              Les votes sont sauvegardés localement sur votre appareil.
            </p>
          </motion.div>

          {/* Controls */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="glass-card rounded-lg p-1 flex gap-1">
              {(['votes', 'power', 'speed', 'intelligence'] as SortMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSortMode(mode)}
                  className={cn(
                    'px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize',
                    sortMode === mode
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted/50'
                  )}
                >
                  {mode === 'votes' ? '🗳️ Votes' : mode === 'power' ? '💪 Puissance' : mode === 'speed' ? '⚡ Vitesse' : '🧠 Intelligence'}
                </button>
              ))}
            </div>

            <select
              value={selectedAnime}
              onChange={(e) => setSelectedAnime(e.target.value)}
              className="glass-card rounded-lg px-4 py-2 text-sm font-medium bg-transparent border-none outline-none cursor-pointer"
            >
              {animes.map((anime) => (
                <option key={anime} value={anime} className="bg-background text-foreground">
                  {anime === 'all' ? 'Tous les animes' : anime}
                </option>
              ))}
            </select>
          </div>

          {/* Tier List */}
          <div className="space-y-3">
            {sortedCharacters.map((character, index) => {
              const characterKey = `${character.animeId}-${character.id}`;
              const rank = index + 1;
              const tierInfo = getTierInfo(rank);
              const voted = hasVoted(characterKey);
              const voteCount = getVoteCount(characterKey);

              return (
                <motion.div
                  key={characterKey}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(index * 0.03, 0.5) }}
                  className={cn(
                    'glass-card rounded-xl p-4 flex items-center gap-4',
                    rank <= 3 && 'border border-primary/30'
                  )}
                >
                  {/* Rank */}
                  <div
                    className={cn(
                      'w-12 h-12 rounded-lg flex items-center justify-center font-display font-bold text-lg bg-gradient-to-br text-white shrink-0',
                      tierInfo.color
                    )}
                  >
                    {tierInfo.icon ? (
                      <tierInfo.icon className="w-6 h-6" />
                    ) : (
                      `#${rank}`
                    )}
                  </div>

                  {/* Character Info */}
                  <Link
                    to={`/anime/${character.animeId}/character/${character.id}`}
                    className="flex items-center gap-4 flex-1 min-w-0 group"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 ring-2 ring-border group-hover:ring-primary transition-colors">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {character.name}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {character.animeTitle} • {character.role}
                      </p>
                    </div>
                  </Link>

                  {/* Tier Badge */}
                  <div
                    className={cn(
                      'hidden sm:flex w-10 h-10 rounded-lg items-center justify-center font-display font-bold bg-gradient-to-br text-white shrink-0',
                      tierInfo.color
                    )}
                  >
                    {tierInfo.tier}
                  </div>

                  {/* Stats Preview */}
                  <div className="hidden md:flex gap-4 text-sm text-muted-foreground">
                    <span>💪 {character.stats.power}</span>
                    <span>⚡ {character.stats.speed}</span>
                    <span>🧠 {character.stats.intelligence}</span>
                  </div>

                  {/* Vote Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => voted ? removeVote(characterKey) : upvote(characterKey)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors shrink-0',
                      voted
                        ? 'bg-primary text-primary-foreground'
                        : 'glass hover:bg-primary/20'
                    )}
                  >
                    <ThumbsUp className={cn('w-4 h-4', voted && 'fill-current')} />
                    <span>{voteCount}</span>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TierListPage;
