import { useState, useEffect } from 'react';
import { Trash2, Shield, ShieldOff, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdmin } from '@/contexts/AdminContext';
import { toast } from 'sonner';

const AdminUsersPage = () => {
  const { getRegisteredUsers, updateUserRole, deleteUser } = useAdmin();
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  const refresh = () => setUsers(getRegisteredUsers());
  useEffect(() => { refresh(); }, []);

  const filtered = users.filter(u =>
    u.pseudo?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleAdmin = (email: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    updateUserRole(email, newRole);
    toast.success(`Rôle mis à jour: ${newRole}`);
    refresh();
  };

  const handleDelete = (email: string) => {
    if (confirm('Supprimer cet utilisateur ?')) {
      deleteUser(email);
      toast.success('Utilisateur supprimé');
      refresh();
    }
  };

  return (
    <AdminLayout title="Gestion des Utilisateurs">
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{filtered.length} utilisateur(s)</p>

      {filtered.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Aucun utilisateur trouvé</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-2">
          {filtered.map((user, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center gap-3">
                <span className="text-2xl">{user.avatar || '👤'}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm truncate">{user.pseudo}</p>
                    {user.role === 'admin' && <Badge className="text-[10px] bg-primary/20 text-primary">Admin</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  {user.bio && <p className="text-xs text-muted-foreground truncate mt-0.5">{user.bio}</p>}
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => handleToggleAdmin(user.email, user.role || 'user')}
                    title={user.role === 'admin' ? 'Retirer admin' : 'Rendre admin'}>
                    {user.role === 'admin' ? <ShieldOff className="w-4 h-4 text-orange-400" /> : <Shield className="w-4 h-4" />}
                  </Button>
                  <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(user.email)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminUsersPage;
