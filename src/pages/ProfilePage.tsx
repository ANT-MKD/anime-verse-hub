import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Edit3, Save, Trophy, Heart, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserProfile, defaultAvatars } from '@/contexts/UserProfileContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import { animeData } from '@/data/animeData';

const ProfilePage = () => {
  const { profile, updateProfile } = useUserProfile();
  const { favorites } = useFavorites();
  const [isEditing, setIsEditing] = useState(false);
  const [pseudo, setPseudo] = useState(profile.pseudo);
  const [avatar, setAvatar] = useState(profile.avatar || defaultAvatars[0]);
  const [bio, setBio] = useState(profile.bio);

  // Get votes from localStorage
  const [votesCount, setVotesCount] = useState(0);
  
  // Get all characters for favorites display
  const allCharacters = animeData.flatMap(anime => 
    anime.characters.map(char => ({ ...char, animeId: anime.id }))
  );
  
  const favoriteCharacters = allCharacters.filter(char => favorites.includes(char.id));
  
  useEffect(() => {
    const stored = localStorage.getItem('anime-tier-votes');
    if (stored) {
      const votes = JSON.parse(stored);
      setVotesCount(Object.keys(votes).length);
    }
  }, []);

  useEffect(() => {
    setPseudo(profile.pseudo);
    setAvatar(profile.avatar || defaultAvatars[0]);
    setBio(profile.bio);
  }, [profile]);

  const handleSave = () => {
    updateProfile({ pseudo, avatar, bio });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPseudo(profile.pseudo);
    setAvatar(profile.avatar || defaultAvatars[0]);
    setBio(profile.bio);
    setIsEditing(false);
  };

  const stats = [
    { icon: Heart, label: 'Favoris', value: favorites.length, color: 'text-red-400' },
    { icon: Trophy, label: 'Votes', value: votesCount, color: 'text-yellow-400' },
    { icon: Star, label: 'Niveau', value: Math.floor((favorites.length + votesCount) / 5) + 1, color: 'text-primary' },
    { icon: Clock, label: 'Membre depuis', value: 'Récent', color: 'text-blue-400' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
              Mon Profil
            </h1>
            <p className="text-muted-foreground">
              Personnalise ton identité sur AnimeVerse
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Profile Card */}
            <Card className="md:col-span-2 glass-card border-glass-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 font-display">
                  <User className="h-5 w-5 text-primary" />
                  Informations
                </CardTitle>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      Annuler
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <>
                    {/* Avatar Selection */}
                    <div className="space-y-3">
                      <Label>Avatar</Label>
                      <div className="flex flex-wrap gap-2">
                        {defaultAvatars.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => setAvatar(emoji)}
                            className={cn(
                              'w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all',
                              'hover:bg-primary/20 border border-transparent',
                              avatar === emoji && 'border-primary bg-primary/20 glow-border'
                            )}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pseudo */}
                    <div className="space-y-2">
                      <Label htmlFor="pseudo">Pseudo</Label>
                      <Input
                        id="pseudo"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                        placeholder="Entre ton pseudo"
                        maxLength={30}
                        className="bg-card/50 border-glass-border"
                      />
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Parle-nous de toi, tes animes préférés..."
                        maxLength={200}
                        rows={4}
                        className="bg-card/50 border-glass-border resize-none"
                      />
                      <p className="text-xs text-muted-foreground text-right">
                        {bio.length}/200
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-start gap-6">
                    <div className="text-6xl">{profile.avatar || '👤'}</div>
                    <div className="flex-1">
                      <h2 className="font-display text-2xl text-primary mb-2">
                        {profile.pseudo || 'Pseudo non défini'}
                      </h2>
                      <p className="text-muted-foreground">
                        {profile.bio || 'Aucune bio définie. Clique sur modifier pour te présenter !'}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="glass-card border-glass-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display">
                  <Trophy className="h-5 w-5 text-primary" />
                  Statistiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-card/50"
                  >
                    <div className="flex items-center gap-3">
                      <stat.icon className={cn('h-5 w-5', stat.color)} />
                      <span className="text-sm">{stat.label}</span>
                    </div>
                    <span className="font-display font-bold">{stat.value}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Favorites Preview */}
          {favoriteCharacters.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card border-glass-border mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <Heart className="h-5 w-5 text-red-400" />
                    Mes Favoris ({favoriteCharacters.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {favoriteCharacters.slice(0, 10).map((char) => (
                      <span
                        key={char.id}
                        className="px-3 py-1.5 rounded-full bg-primary/20 text-sm font-medium"
                      >
                        {char.name}
                      </span>
                    ))}
                    {favoriteCharacters.length > 10 && (
                      <span className="px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground">
                        +{favoriteCharacters.length - 10} autres
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default ProfilePage;
