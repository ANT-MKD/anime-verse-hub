import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Search, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/components/admin/AdminLayout';
import { animeData } from '@/data/animeData';
import { useAdmin } from '@/contexts/AdminContext';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface CustomAnime {
  id: string;
  title: string;
  description: string;
  genre: string[];
  year: number;
  episodes: number;
  rating: number;
  studio: string;
  status: string;
  image: string;
}

const AdminAnimesPage = () => {
  const { getCustomAnimes, addCustomAnime, updateCustomAnime, deleteCustomAnime } = useAdmin();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAnime, setEditingAnime] = useState<CustomAnime | null>(null);
  const [form, setForm] = useState({
    title: '', description: '', genre: '', year: 2024, episodes: 12, rating: 7.5, studio: '', status: 'Ongoing', image: ''
  });

  const customAnimes = getCustomAnimes();

  const allAnimes = [
    ...animeData.map(a => ({ ...a, isCustom: false })),
    ...customAnimes.map((a: CustomAnime) => ({ ...a, isCustom: true, characters: [], banner: '', theme: '', genre: typeof a.genre === 'string' ? [a.genre] : a.genre }))
  ];

  const filtered = allAnimes.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setForm({ title: '', description: '', genre: '', year: 2024, episodes: 12, rating: 7.5, studio: '', status: 'Ongoing', image: '' });
    setEditingAnime(null);
  };

  const openEdit = (anime: any) => {
    setForm({
      title: anime.title,
      description: anime.description || '',
      genre: Array.isArray(anime.genre) ? anime.genre.join(', ') : anime.genre,
      year: anime.year,
      episodes: anime.episodes,
      rating: anime.rating,
      studio: anime.studio || '',
      status: anime.status || 'Ongoing',
      image: anime.image || ''
    });
    setEditingAnime(anime);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!form.title.trim()) { toast.error('Le titre est obligatoire'); return; }
    const data = {
      ...form,
      genre: form.genre.split(',').map(g => g.trim()).filter(Boolean),
    };
    if (editingAnime) {
      updateCustomAnime(editingAnime.id, data);
      toast.success('Anime modifié !');
    } else {
      addCustomAnime(data);
      toast.success('Anime ajouté !');
    }
    setShowForm(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    deleteCustomAnime(id);
    toast.success('Anime supprimé');
  };

  return (
    <AdminLayout title="Gestion des Animes">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Rechercher un anime..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Button onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus className="w-4 h-4 mr-2" />Ajouter
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{filtered.length} anime(s)</p>

      <div className="space-y-3">
        {filtered.map(anime => (
          <motion.div key={anime.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <img src={anime.image} alt={anime.title} className="w-16 h-16 rounded-lg object-cover bg-muted" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium truncate">{anime.title}</h3>
                    {(anime as any).isCustom && <Badge variant="outline" className="text-[10px]">Perso</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{(anime as any).studio || 'Studio inconnu'} · {anime.year} · {anime.episodes} épisodes</p>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {anime.genre.map(g => (
                      <Badge key={g} variant="secondary" className="text-[10px] px-1.5 py-0">{g}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant={anime.status === 'Completed' ? 'default' : 'secondary'} className="text-[10px]">
                    {anime.status}
                  </Badge>
                  <span className="text-xs text-primary">⭐ {anime.rating}</span>
                </div>
                <div className="flex gap-1">
                  {!(anime as any).isCustom && (
                    <Button size="icon" variant="ghost" asChild>
                      <Link to={`/anime/${anime.id}`}><Eye className="w-4 h-4" /></Link>
                    </Button>
                  )}
                  {(anime as any).isCustom && (
                    <>
                      <Button size="icon" variant="ghost" onClick={() => openEdit(anime)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(anime.id)}>
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
            <DialogTitle>{editingAnime ? 'Modifier l\'anime' : 'Ajouter un anime'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Titre *</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} /></div>
            <div><Label>Genres (séparés par des virgules)</Label><Input value={form.genre} onChange={e => setForm({ ...form, genre: e.target.value })} placeholder="Action, Aventure, Fantaisie" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Année</Label><Input type="number" value={form.year} onChange={e => setForm({ ...form, year: parseInt(e.target.value) || 2024 })} /></div>
              <div><Label>Épisodes</Label><Input type="number" value={form.episodes} onChange={e => setForm({ ...form, episodes: parseInt(e.target.value) || 12 })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Note</Label><Input type="number" step="0.1" min="0" max="10" value={form.rating} onChange={e => setForm({ ...form, rating: parseFloat(e.target.value) || 0 })} /></div>
              <div><Label>Studio</Label><Input value={form.studio} onChange={e => setForm({ ...form, studio: e.target.value })} /></div>
            </div>
            <div>
              <Label>Statut</Label>
              <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ongoing">En cours</SelectItem>
                  <SelectItem value="Completed">Terminé</SelectItem>
                  <SelectItem value="Hiatus">En pause</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>URL de l'image</Label><Input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." /></div>
            <Button className="w-full" onClick={handleSubmit}><Save className="w-4 h-4 mr-2" />{editingAnime ? 'Modifier' : 'Ajouter'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminAnimesPage;
