import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Edit, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/components/admin/AdminLayout';
import { animeData, getAllCharacters } from '@/data/animeData';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const AdminCharactersPage = () => {
  const [search, setSearch] = useState('');
  const [animeFilter, setAnimeFilter] = useState('all');

  const allCharacters = useMemo(() => getAllCharacters(), []);

  const filtered = allCharacters.filter(c => {
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
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filtrer par anime" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les animes</SelectItem>
            {animeData.map(a => (
              <SelectItem key={a.id} value={a.id}>{a.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{filtered.length} personnage(s) trouvé(s)</p>

      <div className="space-y-2">
        {filtered.map(char => (
          <motion.div key={`${char.animeId}-${char.id}`} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardContent className="p-3 flex items-center gap-3">
                <img src={char.image} alt={char.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{char.name}</h3>
                  <p className="text-xs text-muted-foreground">{char.animeTitle} · {char.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  {char.rank && <Badge variant="outline" className="text-[10px]">{char.rank}</Badge>}
                  <div className="text-xs text-muted-foreground hidden sm:block">
                    PWR: {char.stats.power} · SPD: {char.stats.speed}
                  </div>
                  <Button size="icon" variant="ghost" asChild>
                    <Link to={`/anime/${char.animeId}/character/${char.id}`}><Eye className="w-4 h-4" /></Link>
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => toast.info('Modification via code source uniquement.')}>
                    <Edit className="w-4 h-4" />
                  </Button>
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
