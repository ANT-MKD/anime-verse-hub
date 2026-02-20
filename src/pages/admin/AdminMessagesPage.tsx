import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Mail, MailOpen, X, Send, Plus, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdmin } from '@/contexts/AdminContext';
import { toast } from 'sonner';

const AdminMessagesPage = () => {
  const { messages, addMessage, markMessageRead, deleteMessage } = useAdmin();
  const [showCompose, setShowCompose] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState<string | null>(null);
  const [form, setForm] = useState({ from: '', avatar: '📧', subject: '', content: '' });

  const handleSend = () => {
    if (!form.from || !form.subject || !form.content) { toast.error('Remplissez tous les champs'); return; }
    addMessage(form);
    toast.success('Message envoyé');
    setForm({ from: '', avatar: '📧', subject: '', content: '' });
    setShowCompose(false);
  };

  const selected = messages.find(m => m.id === selectedMsg);

  return (
    <AdminLayout title="Messages">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">{messages.length} message(s)</p>
        <Button onClick={() => setShowCompose(!showCompose)}>
          <Plus className="w-4 h-4 mr-2" />{showCompose ? 'Annuler' : 'Nouveau'}
        </Button>
      </div>

      <AnimatePresence>
        {showCompose && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6">
            <Card className="border-primary/50">
              <CardContent className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>De</Label><Input value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} placeholder="Nom de l'expéditeur" /></div>
                  <div><Label>Sujet</Label><Input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Sujet du message" /></div>
                </div>
                <div><Label>Message</Label><Textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Contenu..." rows={4} /></div>
                <Button onClick={handleSend}><Send className="w-4 h-4 mr-2" />Envoyer</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedMsg && selected ? (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{new Date(selected.date).toLocaleString('fr-FR')}</p>
                <CardTitle className="text-lg mt-1">{selected.subject}</CardTitle>
                <p className="text-sm text-muted-foreground">De: {selected.from}</p>
              </div>
              <Button size="icon" variant="ghost" onClick={() => setSelectedMsg(null)}><X className="w-4 h-4" /></Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap">{selected.content}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {messages.length === 0 ? (
            <Card><CardContent className="p-8 text-center text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Aucun message</p>
            </CardContent></Card>
          ) : (
            messages.map(msg => (
              <motion.div key={msg.id} layout>
                <Card className={`cursor-pointer transition-colors ${!msg.read ? 'border-primary/30 bg-primary/5' : ''}`}
                  onClick={() => { setSelectedMsg(msg.id); markMessageRead(msg.id); }}>
                  <CardContent className="p-3 flex items-center gap-3">
                    {msg.read ? <MailOpen className="w-4 h-4 text-muted-foreground" /> : <Mail className="w-4 h-4 text-primary" />}
                    <span className="text-lg">{msg.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm truncate ${!msg.read ? 'font-bold' : ''}`}>{msg.subject}</p>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">De {msg.from} · {new Date(msg.date).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={e => { e.stopPropagation(); deleteMessage(msg.id); toast.success('Supprimé'); }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMessagesPage;
