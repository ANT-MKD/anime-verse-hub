import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Film, Star, Calendar, Play, Users, Plus, Edit, Trash2, Eye } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData } from '@/hooks/useAdminData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const AdminAnimesPage = () => {
  const navigate = useNavigate();
  const { animes, isLoading } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const allGenres = [...new Set(animes.flatMap(a => a.genre))];

  const filteredAnimes = animes.filter(anime => {
    const matchesSearch = anime.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || anime.genre.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  const handleDelete = (animeId: string, animeTitle: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${animeTitle} ?`)) {
      // Get custom animes from localStorage
      const storedCustom = localStorage.getItem('admin-custom-animes');
      const customAnimes = storedCustom ? JSON.parse(storedCustom) : [];
      const updatedCustom = customAnimes.filter((a: any) => a.id !== animeId);
      localStorage.setItem('admin-custom-animes', JSON.stringify(updatedCustom));
      toast.success(`${animeTitle} a été supprimé`);
      // Force refresh
      window.location.reload();
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Animes">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Animes" 
      description={`${animes.length} animes dans le catalogue`}
    >
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="px-4 py-2 bg-muted/50 border border-border rounded-lg"
          >
            <option value="all">Tous les genres</option>
            {allGenres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/admin/animes/new')}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
          >
            <Plus className="w-5 h-5" />
            Ajouter
          </motion.button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-primary">{animes.length}</p>
          <p className="text-sm text-muted-foreground">Total</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-500">
            {animes.filter(a => a.status === 'Completed').length}
          </p>
          <p className="text-sm text-muted-foreground">Terminés</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-500">
            {animes.filter(a => a.status === 'Ongoing').length}
          </p>
          <p className="text-sm text-muted-foreground">En cours</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-yellow-500">
            {animes.filter(a => a.status === 'Hiatus').length}
          </p>
          <p className="text-sm text-muted-foreground">En pause</p>
        </div>
      </div>

      {/* Animes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnimes.map((anime, index) => (
          <motion.div
            key={anime.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card border border-border rounded-xl overflow-hidden group"
          >
            <div className="relative h-40 overflow-hidden">
              <img 
                src={anime.banner} 
                alt={anime.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="font-display font-bold text-lg">{anime.title}</h3>
                {anime.titleJapanese && (
                  <p className="text-sm text-muted-foreground">{anime.titleJapanese}</p>
                )}
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-background/80 rounded-lg">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">{anime.rating}</span>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {anime.genre.map(g => (
                  <span key={g} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                    {g}
                  </span>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2">{anime.description}</p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-border">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{anime.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  <span>{anime.episodes} épisodes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{anime.characters.length}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <span className={cn(
                  "px-2 py-0.5 text-xs rounded-full font-medium",
                  anime.status === 'Completed' 
                    ? "bg-green-500/10 text-green-500" 
                    : anime.status === 'Ongoing'
                    ? "bg-blue-500/10 text-blue-500"
                    : "bg-yellow-500/10 text-yellow-500"
                )}>
                  {anime.status === 'Completed' ? 'Terminé' : anime.status === 'Ongoing' ? 'En cours' : 'Hiatus'}
                </span>
                {anime.studio && (
                  <span className="text-xs text-muted-foreground">par {anime.studio}</span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <button
                  onClick={() => navigate(`/admin/animes/${anime.id}`)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-muted/50 hover:bg-muted rounded-lg text-sm font-medium transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Voir
                </button>
                <button
                  onClick={() => navigate(`/admin/animes/${anime.id}/edit`)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-medium transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(anime.id, anime.title)}
                  className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredAnimes.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Film className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Aucun anime trouvé</p>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminAnimesPage;
