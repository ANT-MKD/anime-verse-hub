import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import AdminLayout from '@/components/admin/AdminLayout';
import { animeData, getAllCharacters } from '@/data/animeData';
import { toast } from 'sonner';

const AdminCharacterEditPage = () => {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const isNew = characterId === 'new';
  const allCharacters = getAllCharacters();

  const [formData, setFormData] = useState({
    name: '', role: '', description: '', animeId: '',
    status: 'Alive' as 'Alive' | 'Deceased' | 'Unknown',
    stats: { power: 50, speed: 50, technique: 50, intelligence: 50, stamina: 50, agility: 50 },
    abilities: [] as string[]
  });

  useEffect(() => {
    if (!isNew && characterId) {
      const char = allCharacters.find(c => c.id === characterId);
      if (char) {
        setFormData({
          name: char.name, role: char.role, description: char.description,
          animeId: char.animeId, status: char.status.status,
          stats: char.stats, abilities: char.abilities || []
        });
      }
    }
  }, [characterId, isNew]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isNew ? 'Personnage créé !' : 'Personnage modifié !');
    navigate('/admin/characters');
  };

  const statLabels: Record<string, string> = { power: 'Puissance', speed: 'Vitesse', technique: 'Technique', intelligence: 'Intelligence', stamina: 'Endurance', agility: 'Agilité' };

  return (
    <AdminLayout title={isNew ? 'Nouveau Personnage' : `Modifier: ${formData.name}`} description="">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl">
        <Button variant="ghost" onClick={() => navigate('/admin/characters')} className="mb-6"><ArrowLeft className="h-4 w-4 mr-2" />Retour</Button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader><CardTitle><User className="h-5 w-5 inline mr-2" />Informations</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2"><Label>Nom</Label><Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></div>
                <div className="space-y-2"><Label>Anime</Label>
                  <Select value={formData.animeId} onValueChange={(v) => setFormData({ ...formData, animeId: v })}>
                    <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                    <SelectContent>{animeData.map((a) => <SelectItem key={a.id} value={a.id}>{a.title}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2"><Label>Rôle</Label><Input value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} /></div>
                <div className="space-y-2"><Label>Statut</Label>
                  <Select value={formData.status} onValueChange={(v: any) => setFormData({ ...formData, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alive">Vivant</SelectItem>
                      <SelectItem value="Deceased">Décédé</SelectItem>
                      <SelectItem value="Unknown">Inconnu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2"><Label>Description</Label><Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} /></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Stats</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(formData.stats).map(([stat, value]) => (
                <div key={stat} className="space-y-2">
                  <div className="flex justify-between"><Label>{statLabels[stat]}</Label><span className="text-sm font-medium">{value}</span></div>
                  <Slider value={[value]} onValueChange={(v) => setFormData({ ...formData, stats: { ...formData.stats, [stat]: v[0] } })} max={100} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Button type="submit" className="w-full"><Save className="h-4 w-4 mr-2" />{isNew ? 'Créer' : 'Sauvegarder'}</Button>
        </form>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminCharacterEditPage;
