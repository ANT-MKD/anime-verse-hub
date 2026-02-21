import { Film, Users, HelpCircle, TrendingUp, MessageSquare, Bell, Activity, UserPlus, Eye, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import { animeData, getAllCharacters } from '@/data/animeData';
import { useAdmin } from '@/contexts/AdminContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const { messages, notifications, quizQuestions, getRegisteredUsers, settings } = useAdmin();
  const allCharacters = getAllCharacters();
  const users = getRegisteredUsers();

  const stats = [
    { label: 'Animes', value: animeData.length, icon: Film, gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-500/10', link: '/admin/animes' },
    { label: 'Personnages', value: allCharacters.length, icon: Users, gradient: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-500/10', link: '/admin/characters' },
    { label: 'Utilisateurs', value: users.length, icon: TrendingUp, gradient: 'from-amber-500 to-orange-500', bg: 'bg-amber-500/10', link: '/admin/users' },
    { label: 'Quiz perso', value: quizQuestions.length, icon: HelpCircle, gradient: 'from-purple-500 to-purple-600', bg: 'bg-purple-500/10', link: '/admin/quiz' },
  ];

  // Fake chart data for visual appeal
  const chartData = [
    { name: 'Jan', visites: 120, inscrits: 5 },
    { name: 'Fév', visites: 200, inscrits: 12 },
    { name: 'Mar', visites: 180, inscrits: 8 },
    { name: 'Avr', visites: 310, inscrits: 18 },
    { name: 'Mai', visites: 250, inscrits: 15 },
    { name: 'Jun', visites: 400, inscrits: users.length || 20 },
  ];

  const genreData = (() => {
    const genres: Record<string, number> = {};
    animeData.forEach(a => a.genre.forEach(g => { genres[g] = (genres[g] || 0) + 1; }));
    return Object.entries(genres).slice(0, 5).map(([name, value]) => ({ name, value }));
  })();

  const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

  // Recent activity from notifications
  const recentActivity = notifications.slice(0, 5);

  return (
    <AdminLayout title="Dashboard">
      <p className="text-muted-foreground text-sm mb-6">Vue d'ensemble de votre site</p>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link to={stat.link}>
                <Card className="hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer overflow-hidden relative group">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                        <Icon className={`w-5 h-5 bg-gradient-to-r ${stat.gradient} bg-clip-text`} style={{ color: `var(--tw-gradient-from)` }} />
                      </div>
                      <Eye className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </CardContent>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} opacity-60`} />
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Activité du site</CardTitle>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block" /> Visites</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Inscrits</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVisites" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorInscrits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }} />
                <Area type="monotone" dataKey="visites" stroke="hsl(var(--primary))" fill="url(#colorVisites)" strokeWidth={2} />
                <Area type="monotone" dataKey="inscrits" stroke="#10b981" fill="url(#colorInscrits)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Genres populaires</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={genreData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                  {genreData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {genreData.map((g, i) => (
                <span key={g.name} className="text-[10px] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ background: COLORS[i % COLORS.length] }} />
                  {g.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Messages', value: messages.length, sub: `${messages.filter(m => !m.read).length} non lus`, color: 'from-pink-500 to-rose-500' },
          { label: 'Notifications', value: notifications.length, sub: `${notifications.filter(n => !n.read).length} non lues`, color: 'from-orange-500 to-amber-500' },
          { label: 'Maintenance', value: settings.maintenanceMode ? 'ON' : 'OFF', sub: settings.maintenanceMode ? 'Site en pause' : 'Site actif', color: settings.maintenanceMode ? 'from-red-500 to-red-600' : 'from-green-500 to-green-600' },
          { label: 'Fonctionnalités', value: [settings.allowQuiz, settings.allowBattle, settings.allowComparator, settings.allowTierList].filter(Boolean).length + '/4', sub: 'Actives', color: 'from-cyan-500 to-blue-500' },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.1 }}>
            <Card className={`bg-gradient-to-br ${item.color} text-white border-0`}>
              <CardContent className="p-4">
                <p className="text-white/70 text-xs font-medium">{item.label}</p>
                <p className="text-2xl font-bold mt-1">{item.value}</p>
                <p className="text-white/60 text-[10px] mt-1">{item.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Activity className="w-5 h-5" /> Activité récente</CardTitle></CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucune activité récente</p>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((notif, i) => (
                  <div key={notif.id} className="flex gap-3 items-start">
                    <div className="text-xs text-muted-foreground mt-1 w-16 shrink-0">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {new Date(notif.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                    </div>
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                      notif.type === 'success' ? 'bg-emerald-500' : notif.type === 'warning' ? 'bg-amber-500' : notif.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{notif.title}</p>
                      <p className="text-xs text-muted-foreground">{notif.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Latest Users */}
        <Card>
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><UserPlus className="w-5 h-5" /> Derniers inscrits</CardTitle></CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucun utilisateur inscrit</p>
            ) : (
              <div className="space-y-3">
                {users.slice(-5).reverse().map((user: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <span className="text-xl w-10 h-10 flex items-center justify-center bg-muted rounded-full">{user.avatar || '👤'}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.pseudo}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    {user.role === 'admin' && (
                      <Badge variant="outline" className="text-[10px] border-primary/50 text-primary">Admin</Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
