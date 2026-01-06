import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import AdminLayout from '@/components/admin/AdminLayout';
import { getAllCharacters } from '@/data/animeData';
import { toast } from 'sonner';

const AdminCharacterViewPage = () => {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const allCharacters = getAllCharacters();
  const character = allCharacters.find(c => c.id === characterId);
  
  if (!character) {
    return <AdminLayout title="Non trouvé" description=""><Button onClick={() => navigate('/admin/characters')}>Retour</Button></AdminLayout>;
  }

  const statLabels: Record<string, string> = { power: 'Puissance', speed: 'Vitesse', technique: 'Technique', intelligence: 'Intelligence', stamina: 'Endurance', agility: 'Agilité' };
  const avgStat = Math.round(Object.values(character.stats).reduce((a, b) => a + b, 0) / 6);

  return (
    <AdminLayout title={character.name} description={character.animeTitle}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex justify-between">
          <Button variant="ghost" onClick={() => navigate('/admin/characters')}><ArrowLeft className="h-4 w-4 mr-2" />Retour</Button>
          <div className="flex gap-2">
            <Button variant="outline" asChild><Link to={`/admin/characters/${characterId}/edit`}><Edit className="h-4 w-4 mr-2" />Modifier</Link></Button>
            <Button variant="destructive" onClick={() => { toast.success('Supprimé'); navigate('/admin/characters'); }}><Trash2 className="h-4 w-4 mr-2" />Supprimer</Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardContent className="pt-6 text-center">
              <img src={character.image} alt={character.name} className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-primary/20" />
              <h2 className="text-xl font-bold">{character.name}</h2>
              <p className="text-muted-foreground">{character.role}</p>
              <div className="flex justify-center gap-2 mt-3">
                <Badge variant={character.status.status === 'Alive' ? 'default' : character.status.status === 'Deceased' ? 'destructive' : 'secondary'}>{character.status.status}</Badge>
                <Badge variant="outline">{character.animeTitle}</Badge>
              </div>
              <div className="mt-6 p-4 bg-muted rounded-lg"><p className="text-3xl font-bold text-primary">{avgStat}</p><p className="text-sm text-muted-foreground">Moyenne</p></div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Description</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{character.description}</p>
              {character.abilities && character.abilities.length > 0 && (
                <div><h4 className="font-semibold mb-2">Capacités</h4><div className="flex flex-wrap gap-2">{character.abilities.map((a) => <Badge key={a} variant="secondary">{a}</Badge>)}</div></div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Stats</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(character.stats).map(([stat, value]) => (
                <div key={stat} className="space-y-2">
                  <div className="flex justify-between"><span className="text-sm font-medium">{statLabels[stat]}</span><span className="text-sm font-bold">{value}</span></div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminCharacterViewPage;
