import { useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdmin } from '@/contexts/AdminContext';
import { toast } from 'sonner';

const AdminSettingsPage = () => {
  const { settings, updateSettings } = useAdmin();
  const [form, setForm] = useState(settings);

  const handleSave = () => {
    updateSettings(form);
    toast.success('Paramètres sauvegardés');
  };

  const handleReset = () => {
    const defaults = {
      siteName: 'AnimeVerse',
      siteDescription: 'Explorez les profils détaillés de vos personnages d\'anime favoris.',
      maintenanceMode: false,
      allowRegistration: true,
      maxQuizQuestions: 10,
      defaultTheme: 'dark',
      showParticles: true,
      showChatbot: true,
      allowBattle: true,
      allowComparator: true,
      allowTierList: true,
      allowQuiz: true,
    };
    setForm(defaults);
    updateSettings(defaults);
    toast.success('Paramètres réinitialisés');
  };

  return (
    <AdminLayout title="Paramètres">
      <div className="max-w-2xl space-y-6">
        {/* General */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Général</CardTitle>
            <CardDescription>Configuration de base du site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Nom du site</Label>
              <Input value={form.siteName} onChange={e => setForm({ ...form, siteName: e.target.value })} />
            </div>
            <div>
              <Label>Description du site</Label>
              <Textarea value={form.siteDescription} onChange={e => setForm({ ...form, siteDescription: e.target.value })} rows={3} />
            </div>
            <div>
              <Label>Thème par défaut</Label>
              <Select value={form.defaultTheme} onValueChange={v => setForm({ ...form, defaultTheme: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Sombre</SelectItem>
                  <SelectItem value="light">Clair</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Nombre max de questions (Quiz)</Label>
              <Input type="number" min={5} max={30} value={form.maxQuizQuestions} onChange={e => setForm({ ...form, maxQuizQuestions: parseInt(e.target.value) || 10 })} />
            </div>
          </CardContent>
        </Card>

        {/* Toggles */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fonctionnalités</CardTitle>
            <CardDescription>Activer ou désactiver des fonctionnalités</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'maintenanceMode', label: 'Mode maintenance', desc: 'Afficher une page de maintenance aux visiteurs' },
              { key: 'allowRegistration', label: 'Inscription', desc: 'Autoriser les nouvelles inscriptions' },
              { key: 'showParticles', label: 'Particules', desc: 'Afficher les particules en arrière-plan' },
              { key: 'showChatbot', label: 'Chatbot IA', desc: 'Afficher le chatbot IA' },
              { key: 'allowBattle', label: 'Simulateur de combat', desc: 'Activer la page combat' },
              { key: 'allowComparator', label: 'Comparateur', desc: 'Activer la page comparateur' },
              { key: 'allowTierList', label: 'Tier List', desc: 'Activer la page tier list' },
              { key: 'allowQuiz', label: 'Quiz', desc: 'Activer la page quiz' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch
                  checked={(form as any)[item.key]}
                  onCheckedChange={v => setForm({ ...form, [item.key]: v })}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Danger zone */}
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="text-lg text-destructive">Zone de danger</CardTitle>
            <CardDescription>Actions irréversibles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" onClick={() => {
              localStorage.removeItem('anime-tier-votes');
              toast.success('Votes de la tier list réinitialisés');
            }}>
              Réinitialiser les votes Tier List
            </Button>
            <Separator />
            <Button variant="outline" className="text-destructive" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />Réinitialiser tous les paramètres
            </Button>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-full" size="lg">
          <Save className="w-4 h-4 mr-2" />Sauvegarder les paramètres
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
