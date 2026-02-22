import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/admin/AdminLayout';
import { animeData } from '@/data/animeData';
import { useAdmin } from '@/contexts/AdminContext';
import { toast } from 'sonner';

// --- Tag Input Component ---
const TagInput = ({ label, tags, onChange }: { label: string; tags: string[]; onChange: (tags: string[]) => void }) => {
  const [value, setValue] = useState('');
  const add = () => {
    if (value.trim() && !tags.includes(value.trim())) {
      onChange([...tags, value.trim()]);
      setValue('');
    }
  };
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())} placeholder={`Ajouter ${label.toLowerCase()}...`} />
        <Button type="button" size="icon" variant="outline" onClick={add}><Plus className="w-4 h-4" /></Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="gap-1 pr-1">
              {tag}
              <button onClick={() => onChange(tags.filter((_, j) => j !== i))} className="ml-1 hover:text-destructive"><X className="w-3 h-3" /></button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Default form state ---
const defaultForm = () => ({
  name: '', nativeName: '', title: '', role: '', rank: '', description: '', animeId: '', image: '',
  fullBio: '', backstory: '',
  personality: [] as string[], weaknesses: [] as string[], quotes: [] as string[],
  age: '', birthday: '', height: '', weight: '', bloodType: '',
  vitalStatus: 'Alive' as 'Alive' | 'Deceased' | 'Unknown',
  occupation: '', origin: '',
  team: '', teamRole: '', allies: [] as string[], previousAffiliations: [] as string[],
  power: 50, speed: 50, technique: 50, intelligence: 50, stamina: 50, agility: 50,
  skills: [] as { name: string; type: string; description: string; level: number }[],
  relationships: [] as { name: string; type: string; description: string }[],
  equipment: [] as { name: string; type: string; description: string; rarity: string }[],
  achievements: [] as string[],
  voiceActorJp: '', voiceActorJpNative: '', voiceActorEn: '',
});

type FormState = ReturnType<typeof defaultForm>;

const AdminCharacterForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const { getCustomCharacters, addCustomCharacter, updateCustomCharacter } = useAdmin();
  const [form, setForm] = useState<FormState>(defaultForm());

  useEffect(() => {
    if (isEdit) {
      const chars = getCustomCharacters();
      const char = chars.find((c: any) => c.id === id);
      if (char) {
        setForm({
          ...defaultForm(),
          ...char,
          // Flatten nested structures if needed
          age: char.age || char.status?.age || '',
          birthday: char.birthday || char.status?.birthday || '',
          height: char.height || char.status?.height || '',
          weight: char.weight || char.status?.weight || '',
          bloodType: char.bloodType || char.status?.bloodType || '',
          vitalStatus: char.vitalStatus || char.status?.status || 'Alive',
          occupation: char.occupation || char.status?.occupation || '',
          origin: char.origin || char.status?.origin || '',
          team: char.team || char.affiliation?.team || '',
          teamRole: char.teamRole || char.affiliation?.role || '',
          allies: char.allies || char.affiliation?.allies || [],
          previousAffiliations: char.previousAffiliations || char.affiliation?.previousAffiliations || [],
          power: char.power ?? char.stats?.power ?? 50,
          speed: char.speed ?? char.stats?.speed ?? 50,
          technique: char.technique ?? char.stats?.technique ?? 50,
          intelligence: char.intelligence ?? char.stats?.intelligence ?? 50,
          stamina: char.stamina ?? char.stats?.stamina ?? 50,
          agility: char.agility ?? char.stats?.agility ?? 50,
          skills: char.skills || [],
          relationships: char.relationships || [],
          equipment: char.equipment || [],
          achievements: char.achievements || [],
          personality: char.personality || [],
          weaknesses: char.weaknesses || [],
          quotes: char.quotes || [],
        });
      } else {
        toast.error('Personnage introuvable');
        navigate('/admin/characters');
      }
    }
  }, [id]);

  const set = (updates: Partial<FormState>) => setForm(prev => ({ ...prev, ...updates }));

  const handleSubmit = () => {
    if (!form.name.trim()) { toast.error('Le nom est obligatoire'); return; }
    if (isEdit) {
      updateCustomCharacter(id!, form);
      toast.success('Personnage modifié !');
    } else {
      addCustomCharacter(form);
      toast.success('Personnage ajouté !');
    }
    navigate('/admin/characters');
  };

  const statLabels: Record<string, string> = { power: 'Puissance', speed: 'Vitesse', technique: 'Technique', intelligence: 'Intelligence', stamina: 'Endurance', agility: 'Agilité' };

  return (
    <AdminLayout title={isEdit ? 'Modifier le personnage' : 'Ajouter un personnage'}>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <button onClick={() => navigate('/admin/characters')} className="hover:text-foreground">Administration</button>
        <span>/</span>
        <button onClick={() => navigate('/admin/characters')} className="hover:text-foreground">Personnages</button>
        <span>/</span>
        <span className="text-foreground">{isEdit ? 'Modifier' : 'Ajouter'}</span>
      </div>

      <Tabs defaultValue="base" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-1">
          <TabsTrigger value="base">Infos de base</TabsTrigger>
          <TabsTrigger value="bio">Biographie</TabsTrigger>
          <TabsTrigger value="status">Statut & Affiliation</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
          <TabsTrigger value="skills">Compétences</TabsTrigger>
          <TabsTrigger value="relations">Relations</TabsTrigger>
          <TabsTrigger value="equipment">Équipement</TabsTrigger>
          <TabsTrigger value="extras">Exploits & Doubleurs</TabsTrigger>
        </TabsList>

        {/* Tab 1: Base Info */}
        <TabsContent value="base">
          <Card>
            <CardHeader><CardTitle>Informations de base</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>Nom *</Label><Input value={form.name} onChange={e => set({ name: e.target.value })} /></div>
                <div><Label>Nom natif</Label><Input value={form.nativeName} onChange={e => set({ nativeName: e.target.value })} placeholder="日本語名" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><Label>Titre</Label><Input value={form.title} onChange={e => set({ title: e.target.value })} placeholder="Ex: The King" /></div>
                <div><Label>Rôle</Label><Input value={form.role} onChange={e => set({ role: e.target.value })} placeholder="Ex: Héros" /></div>
                <div><Label>Rang</Label><Input value={form.rank} onChange={e => set({ rank: e.target.value })} placeholder="Ex: SSS" /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Anime associé</Label>
                  <Select value={form.animeId} onValueChange={v => set({ animeId: v })}>
                    <SelectTrigger><SelectValue placeholder="Choisir" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">Personnalisé</SelectItem>
                      {animeData.map(a => (<SelectItem key={a.id} value={a.id}>{a.title}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>URL de l'image</Label><Input value={form.image} onChange={e => set({ image: e.target.value })} placeholder="https://..." /></div>
              </div>
              <div><Label>Description courte</Label><Textarea value={form.description} onChange={e => set({ description: e.target.value })} rows={3} /></div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Biography */}
        <TabsContent value="bio">
          <Card>
            <CardHeader><CardTitle>Biographie</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Biographie complète</Label><Textarea value={form.fullBio} onChange={e => set({ fullBio: e.target.value })} rows={6} /></div>
              <div><Label>Histoire / Backstory</Label><Textarea value={form.backstory} onChange={e => set({ backstory: e.target.value })} rows={5} /></div>
              <TagInput label="Traits de personnalité" tags={form.personality} onChange={personality => set({ personality })} />
              <TagInput label="Faiblesses" tags={form.weaknesses} onChange={weaknesses => set({ weaknesses })} />
              <TagInput label="Citations mémorables" tags={form.quotes} onChange={quotes => set({ quotes })} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Status & Affiliation */}
        <TabsContent value="status">
          <Card>
            <CardHeader><CardTitle>Statut & Affiliation</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><Label>Âge</Label><Input value={form.age} onChange={e => set({ age: e.target.value })} /></div>
                <div><Label>Anniversaire</Label><Input value={form.birthday} onChange={e => set({ birthday: e.target.value })} /></div>
                <div><Label>Groupe sanguin</Label><Input value={form.bloodType} onChange={e => set({ bloodType: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><Label>Taille</Label><Input value={form.height} onChange={e => set({ height: e.target.value })} /></div>
                <div><Label>Poids</Label><Input value={form.weight} onChange={e => set({ weight: e.target.value })} /></div>
                <div>
                  <Label>Statut vital</Label>
                  <Select value={form.vitalStatus} onValueChange={v => set({ vitalStatus: v as any })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alive">En vie</SelectItem>
                      <SelectItem value="Deceased">Décédé</SelectItem>
                      <SelectItem value="Unknown">Inconnu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>Occupation</Label><Input value={form.occupation} onChange={e => set({ occupation: e.target.value })} /></div>
                <div><Label>Origine</Label><Input value={form.origin} onChange={e => set({ origin: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>Équipe / Organisation</Label><Input value={form.team} onChange={e => set({ team: e.target.value })} /></div>
                <div><Label>Rôle dans l'équipe</Label><Input value={form.teamRole} onChange={e => set({ teamRole: e.target.value })} /></div>
              </div>
              <TagInput label="Alliés" tags={form.allies} onChange={allies => set({ allies })} />
              <TagInput label="Anciennes affiliations" tags={form.previousAffiliations} onChange={previousAffiliations => set({ previousAffiliations })} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Stats */}
        <TabsContent value="stats">
          <Card>
            <CardHeader><CardTitle>Statistiques</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              {(['power', 'speed', 'technique', 'intelligence', 'stamina', 'agility'] as const).map(stat => (
                <div key={stat} className="flex items-center gap-4">
                  <span className="text-sm w-28 font-medium">{statLabels[stat]}</span>
                  <Slider value={[(form as any)[stat]]} onValueChange={v => set({ [stat]: v[0] } as any)} max={100} step={1} className="flex-1" />
                  <span className="text-sm w-10 text-right font-mono font-bold">{(form as any)[stat]}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 5: Skills */}
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Compétences</CardTitle>
                <Button size="sm" variant="outline" onClick={() => set({ skills: [...form.skills, { name: '', type: 'Attack', description: '', level: 50 }] })}>
                  <Plus className="w-4 h-4 mr-1" />Ajouter
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {form.skills.length === 0 && <p className="text-sm text-muted-foreground">Aucune compétence ajoutée.</p>}
              {form.skills.map((skill, i) => (
                <Card key={i} className="border-dashed">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium">Compétence {i + 1}</span>
                      <Button size="icon" variant="ghost" className="text-destructive h-7 w-7" onClick={() => set({ skills: form.skills.filter((_, j) => j !== i) })}><X className="w-4 h-4" /></Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div><Label>Nom</Label><Input value={skill.name} onChange={e => { const s = [...form.skills]; s[i] = { ...s[i], name: e.target.value }; set({ skills: s }); }} /></div>
                      <div>
                        <Label>Type</Label>
                        <Select value={skill.type} onValueChange={v => { const s = [...form.skills]; s[i] = { ...s[i], type: v }; set({ skills: s }); }}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {['Attack', 'Defense', 'Support', 'Passive', 'Ultimate'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div><Label>Description</Label><Textarea value={skill.description} onChange={e => { const s = [...form.skills]; s[i] = { ...s[i], description: e.target.value }; set({ skills: s }); }} rows={2} /></div>
                    <div className="flex items-center gap-3">
                      <Label className="w-16">Niveau</Label>
                      <Slider value={[skill.level]} onValueChange={v => { const s = [...form.skills]; s[i] = { ...s[i], level: v[0] }; set({ skills: s }); }} max={100} step={1} className="flex-1" />
                      <span className="text-sm w-10 text-right font-mono">{skill.level}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 6: Relationships */}
        <TabsContent value="relations">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Relations</CardTitle>
                <Button size="sm" variant="outline" onClick={() => set({ relationships: [...form.relationships, { name: '', type: '', description: '' }] })}>
                  <Plus className="w-4 h-4 mr-1" />Ajouter
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {form.relationships.length === 0 && <p className="text-sm text-muted-foreground">Aucune relation ajoutée.</p>}
              {form.relationships.map((rel, i) => (
                <Card key={i} className="border-dashed">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium">Relation {i + 1}</span>
                      <Button size="icon" variant="ghost" className="text-destructive h-7 w-7" onClick={() => set({ relationships: form.relationships.filter((_, j) => j !== i) })}><X className="w-4 h-4" /></Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div><Label>Personnage</Label><Input value={rel.name} onChange={e => { const r = [...form.relationships]; r[i] = { ...r[i], name: e.target.value }; set({ relationships: r }); }} /></div>
                      <div><Label>Type de relation</Label><Input value={rel.type} onChange={e => { const r = [...form.relationships]; r[i] = { ...r[i], type: e.target.value }; set({ relationships: r }); }} placeholder="Ex: Rival, Mentor, Ami" /></div>
                    </div>
                    <div><Label>Description</Label><Textarea value={rel.description} onChange={e => { const r = [...form.relationships]; r[i] = { ...r[i], description: e.target.value }; set({ relationships: r }); }} rows={2} /></div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 7: Equipment */}
        <TabsContent value="equipment">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Équipement</CardTitle>
                <Button size="sm" variant="outline" onClick={() => set({ equipment: [...form.equipment, { name: '', type: '', description: '', rarity: 'Common' }] })}>
                  <Plus className="w-4 h-4 mr-1" />Ajouter
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {form.equipment.length === 0 && <p className="text-sm text-muted-foreground">Aucun équipement ajouté.</p>}
              {form.equipment.map((eq, i) => (
                <Card key={i} className="border-dashed">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium">Équipement {i + 1}</span>
                      <Button size="icon" variant="ghost" className="text-destructive h-7 w-7" onClick={() => set({ equipment: form.equipment.filter((_, j) => j !== i) })}><X className="w-4 h-4" /></Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div><Label>Nom</Label><Input value={eq.name} onChange={e => { const eqs = [...form.equipment]; eqs[i] = { ...eqs[i], name: e.target.value }; set({ equipment: eqs }); }} /></div>
                      <div><Label>Type</Label><Input value={eq.type} onChange={e => { const eqs = [...form.equipment]; eqs[i] = { ...eqs[i], type: e.target.value }; set({ equipment: eqs }); }} placeholder="Ex: Arme, Protection" /></div>
                    </div>
                    <div><Label>Description</Label><Textarea value={eq.description} onChange={e => { const eqs = [...form.equipment]; eqs[i] = { ...eqs[i], description: e.target.value }; set({ equipment: eqs }); }} rows={2} /></div>
                    <div>
                      <Label>Rareté</Label>
                      <Select value={eq.rarity} onValueChange={v => { const eqs = [...form.equipment]; eqs[i] = { ...eqs[i], rarity: v }; set({ equipment: eqs }); }}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {['Common', 'Rare', 'Epic', 'Legendary', 'Mythic'].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 8: Achievements & Voice Actors */}
        <TabsContent value="extras">
          <Card>
            <CardHeader><CardTitle>Exploits & Doubleurs</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <TagInput label="Exploits / Accomplissements" tags={form.achievements} onChange={achievements => set({ achievements })} />
              <div className="space-y-4">
                <h4 className="text-sm font-semibold">Doubleur japonais</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Nom</Label><Input value={form.voiceActorJp} onChange={e => set({ voiceActorJp: e.target.value })} /></div>
                  <div><Label>Nom natif</Label><Input value={form.voiceActorJpNative} onChange={e => set({ voiceActorJpNative: e.target.value })} /></div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Doubleur anglais</h4>
                <div><Label>Nom</Label><Input value={form.voiceActorEn} onChange={e => set({ voiceActorEn: e.target.value })} /></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6 sticky bottom-4">
        <Button variant="outline" onClick={() => navigate('/admin/characters')}>
          <ArrowLeft className="w-4 h-4 mr-2" />Annuler
        </Button>
        <Button onClick={handleSubmit} className="flex-1 sm:flex-none">
          <Save className="w-4 h-4 mr-2" />{isEdit ? 'Modifier' : 'Ajouter'}
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AdminCharacterForm;
