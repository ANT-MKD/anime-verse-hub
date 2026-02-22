import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdmin } from '@/contexts/AdminContext';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card>
    <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const Field = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;
  return <div><span className="text-xs text-muted-foreground">{label}</span><p className="text-sm font-medium">{value}</p></div>;
};

const AdminCharacterView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getCustomCharacters } = useAdmin();
  const char = getCustomCharacters().find((c: any) => c.id === id);

  if (!char) {
    return (
      <AdminLayout title="Personnage introuvable">
        <Button onClick={() => navigate('/admin/characters')}><ArrowLeft className="w-4 h-4 mr-2" />Retour</Button>
      </AdminLayout>
    );
  }

  const stats = [
    { label: 'Puissance', value: char.power ?? char.stats?.power ?? 0 },
    { label: 'Vitesse', value: char.speed ?? char.stats?.speed ?? 0 },
    { label: 'Technique', value: char.technique ?? char.stats?.technique ?? 0 },
    { label: 'Intelligence', value: char.intelligence ?? char.stats?.intelligence ?? 0 },
    { label: 'Endurance', value: char.stamina ?? char.stats?.stamina ?? 0 },
    { label: 'Agilité', value: char.agility ?? char.stats?.agility ?? 0 },
  ];

  return (
    <AdminLayout title={char.name}>
      <div className="flex gap-3 mb-6">
        <Button variant="outline" onClick={() => navigate('/admin/characters')}><ArrowLeft className="w-4 h-4 mr-2" />Retour</Button>
        <Button onClick={() => navigate(`/admin/characters/edit/${id}`)}><Edit className="w-4 h-4 mr-2" />Modifier</Button>
      </div>

      <div className="space-y-6">
        {/* Header */}
        <Card>
          <CardContent className="p-6 flex flex-col sm:flex-row gap-6">
            {char.image && <img src={char.image} alt={char.name} className="w-32 h-32 rounded-xl object-cover bg-muted" />}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{char.name}</h2>
              {char.nativeName && <p className="text-muted-foreground">{char.nativeName}</p>}
              <div className="flex flex-wrap gap-2">
                {char.title && <Badge>{char.title}</Badge>}
                {char.rank && <Badge variant="outline">{char.rank}</Badge>}
                {char.role && <Badge variant="secondary">{char.role}</Badge>}
              </div>
              {char.description && <p className="text-sm text-muted-foreground mt-2">{char.description}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Bio */}
        {(char.fullBio || char.backstory) && (
          <Section title="Biographie">
            <div className="space-y-4">
              {char.fullBio && <div><span className="text-xs text-muted-foreground">Biographie</span><p className="text-sm whitespace-pre-wrap">{char.fullBio}</p></div>}
              {char.backstory && <div><span className="text-xs text-muted-foreground">Histoire</span><p className="text-sm whitespace-pre-wrap">{char.backstory}</p></div>}
              {char.personality?.length > 0 && <div><span className="text-xs text-muted-foreground">Personnalité</span><div className="flex flex-wrap gap-1 mt-1">{char.personality.map((t: string, i: number) => <Badge key={i} variant="secondary">{t}</Badge>)}</div></div>}
              {char.weaknesses?.length > 0 && <div><span className="text-xs text-muted-foreground">Faiblesses</span><div className="flex flex-wrap gap-1 mt-1">{char.weaknesses.map((t: string, i: number) => <Badge key={i} variant="destructive">{t}</Badge>)}</div></div>}
              {char.quotes?.length > 0 && <div><span className="text-xs text-muted-foreground">Citations</span><ul className="list-disc list-inside mt-1 space-y-1">{char.quotes.map((q: string, i: number) => <li key={i} className="text-sm italic">{q}</li>)}</ul></div>}
            </div>
          </Section>
        )}

        {/* Status */}
        <Section title="Statut & Affiliation">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Field label="Âge" value={char.age || char.status?.age} />
            <Field label="Anniversaire" value={char.birthday || char.status?.birthday} />
            <Field label="Taille" value={char.height || char.status?.height} />
            <Field label="Poids" value={char.weight || char.status?.weight} />
            <Field label="Groupe sanguin" value={char.bloodType || char.status?.bloodType} />
            <Field label="Statut" value={char.vitalStatus || char.status?.status} />
            <Field label="Occupation" value={char.occupation || char.status?.occupation} />
            <Field label="Origine" value={char.origin || char.status?.origin} />
            <Field label="Équipe" value={char.team || char.affiliation?.team} />
            <Field label="Rôle" value={char.teamRole || char.affiliation?.role} />
          </div>
          {(char.allies?.length > 0 || char.affiliation?.allies?.length > 0) && (
            <div className="mt-4"><span className="text-xs text-muted-foreground">Alliés</span><div className="flex flex-wrap gap-1 mt-1">{(char.allies || char.affiliation?.allies || []).map((a: string, i: number) => <Badge key={i} variant="outline">{a}</Badge>)}</div></div>
          )}
        </Section>

        {/* Stats */}
        <Section title="Statistiques">
          <div className="space-y-3">
            {stats.map(s => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="text-sm w-28">{s.label}</span>
                <div className="flex-1 bg-secondary rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${s.value}%` }} />
                </div>
                <span className="text-sm w-10 text-right font-mono font-bold">{s.value}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Skills */}
        {char.skills?.length > 0 && (
          <Section title="Compétences">
            <div className="space-y-3">
              {char.skills.map((skill: any, i: number) => (
                <div key={i} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{skill.name}</span>
                    <Badge variant="outline">{skill.type}</Badge>
                  </div>
                  {skill.description && <p className="text-xs text-muted-foreground">{skill.description}</p>}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${skill.level}%` }} /></div>
                    <span className="text-xs font-mono">{skill.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Relationships */}
        {char.relationships?.length > 0 && (
          <Section title="Relations">
            <div className="space-y-2">
              {char.relationships.map((rel: any, i: number) => (
                <div key={i} className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{rel.name}</span>
                    <Badge variant="secondary">{rel.type}</Badge>
                  </div>
                  {rel.description && <p className="text-xs text-muted-foreground">{rel.description}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Equipment */}
        {char.equipment?.length > 0 && (
          <Section title="Équipement">
            <div className="space-y-2">
              {char.equipment.map((eq: any, i: number) => (
                <div key={i} className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{eq.name}</span>
                    <Badge variant="outline">{eq.rarity}</Badge>
                  </div>
                  {eq.type && <span className="text-xs text-muted-foreground">{eq.type}</span>}
                  {eq.description && <p className="text-xs text-muted-foreground mt-1">{eq.description}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Achievements & Voice */}
        {(char.achievements?.length > 0 || char.voiceActorJp || char.voiceActorEn) && (
          <Section title="Exploits & Doubleurs">
            <div className="space-y-4">
              {char.achievements?.length > 0 && <div><span className="text-xs text-muted-foreground">Exploits</span><div className="flex flex-wrap gap-1 mt-1">{char.achievements.map((a: string, i: number) => <Badge key={i}>{a}</Badge>)}</div></div>}
              {char.voiceActorJp && <Field label="Doubleur japonais" value={`${char.voiceActorJp}${char.voiceActorJpNative ? ` (${char.voiceActorJpNative})` : ''}`} />}
              {char.voiceActorEn && <Field label="Doubleur anglais" value={char.voiceActorEn} />}
            </div>
          </Section>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCharacterView;
