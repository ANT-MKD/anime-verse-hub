import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Users, 
  Swords, 
  Heart, 
  Info, 
  Shield,
  UserCircle,
  Quote,
  Package,
  Trophy,
  AlertTriangle,
  BookOpen,
  Sparkles,
  Network
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import StatBar from '@/components/StatBar';
import SkillCard from '@/components/SkillCard';
import FavoriteButton from '@/components/FavoriteButton';
import SocialShare from '@/components/SocialShare';
import RelationshipGraph from '@/components/RelationshipGraph';
import VoiceActorInfo from '@/components/VoiceActorInfo';
import { getCharacterById, getAnimeById } from '@/data/animeData';

type Section = 'about' | 'affiliation' | 'status' | 'relationships' | 'skills' | 'equipment' | 'achievements' | 'graph';

const CharacterProfile = () => {
  const { animeId, characterId } = useParams<{ animeId: string; characterId: string }>();
  const [activeSection, setActiveSection] = useState<Section>('about');
  
  const anime = animeId ? getAnimeById(animeId) : undefined;
  const character = animeId && characterId ? getCharacterById(animeId, characterId) : undefined;

  // Voice actor data mapping
  const voiceActorData: Record<string, { jp: string; jpNative: string; en: string }> = {
    'hinata': { jp: 'Murase Ayumu', jpNative: '村瀬歩', en: 'Bryson Baugus' },
    'kageyama': { jp: 'Ishikawa Kaito', jpNative: '石川界人', en: 'Scott Gibbs' },
    'tsukishima': { jp: 'Uchiyama Kouki', jpNative: '内山昂輝', en: 'Micah Solusod' },
    'nishinoya': { jp: 'Okamoto Nobuhiko', jpNative: '岡本信彦', en: 'Greg Ayres' },
    'tanaka': { jp: 'Hayashi Yuu', jpNative: '林勇', en: 'Ian Sinclair' },
    'oikawa': { jp: 'Namikawa Daisuke', jpNative: '浪川大輔', en: 'Chris Patton' },
    'sung-jinwoo': { jp: 'Sakamaki Manabu', jpNative: '坂巻学', en: 'Aleks Le' },
    'cha-haein': { jp: 'Ueda Reina', jpNative: '上田麗奈', en: 'Anairis Quinones' },
    'beru': { jp: 'Shimono Hiro', jpNative: '下野紘', en: 'Howard Wang' },
    'jinho': { jp: 'Yamashita Seiichiro', jpNative: '山下誠一郎', en: 'Zeno Robinson' },
    'gojo': { jp: 'Nakamura Yuichi', jpNative: '中村悠一', en: 'Kaiji Tang' },
    'itadori': { jp: 'Enoki Junya', jpNative: '榎木淳弥', en: 'Adam McArthur' },
    'megumi': { jp: 'Uchida Yuuma', jpNative: '内田雄馬', en: 'Robbie Daymond' },
    'nobara': { jp: 'Seto Asami', jpNative: '瀬戸麻沙美', en: 'Anne Yatco' },
    'sukuna': { jp: 'Suwabe Junichi', jpNative: '諏訪部順一', en: 'Ray Chase' },
    'nanami': { jp: 'Tsuda Kenjiro', jpNative: '津田健次郎', en: 'David Vincent' },
    'tanjiro': { jp: 'Hanae Natsuki', jpNative: '花江夏樹', en: 'Zach Aguilar' },
    'nezuko': { jp: 'Kitou Akari', jpNative: '鬼頭明里', en: 'Abby Trott' },
    'zenitsu': { jp: 'Shimono Hiro', jpNative: '下野紘', en: 'Aleks Le' },
    'inosuke': { jp: 'Matsuoka Yoshitsugu', jpNative: '松岡禎丞', en: 'Bryce Papenbrook' },
    'rengoku': { jp: 'Hino Satoshi', jpNative: '日野聡', en: 'Mark Whitten' },
    'giyu': { jp: 'Sakurai Takahiro', jpNative: '櫻井孝宏', en: 'Johnny Yong Bosch' },
    'gon': { jp: 'Han Megumi', jpNative: '潘めぐみ', en: 'Erica Mendez' },
    'killua': { jp: 'Ise Mariya', jpNative: '伊瀬茉莉也', en: 'Cristina Vee' },
    'kurapika': { jp: 'Sawashiro Miyuki', jpNative: '沢城みゆき', en: 'Erika Harlacher' },
    'hisoka': { jp: 'Namikawa Daisuke', jpNative: '浪川大輔', en: 'Keith Silverstein' },
    'leorio': { jp: 'Fujiwara Keiji', jpNative: '藤原啓治', en: 'Matthew Mercer' },
    'naruto': { jp: 'Takeuchi Junko', jpNative: '竹内順子', en: 'Maile Flanagan' },
    'sasuke': { jp: 'Sugiyama Noriaki', jpNative: '杉山紀彰', en: 'Yuri Lowenthal' },
    'kakashi': { jp: 'Inoue Kazuhiko', jpNative: '井上和彦', en: 'Dave Wittenberg' },
    'itachi': { jp: 'Ishikawa Hideo', jpNative: '石川英郎', en: 'Crispin Freeman' },
    'deku': { jp: 'Yamashita Daiki', jpNative: '山下大輝', en: 'Justin Briner' },
    'bakugo': { jp: 'Okamoto Nobuhiko', jpNative: '岡本信彦', en: 'Clifford Chapin' },
    'todoroki': { jp: 'Kajiwara Gakuto', jpNative: '梶原岳人', en: 'David Matranga' },
    'all-might': { jp: 'Miyake Kenta', jpNative: '三宅健太', en: 'Christopher Sabat' },
    'uraraka': { jp: 'Sakura Ayane', jpNative: '佐倉綾音', en: 'Luci Christian' },
    'aizawa': { jp: 'Suwabe Junichi', jpNative: '諏訪部順一', en: 'Alex Organ' },
    'luffy': { jp: 'Tanaka Mayumi', jpNative: '田中真弓', en: 'Colleen Clinkenbeard' },
    'zoro': { jp: 'Nakai Kazuya', jpNative: '中井和哉', en: 'Christopher Sabat' },
    'sanji': { jp: 'Hirata Hiroaki', jpNative: '平田広明', en: 'Eric Vale' },
    'nami': { jp: 'Okamura Akemi', jpNative: '岡村明美', en: 'Luci Christian' },
    'robin': { jp: 'Yamaguchi Yuriko', jpNative: '山口由里子', en: 'Stephanie Young' },
    'eren': { jp: 'Kaji Yuki', jpNative: '梶裕貴', en: 'Bryce Papenbrook' },
    'levi': { jp: 'Kamiya Hiroshi', jpNative: '神谷浩史', en: 'Matthew Mercer' },
    'mikasa': { jp: 'Ishikawa Yui', jpNative: '石川由依', en: 'Trina Nishimura' },
    'armin': { jp: 'Inoue Marina', jpNative: '井上麻里奈', en: 'Josh Grelle' },
    'erwin': { jp: 'Ono Daisuke', jpNative: '小野大輔', en: 'J. Michael Tatum' },
    'goku': { jp: 'Nozawa Masako', jpNative: '野沢雅子', en: 'Sean Schemmel' },
    'vegeta': { jp: 'Horikawa Ryo', jpNative: '堀川りょう', en: 'Christopher Sabat' },
    'gohan': { jp: 'Nozawa Masako', jpNative: '野沢雅子', en: 'Kyle Hebert' },
    'piccolo': { jp: 'Furukawa Toshio', jpNative: '古川登志夫', en: 'Christopher Sabat' },
    'light': { jp: 'Miyano Mamoru', jpNative: '宮野真守', en: 'Brad Swaile' },
    'l-lawliet': { jp: 'Yamaguchi Kappei', jpNative: '山口勝平', en: 'Alessandro Juliani' },
    'misa': { jp: 'Hirano Aya', jpNative: '平野綾', en: 'Shannon Chan-Kent' },
    'ryuk': { jp: 'Nakamura Shido', jpNative: '中村獅童', en: 'Brian Drummond' },
    'ichigo': { jp: 'Morita Masakazu', jpNative: '森田成一', en: 'Johnny Yong Bosch' },
    'rukia': { jp: 'Orikasa Fumiko', jpNative: '折笠富美子', en: 'Michelle Ruff' },
    'aizen': { jp: 'Hayami Show', jpNative: '速水奨', en: 'Kyle Hebert' },
  };

  const getVoiceActor = (charId: string, lang: 'jp' | 'en') => {
    return voiceActorData[charId]?.[lang] || 'Non documenté';
  };

  const getVoiceActorNative = (charId: string) => {
    return voiceActorData[charId]?.jpNative;
  };

  if (!character || !anime) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Personnage non trouvé</h1>
          <Link to="/" className="text-primary hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const themeColors: Record<string, string> = {
    'theme-haikyuu': 'hsl(35, 100%, 50%)',
    'theme-solo-leveling': 'hsl(250, 100%, 65%)',
    'theme-hunter': 'hsl(145, 80%, 45%)',
    'theme-naruto': 'hsl(25, 100%, 50%)',
    'theme-demon-slayer': 'hsl(355, 90%, 55%)',
    'theme-jujutsu': 'hsl(280, 100%, 60%)',
    'theme-mha': 'hsl(140, 70%, 45%)',
    'theme-onepiece': 'hsl(45, 100%, 50%)',
    'theme-aot': 'hsl(0, 0%, 45%)',
    'theme-dragonball': 'hsl(35, 100%, 55%)',
    'theme-deathnote': 'hsl(0, 0%, 20%)',
    'theme-bleach': 'hsl(200, 100%, 50%)',
  };

  const sections: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: 'about', label: 'BIOGRAPHIE', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'affiliation', label: 'AFFILIATION', icon: <Users className="w-4 h-4" /> },
    { id: 'status', label: 'STATUS', icon: <UserCircle className="w-4 h-4" /> },
    { id: 'relationships', label: 'RELATIONS', icon: <Heart className="w-4 h-4" /> },
    { id: 'graph', label: 'GRAPHE', icon: <Network className="w-4 h-4" /> },
    { id: 'skills', label: 'COMPÉTENCES', icon: <Swords className="w-4 h-4" /> },
    { id: 'equipment', label: 'ÉQUIPEMENT', icon: <Package className="w-4 h-4" /> },
    { id: 'achievements', label: 'EXPLOITS', icon: <Trophy className="w-4 h-4" /> },
  ];

  const stats = [
    { label: 'Power', value: character.stats.power },
    { label: 'Speed', value: character.stats.speed },
    { label: 'Technique', value: character.stats.technique },
    { label: 'Intelligence', value: character.stats.intelligence },
    { label: 'Stamina', value: character.stats.stamina },
    { label: 'Agility', value: character.stats.agility },
  ];

  return (
    <div className={`min-h-screen bg-background ${anime.theme}`}>
      <ParticleBackground 
        particleCount={60} 
        color={themeColors[anime.theme] || 'hsl(35, 100%, 50%)'} 
      />
      <Navbar />

      <main className="relative pt-20 lg:pt-24 min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="py-6"
          >
            <Link
              to={`/anime/${animeId}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Retour aux personnages</span>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-12 pb-20">
            {/* Main Content */}
            <div className="order-2 lg:order-1">
              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col lg:flex-row gap-8 mb-12"
              >
                {/* Character Image */}
                <div className="relative w-full lg:w-80 shrink-0">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden glass-card glow-border">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                      <SocialShare 
                        url={window.location.href}
                        title={`Découvrez ${character.name} de ${anime.title}`}
                        description={character.description}
                      />
                      <FavoriteButton 
                        animeId={animeId!}
                        characterId={characterId!}
                        className="bg-background/80 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Rank Badge */}
                  {character.rank && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                      className="absolute -top-3 -left-3 flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30"
                    >
                      <Star className="w-4 h-4" />
                      {character.rank}
                    </motion.div>
                  )}
                </div>

                {/* Character Info */}
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Title */}
                    <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">
                      {character.title}
                    </p>

                    {/* Name */}
                    <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black mb-2 text-foreground leading-tight">
                      {character.name}
                    </h1>

                    {/* Native Name */}
                    {character.nativeName && (
                      <p className="text-xl text-muted-foreground mb-4 font-medium">
                        ({character.nativeName})
                      </p>
                    )}

                    {/* Role */}
                    <div className="flex items-center gap-2 mb-6">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{character.role}</span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {character.description}
                    </p>

                    {/* Stats */}
                    <div className="space-y-4">
                      <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider">
                        Statistiques
                      </h3>
                      <div className="grid gap-3">
                        {stats.map((stat, index) => (
                          <StatBar
                            key={stat.label}
                            label={stat.label}
                            value={stat.value}
                            delay={index * 0.1}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Content Sections */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-card rounded-2xl p-6 lg:p-8 backdrop-blur-xl"
                >
                  {activeSection === 'about' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="font-display text-xl font-bold gradient-text mb-4">Biographie</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {character.fullBio}
                        </p>
                      </div>

                      {character.backstory && (
                        <div>
                          <h4 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-primary" />
                            Histoire
                          </h4>
                          <p className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/30">
                            {character.backstory}
                          </p>
                        </div>
                      )}

                      {character.personality && character.personality.length > 0 && (
                        <div>
                          <h4 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary" />
                            Traits de Personnalité
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {character.personality.map((trait, index) => (
                              <motion.span
                                key={trait}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="px-3 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium"
                              >
                                {trait}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      )}

                      {character.weaknesses && character.weaknesses.length > 0 && (
                        <div>
                          <h4 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-destructive" />
                            Faiblesses
                          </h4>
                          <div className="grid gap-2">
                            {character.weaknesses.map((weakness, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-2 text-muted-foreground"
                              >
                                <span className="text-destructive mt-1">•</span>
                                {weakness}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {character.quotes.length > 0 && (
                        <div>
                          <h4 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <Quote className="w-5 h-5 text-primary" />
                            Citations Mémorables
                          </h4>
                          <div className="space-y-4">
                            {character.quotes.map((quote, index) => (
                              <motion.blockquote
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="pl-4 border-l-2 border-primary text-muted-foreground italic"
                              >
                                {quote}
                              </motion.blockquote>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeSection === 'affiliation' && (
                    <div className="space-y-6">
                      <h3 className="font-display text-xl font-bold gradient-text">Affiliation</h3>
                      <div className="grid gap-4">
                        <div className="glass p-4 rounded-xl">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Équipe / Organisation</p>
                          <p className="text-lg font-semibold text-foreground">{character.affiliation.team}</p>
                        </div>
                        <div className="glass p-4 rounded-xl">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Rôle</p>
                          <p className="text-lg font-semibold text-foreground">{character.affiliation.role}</p>
                        </div>
                        <div className="glass p-4 rounded-xl">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Alliés Principaux</p>
                          <div className="flex flex-wrap gap-2">
                            {character.affiliation.allies.map((ally) => (
                              <span
                                key={ally}
                                className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm"
                              >
                                {ally}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'status' && (
                    <div className="space-y-6">
                      <h3 className="font-display text-xl font-bold gradient-text">Status</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          { label: 'Statut', value: character.status.status },
                          { label: 'Âge', value: character.status.age },
                          { label: 'Anniversaire', value: character.status.birthday },
                          { label: 'Taille', value: character.status.height },
                          { label: 'Poids', value: character.status.weight },
                          { label: 'Groupe Sanguin', value: character.status.bloodType },
                        ].map((item) => (
                          <div key={item.label} className="glass p-4 rounded-xl">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                              {item.label}
                            </p>
                            <p className="text-lg font-semibold text-foreground">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSection === 'relationships' && (
                    <div className="space-y-6">
                      <h3 className="font-display text-xl font-bold gradient-text">Relations</h3>
                      <div className="grid gap-4">
                        {character.relationships.map((rel, index) => (
                          <motion.div
                            key={rel.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-4 rounded-xl flex items-center gap-4"
                          >
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                              <Heart className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{rel.name}</p>
                              <p className="text-sm text-muted-foreground">{rel.type}</p>
                              {rel.description && (
                                <p className="text-xs text-muted-foreground/70 mt-1">{rel.description}</p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSection === 'graph' && (
                    <RelationshipGraph 
                      character={character} 
                      animeId={animeId!} 
                      theme={anime.theme} 
                    />
                  )}

                  {activeSection === 'skills' && (
                    <div className="space-y-6">
                      <h3 className="font-display text-xl font-bold gradient-text">Compétences</h3>
                      <div className="grid gap-4">
                        {character.skills.map((skill, index) => (
                          <SkillCard key={skill.name} skill={skill} index={index} />
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSection === 'equipment' && (
                    <div className="space-y-6">
                      <h3 className="font-display text-xl font-bold gradient-text">Équipement & Arsenal</h3>
                      {character.equipment && character.equipment.length > 0 ? (
                        <div className="grid gap-4">
                          {character.equipment.map((item, index) => {
                            const rarityColors: Record<string, string> = {
                              'Common': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
                              'Rare': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                              'Epic': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
                              'Legendary': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
                              'Mythic': 'bg-red-500/20 text-red-400 border-red-500/30',
                            };
                            return (
                              <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass p-4 rounded-xl border border-border/50"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                      <Package className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-foreground">{item.name}</h4>
                                      <p className="text-xs text-muted-foreground">{item.type}</p>
                                    </div>
                                  </div>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${rarityColors[item.rarity]}`}>
                                    {item.rarity}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground pl-13">{item.description}</p>
                              </motion.div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Aucun équipement documenté pour ce personnage.</p>
                      )}
                    </div>
                  )}

                  {activeSection === 'achievements' && (
                    <div className="space-y-6">
                      <h3 className="font-display text-xl font-bold gradient-text">Exploits & Accomplissements</h3>
                      {character.achievements && character.achievements.length > 0 ? (
                        <div className="grid gap-3">
                          {character.achievements.map((achievement, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-3 glass p-3 rounded-xl"
                            >
                              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                                <Trophy className="w-4 h-4 text-yellow-500" />
                              </div>
                              <p className="text-foreground">{achievement}</p>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Aucun exploit documenté pour ce personnage.</p>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sidebar Navigation */}
            <div className="order-1 lg:order-2">
              <div className="lg:sticky lg:top-28">
                <motion.nav
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card rounded-2xl p-4 space-y-2"
                >
                  {sections.map((section) => (
                    <motion.button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium uppercase tracking-wider transition-all ${
                        activeSection === section.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {section.icon}
                      {section.label}
                      {activeSection === section.id && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-2 h-2 rounded-full bg-primary-foreground"
                        />
                      )}
                    </motion.button>
                  ))}
                </motion.nav>

                {/* Voice Actor Info */}
                <VoiceActorInfo 
                  japanese={{ 
                    name: getVoiceActor(character.id, 'jp'), 
                    nativeName: getVoiceActorNative(character.id) 
                  }}
                  english={{ name: getVoiceActor(character.id, 'en') }}
                />

                {/* Quick Stats Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="glass-card rounded-2xl p-4 mt-4"
                >
                  <h4 className="font-display text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
                    Anime
                  </h4>
                  <Link
                    to={`/anime/${animeId}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <img
                      src={anime.image}
                      alt={anime.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{anime.title}</p>
                      <p className="text-xs text-muted-foreground">{anime.characters.length} personnages</p>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CharacterProfile;
