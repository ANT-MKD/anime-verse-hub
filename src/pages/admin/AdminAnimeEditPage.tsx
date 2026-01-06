import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Film, Calendar, Star, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/components/admin/AdminLayout';
import { animeData } from '@/data/animeData';
import { toast } from 'sonner';

const AdminAnimeEditPage = () => {
  const { animeId } = useParams();
  const navigate = useNavigate();
  const isNew = animeId === 'new';
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: new Date().getFullYear(),
    episodes: 12,
    rating: 8.0,
    genre: [] as string[],
    status: 'Ongoing' as 'Ongoing' | 'Completed' | 'Hiatus'
  });

  const [newGenre, setNewGenre] = useState('');

  useEffect(() => {
    if (!isNew && animeId) {
      const anime = animeData.find(a => a.id === animeId);
      if (anime) {
        setFormData({
          title: anime.title,
          description: anime.description,
          year: anime.year,
          episodes: anime.episodes,
          rating: anime.rating,
          genre: anime.genre,
          status: anime.status || 'Ongoing'
        });
      }
    }
  }, [animeId, isNew]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isNew ? 'Anime créé !' : 'Anime modifié !');
    navigate('/admin/animes');
  };

  const addGenre = () => {
    if (newGenre && !formData.genre.includes(newGenre)) {
      setFormData({ ...formData, genre: [...formData.genre, newGenre] });
      setNewGenre('');
    }
  };

  const removeGenre = (g: string) => {
    setFormData({ ...formData, genre: formData.genre.filter(x => x !== g) });
  };

  return (
    <AdminLayout title={isNew ? 'Nouvel Anime' : `Modifier: ${formData.title}`} description="">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl">
        <Button variant="ghost" onClick={() => navigate('/admin/animes')} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />Retour
        </Button>

        <Card>
          <CardHeader><CardTitle><Film className="h-5 w-5 inline mr-2" />Informations</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Titre</Label>
                  <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Année</Label>
                  <Input type="number" value={formData.year} onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Épisodes</Label>
                  <Input type="number" value={formData.episodes} onChange={(e) => setFormData({ ...formData, episodes: parseInt(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Note</Label>
                  <Input type="number" step="0.1" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Statut</Label>
                  <Select value={formData.status} onValueChange={(v: any) => setFormData({ ...formData, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ongoing">En cours</SelectItem>
                      <SelectItem value="Completed">Terminé</SelectItem>
                      <SelectItem value="Hiatus">En pause</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Genres</Label>
                <div className="flex gap-2">
                  <Input value={newGenre} onChange={(e) => setNewGenre(e.target.value)} placeholder="Ajouter" />
                  <Button type="button" onClick={addGenre} variant="secondary">+</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.genre.map((g) => (
                    <span key={g} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                      {g} <button type="button" onClick={() => removeGenre(g)}>×</button>
                    </span>
                  ))}
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

export default AdminAnimeEditPage;
