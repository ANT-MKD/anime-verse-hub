import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, Edit3, Save, Trophy, Heart, Star, Clock, 
  Gamepad2, Swords, ListOrdered, BookOpen, TrendingUp,
  Calendar, MapPin, Mail, Shield, Activity, Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserProfile, defaultAvatars } from '@/contexts/UserProfileContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import { animeData } from '@/data/animeData';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { profile, updateProfile, isProfileSet } = useUserProfile();
  const { favorites } = useFavorites();
  const [isEditing, setIsEditing] = useState(false);
  const [pseudo, setPseudo] = useState(profile.pseudo);
  const [avatar, setAvatar] = useState(profile.avatar || defaultAvatars[0]);
  const [bio, setBio] = useState(profile.bio);

  // Get stats from localStorage
  const [votesCount, setVotesCount] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [battlesCount, setBattlesCount] = useState(0);
  const [tierListViews, setTierListViews] = useState(0);
  const [memberSince, setMemberSince] = useState<string>('');
  
  // Get all characters for favorites display
  const allCharacters = animeData.flatMap(anime => 
    anime.characters.map(char => ({ ...char, animeId: anime.id, animeName: anime.title }))
  );
  
  const favoriteCharacters = allCharacters.filter(char => favorites.includes(char.id));
  
  // Calculate favorite animes based on favorite characters
  const favoriteAnimes = [...new Set(favoriteCharacters.map(char => char.animeName))];
  
  // Get top stats from favorite characters
  const getAverageStats = () => {
    if (favoriteCharacters.length === 0) return null;
    const totals = favoriteCharacters.reduce((acc, char) => ({
      power: acc.power + char.stats.power,
      speed: acc.speed + char.stats.speed,
      technique: acc.technique + char.stats.technique,
      intelligence: acc.intelligence + char.stats.intelligence,
    }), { power: 0, speed: 0, technique: 0, intelligence: 0 });
    
    const count = favoriteCharacters.length;
    return {
      power: Math.round(totals.power / count),
      speed: Math.round(totals.speed / count),
      technique: Math.round(totals.technique / count),
      intelligence: Math.round(totals.intelligence / count),
    };
  };
  
  const avgStats = getAverageStats();
  
  useEffect(() => {
    // Load votes
    const storedVotes = localStorage.getItem('anime-tier-votes');
    if (storedVotes) {
      const votes = JSON.parse(storedVotes);
      setVotesCount(Object.keys(votes).length);
    }
    
    // Load quiz score (simulated)
    const storedQuiz = localStorage.getItem('anime-quiz-score');
    if (storedQuiz) {
      setQuizScore(parseInt(storedQuiz));
    }
    
    // Load battles count (simulated)
    const storedBattles = localStorage.getItem('anime-battles-count');
    if (storedBattles) {
      setBattlesCount(parseInt(storedBattles));
    }
    
    // Load tier list views (simulated)
    const storedTierViews = localStorage.getItem('anime-tierlist-views');
    if (storedTierViews) {
      setTierListViews(parseInt(storedTierViews));
    }
    
    // Member since
    const storedDate = localStorage.getItem('anime-member-since');
    if (storedDate) {
      setMemberSince(storedDate);
    } else {
      const today = new Date().toLocaleDateString('fr-FR');
      localStorage.setItem('anime-member-since', today);
      setMemberSince(today);
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

  // Calculate level and XP
  const totalXP = (favorites.length * 10) + (votesCount * 5) + (quizScore * 2) + (battlesCount * 15);
  const level = Math.floor(totalXP / 100) + 1;
  const xpForNextLevel = (level * 100);
  const currentLevelXP = totalXP % 100;
  const xpProgress = (currentLevelXP / 100) * 100;

  // Badges/Achievements
  const badges = [
    { name: 'Débutant', icon: '🌟', unlocked: true, description: 'Bienvenue sur AnimeVerse!' },
    { name: 'Collectionneur', icon: '❤️', unlocked: favorites.length >= 5, description: '5+ favoris' },
    { name: 'Super Fan', icon: '💎', unlocked: favorites.length >= 15, description: '15+ favoris' },
    { name: 'Votant', icon: '🗳️', unlocked: votesCount >= 10, description: '10+ votes' },
    { name: 'Quizmaster', icon: '🧠', unlocked: quizScore >= 50, description: 'Score quiz 50+' },
    { name: 'Guerrier', icon: '⚔️', unlocked: battlesCount >= 5, description: '5+ batailles' },
    { name: 'Légende', icon: '👑', unlocked: level >= 10, description: 'Niveau 10+' },
    { name: 'Otaku', icon: '🎌', unlocked: favoriteAnimes.length >= 5, description: '5+ animes favoris' },
  ];

  const unlockedBadges = badges.filter(b => b.unlocked);

  const stats = [
    { icon: Heart, label: 'Favoris', value: favorites.length, color: 'text-red-400' },
    { icon: Trophy, label: 'Votes', value: votesCount, color: 'text-yellow-400' },
    { icon: Gamepad2, label: 'Quiz Score', value: quizScore, color: 'text-green-400' },
    { icon: Swords, label: 'Batailles', value: battlesCount, color: 'text-orange-400' },
    { icon: ListOrdered, label: 'Tier Views', value: tierListViews, color: 'text-purple-400' },
    { icon: BookOpen, label: 'Animes', value: favoriteAnimes.length, color: 'text-blue-400' },
  ];

  const activities = [
    { action: 'A ajouté un favori', time: 'Récemment', icon: Heart },
    { action: 'A voté dans la Tier List', time: 'Il y a 2h', icon: TrendingUp },
    { action: 'A joué au Quiz', time: 'Hier', icon: Gamepad2 },
    { action: 'A lancé une bataille', time: 'Il y a 3 jours', icon: Swords },
  ];

  if (!isProfileSet) {
    return (
      <div className="min-h-screen bg-background">
        <ParticleBackground />
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12 flex items-center justify-center">
          <Card className="glass-card border-glass-border max-w-md w-full">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">👤</div>
              <h2 className="font-display text-2xl mb-2">Aucun profil</h2>
              <p className="text-muted-foreground mb-6">
                Connecte-toi pour accéder à ton profil complet
              </p>
              <Button onClick={() => navigate('/auth')} className="w-full">
                Se connecter
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Profile Header */}
          <Card className="glass-card border-glass-border mb-6 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary/30 via-purple-500/30 to-pink-500/30" />
            <CardContent className="relative px-6 pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-16">
                <div className="relative">
                  <div className="text-7xl bg-card rounded-2xl p-4 border-4 border-background shadow-xl">
                    {profile.avatar || '👤'}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs font-bold">
                    Nv.{level}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="font-display text-3xl text-foreground">
                      {profile.pseudo}
                    </h1>
                    <Badge variant="outline" className="border-primary text-primary">
                      <Shield className="h-3 w-3 mr-1" />
                      Membre
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-1 max-w-xl">
                    {profile.bio || 'Aucune bio définie'}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Membre depuis {memberSince}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      {totalXP} XP total
                    </span>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              </div>
              
              {/* XP Progress */}
              <div className="mt-6 p-4 rounded-lg bg-card/50">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progression vers Niveau {level + 1}</span>
                  <span className="font-medium">{currentLevelXP}/{100} XP</span>
                </div>
                <Progress value={xpProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="glass-card border-glass-border">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="favorites">Favoris</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass-card border-glass-border hover:border-primary/50 transition-colors">
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className={cn('p-3 rounded-lg bg-card/80', stat.color)}>
                          <stat.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="font-display text-2xl">{stat.value}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Stats Radar (based on favorites) */}
              {avgStats && (
                <Card className="glass-card border-glass-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-display">
                      <Activity className="h-5 w-5 text-primary" />
                      Profil de tes Favoris
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(avgStats).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize text-muted-foreground">{key}</span>
                            <span className="font-medium">{value}</span>
                          </div>
                          <Progress value={value} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recent Activity */}
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <Clock className="h-5 w-5 text-primary" />
                    Activité Récente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-card/50">
                        <div className="p-2 rounded-lg bg-primary/20">
                          <activity.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites">
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <Heart className="h-5 w-5 text-red-400" />
                    Personnages Favoris ({favoriteCharacters.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {favoriteCharacters.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {favoriteCharacters.map((char) => (
                        <motion.div
                          key={char.id}
                          whileHover={{ scale: 1.02 }}
                          className="relative rounded-lg overflow-hidden bg-card/50 border border-glass-border cursor-pointer"
                          onClick={() => navigate(`/anime/${char.animeId}/character/${char.id}`)}
                        >
                          <img 
                            src={char.image} 
                            alt={char.name}
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <p className="font-medium text-white text-sm truncate">{char.name}</p>
                            <p className="text-xs text-white/70">{char.animeName}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Aucun favori pour le moment</p>
                      <Button variant="outline" className="mt-4" onClick={() => navigate('/characters')}>
                        Découvrir les personnages
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Favorite Animes */}
              {favoriteAnimes.length > 0 && (
                <Card className="glass-card border-glass-border mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-display">
                      <BookOpen className="h-5 w-5 text-blue-400" />
                      Animes Préférés ({favoriteAnimes.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {favoriteAnimes.map((anime) => (
                        <Badge key={anime} variant="secondary" className="text-sm px-3 py-1">
                          {anime}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Badges Tab */}
            <TabsContent value="badges">
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <Star className="h-5 w-5 text-yellow-400" />
                    Badges ({unlockedBadges.length}/{badges.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {badges.map((badge, index) => (
                      <motion.div
                        key={badge.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          'p-4 rounded-lg border text-center transition-all',
                          badge.unlocked 
                            ? 'bg-primary/10 border-primary/50' 
                            : 'bg-card/30 border-glass-border opacity-50'
                        )}
                      >
                        <div className="text-4xl mb-2">{badge.icon}</div>
                        <p className="font-medium text-sm">{badge.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                        {badge.unlocked && (
                          <Badge variant="outline" className="mt-2 text-xs border-green-500 text-green-500">
                            Débloqué
                          </Badge>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <User className="h-5 w-5 text-primary" />
                    Modifier le Profil
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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

                  <div className="flex gap-3">
                    <Button onClick={handleSave} className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Annuler
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default ProfilePage;
