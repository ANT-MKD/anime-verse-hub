import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit, X, Save, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdmin, CustomQuizQuestion } from '@/contexts/AdminContext';
import { toast } from 'sonner';

const emptyQuestion = { type: 'character' as 'character' | 'anime' | 'quote', question: '', options: ['', '', '', ''], correctAnswer: '', image: '' };

const AdminQuizPage = () => {
  const { quizQuestions, addQuizQuestion, updateQuizQuestion, deleteQuizQuestion } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyQuestion);

  const openAdd = () => { setForm(emptyQuestion); setEditId(null); setShowForm(true); };
  const openEdit = (q: CustomQuizQuestion) => {
    setForm({ type: q.type, question: q.question, options: [...q.options], correctAnswer: q.correctAnswer, image: q.image || '' });
    setEditId(q.id); setShowForm(true);
  };

  const handleSave = () => {
    if (!form.question || form.options.some(o => !o) || !form.correctAnswer) {
      toast.error('Remplissez tous les champs'); return;
    }
    if (!form.options.includes(form.correctAnswer)) {
      toast.error('La bonne réponse doit être une des options'); return;
    }
    if (editId) {
      updateQuizQuestion(editId, form);
      toast.success('Question modifiée');
    } else {
      addQuizQuestion(form);
      toast.success('Question ajoutée');
    }
    setShowForm(false);
  };

  return (
    <AdminLayout title="Gestion du Quiz">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">{quizQuestions.length} question(s) personnalisée(s)</p>
        <Button onClick={openAdd}><Plus className="w-4 h-4 mr-2" />Ajouter</Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6">
            <Card className="border-primary/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{editId ? 'Modifier' : 'Ajouter'} une question</CardTitle>
                  <Button size="icon" variant="ghost" onClick={() => setShowForm(false)}><X className="w-4 h-4" /></Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Type</Label>
                    <Select value={form.type} onValueChange={v => setForm({ ...form, type: v as any })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="character">Personnage</SelectItem>
                        <SelectItem value="anime">Anime</SelectItem>
                        <SelectItem value="quote">Citation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Image URL (optionnel)</Label>
                    <Input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
                  </div>
                </div>
                <div>
                  <Label>Question</Label>
                  <Input value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} placeholder="Qui est ce personnage ?" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {form.options.map((opt, i) => (
                    <div key={i}>
                      <Label>Option {i + 1}</Label>
                      <Input value={opt} onChange={e => {
                        const newOpts = [...form.options]; newOpts[i] = e.target.value;
                        setForm({ ...form, options: newOpts });
                      }} />
                    </div>
                  ))}
                </div>
                <div>
                  <Label>Bonne réponse</Label>
                  <Select value={form.correctAnswer} onValueChange={v => setForm({ ...form, correctAnswer: v })}>
                    <SelectTrigger><SelectValue placeholder="Sélectionnez" /></SelectTrigger>
                    <SelectContent>
                      {form.options.filter(o => o).map(o => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSave} className="w-full"><Save className="w-4 h-4 mr-2" />Sauvegarder</Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {quizQuestions.length === 0 ? (
          <Card><CardContent className="p-8 text-center text-muted-foreground">
            <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Aucune question personnalisée</p>
            <p className="text-xs mt-1">Les questions par défaut sont générées automatiquement</p>
          </CardContent></Card>
        ) : (
          quizQuestions.map(q => (
            <motion.div key={q.id} layout>
              <Card>
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-[10px]">{q.type}</Badge>
                      <span className="text-xs text-muted-foreground">{new Date(q.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <p className="font-medium text-sm">{q.question}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {q.options.map(o => (
                        <span key={o} className={`text-xs px-2 py-0.5 rounded ${o === q.correctAnswer ? 'bg-green-500/20 text-green-400' : 'bg-muted text-muted-foreground'}`}>
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(q)}><Edit className="w-4 h-4" /></Button>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => { deleteQuizQuestion(q.id); toast.success('Supprimée'); }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminQuizPage;
