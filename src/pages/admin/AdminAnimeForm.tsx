import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdmin } from '@/contexts/AdminContext';
import { toast } from 'sonner';

const themeOptions = [
  'theme-haikyuu', 'theme-solo-leveling', 'theme-jujutsu', 'theme-demon-slayer',
  'theme-hunter', 'theme-naruto', 'theme-mha', 'theme-onepiece',
  'theme-aot', 'theme-dragonball', 'theme-deathnote', 'theme-bleach',
];

const defaultForm = {
  title: '', titleJapanese: '', description: '', fullDescription: '',
  image: '', banner: '', theme: 'theme-haikyuu',
  genre: [] as string[],
  year: 2024, episodes: 12, rating: 7.5, studio: '', status: 'Ongoing' as string,
};

const AdminAnimeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCustomAnimeById, addCustomAnime, updateCustomAnime } = useAdmin();
  const isEditing = !!id;

  const [form, setForm] = useState({ ...defaultForm });
  const [genreInput, setGenreInput] = useState('');

  useEffect(() => {
    if (isEditing) {
      const anime = getCustomAnimeById(id);
      if (anime) {
        setForm({
          title: anime.title || '',
          titleJapanese: anime.titleJapanese || '',
          description: anime.description || '',
          fullDescription: anime.fullDescription || '',
          image: anime.image || '',
          banner: anime.banner || '',
          theme: anime.theme || 'theme-haikyuu',
          genre: Array.isArray(anime.genre) ? anime.genre : [],
          year: anime.year || 2024,
          episodes: anime.episodes || 12,
          rating: anime.rating || 7.5,
          studio: anime.studio || '',
          status: anime.status || 'Ongoing',
        });
      }
    }
  }, [id]);

  const addGenre = () => {
    const val = genreInput.trim();
    if (val && !form.genre.includes(val)) {
      setForm({ ...form, genre: [...form.genre, val] });
      setGenreInput('');
    }
  };

  const removeGenre = (g: string) => {
    setForm({ ...form, genre: form.genre.filter(x => x !== g) });
  };

  const handleSubmit = () => {
    if (!form.title.trim()) { toast.error('Le titre est obligatoire'); return; }
    if (isEditing) {
      updateCustomAnime(id, form);
      toast.success('Anime modifié !');
    } else {
      addCustomAnime(form);
      toast.success('Anime ajouté !');
    }
    navigate('/admin/animes');
  };

  return (
    <AdminLayout title={isEditing ? "Modifier l'anime" : "Ajouter un anime"}>
      <Button variant="ghost" onClick={() => navigate('/admin/animes')} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />Retour à la liste
      </Button>

      <div className="max-w-2xl space-y-6">
        {/* Base Info */}
        <div className="space-y-4 p-4 rounded-lg border bg-card">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Informations de base</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label>Titre *</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Titre japonais</Label><Input value={form.titleJapanese} onChange={e => setForm({ ...form, titleJapanese: e.target.value })} /></div>
          </div>
          <div><Label>Description courte</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} /></div>
          <div><Label>Synopsis complet</Label><Textarea value={form.fullDescription} onChange={e => setForm({ ...form, fullDescription: e.target.value })} rows={4} /></div>
        </div>

        {/* Media */}
        <div className="space-y-4 p-4 rounded-lg border bg-card">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Médias</h3>
          <div><Label>URL de l'image</Label><Input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." /></div>
          <div><Label>URL de la bannière</Label><Input value={form.banner} onChange={e => setForm({ ...form, banner: e.target.value })} placeholder="https://..." /></div>
          <div>
            <Label>Thème CSS</Label>
            <Select value={form.theme} onValueChange={v => setForm({ ...form, theme: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {themeOptions.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 p-4 rounded-lg border bg-card">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Détails</h3>
          <div>
            <Label>Genres</Label>
            <div className="flex gap-2 mt-1">
              <Input value={genreInput} onChange={e => setGenreInput(e.target.value)} placeholder="Ajouter un genre" onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addGenre())} />
              <Button type="button" size="icon" variant="outline" onClick={addGenre}><Plus className="w-4 h-4" /></Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {form.genre.map(g => (
                <Badge key={g} variant="secondary" className="gap-1">{g}<X className="w-3 h-3 cursor-pointer" onClick={() => removeGenre(g)} /></Badge>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div><Label>Année</Label><Input type="number" value={form.year} onChange={e => setForm({ ...form, year: parseInt(e.target.value) || 2024 })} /></div>
            <div><Label>Épisodes</Label><Input type="number" value={form.episodes} onChange={e => setForm({ ...form, episodes: parseInt(e.target.value) || 12 })} /></div>
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
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button className="flex-1" onClick={handleSubmit}>
            <Save className="w-4 h-4 mr-2" />{isEditing ? 'Modifier' : 'Ajouter'}
          </Button>
          <Button variant="outline" onClick={() => navigate('/admin/animes')}>Annuler</Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnimeForm;
