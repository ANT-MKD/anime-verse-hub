import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Trash2, Mail, Calendar, Shield, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData } from '@/hooks/useAdminData';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const AdminUserViewPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { users, deleteUser, isLoading } = useAdminData();
  const user = users.find(u => u.id === userId);

  if (isLoading) return <AdminLayout title="Chargement..." description=""><div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div></AdminLayout>;
  if (!user) return <AdminLayout title="Non trouvé" description=""><Button onClick={() => navigate('/admin/users')}>Retour</Button></AdminLayout>;

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin': return <Badge className="bg-red-500">Admin</Badge>;
      case 'moderator': return <Badge className="bg-blue-500">Modérateur</Badge>;
      default: return <Badge variant="secondary">Utilisateur</Badge>;
    }
  };

  return (
    <AdminLayout title={user.pseudo} description="Détails utilisateur">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-3xl">
        <div className="flex justify-between">
          <Button variant="ghost" onClick={() => navigate('/admin/users')}><ArrowLeft className="h-4 w-4 mr-2" />Retour</Button>
          <div className="flex gap-2">
            <Button variant="outline" asChild><Link to={`/admin/users/${userId}/edit`}><Edit className="h-4 w-4 mr-2" />Modifier</Link></Button>
            <Button variant="destructive" onClick={() => { deleteUser(user.id); toast.success('Supprimé'); navigate('/admin/users'); }}><Trash2 className="h-4 w-4 mr-2" />Supprimer</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6 text-center">
              <span className="text-6xl block mb-4">{user.avatar}</span>
              <h2 className="text-xl font-bold">{user.pseudo}</h2>
              <div className="flex justify-center gap-2 mt-3">
                {getRoleBadge(user.role)}
                <Badge variant={user.isActive ? 'default' : 'destructive'}>{user.isActive ? 'Actif' : 'Inactif'}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader><CardTitle>Informations</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg"><Mail className="h-5 w-5 text-muted-foreground" /><div><p className="text-sm text-muted-foreground">Email</p><p className="font-medium">{user.email}</p></div></div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg"><Shield className="h-5 w-5 text-muted-foreground" /><div><p className="text-sm text-muted-foreground">Rôle</p><p className="font-medium capitalize">{user.role}</p></div></div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg"><Calendar className="h-5 w-5 text-muted-foreground" /><div><p className="text-sm text-muted-foreground">Inscription</p><p className="font-medium">{format(new Date(user.createdAt), 'dd MMMM yyyy', { locale: fr })}</p></div></div>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg"><Activity className="h-5 w-5 text-muted-foreground" /><div><p className="text-sm text-muted-foreground">Dernière connexion</p><p className="font-medium">{format(new Date(user.lastLogin), 'dd MMMM yyyy à HH:mm', { locale: fr })}</p></div></div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminUserViewPage;
