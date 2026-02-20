import { Film, Users, HelpCircle, TrendingUp, MessageSquare, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/admin/AdminLayout';
import { animeData, getAllCharacters } from '@/data/animeData';
import { useAdmin } from '@/contexts/AdminContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { messages, notifications, quizQuestions, getRegisteredUsers } = useAdmin();
  const allCharacters = getAllCharacters();
  const users = getRegisteredUsers();

  const stats = [
    { label: 'Animes', value: animeData.length, icon: Film, color: 'text-blue-400', link: '/admin/animes' },
    { label: 'Personnages', value: allCharacters.length, icon: Users, color: 'text-green-400', link: '/admin/characters' },
    { label: 'Quiz perso', value: quizQuestions.length, icon: HelpCircle, color: 'text-purple-400', link: '/admin/quiz' },
    { label: 'Utilisateurs', value: users.length, icon: TrendingUp, color: 'text-yellow-400', link: '/admin/users' },
    { label: 'Messages', value: messages.length, icon: MessageSquare, color: 'text-pink-400', link: '/admin/messages' },
    { label: 'Notifications', value: notifications.length, icon: Bell, color: 'text-orange-400', link: '/admin/notifications' },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} to={stat.link}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-4 lg:p-6 flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Derniers utilisateurs</CardTitle></CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucun utilisateur inscrit</p>
            ) : (
              <div className="space-y-3">
                {users.slice(-5).reverse().map((user: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                    <span className="text-xl">{user.avatar || '👤'}</span>
                    <div>
                      <p className="text-sm font-medium">{user.pseudo}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    {user.role === 'admin' && (
                      <span className="ml-auto text-[10px] px-2 py-0.5 bg-primary/20 text-primary rounded-full">Admin</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Animes populaires</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {animeData.slice(0, 5).map(anime => (
                <div key={anime.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                  <img src={anime.image} alt={anime.title} className="w-10 h-10 rounded object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{anime.title}</p>
                    <p className="text-xs text-muted-foreground">{anime.characters.length} personnages</p>
                  </div>
                  <span className="text-xs text-primary">⭐ {anime.rating}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
