import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Edit, Trash2, Plus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import AdminLayout from '@/components/admin/AdminLayout';
import { animeData, getAllCharacters } from '@/data/animeData';
import { useAdmin } from '@/contexts/AdminContext';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const AdminCharactersPage = () => {
  const { getCustomCharacters, addCustomCharacter, updateCustomCharacter, deleteCustomCharacter } = useAdmin();
  const [search, setSearch] = useState('');
  const [animeFilter, setAnimeFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingChar, setEditingChar] = useState<any>(null);

  const [form, setForm] = useState({
    name: '', title: '', role: '', rank: '', description: '', animeId: '', image: '',
    power: 50, speed: 50, technique: 50, intelligence: 50, stamina: 50, agility: 50,
  });

  const allCharacters = getAllCharacters();
  const customCharacters = getCustomCharacters();

  const combined = [
    ...allCharacters.map(c => ({ ...c, isCustom: false })),
    ...customCharacters.map((c: any) => ({ ...c, isCustom: true, stats: { power: c.power, speed: c.speed, technique: c.technique, intelligence: c.intelligence, stamina: c.stamina, agility: c.agility } }))
  ];

  const filtered = combined.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchAnime = animeFilter === 'all' || c.animeId === animeFilter;
    return matchSearch && matchAnime;
  });

  const resetForm = () => {
    setForm({ name: '', title: '', role: '', rank: '', description: '', animeId: '', image: '', power: 50, speed: 50, technique: 50, intelligence: 50, stamina: 50, agility: 50 });
    setEditingChar(null);
  };

  const openEdit = (char: any) => {
    setForm({
      name: char.name, title: char.title || '', role: char.role || '', rank: char.rank || '',
      description: char.description || '', animeId: char.animeId || '', image: char.image || '',
      power: char.stats?.power || 50, speed: char.stats?.speed || 50, technique: char.stats?.technique || 50,
      intelligence: char.stats?.intelligence || 50, stamina: char.stats?.stamina || 50, agility: char.stats?.agility || 50,
    });
    setEditingChar(char);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.name.trim()) { toast.error('Le nom est obligatoire'); return; }
    if (editingChar) {
      updateCustomCharacter(editingChar.id, form);
      toast.success('Personnage modifié !');
    } else {
      addCustomCharacter(form);
      toast.success('Personnage ajouté !');
    }
    setShowForm(false);
    resetForm();
  };

  return (
    <AdminLayout title="Gestion des Personnages">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Rechercher un personnage..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={animeFilter} onValueChange={setAnimeFilter}>
          <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Filtrer par anime" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les animes</SelectItem>
            {animeData.map(a => (<SelectItem key={a.id} value={a.id}>{a.title}</SelectItem>))}
          </SelectContent>
        </Select>
        <Button onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus className="w-4 h-4 mr-2" />Ajouter
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{filtered.length} personnage(s)</p>

      <div className="space-y-2">
        {filtered.map(char => (
          <motion.div key={`${char.animeId}-${char.id}`} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardContent className="p-3 flex items-center gap-3">
                <img src={char.image} alt={char.name} className="w-12 h-12 rounded-lg object-cover bg-muted" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm truncate">{char.name}</h3>
                    {char.isCustom && <Badge variant="outline" className="text-[10px]">Perso</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{(char as any).animeTitle || char.animeId} · {char.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  {char.rank && <Badge variant="outline" className="text-[10px]">{char.rank}</Badge>}
                  <div className="text-xs text-muted-foreground hidden sm:block">
                    PWR: {char.stats.power} · SPD: {char.stats.speed}
                  </div>
                  {!char.isCustom && (
                    <Button size="icon" variant="ghost" asChild>
                      <Link to={`/anime/${char.animeId}/character/${char.id}`}><Eye className="w-4 h-4" /></Link>
                    </Button>
                  )}
                  {char.isCustom && (
                    <>
                      <Button size="icon" variant="ghost" onClick={() => openEdit(char)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-destructive" onClick={() => { deleteCustomCharacter(char.id); toast.success('Supprimé'); }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingChar ? 'Modifier le personnage' : 'Ajouter un personnage'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Nom *</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Titre</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Ex: Le Roi" /></div>
              <div><Label>Rôle</Label><Input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Ex: Héros" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Rang</Label><Input value={form.rank} onChange={e => setForm({ ...form, rank: e.target.value })} placeholder="Ex: SSS" /></div>
              <div>
                <Label>Anime associé</Label>
                <Select value={form.animeId} onValueChange={v => setForm({ ...form, animeId: v })}>
                  <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">Personnalisé</SelectItem>
                    {animeData.map(a => (<SelectItem key={a.id} value={a.id}>{a.title}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} /></div>
            <div><Label>URL de l'image</Label><Input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." /></div>
            
            <div className="space-y-3 pt-2">
              <Label className="text-base font-semibold">Statistiques</Label>
              {(['power', 'speed', 'technique', 'intelligence', 'stamina', 'agility'] as const).map(stat => (
                <div key={stat} className="flex items-center gap-3">
                  <span className="text-xs w-24 capitalize">{stat === 'power' ? 'Puissance' : stat === 'speed' ? 'Vitesse' : stat === 'technique' ? 'Technique' : stat === 'intelligence' ? 'Intelligence' : stat === 'stamina' ? 'Endurance' : 'Agilité'}</span>
                  <Slider value={[(form as any)[stat]]} onValueChange={v => setForm({ ...form, [stat]: v[0] })} max={100} step={1} className="flex-1" />
                  <span className="text-xs w-8 text-right font-mono">{(form as any)[stat]}</span>
                </div>
              ))}
            </div>

            <Button className="w-full" onClick={handleSubmit}><Save className="w-4 h-4 mr-2" />{editingChar ? 'Modifier' : 'Ajouter'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCharactersPage;
