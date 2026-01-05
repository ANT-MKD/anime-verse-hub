import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Trophy, TrendingUp, Users, Trash2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData } from '@/hooks/useAdminData';
import { cn } from '@/lib/utils';

const AdminQuizPage = () => {
  const { quizzes, deleteQuizScore, isLoading } = useAdminData();
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');

  const sortedQuizzes = useMemo(() => {
    return [...quizzes].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return b.score - a.score;
    });
  }, [quizzes, sortBy]);

  const stats = useMemo(() => {
    if (quizzes.length === 0) return { avg: 0, perfect: 0, total: 0, best: null };
    
    const avg = Math.round(
      quizzes.reduce((sum, q) => sum + (q.score / q.total) * 100, 0) / quizzes.length
    );
    const perfect = quizzes.filter(q => q.score === q.total).length;
    
    const leaderboard = quizzes.reduce((acc, q) => {
      if (!acc[q.pseudo] || acc[q.pseudo].score < q.score) {
        acc[q.pseudo] = q;
      }
      return acc;
    }, {} as Record<string, typeof quizzes[0]>);
    
    const best = Object.values(leaderboard).sort((a, b) => b.score - a.score)[0];
    
    return { avg, perfect, total: quizzes.length, best };
  }, [quizzes]);

  const handleDelete = (id: string) => {
    if (confirm('Supprimer ce score ?')) {
      deleteQuizScore(id);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Quiz">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Quiz" 
      description="Statistiques et scores des quiz"
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Quiz joués</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-500/10">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.avg}%</p>
              <p className="text-sm text-muted-foreground">Score moyen</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-yellow-500/10">
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.perfect}</p>
              <p className="text-sm text-muted-foreground">Scores parfaits</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold truncate">{stats.best?.pseudo || '-'}</p>
              <p className="text-sm text-muted-foreground">Meilleur joueur</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sort */}
      <div className="mb-6">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'score')}
          className="px-4 py-2 bg-muted/50 border border-border rounded-lg"
        >
          <option value="date">Trier par date</option>
          <option value="score">Trier par score</option>
        </select>
      </div>

      {/* Scores Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-4 font-medium">Joueur</th>
                <th className="text-left p-4 font-medium">Score</th>
                <th className="text-left p-4 font-medium">Pourcentage</th>
                <th className="text-left p-4 font-medium">Date</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedQuizzes.map((quiz, index) => {
                const percentage = Math.round((quiz.score / quiz.total) * 100);
                return (
                  <motion.tr
                    key={quiz.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="border-b border-border hover:bg-muted/20"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold">
                          {quiz.pseudo[0]}
                        </div>
                        <span className="font-medium">{quiz.pseudo}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "font-bold",
                        quiz.score === quiz.total ? "text-yellow-500" :
                        quiz.score >= 8 ? "text-green-500" :
                        quiz.score >= 5 ? "text-blue-500" : "text-red-500"
                      )}>
                        {quiz.score}/{quiz.total}
                      </span>
                      {quiz.score === quiz.total && (
                        <Trophy className="inline w-4 h-4 text-yellow-500 ml-2" />
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full",
                              percentage >= 80 ? "bg-green-500" :
                              percentage >= 50 ? "bg-yellow-500" : "bg-red-500"
                            )}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{percentage}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{quiz.date}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(quiz.id)}
                        className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
              {sortedQuizzes.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    Aucun quiz enregistré
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

export default AdminQuizPage;
