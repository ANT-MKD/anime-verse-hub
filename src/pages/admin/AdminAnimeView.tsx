import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdmin } from '@/contexts/AdminContext';

const AdminAnimeView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCustomAnimeById } = useAdmin();

  const anime = getCustomAnimeById(id || '');

  if (!anime) {
    return (
      <AdminLayout title="Anime introuvable">
        <Button variant="ghost" onClick={() => navigate('/admin/animes')}>
          <ArrowLeft className="w-4 h-4 mr-2" />Retour
        </Button>
        <p className="text-muted-foreground mt-4">Cet anime n'existe pas ou a été supprimé.</p>
      </AdminLayout>
    );
  }

  const genres = Array.isArray(anime.genre) ? anime.genre : [];

  return (
    <AdminLayout title={anime.title}>
      <div className="flex gap-2 mb-6">
        <Button variant="ghost" onClick={() => navigate('/admin/animes')}>
          <ArrowLeft className="w-4 h-4 mr-2" />Retour
        </Button>
        <Button variant="outline" onClick={() => navigate(`/admin/animes/edit/${anime.id}`)}>
          <Edit className="w-4 h-4 mr-2" />Modifier
        </Button>
      </div>

      <div className="max-w-2xl space-y-6">
        {anime.banner && (
          <img src={anime.banner} alt="Banner" className="w-full h-40 object-cover rounded-lg" />
        )}

        <div className="flex gap-4 items-start">
          {anime.image && <img src={anime.image} alt={anime.title} className="w-24 h-24 rounded-lg object-cover bg-muted" />}
          <div>
            <h2 className="text-xl font-bold">{anime.title}</h2>
            {anime.titleJapanese && <p className="text-sm text-muted-foreground">{anime.titleJapanese}</p>}
            <div className="flex gap-1 mt-2 flex-wrap">
              {genres.map((g: string) => <Badge key={g} variant="secondary">{g}</Badge>)}
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div><span className="text-muted-foreground">Année</span><p className="font-medium">{anime.year}</p></div>
              <div><span className="text-muted-foreground">Épisodes</span><p className="font-medium">{anime.episodes}</p></div>
              <div><span className="text-muted-foreground">Note</span><p className="font-medium">⭐ {anime.rating}</p></div>
              <div><span className="text-muted-foreground">Studio</span><p className="font-medium">{anime.studio || '—'}</p></div>
            </div>
            <div><span className="text-sm text-muted-foreground">Statut</span><p><Badge>{anime.status || 'Ongoing'}</Badge></p></div>
            {anime.theme && <div><span className="text-sm text-muted-foreground">Thème</span><p className="text-sm font-mono">{anime.theme}</p></div>}
          </CardContent>
        </Card>

        {anime.description && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm text-muted-foreground">{anime.description}</p>
            </CardContent>
          </Card>
        )}

        {anime.fullDescription && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Synopsis complet</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{anime.fullDescription}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAnimeView;
