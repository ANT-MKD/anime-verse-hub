import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData } from '@/hooks/useAdminData';
import { toast } from 'sonner';

const defaultAvatars = ['👤', '🥷', '⚔️', '🔥', '💜', '🌊', '⚡', '🌸', '🐉', '👁️', '💀', '🦊'];

const AdminUserEditPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { users, addUser, updateUser, isLoading } = useAdminData();
  const isNew = userId === 'new';

  const [formData, setFormData] = useState({
    id: '', pseudo: '', email: '', avatar: '👤',
    role: 'user' as 'user' | 'admin' | 'moderator',
    isActive: true
  });

  useEffect(() => {
    if (!isNew && userId && users.length > 0) {
      const user = users.find(u => u.id === userId);
      if (user) setFormData({ id: user.id, pseudo: user.pseudo, email: user.email, avatar: user.avatar, role: user.role, isActive: user.isActive });
    }
  }, [userId, isNew, users]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNew) addUser({ pseudo: formData.pseudo, email: formData.email, avatar: formData.avatar, role: formData.role, isActive: formData.isActive, lastLogin: new Date().toISOString() });
    else updateUser(formData.id, { pseudo: formData.pseudo, email: formData.email, avatar: formData.avatar, role: formData.role, isActive: formData.isActive });
    toast.success(isNew ? 'Utilisateur créé !' : 'Utilisateur modifié !');
    navigate('/admin/users');
  };

  if (isLoading) return <AdminLayout title="Chargement..." description=""><div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div></AdminLayout>;

  return (
    <AdminLayout title={isNew ? 'Nouvel Utilisateur' : `Modifier: ${formData.pseudo}`} description="">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
        <Button variant="ghost" onClick={() => navigate('/admin/users')} className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />Retour</Button>

        <Card>
          <CardHeader><CardTitle><User className="h-5 w-5 inline mr-2" />Informations</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Avatar</Label>
                <div className="flex flex-wrap gap-2">
                  {defaultAvatars.map((a) => (
                    <button key={a} type="button" onClick={() => setFormData({ ...formData, avatar: a })}
                      className={`text-2xl p-2 rounded-lg transition-all ${formData.avatar === a ? 'bg-primary/20 ring-2 ring-primary scale-110' : 'bg-muted hover:bg-muted/80'}`}>{a}</button>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2"><Label>Pseudo</Label><Input value={formData.pseudo} onChange={(e) => setFormData({ ...formData, pseudo: e.target.value })} required /></div>
                <div className="space-y-2"><Label>Email</Label><Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required /></div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2"><Label>Rôle</Label>
                  <Select value={formData.role} onValueChange={(v: any) => setFormData({ ...formData, role: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Utilisateur</SelectItem>
                      <SelectItem value="moderator">Modérateur</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Actif</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch checked={formData.isActive} onCheckedChange={(c) => setFormData({ ...formData, isActive: c })} />
                    <Label>{formData.isActive ? 'Actif' : 'Inactif'}</Label>
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full"><Save className="h-4 w-4 mr-2" />{isNew ? 'Créer' : 'Sauvegarder'}</Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminUserEditPage;
