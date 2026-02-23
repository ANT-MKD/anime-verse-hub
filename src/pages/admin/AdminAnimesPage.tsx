import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import { animeData } from '@/data/animeData';
import { useAdmin } from '@/contexts/AdminContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AdminAnimesPage = () => {
  const { getCustomAnimes, addCustomAnime, deleteCustomAnime, hiddenStaticAnimes, hideStaticAnime } = useAdmin();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const customAnimes = getCustomAnimes();

  const allAnimes = [
    ...animeData
      .filter(a => !hiddenStaticAnimes.includes(a.id))
      .map(a => ({ ...a, isCustom: false })),
    ...customAnimes.map((a: any) => ({
      ...a, isCustom: true,
      characters: [], banner: a.banner || '', theme: a.theme || '',
      genre: Array.isArray(a.genre) ? a.genre : typeof a.genre === 'string' ? [a.genre] : []
    }))
  ];

  const filtered = allAnimes.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleCloneAndEdit = (anime: any) => {
    const cloneData = {
      title: anime.title,
      titleJapanese: anime.titleJapanese || '',
      description: anime.description || '',
      fullDescription: anime.fullDescription || '',
      image: typeof anime.image === 'string' ? anime.image : '',
      banner: typeof anime.banner === 'string' ? anime.banner : '',
      theme: anime.theme || '',
      genre: Array.isArray(anime.genre) ? [...anime.genre] : [],
      year: anime.year,
      episodes: anime.episodes,
      rating: anime.rating,
      studio: anime.studio || '',
      status: anime.status || 'Ongoing',
      clonedFrom: anime.id,
    };
    const newId = addCustomAnime(cloneData);
    toast.success('Anime cloné en version personnalisée');
    navigate(`/admin/animes/edit/${newId}`);
  };

  const handleDeleteStatic = (id: string) => {
    hideStaticAnime(id);
    toast.success('Anime masqué');
  };

  const handleDeleteCustom = (id: string) => {
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
        <Button onClick={() => navigate('/admin/animes/new')}>
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
                  {/* View */}
                  {!(anime as any).isCustom ? (
                    <Button size="icon" variant="ghost" asChild>
                      <Link to={`/anime/${anime.id}`}><Eye className="w-4 h-4" /></Link>
                    </Button>
                  ) : (
                    <Button size="icon" variant="ghost" asChild>
                      <Link to={`/admin/animes/view/${anime.id}`}><Eye className="w-4 h-4" /></Link>
                    </Button>
                  )}
                  {/* Edit */}
                  {(anime as any).isCustom ? (
                    <Button size="icon" variant="ghost" asChild>
                      <Link to={`/admin/animes/edit/${anime.id}`}><Edit className="w-4 h-4" /></Link>
                    </Button>
                  ) : (
                    <Button size="icon" variant="ghost" onClick={() => handleCloneAndEdit(anime)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  )}
                  {/* Delete */}
                  {(anime as any).isCustom ? (
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDeleteCustom(anime.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDeleteStatic(anime.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
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

export default AdminAnimesPage;
