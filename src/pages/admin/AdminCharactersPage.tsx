import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/components/admin/AdminLayout';
import { animeData, getAllCharacters } from '@/data/animeData';
import { useAdmin } from '@/contexts/AdminContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AdminCharactersPage = () => {
  const { getCustomCharacters, deleteCustomCharacter } = useAdmin();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [animeFilter, setAnimeFilter] = useState('all');

  const allCharacters = getAllCharacters();
  const customCharacters = getCustomCharacters();

  const combined = [
    ...allCharacters.map(c => ({ ...c, isCustom: false })),
    ...customCharacters.map((c: any) => ({
      ...c, isCustom: true,
      stats: { power: c.power ?? c.stats?.power ?? 50, speed: c.speed ?? c.stats?.speed ?? 50, technique: c.technique ?? c.stats?.technique ?? 50, intelligence: c.intelligence ?? c.stats?.intelligence ?? 50, stamina: c.stamina ?? c.stats?.stamina ?? 50, agility: c.agility ?? c.stats?.agility ?? 50 }
    }))
  ];

  const filtered = combined.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchAnime = animeFilter === 'all' || c.animeId === animeFilter;
    return matchSearch && matchAnime;
  });

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
        <Button onClick={() => navigate('/admin/characters/new')}>
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
                      <Button size="icon" variant="ghost" asChild>
                        <Link to={`/admin/characters/view/${char.id}`}><Eye className="w-4 h-4" /></Link>
                      </Button>
                      <Button size="icon" variant="ghost" asChild>
                        <Link to={`/admin/characters/edit/${char.id}`}><Edit className="w-4 h-4" /></Link>
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
    </AdminLayout>
  );
};

export default AdminCharactersPage;
