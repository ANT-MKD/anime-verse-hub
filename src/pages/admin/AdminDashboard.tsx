import { motion } from 'framer-motion';
import { 
  Users, 
  Film, 
  UserCircle, 
  Trophy, 
  Swords, 
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData } from '@/hooks/useAdminData';
import { cn } from '@/lib/utils';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  color 
}: { 
  title: string; 
  value: number | string; 
  icon: React.ElementType;
  trend?: number;
  color: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-card border border-border rounded-xl p-5"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-display font-bold mt-1">{value}</p>
        {trend !== undefined && (
          <div className={cn(
            "flex items-center gap-1 mt-2 text-sm",
            trend >= 0 ? "text-green-500" : "text-red-500"
          )}>
            {trend >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{Math.abs(trend)}% ce mois</span>
          </div>
        )}
      </div>
      <div className={cn("p-3 rounded-lg", color)}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const { stats, battles, quizzes, users, isLoading } = useAdminData();

  if (isLoading) {
    return (
      <AdminLayout title="Dashboard" description="Chargement...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }

  const recentBattles = battles.slice(0, 5);
  const recentQuizzes = quizzes.slice(0, 5);

  return (
    <AdminLayout 
      title="Dashboard" 
      description="Vue d'ensemble de votre plateforme AnimeVerse"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Utilisateurs"
          value={stats.totalUsers}
          icon={Users}
          trend={12}
          color="bg-blue-500"
        />
        <StatCard
          title="Animes"
          value={stats.totalAnimes}
          icon={Film}
          color="bg-purple-500"
        />
        <StatCard
          title="Personnages"
          value={stats.totalCharacters}
          icon={UserCircle}
          color="bg-orange-500"
        />
        <StatCard
          title="Votes Tier List"
          value={stats.totalVotes}
          icon={Trophy}
          trend={8}
          color="bg-yellow-500"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="Combats simulés"
          value={stats.totalBattles}
          icon={Swords}
          color="bg-red-500"
        />
        <StatCard
          title="Quiz joués"
          value={stats.totalQuizzes}
          icon={HelpCircle}
          color="bg-green-500"
        />
        <StatCard
          title="Score moyen Quiz"
          value={`${stats.averageQuizScore}%`}
          icon={Activity}
          color="bg-cyan-500"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Battles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg flex items-center gap-2">
              <Swords className="w-5 h-5 text-primary" />
              Derniers Combats
            </h3>
          </div>
          <div className="space-y-3">
            {recentBattles.map((battle, index) => (
              <motion.div
                key={battle.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="font-medium truncate">{battle.fighter1.split(' ')[0]}</span>
                  <span className="text-muted-foreground">vs</span>
                  <span className="font-medium truncate">{battle.fighter2.split(' ')[0]}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-primary font-medium">🏆 {battle.winner.split(' ')[0]}</p>
                  <p className="text-xs text-muted-foreground">{battle.date}</p>
                </div>
              </motion.div>
            ))}
            {recentBattles.length === 0 && (
              <p className="text-center text-muted-foreground py-4">Aucun combat récent</p>
            )}
          </div>
        </motion.div>

        {/* Recent Quizzes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              Derniers Quiz
            </h3>
          </div>
          <div className="space-y-3">
            {recentQuizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm">
                    {quiz.pseudo[0]}
                  </div>
                  <span className="font-medium">{quiz.pseudo}</span>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "text-sm font-medium",
                    quiz.score >= 8 ? "text-green-500" : quiz.score >= 5 ? "text-yellow-500" : "text-red-500"
                  )}>
                    {quiz.score}/{quiz.total}
                  </p>
                  <p className="text-xs text-muted-foreground">{quiz.date}</p>
                </div>
              </motion.div>
            ))}
            {recentQuizzes.length === 0 && (
              <p className="text-center text-muted-foreground py-4">Aucun quiz récent</p>
            )}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
