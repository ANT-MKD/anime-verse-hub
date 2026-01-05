import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Swords, Trophy, Crown, Trash2, TrendingUp } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData } from '@/hooks/useAdminData';
import { cn } from '@/lib/utils';

const AdminBattlesPage = () => {
  const { battles, characters, deleteBattle, isLoading } = useAdminData();
  const [sortBy, setSortBy] = useState<'date' | 'fighter'>('date');

  const sortedBattles = useMemo(() => {
    return [...battles].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.fighter1.localeCompare(b.fighter1);
    });
  }, [battles, sortBy]);

  const winStats = useMemo(() => {
    const wins: Record<string, number> = {};
    battles.forEach(battle => {
      wins[battle.winner] = (wins[battle.winner] || 0) + 1;
    });
    return Object.entries(wins)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [battles]);

  const handleDelete = (id: string) => {
    if (confirm('Supprimer ce combat ?')) {
      deleteBattle(id);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Battles">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Battles" 
      description="Historique des combats simulés"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-red-500/10">
              <Swords className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{battles.length}</p>
              <p className="text-sm text-muted-foreground">Combats totaux</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-yellow-500/10">
              <Crown className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold truncate">{winStats[0]?.[0]?.split(' ')[0] || '-'}</p>
              <p className="text-sm text-muted-foreground">Champion ({winStats[0]?.[1] || 0} victoires)</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-500/10">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{winStats.length}</p>
              <p className="text-sm text-muted-foreground">Combattants uniques</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Winners */}
      {winStats.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-5 mb-6">
          <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Top 5 Vainqueurs
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {winStats.map(([name, wins], index) => {
              const char = characters.find(c => c.name === name);
              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative bg-muted/30 rounded-xl overflow-hidden"
                >
                  {char ? (
                    <div className="aspect-square relative">
                      <img 
                        src={char.image} 
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <p className="font-medium text-sm truncate">{name.split(' ')[0]}</p>
                        <p className="text-primary font-bold">{wins} victoires</p>
                      </div>
                      {index === 0 && (
                        <Crown className="absolute top-2 right-2 w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                  ) : (
                    <div className="aspect-square flex flex-col items-center justify-center p-4">
                      <p className="font-medium text-sm truncate text-center">{name.split(' ')[0]}</p>
                      <p className="text-primary font-bold">{wins} victoires</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sort */}
      <div className="mb-6">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'fighter')}
          className="px-4 py-2 bg-muted/50 border border-border rounded-lg"
        >
          <option value="date">Trier par date</option>
          <option value="fighter">Trier par nom</option>
        </select>
      </div>

      {/* Battles Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-4 font-medium">Combattant 1</th>
                <th className="text-center p-4 font-medium">VS</th>
                <th className="text-left p-4 font-medium">Combattant 2</th>
                <th className="text-left p-4 font-medium">Vainqueur</th>
                <th className="text-left p-4 font-medium">Date</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedBattles.map((battle, index) => (
                <motion.tr
                  key={battle.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="border-b border-border hover:bg-muted/20"
                >
                  <td className="p-4">
                    <span className={cn(
                      "font-medium",
                      battle.winner === battle.fighter1 && "text-primary"
                    )}>
                      {battle.fighter1}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <Swords className="w-5 h-5 text-muted-foreground mx-auto" />
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "font-medium",
                      battle.winner === battle.fighter2 && "text-primary"
                    )}>
                      {battle.fighter2}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      <Trophy className="w-3.5 h-3.5" />
                      {battle.winner.split(' ')[0]}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">{battle.date}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(battle.id)}
                      className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
              {sortedBattles.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    Aucun combat enregistré
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

export default AdminBattlesPage;
