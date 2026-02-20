import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import { animeData } from '@/data/animeData';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const AdminAnimesPage = () => {
  const [search, setSearch] = useState('');

  const filtered = animeData.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Gestion des Animes">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Rechercher un anime..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Button onClick={() => toast.info('Les animes sont gérés dans le code source (animeData.ts). Cette fonctionnalité sera disponible après migration en base de données.')}>
          <Plus className="w-4 h-4 mr-2" />Ajouter
        </Button>
      </div>

      <div className="space-y-3">
        {filtered.map(anime => (
          <motion.div key={anime.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <img src={anime.image} alt={anime.title} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{anime.title}</h3>
                  <p className="text-xs text-muted-foreground">{anime.studio} · {anime.year} · {anime.episodes} épisodes</p>
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
                  <span className="text-xs text-muted-foreground">{anime.characters.length} personnages</span>
                  <span className="text-xs text-primary">⭐ {anime.rating}</span>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" asChild>
                    <Link to={`/anime/${anime.id}`}><Eye className="w-4 h-4" /></Link>
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => toast.info('Modification via code source uniquement pour le moment.')}>
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

export default AdminAnimesPage;
