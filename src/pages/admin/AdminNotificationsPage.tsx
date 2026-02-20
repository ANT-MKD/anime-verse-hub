import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Trash2, CheckCheck, Plus, X, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdmin } from '@/contexts/AdminContext';
import { toast } from 'sonner';

const typeIcons = { info: Info, success: CheckCircle, warning: AlertTriangle, error: XCircle };
const typeColors = { info: 'text-blue-400', success: 'text-green-400', warning: 'text-yellow-400', error: 'text-red-400' };

const AdminNotificationsPage = () => {
  const { notifications, addNotification, markNotificationRead, markAllNotificationsRead, deleteNotification } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'info' as const, title: '', message: '' });

  const handleAdd = () => {
    if (!form.title || !form.message) { toast.error('Remplissez tous les champs'); return; }
    addNotification(form);
    toast.success('Notification ajoutée');
    setForm({ type: 'info', title: '', message: '' });
    setShowForm(false);
  };

  return (
    <AdminLayout title="Notifications">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => { markAllNotificationsRead(); toast.success('Tout marqué comme lu'); }}>
            <CheckCheck className="w-4 h-4 mr-1" />Tout lire
          </Button>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />{showForm ? 'Annuler' : 'Ajouter'}
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6 border-primary/50">
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Type</Label>
                <Select value={form.type} onValueChange={v => setForm({ ...form, type: v as any })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="success">Succès</SelectItem>
                    <SelectItem value="warning">Attention</SelectItem>
                    <SelectItem value="error">Erreur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Titre</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
            </div>
            <div><Label>Message</Label><Input value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} /></div>
            <Button onClick={handleAdd}>Ajouter</Button>
          </CardContent>
        </Card>
      )}

      {notifications.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">
          <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Aucune notification</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-2">
          {notifications.map(notif => {
            const Icon = typeIcons[notif.type];
            return (
              <motion.div key={notif.id} layout>
                <Card className={!notif.read ? 'border-primary/30 bg-primary/5' : ''}>
                  <CardContent className="p-3 flex items-start gap-3">
                    <Icon className={`w-5 h-5 mt-0.5 ${typeColors[notif.type]}`} />
                    <div className="flex-1" onClick={() => markNotificationRead(notif.id)}>
                      <p className={`text-sm ${!notif.read ? 'font-bold' : ''}`}>{notif.title}</p>
                      <p className="text-xs text-muted-foreground">{notif.message}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{new Date(notif.date).toLocaleString('fr-FR')}</p>
                    </div>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => { deleteNotification(notif.id); }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminNotificationsPage;
