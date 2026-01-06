import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Star, Calendar, Film, Users, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import { animeData } from '@/data/animeData';
import { toast } from 'sonner';

const AdminAnimeViewPage = () => {
  const { animeId } = useParams();
  const navigate = useNavigate();
  const anime = animeData.find(a => a.id === animeId);
  
  if (!anime) {
    return <AdminLayout title="Non trouvé" description=""><Button onClick={() => navigate('/admin/animes')}>Retour</Button></AdminLayout>;
  }

  return (
    <AdminLayout title={anime.title} description="">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex justify-between">
          <Button variant="ghost" onClick={() => navigate('/admin/animes')}><ArrowLeft className="h-4 w-4 mr-2" />Retour</Button>
          <div className="flex gap-2">
            <Button variant="outline" asChild><Link to={`/admin/animes/${animeId}/edit`}><Edit className="h-4 w-4 mr-2" />Modifier</Link></Button>
            <Button variant="destructive" onClick={() => { toast.success('Supprimé'); navigate('/admin/animes'); }}><Trash2 className="h-4 w-4 mr-2" />Supprimer</Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle><Film className="h-5 w-5 inline mr-2" />Informations</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{anime.description}</p>
              <div className="flex flex-wrap gap-2">{anime.genre.map((g) => <Badge key={g} variant="secondary">{g}</Badge>)}</div>
              <div className="grid grid-cols-4 gap-4 pt-4 border-t">
                <div><p className="text-sm text-muted-foreground">Année</p><p className="font-medium">{anime.year}</p></div>
                <div><p className="text-sm text-muted-foreground">Épisodes</p><p className="font-medium">{anime.episodes}</p></div>
                <div><p className="text-sm text-muted-foreground">Note</p><p className="font-medium flex items-center gap-1"><Star className="h-4 w-4 text-yellow-500" />{anime.rating}</p></div>
                <div><p className="text-sm text-muted-foreground">Statut</p><Badge>{anime.status}</Badge></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle><Users className="h-5 w-5 inline mr-2" />Stats</CardTitle></CardHeader>
            <CardContent><div className="text-center p-4 bg-muted rounded-lg"><p className="text-3xl font-bold text-primary">{anime.characters.length}</p><p className="text-sm text-muted-foreground">Personnages</p></div></CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Personnages ({anime.characters.length})</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {anime.characters.slice(0, 8).map((c) => (
                <div key={c.id} className="bg-muted rounded-lg p-4 flex items-center gap-3">
                  <img src={c.image} alt={c.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-1 min-w-0"><p className="font-medium truncate">{c.name}</p><p className="text-sm text-muted-foreground">{c.role}</p></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminAnimeViewPage;
