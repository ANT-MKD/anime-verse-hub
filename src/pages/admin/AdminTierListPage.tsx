import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, ThumbsUp, Crown, Medal, Award, TrendingUp } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData } from '@/hooks/useAdminData';
import { cn } from '@/lib/utils';

const AdminTierListPage = () => {
  const { characters, tierVotes, isLoading } = useAdminData();
  const [selectedAnime, setSelectedAnime] = useState<string>('all');

  const animes = useMemo(() => {
    const unique = [...new Set(characters.map(c => c.animeTitle))];
    return unique;
  }, [characters]);

  const rankedCharacters = useMemo(() => {
    let filtered = selectedAnime === 'all'
      ? characters
      : characters.filter(c => c.animeTitle === selectedAnime);

    return filtered
      .map(char => ({
        ...char,
        votes: tierVotes[`${char.animeId}-${char.id}`] || 0
      }))
      .sort((a, b) => b.votes - a.votes);
  }, [characters, tierVotes, selectedAnime]);

  const totalVotes = Object.values(tierVotes).reduce((a, b) => a + b, 0);
  const topCharacters = rankedCharacters.slice(0, 10);
  const avgVotes = rankedCharacters.length > 0 
    ? Math.round(totalVotes / rankedCharacters.filter(c => c.votes > 0).length) || 0
    : 0;

  const getTierBadge = (rank: number) => {
    if (rank === 1) return { icon: Crown, color: 'text-yellow-500 bg-yellow-500/10' };
    if (rank === 2) return { icon: Medal, color: 'text-gray-400 bg-gray-400/10' };
    if (rank === 3) return { icon: Medal, color: 'text-amber-600 bg-amber-600/10' };
    if (rank <= 10) return { icon: Award, color: 'text-purple-500 bg-purple-500/10' };
    return { icon: ThumbsUp, color: 'text-muted-foreground bg-muted/50' };
  };

  if (isLoading) {
    return (
      <AdminLayout title="Tier List">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Tier List" 
      description="Gestion des votes et classements"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <ThumbsUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalVotes}</p>
              <p className="text-sm text-muted-foreground">Votes totaux</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-yellow-500/10">
              <Crown className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{topCharacters[0]?.votes || 0}</p>
              <p className="text-sm text-muted-foreground">Top votes</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-500/10">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avgVotes}</p>
              <p className="text-sm text-muted-foreground">Moyenne</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <Trophy className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{rankedCharacters.filter(c => c.votes > 0).length}</p>
              <p className="text-sm text-muted-foreground">Personnages votés</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <select
          value={selectedAnime}
          onChange={(e) => setSelectedAnime(e.target.value)}
          className="px-4 py-2 bg-muted/50 border border-border rounded-lg"
        >
          <option value="all">Tous les animes</option>
          {animes.map(anime => (
            <option key={anime} value={anime}>{anime}</option>
          ))}
        </select>
      </div>

      {/* Top 10 Podium */}
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Top 10 Personnages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {topCharacters.slice(0, 5).map((char, index) => {
            const badge = getTierBadge(index + 1);
            return (
              <motion.div
                key={`${char.animeId}-${char.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative bg-muted/30 rounded-xl overflow-hidden",
                  index === 0 && "ring-2 ring-yellow-500"
                )}
              >
                <div className="aspect-[3/4] relative">
                  <img 
                    src={char.image} 
                    alt={char.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <div className={cn(
                    "absolute top-2 left-2 p-1.5 rounded-lg",
                    badge.color
                  )}>
                    <badge.icon className="w-5 h-5" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="font-semibold text-sm truncate">{char.name}</p>
                    <p className="text-xs text-muted-foreground">{char.animeTitle}</p>
                    <p className="text-lg font-bold text-primary mt-1">{char.votes} votes</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Full Ranking Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-display font-bold">Classement complet</h3>
        </div>
        <div className="overflow-x-auto max-h-96">
          <table className="w-full">
            <thead className="sticky top-0 bg-card">
              <tr className="border-b border-border">
                <th className="text-left p-3 font-medium w-16">Rang</th>
                <th className="text-left p-3 font-medium">Personnage</th>
                <th className="text-left p-3 font-medium">Anime</th>
                <th className="text-right p-3 font-medium">Votes</th>
              </tr>
            </thead>
            <tbody>
              {rankedCharacters.filter(c => c.votes > 0).map((char, index) => {
                const badge = getTierBadge(index + 1);
                return (
                  <tr
                    key={`${char.animeId}-${char.id}`}
                    className="border-b border-border hover:bg-muted/20"
                  >
                    <td className="p-3">
                      <span className={cn(
                        "inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold",
                        badge.color
                      )}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={char.image} 
                          alt={char.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <span className="font-medium">{char.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground">{char.animeTitle}</td>
                    <td className="p-3 text-right">
                      <span className="font-bold text-primary">{char.votes}</span>
                    </td>
                  </tr>
                );
              })}
              {rankedCharacters.filter(c => c.votes > 0).length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">
                    Aucun vote enregistré
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTierListPage;
