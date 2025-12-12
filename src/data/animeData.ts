// Character images - Existing
import hinataImg from '@/assets/hinata.png';
import kageyamaImg from '@/assets/kageyama.png';
import sungJinwooImg from '@/assets/sung-jinwoo.png';
import chaHaeinImg from '@/assets/cha-haein.png';
import gojoImg from '@/assets/gojo.png';
import itadoriImg from '@/assets/itadori.png';
import gonImg from '@/assets/gon.png';
import killuaImg from '@/assets/killua.png';
import tanjiroImg from '@/assets/tanjiro.png';
import nezukoImg from '@/assets/nezuko.png';
import narutoImg from '@/assets/naruto.png';
import sasukeImg from '@/assets/sasuke.png';

// New character images
import dekuImg from '@/assets/deku.png';
import bakugoImg from '@/assets/bakugo.png';
import todorokiImg from '@/assets/todoroki.png';
import allMightImg from '@/assets/all-might.png';
import luffyImg from '@/assets/luffy.png';
import zoroImg from '@/assets/zoro.png';
import sanjiImg from '@/assets/sanji.png';
import erenImg from '@/assets/eren.png';
import leviImg from '@/assets/levi.png';
import mikasaImg from '@/assets/mikasa.png';
import gokuImg from '@/assets/goku.png';
import vegetaImg from '@/assets/vegeta.png';
import lightImg from '@/assets/light.png';
import lLawlietImg from '@/assets/l-lawliet.png';
import ichigoImg from '@/assets/ichigo.png';
import megumiImg from '@/assets/megumi.png';
import zenitsuImg from '@/assets/zenitsu.png';
import inosukeImg from '@/assets/inosuke.png';

// Additional character images (Wave 2)
import tsukishimaImg from '@/assets/tsukishima.png';
import nishinoyaImg from '@/assets/nishinoya.png';
import tanakaImg from '@/assets/tanaka.png';
import oikawaImg from '@/assets/oikawa.png';
import nobaraImg from '@/assets/nobara.png';
import sukunaImg from '@/assets/sukuna.png';
import nanamiImg from '@/assets/nanami.png';
import rengokuImg from '@/assets/rengoku.png';
import giyuImg from '@/assets/giyu.png';
import kurapikaImg from '@/assets/kurapika.png';
import hisokaImg from '@/assets/hisoka.png';
import leorioImg from '@/assets/leorio.png';
import kakashiImg from '@/assets/kakashi.png';
import itachiImg from '@/assets/itachi.png';
import urarakaImg from '@/assets/uraraka.png';
import aizawaImg from '@/assets/aizawa.png';
import namiImg from '@/assets/nami.png';
import robinImg from '@/assets/robin.png';
import arminImg from '@/assets/armin.png';
import erwinImg from '@/assets/erwin.png';
import gohanImg from '@/assets/gohan.png';
import piccoloImg from '@/assets/piccolo.png';
import misaImg from '@/assets/misa.png';
import ryukImg from '@/assets/ryuk.png';
import rukiaImg from '@/assets/rukia.png';
import aizenImg from '@/assets/aizen.png';
import beruImg from '@/assets/beru.png';
import jinhoImg from '@/assets/jinho.png';

// Banner images
import haikyuuBanner from '@/assets/haikyuu-banner.png';
import soloLevelingBanner from '@/assets/solo-leveling-banner.png';
import jujutsuBanner from '@/assets/jujutsu-banner.png';
import demonSlayerBanner from '@/assets/demon-slayer-banner.png';
import hunterBanner from '@/assets/hunter-banner.png';
import narutoBanner from '@/assets/naruto-banner.png';
import mhaBanner from '@/assets/mha-banner.png';
import onepieceBanner from '@/assets/onepiece-banner.png';
import aotBanner from '@/assets/aot-banner.png';
import dragonballBanner from '@/assets/dragonball-banner.png';
import deathnoteBanner from '@/assets/deathnote-banner.png';
import bleachBanner from '@/assets/bleach-banner.png';

export interface Skill {
  name: string;
  type: 'Attack' | 'Defense' | 'Support' | 'Passive' | 'Ultimate';
  description: string;
  level: number;
  icon?: string;
}

export interface Equipment {
  name: string;
  type: string;
  description: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
}

export interface Character {
  id: string;
  name: string;
  nativeName?: string;
  title: string;
  role: string;
  rank?: string;
  image: string;
  description: string;
  fullBio: string;
  backstory?: string;
  personality?: string[];
  stats: {
    power: number;
    speed: number;
    technique: number;
    intelligence: number;
    stamina: number;
    agility: number;
  };
  status: {
    age: string;
    birthday: string;
    height: string;
    weight: string;
    bloodType: string;
    status: 'Alive' | 'Deceased' | 'Unknown';
    occupation?: string;
    origin?: string;
  };
  affiliation: {
    team: string;
    role: string;
    allies: string[];
    previousAffiliations?: string[];
  };
  skills: Skill[];
  relationships: {
    name: string;
    type: string;
    description?: string;
  }[];
  quotes: string[];
  equipment?: Equipment[];
  abilities?: string[];
  achievements?: string[];
  weaknesses?: string[];
}

export interface Anime {
  id: string;
  title: string;
  titleJapanese?: string;
  description: string;
  fullDescription?: string;
  image: string;
  banner: string;
  theme: string;
  genre: string[];
  year: number;
  episodes: number;
  rating: number;
  studio?: string;
  status?: 'Ongoing' | 'Completed' | 'Hiatus';
  characters: Character[];
}

export const animeData: Anime[] = [
  {
    id: 'haikyuu',
    title: 'Haikyuu!!',
    titleJapanese: 'ハイキュー!!',
    description: 'Un lycéen passionné de volleyball rêve de devenir le meilleur joueur malgré sa petite taille.',
    fullDescription: 'Haikyuu!! raconte l\'histoire de Shoyo Hinata, un jeune passionné de volleyball qui, malgré sa petite taille, rêve de devenir comme son idole, le "Petit Géant". Au lycée Karasuno, il forme un duo improbable avec le prodige Kageyama pour mener leur équipe vers les championnats nationaux.',
    image: hinataImg,
    banner: haikyuuBanner,
    theme: 'theme-haikyuu',
    genre: ['Sports', 'Comédie', 'Drame'],
    year: 2014,
    episodes: 85,
    rating: 8.7,
    studio: 'Production I.G',
    status: 'Completed',
    characters: [
      {
        id: 'hinata',
        name: 'HINATA SHOUYOU',
        nativeName: '日向翔陽',
        title: 'The Little Giant',
        role: 'Wing Spiker',
        rank: 'ACE',
        image: hinataImg,
        description: 'Shoyo Hinata est le protagoniste principal de la série Haikyuu. Malgré sa petite taille, il compense par son incroyable capacité de saut et sa détermination sans faille.',
        fullBio: 'Hinata a été inspiré à jouer au volleyball après avoir vu un joueur de petite taille surnommé "Le Petit Géant" dominer lors d\'un match de lycée. Déterminé à prouver que la taille n\'est pas tout dans le volleyball, il s\'est entraîné sans relâche pour perfectionner ses compétences de saut et sa vitesse.',
        backstory: 'Né dans la préfecture de Miyagi, Hinata a découvert le volleyball en primaire en voyant un match à la télévision. Fasciné par le Petit Géant de Karasuno, il a fondé un club de volleyball improvisé avec ses amis et a passé des heures à s\'entraîner seul.',
        personality: ['Optimiste', 'Énergique', 'Déterminé', 'Compétitif', 'Naïf', 'Loyal'],
        stats: { power: 70, speed: 95, technique: 65, intelligence: 60, stamina: 90, agility: 98 },
        status: { age: '16', birthday: '21 Juin', height: '164.2 cm', weight: '51.9 kg', bloodType: 'A', status: 'Alive', occupation: 'Étudiant / Joueur de Volleyball', origin: 'Préfecture de Miyagi, Japon' },
        affiliation: { team: 'Karasuno High School', role: 'Middle Blocker / Wing Spiker', allies: ['Kageyama Tobio', 'Tsukishima Kei', 'Tanaka Ryunosuke', 'Nishinoya Yuu'] },
        skills: [
          { name: 'Super Quick Attack', type: 'Attack', description: 'Une attaque rapide synchronisée avec le passeur permettant de frapper avant que les bloqueurs ne réagissent.', level: 95 },
          { name: 'Broad Jump', type: 'Support', description: 'Capacité de saut horizontal exceptionnelle pour atteindre des positions optimales.', level: 90 },
          { name: 'Receives', type: 'Defense', description: 'Réception des attaques adverses avec précision croissante.', level: 70 },
          { name: 'Minus Tempo', type: 'Ultimate', description: 'Attaque à tempo négatif où Hinata saute avant la passe, créant une fenêtre impossible à bloquer.', level: 88 }
        ],
        relationships: [
          { name: 'Kageyama Tobio', type: 'Rival / Partenaire', description: 'Leur rivalité s\'est transformée en partenariat légendaire sur le terrain.' },
          { name: 'Nishinoya Yuu', type: 'Mentor', description: 'Nishinoya l\'a aidé à améliorer ses réceptions.' },
          { name: 'Kozume Kenma', type: 'Ami / Rival', description: 'Une amitié unique née de leur passion commune.' }
        ],
        quotes: [
          '"俺がいる!" (Ore ga iru! - Je suis là!)',
          '"お前がいる限り、お前は最強だ!" (Omae ga iru kagiri, omae wa saikyou da! - Aussi longtemps que je serai là, tu es invincible!)',
          '"ネットの向こう側、俺が征服してやる!" (Netto no mukougawa, ore ga seifuku shite yaru! - Le terrain de l\'autre côté du filet, je vais le conquérir!)'
        ],
        equipment: [
          { name: 'Chaussures de Volleyball Asics', type: 'Équipement', description: 'Chaussures légères optimisées pour les sauts.', rarity: 'Rare' },
          { name: 'Genouillères Karasuno', type: 'Protection', description: 'Protection standard de l\'équipe.', rarity: 'Common' }
        ],
        achievements: ['Victoire contre Shiratorizawa', 'Meilleur Duo avec Kageyama', 'Évolution vers joueur professionnel au Brésil'],
        weaknesses: ['Réceptions inconsistantes', 'Manque d\'expérience tactique', 'Tendance à la précipitation']
      },
      {
        id: 'kageyama',
        name: 'KAGEYAMA TOBIO',
        nativeName: '影山飛雄',
        title: 'King of the Court',
        role: 'Setter',
        rank: 'GENIUS',
        image: kageyamaImg,
        description: 'Kageyama Tobio est un passeur prodige avec une précision inégalée. Son talent naturel et son obsession pour la perfection font de lui un joueur exceptionnel.',
        fullBio: 'Surnommé le "Roi du Terrain" pour son attitude autoritaire au collège, Kageyama a dû apprendre à travailler en équipe à Karasuno. Son partenariat avec Hinata a créé l\'une des combinaisons d\'attaque les plus redoutables du volleyball lycéen.',
        backstory: 'Kageyama a commencé le volleyball très jeune, montrant des capacités exceptionnelles dès le début. Au collège Kitagawa Daiichi, son perfectionnisme extrême l\'a isolé de ses coéquipiers, lui valant le surnom de "Roi égocentrique".',
        personality: ['Perfectionniste', 'Compétitif', 'Direct', 'Socialement maladroit', 'Dévoué', 'Intense'],
        stats: { power: 80, speed: 85, technique: 98, intelligence: 85, stamina: 85, agility: 80 },
        status: { age: '16', birthday: '22 Décembre', height: '181.9 cm', weight: '66.3 kg', bloodType: 'A', status: 'Alive', occupation: 'Étudiant / Joueur de Volleyball', origin: 'Préfecture de Miyagi, Japon' },
        affiliation: { team: 'Karasuno High School', role: 'Passeur Titulaire', allies: ['Hinata Shouyou', 'Sugawara Koushi', 'Tanaka Ryunosuke'], previousAffiliations: ['Kitagawa Daiichi'] },
        skills: [
          { name: 'Pinpoint Toss', type: 'Support', description: 'Passes d\'une précision millimétrique.', level: 98 },
          { name: 'Quick Set', type: 'Support', description: 'Passe ultra-rapide synchronisée avec les attaquants.', level: 95 },
          { name: 'Power Serve', type: 'Attack', description: 'Service puissant capable de marquer des aces.', level: 88 },
          { name: 'Battle Sense', type: 'Passive', description: 'Capacité à analyser et exploiter les faiblesses adverses.', level: 90 }
        ],
        relationships: [
          { name: 'Hinata Shouyou', type: 'Partenaire / Rival', description: 'Le duo le plus redoutable de Karasuno.' },
          { name: 'Oikawa Tooru', type: 'Rival', description: 'Son senpai et rival principal.' },
          { name: 'Sugawara Koushi', type: 'Mentor', description: 'L\'a aidé à devenir un meilleur coéquipier.' }
        ],
        quotes: [
          '"俺がいる限り、お前は最強だ。" (Ore ga iru kagiri, omae wa saikyou da - Aussi longtemps que je suis là, tu es invincible.)',
          '"トスは、アタッカーのためにある。" (Tosu wa, atakkā no tame ni aru - Les passes existent pour les attaquants.)',
          '"俺はセッターだ。繋ぐのが仕事だ。" (Ore wa settā da. Tsunagu no ga shigoto da - Je suis un passeur. Mon travail est de connecter.)'
        ],
        achievements: ['Sélectionné pour le camp national des jeunes', 'Meilleur passeur du tournoi Spring', 'Joueur professionnel en Italie'],
        weaknesses: ['Communication interpersonnelle', 'Gestion de la frustration', 'Tendance à surcharger les coéquipiers']
      },
      {
        id: 'tsukishima',
        name: 'TSUKISHIMA KEI',
        nativeName: '月島蛍',
        title: 'The Intelligent Blocker',
        role: 'Middle Blocker',
        rank: 'ELITE',
        image: tsukishimaImg,
        description: 'Tsukishima est un bloqueur intelligent qui utilise son analyse tactique pour contrer les attaques adverses.',
        fullBio: 'Grand et sarcastique, Tsukishima est devenu l\'un des meilleurs bloqueurs du tournoi grâce à son intelligence et son timing impeccable. Son évolution mentale face à Ushijima a marqué un tournant dans sa carrière.',
        backstory: 'Frère cadet d\'Akiteru, Tsukishima a perdu sa passion pour le volleyball après avoir découvert que son frère lui avait menti sur son statut de titulaire. Cette trahison l\'a rendu cynique envers le sport.',
        personality: ['Sarcastique', 'Intelligent', 'Froid', 'Analytique', 'Provocateur', 'Loyal (malgré tout)'],
        stats: { power: 65, speed: 70, technique: 85, intelligence: 95, stamina: 70, agility: 75 },
        status: { age: '16', birthday: '27 Septembre', height: '190.1 cm', weight: '68.4 kg', bloodType: 'A', status: 'Alive', occupation: 'Étudiant / Joueur de Volleyball', origin: 'Préfecture de Miyagi, Japon' },
        affiliation: { team: 'Karasuno High School', role: 'Middle Blocker', allies: ['Yamaguchi Tadashi', 'Kageyama Tobio', 'Hinata Shouyou'] },
        skills: [
          { name: 'Read Block', type: 'Defense', description: 'Analyse et anticipation des attaques pour un blocage parfait.', level: 92 },
          { name: 'Time Differential Attack', type: 'Attack', description: 'Attaque synchronisée avec retard.', level: 78 },
          { name: 'Serve Receive', type: 'Defense', description: 'Réceptions améliorées.', level: 70 }
        ],
        relationships: [
          { name: 'Yamaguchi Tadashi', type: 'Meilleur Ami', description: 'Ami d\'enfance et confident.' },
          { name: 'Hinata Shouyou', type: 'Coéquipier', description: 'Relation conflictuelle mais respectueuse.' },
          { name: 'Akiteru Tsukishima', type: 'Frère', description: 'Relation compliquée en reconstruction.' }
        ],
        quotes: [
          '"部活の何が楽しいの?" (Bukatsu no nani ga tanoshii no? - Qu\'est-ce qui est amusant dans un club?)',
          '"たかが部活だろ。" (Takaga bukatsu daro - C\'est juste un club.)',
          '"一瞬の栄光?" (Isshun no eikou? - Un moment de gloire?)'
        ],
        achievements: ['MVP du match contre Shiratorizawa', 'Blocage décisif contre Ushijima', 'Évolution mentale remarquable'],
        weaknesses: ['Manque de passion initiale', 'Provocations excessives', 'Endurance limitée']
      },
      {
        id: 'nishinoya',
        name: 'NISHINOYA YUU',
        nativeName: '西谷夕',
        title: 'Guardian Deity',
        role: 'Libero',
        rank: 'GUARDIAN',
        image: nishinoyaImg,
        description: 'Nishinoya est le libero de Karasuno, surnommé le "Dieu Gardien" pour ses réceptions spectaculaires.',
        fullBio: 'Malgré sa petite taille, Nishinoya est l\'un des meilleurs liberos du pays. Son énergie explosive et ses réflexes extraordinaires font de lui le mur défensif de Karasuno.',
        backstory: 'Nishinoya a choisi le poste de libero car il était fasciné par la position qui ne nécessite pas de grande taille. Il a perfectionné ses techniques jusqu\'à devenir légendaire dans la préfecture.',
        personality: ['Énergique', 'Courageux', 'Loyal', 'Passionné', 'Impulsif', 'Protecteur'],
        stats: { power: 55, speed: 92, technique: 95, intelligence: 75, stamina: 88, agility: 98 },
        status: { age: '17', birthday: '10 Octobre', height: '159.3 cm', weight: '51.1 kg', bloodType: 'B', status: 'Alive', occupation: 'Étudiant / Libero', origin: 'Préfecture de Miyagi, Japon' },
        affiliation: { team: 'Karasuno High School', role: 'Libero', allies: ['Tanaka Ryunosuke', 'Hinata Shouyou', 'Asahi Azumane'] },
        skills: [
          { name: 'Rolling Thunder', type: 'Defense', description: 'Technique de réception signature avec roulade.', level: 95 },
          { name: 'Libero Set', type: 'Support', description: 'Passes de secours depuis la position de libero.', level: 82 },
          { name: 'Receives', type: 'Defense', description: 'Réceptions de niveau national.', level: 96 }
        ],
        relationships: [
          { name: 'Tanaka Ryunosuke', type: 'Meilleur Ami', description: 'Duo énergique inséparable.' },
          { name: 'Asahi Azumane', type: 'Partenaire', description: 'Son ace qu\'il a convaincu de revenir.' },
          { name: 'Kiyoko Shimizu', type: 'Amour', description: 'Admiration profonde pour la manager.' }
        ],
        quotes: [
          '"ローリングサンダー!" (Rōringu Sandā! - Rolling Thunder!)',
          '"俺がみんなを守る!" (Ore ga minna wo mamoru! - Je vous couvre tous!)',
          '"リベロは最後の砦だ!" (Riberō wa saigo no toride da! - Le libero est le dernier rempart!)'
        ],
        achievements: ['Meilleur libero de la préfecture', 'Réceptions légendaires contre Shiratorizawa', 'Inspiration pour Hinata'],
        weaknesses: ['Petite taille', 'Impulsivité', 'Ne peut pas attaquer']
      },
      {
        id: 'tanaka',
        name: 'TANAKA RYUNOSUKE',
        nativeName: '田中龍之介',
        title: 'The Spirit',
        role: 'Wing Spiker',
        rank: 'ACE POTENTIAL',
        image: tanakaImg,
        description: 'Tanaka est le cœur battant de Karasuno, un attaquant fiable avec un mental d\'acier.',
        fullBio: 'Wing spiker dévoué, Tanaka est connu pour son énergie débordante et sa capacité à marquer dans les moments critiques. Son mental inébranlable en fait un pilier de l\'équipe.',
        personality: ['Énergique', 'Loyal', 'Protecteur', 'Bruyant', 'Courageux', 'Fiable'],
        stats: { power: 82, speed: 78, technique: 75, intelligence: 70, stamina: 85, agility: 76 },
        status: { age: '17', birthday: '3 Mars', height: '177.2 cm', weight: '68.8 kg', bloodType: 'B', status: 'Alive', occupation: 'Étudiant / Wing Spiker', origin: 'Préfecture de Miyagi, Japon' },
        affiliation: { team: 'Karasuno High School', role: 'Wing Spiker', allies: ['Nishinoya Yuu', 'Hinata Shouyou', 'Kageyama Tobio'] },
        skills: [
          { name: 'Cross Spike', type: 'Attack', description: 'Attaque croisée puissante.', level: 82 },
          { name: 'Mental Fortitude', type: 'Passive', description: 'Résistance mentale exceptionnelle sous pression.', level: 90 },
          { name: 'Straight Spike', type: 'Attack', description: 'Attaque en ligne droite.', level: 80 }
        ],
        relationships: [
          { name: 'Nishinoya Yuu', type: 'Meilleur Ami', description: 'Partenaire d\'énergie.' },
          { name: 'Saeko Tanaka', type: 'Sœur', description: 'Supportrice bruyante.' },
          { name: 'Kiyoko Shimizu', type: 'Amour', description: 'Admiration partagée.' }
        ],
        quotes: ['"Bring it on!"', '"Je suis là pour vous!"', '"Karasuno ne tombe jamais!"'],
        achievements: ['Point décisif contre Aoba Johsai', 'Capitaine potentiel', 'Mariage avec Kiyoko'],
        weaknesses: ['Émotivité', 'Technique perfectible', 'Intimidation facile à contrer']
      },
      {
        id: 'oikawa',
        name: 'OIKAWA TOORU',
        nativeName: '及川徹',
        title: 'The Great King',
        role: 'Setter',
        rank: 'GENIUS',
        image: oikawaImg,
        description: 'Oikawa est le capitaine d\'Aoba Johsai, un passeur de génie qui tire le maximum de chaque coéquipier.',
        fullBio: 'Surnommé le "Grand Roi", Oikawa est considéré comme l\'un des meilleurs passeurs du pays. Sa capacité à analyser ses adversaires et à maximiser le potentiel de son équipe est légendaire.',
        backstory: 'Rival de Kageyama depuis le collège, Oikawa a développé un complexe d\'infériorité face au talent naturel de son kouhai. Il a compensé par un travail acharné et une intelligence tactique supérieure.',
        personality: ['Charismatique', 'Travailleur', 'Obsessionnel', 'Charmeur', 'Compétitif', 'Manipulateur'],
        stats: { power: 75, speed: 82, technique: 96, intelligence: 95, stamina: 80, agility: 82 },
        status: { age: '18', birthday: '20 Juillet', height: '184.3 cm', weight: '72.2 kg', bloodType: 'B', status: 'Alive', occupation: 'Joueur Professionnel', origin: 'Préfecture de Miyagi, Japon' },
        affiliation: { team: 'Aoba Johsai (Ancien)', role: 'Capitaine / Passeur', allies: ['Iwaizumi Hajime', 'Hanamaki Takahiro'], previousAffiliations: ['Kitagawa Daiichi'] },
        skills: [
          { name: 'Killer Serve', type: 'Attack', description: 'Service dévastateur visant les zones faibles.', level: 95 },
          { name: 'Perfect Set', type: 'Support', description: 'Passes adaptées à chaque attaquant.', level: 96 },
          { name: 'Game Reading', type: 'Passive', description: 'Analyse en temps réel des stratégies adverses.', level: 94 }
        ],
        relationships: [
          { name: 'Iwaizumi Hajime', type: 'Meilleur Ami', description: 'Partenaire de toujours.' },
          { name: 'Kageyama Tobio', type: 'Rival', description: 'Complexe d\'infériorité envers son génie.' },
          { name: 'Ushijima Wakatoshi', type: 'Rival', description: 'Le joueur qu\'il n\'a jamais pu battre au lycée.' }
        ],
        quotes: ['"Si tu vas te comparer aux autres, compare-toi à quelqu\'un de mieux que toi."', '"Le talent est quelque chose que tu fais fleurir."', '"Je ne peux pas le supporter, ce génie naturel."'],
        achievements: ['Meilleur passeur du tournoi Inter-High', 'Joueur professionnel en Argentine', 'Capitaine légendaire'],
        weaknesses: ['Obsession envers les génies', 'Blessure au genou', 'Pression auto-imposée']
      }
    ]
  },
  {
    id: 'solo-leveling',
    title: 'Solo Leveling',
    titleJapanese: '나 혼자만 레벨업',
    description: 'Dans un monde où des portails vers des donjons sont apparus, un chasseur de rang E découvre un système unique.',
    fullDescription: 'Solo Leveling suit Sung Jin-Woo, considéré comme le chasseur le plus faible de Corée du Sud. Après avoir survécu à un donjon mortel, il découvre un système mystérieux qui lui permet de monter de niveau sans limite, le transformant en le chasseur le plus puissant du monde.',
    image: sungJinwooImg,
    banner: soloLevelingBanner,
    theme: 'theme-solo-leveling',
    genre: ['Action', 'Fantasy', 'Aventure'],
    year: 2024,
    episodes: 12,
    rating: 8.9,
    studio: 'A-1 Pictures',
    status: 'Ongoing',
    characters: [
      {
        id: 'sung-jinwoo',
        name: 'SUNG JIN WOO',
        nativeName: '성진우',
        title: 'Shadow Monarch',
        role: 'S-Rank Hunter',
        rank: 'S RANK',
        image: sungJinwooImg,
        description: 'Sung Jin-Woo, anciennement le chasseur le plus faible, est devenu le Monarque des Ombres grâce au Système mystérieux.',
        fullBio: 'Jin-Woo était un chasseur de rang E qui survivait à peine dans les donjons de bas niveau. Après avoir survécu au Double Donjon et reçu le "Système", il a commencé son ascension pour devenir le chasseur le plus puissant de l\'humanité.',
        backstory: 'Fils d\'un chasseur disparu et d\'une mère malade, Jin-Woo est devenu chasseur pour payer les frais médicaux de sa famille. Malgré sa faiblesse, il persévérait dans les donjons les plus dangereux pour survivre.',
        personality: ['Déterminé', 'Protecteur', 'Stratégique', 'Silencieux', 'Impitoyable envers les ennemis', 'Humble'],
        stats: { power: 100, speed: 98, technique: 95, intelligence: 92, stamina: 100, agility: 97 },
        status: { age: '24', birthday: 'Inconnu', height: '179 cm', weight: '72 kg', bloodType: 'AB', status: 'Alive', occupation: 'Guild Master / Chasseur National', origin: 'Corée du Sud' },
        affiliation: { team: 'Ahjin Guild', role: 'Guild Master / Chasseur National', allies: ['Cha Hae-In', 'Go Gun-Hee', 'Yoo Jin-Ho', 'Beru', 'Igris'] },
        skills: [
          { name: 'Shadow Extraction', type: 'Ultimate', description: 'Extraire les ombres des ennemis vaincus pour les transformer en soldats loyaux.', level: 100 },
          { name: 'Ruler\'s Authority', type: 'Attack', description: 'Manipulation télékinétique des objets avec une force immense.', level: 95 },
          { name: 'Domain of the Monarch', type: 'Passive', description: 'Augmente drastiquement toutes les capacités dans un territoire défini.', level: 98 },
          { name: 'Shadow Exchange', type: 'Support', description: 'Téléportation instantanée vers n\'importe quelle ombre invoquée.', level: 92 },
          { name: 'Dragon\'s Fear', type: 'Passive', description: 'Aura intimidante paralysant les ennemis faibles.', level: 90 }
        ],
        relationships: [
          { name: 'Cha Hae-In', type: 'Intérêt Romantique', description: 'La seule personne dont l\'odeur lui est agréable.' },
          { name: 'Sung Jin-Ah', type: 'Sœur', description: 'Sa motivation principale pour devenir plus fort.' },
          { name: 'Yoo Jin-Ho', type: 'Vice-Maître / Ami', description: 'Son loyal compagnon et vice-maître de guilde.' },
          { name: 'Beru', type: 'Shadow Soldier', description: 'Son ombre la plus puissante et dévouée.' }
        ],
        quotes: [
          '"일어나라." (Ireonara - Arise.)',
          '"나만 레벨업 한다." (Naman lebeleob handa - Je suis le seul à monter de niveau.)',
          '"힘이 전부다." (Himi jeonbuda - La force est tout ce qui compte.)'
        ],
        equipment: [
          { name: 'Épée du Démon', type: 'Arme', description: 'Épée légendaire obtenue dans un donjon de rang S.', rarity: 'Legendary' },
          { name: 'Armure du Shadow Monarch', type: 'Armure', description: 'Armure manifestée par le pouvoir des ombres.', rarity: 'Mythic' }
        ],
        achievements: ['Vainqueur du Double Donjon', 'Défaite des Monarques', 'Sauveur de l\'humanité'],
        weaknesses: ['Isolement social', 'Surprotection de sa famille', 'Difficulté à faire confiance']
      },
      {
        id: 'cha-haein',
        name: 'CHA HAE-IN',
        nativeName: '차해인',
        title: 'The Dancer',
        role: 'S-Rank Hunter',
        rank: 'S RANK',
        image: chaHaeinImg,
        description: 'Cha Hae-In est la Vice-Maître de la Guilde des Chasseurs et l\'une des femmes chasseuses les plus puissantes.',
        fullBio: 'Cha Hae-In possède la capacité unique de sentir l\'odeur du mana, ce qui lui cause habituellement de l\'inconfort autour des autres chasseurs. Jin-Woo est le seul dont l\'odeur lui est agréable.',
        backstory: 'Issue d\'une famille ordinaire, Hae-In a éveillé ses pouvoirs lors d\'un incident tragique. Sa sensibilité au mana, bien que puissante, l\'a toujours isolée des autres chasseurs.',
        personality: ['Réservée', 'Élégante', 'Déterminée', 'Professionnelle', 'Romantique cachée', 'Loyale'],
        stats: { power: 88, speed: 94, technique: 96, intelligence: 85, stamina: 82, agility: 95 },
        status: { age: '22', birthday: 'Inconnu', height: '168 cm', weight: '52 kg', bloodType: 'O', status: 'Alive', occupation: 'Vice-Guild Master / Chasseuse', origin: 'Corée du Sud' },
        affiliation: { team: 'Hunters Guild', role: 'Vice-Guild Master', allies: ['Sung Jin-Woo', 'Baek Yoon-Ho', 'Choi Jong-In'] },
        skills: [
          { name: 'Sword Dance', type: 'Attack', description: 'Style d\'épée élégant combinant vitesse et précision.', level: 94 },
          { name: 'Mana Detection', type: 'Passive', description: 'Capacité à percevoir le mana par l\'odorat.', level: 88 },
          { name: 'Quick Slash', type: 'Attack', description: 'Attaque rapide tranchant plusieurs ennemis.', level: 90 },
          { name: 'Holy Sword', type: 'Ultimate', description: 'Technique secrète concentrant tout son mana dans une frappe.', level: 92 }
        ],
        relationships: [
          { name: 'Sung Jin-Woo', type: 'Intérêt Romantique', description: 'Attirée par son odeur unique et sa force.' },
          { name: 'Baek Yoon-Ho', type: 'Collègue', description: 'Respecte sa force et son leadership.' }
        ],
        quotes: ['"Son odeur... elle est différente."', '"Je veux combattre à ses côtés."', '"La force n\'est pas tout."'],
        equipment: [
          { name: 'Épée de Lumière', type: 'Arme', description: 'Épée bénie par un artefact ancien.', rarity: 'Legendary' }
        ],
        achievements: ['Rang S le plus jeune de Corée', 'Vice-Maître de la guilde n°1', '100+ donjons de rang A nettoyés']
      },
      {
        id: 'beru',
        name: 'BERU',
        nativeName: '베루',
        title: 'Ant King Shadow',
        role: 'Shadow Soldier',
        rank: 'MARSHAL GRADE',
        image: beruImg,
        description: 'Beru est l\'ombre la plus puissante de Sung Jin-Woo, anciennement le Roi des Fourmis.',
        fullBio: 'Autrefois le redoutable Roi des Fourmis, Beru a été extrait par Jin-Woo après un combat épique. Il est devenu son soldat le plus dévoué, possédant une force colossale et une loyauté absolue.',
        personality: ['Dévoué', 'Puissant', 'Respectueux', 'Protecteur', 'Féroce au combat'],
        stats: { power: 95, speed: 92, technique: 88, intelligence: 80, stamina: 95, agility: 90 },
        status: { age: 'Inconnu', birthday: 'Inconnu', height: '200+ cm', weight: 'Inconnu', bloodType: 'Aucun', status: 'Alive', occupation: 'Shadow Soldier', origin: 'Île de Jeju' },
        affiliation: { team: 'Shadow Army', role: 'Marshal', allies: ['Sung Jin-Woo', 'Igris', 'Tank'] },
        skills: [
          { name: 'Regeneration', type: 'Passive', description: 'Régénération rapide en tant qu\'ombre.', level: 95 },
          { name: 'Ant King\'s Claws', type: 'Attack', description: 'Griffes dévastatrices capables de trancher l\'acier.', level: 92 },
          { name: 'Flight', type: 'Support', description: 'Capacité de vol grâce à ses ailes.', level: 88 }
        ],
        relationships: [
          { name: 'Sung Jin-Woo', type: 'Maître', description: 'Loyauté absolue envers son roi.' },
          { name: 'Igris', type: 'Camarade', description: 'Respect mutuel entre soldats d\'élite.' }
        ],
        quotes: ['"Mon Roi!"', '"Je protégerai mon maître!"', '"Personne ne touchera à Sa Majesté!"'],
        achievements: ['Ancien Roi des Fourmis', 'Marshal de l\'Armée des Ombres', 'Défenseur principal de Jin-Woo'],
        weaknesses: ['Dépendance à son maître', 'Contrôle émotionnel', 'Taille imposante peu discrète']
      },
      {
        id: 'jinho',
        name: 'YOO JIN-HO',
        nativeName: '유진호',
        title: 'Vice Guild Master',
        role: 'D-Rank Hunter',
        rank: 'VICE MASTER',
        image: jinhoImg,
        description: 'Jin-Ho est le vice-maître loyal de la guilde Ahjin et le meilleur ami de Sung Jin-Woo.',
        fullBio: 'Fils d\'un riche homme d\'affaires, Jin-Ho a rencontré Jin-Woo lors d\'un raid et est devenu son allié le plus fidèle. Malgré son rang faible, sa loyauté et son dévouement sont inégalés.',
        personality: ['Loyal', 'Honnête', 'Enthousiaste', 'Courageux', 'Dévoué', 'Humble'],
        stats: { power: 30, speed: 40, technique: 45, intelligence: 75, stamina: 50, agility: 45 },
        status: { age: '22', birthday: 'Inconnu', height: '175 cm', weight: '65 kg', bloodType: 'A', status: 'Alive', occupation: 'Vice-Guild Master', origin: 'Corée du Sud' },
        affiliation: { team: 'Ahjin Guild', role: 'Vice-Guild Master', allies: ['Sung Jin-Woo', 'Yoo Myung-Han'] },
        skills: [
          { name: 'Business Acumen', type: 'Passive', description: 'Gestion efficace des affaires de la guilde.', level: 85 },
          { name: 'Loyalty', type: 'Passive', description: 'Dévouement absolu envers Jin-Woo.', level: 100 }
        ],
        relationships: [
          { name: 'Sung Jin-Woo', type: 'Hyung-nim', description: 'Le considère comme un grand frère.' },
          { name: 'Yoo Myung-Han', type: 'Père', description: 'Relation complexe avec son père millionnaire.' }
        ],
        quotes: ['"Hyung-nim!"', '"Je suivrai Jin-Woo hyung partout!"', '"La guilde Ahjin est la meilleure!"'],
        achievements: ['Co-fondateur de la guilde Ahjin', 'Survie à de nombreux raids dangereux', 'Gestion parfaite de la guilde'],
        weaknesses: ['Rang de chasseur faible', 'Trop dévoué', 'Manque de puissance de combat']
      }
    ]
  },
  {
    id: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    titleJapanese: '呪術廻戦',
    description: 'Un lycéen ordinaire avale un doigt maudit et se retrouve plongé dans le monde des exorcistes.',
    fullDescription: 'Jujutsu Kaisen suit Yuji Itadori, un lycéen aux capacités physiques exceptionnelles qui, après avoir avalé un doigt du Roi des Malédictions Sukuna, se retrouve embarqué dans le monde dangereux de l\'exorcisme.',
    image: gojoImg,
    banner: jujutsuBanner,
    theme: 'theme-jujutsu',
    genre: ['Action', 'Surnaturel', 'École'],
    year: 2020,
    episodes: 48,
    rating: 8.8,
    studio: 'MAPPA',
    status: 'Ongoing',
    characters: [
      {
        id: 'gojo-satoru',
        name: 'GOJO SATORU',
        nativeName: '五条悟',
        title: 'The Strongest',
        role: 'Special Grade Sorcerer',
        rank: 'SPECIAL GRADE',
        image: gojoImg,
        description: 'Gojo Satoru est considéré comme le sorcier le plus puissant du monde moderne.',
        fullBio: 'Né dans le clan Gojo, Satoru est le premier en 400 ans à hériter à la fois des Six Eyes et de la technique Limitless. Cette combinaison fait de lui le sorcier le plus puissant existant.',
        backstory: 'Né comme le sorcier le plus puissant de sa génération, Gojo a bouleversé l\'équilibre du monde de l\'exorcisme dès sa naissance. Son meilleur ami Geto est devenu son plus grand ennemi, une tragédie qui a façonné sa vision du monde.',
        personality: ['Confiant', 'Décontracté', 'Stratégique', 'Protecteur', 'Provocateur', 'Charismatique'],
        stats: { power: 100, speed: 95, technique: 100, intelligence: 98, stamina: 95, agility: 92 },
        status: { age: '28', birthday: '7 Décembre', height: '190 cm', weight: 'Inconnu', bloodType: 'Inconnu', status: 'Alive', occupation: 'Professeur / Sorcier Grade Spécial', origin: 'Japon' },
        affiliation: { team: 'Tokyo Jujutsu High', role: 'Professeur / Sorcier Grade Spécial', allies: ['Yuji Itadori', 'Megumi Fushiguro', 'Nobara Kugisaki', 'Nanami Kento'] },
        skills: [
          { name: 'Infinity', type: 'Defense', description: 'Barrière invisible ralentissant tout jusqu\'à l\'arrêt.', level: 100 },
          { name: 'Hollow Purple', type: 'Ultimate', description: 'Combinaison de Blue et Red créant une sphère d\'annihilation.', level: 98 },
          { name: 'Domain Expansion: Unlimited Void', type: 'Ultimate', description: 'Domaine surchargeant l\'esprit avec des informations infinies.', level: 100 },
          { name: 'Six Eyes', type: 'Passive', description: 'Perception parfaite du mana et utilisation optimale des techniques.', level: 100 },
          { name: 'Red', type: 'Attack', description: 'Force répulsive explosive.', level: 95 },
          { name: 'Blue', type: 'Attack', description: 'Force attractive concentrée.', level: 95 }
        ],
        relationships: [
          { name: 'Yuji Itadori', type: 'Étudiant', description: 'Le voit comme l\'espoir de la nouvelle génération.' },
          { name: 'Megumi Fushiguro', type: 'Étudiant Préféré', description: 'Reconnaît son potentiel immense.' },
          { name: 'Geto Suguru', type: 'Ancien Meilleur Ami', description: 'Leur amitié brisée le hante encore.' }
        ],
        quotes: [
          '"僕は最強だから。" (Boku wa saikyou dakara - Je suis le plus fort.)',
          '"大丈夫。僕、最強だから。" (Daijoubu. Boku, saikyou dakara - Ne t\'inquiète pas. Je suis le plus fort, après tout.)',
          '"弱い。" (Yowai - Tu es faible.)'
        ],
        achievements: ['Seul détenteur des Six Eyes et Limitless', 'Défaite de Toji Fushiguro', 'Mentor de la nouvelle génération'],
        weaknesses: ['Arrogance', 'Impossible à sceller normalement', 'Attachement émotionnel aux étudiants']
      },
      {
        id: 'itadori-yuji',
        name: 'ITADORI YUJI',
        nativeName: '虎杖悠仁',
        title: 'Sukuna\'s Vessel',
        role: 'Grade 1 Sorcerer',
        rank: 'GRADE 1',
        image: itadoriImg,
        description: 'Yuji Itadori est un lycéen devenu le réceptacle de Sukuna, le Roi des Malédictions.',
        fullBio: 'Après avoir avalé un doigt de Sukuna pour sauver ses amis, Yuji a été condamné à mort par le monde de l\'exorcisme. Gojo lui a offert un sursis : collecter tous les doigts avant son exécution.',
        backstory: 'Élevé par son grand-père, Yuji a toujours eu des capacités physiques extraordinaires. La mort de son grand-père et sa rencontre avec un doigt de Sukuna ont changé sa vie à jamais.',
        personality: ['Altruiste', 'Courageux', 'Empathique', 'Déterminé', 'Optimiste', 'Protecteur'],
        stats: { power: 90, speed: 88, technique: 75, intelligence: 70, stamina: 92, agility: 85 },
        status: { age: '15', birthday: '20 Mars', height: '173 cm', weight: '80 kg', bloodType: 'B', status: 'Alive', occupation: 'Étudiant Première Année', origin: 'Sendai, Japon' },
        affiliation: { team: 'Tokyo Jujutsu High', role: 'Étudiant Première Année', allies: ['Gojo Satoru', 'Megumi Fushiguro', 'Nobara Kugisaki', 'Todo Aoi'] },
        skills: [
          { name: 'Divergent Fist', type: 'Attack', description: 'Coup créant un second impact d\'énergie.', level: 80 },
          { name: 'Black Flash', type: 'Attack', description: 'Distorsion spatiale amplifiant la puissance.', level: 85 },
          { name: 'Superhuman Physique', type: 'Passive', description: 'Force et vitesse supérieures à la normale.', level: 90 },
          { name: 'Cursed Energy Control', type: 'Support', description: 'Contrôle croissant de l\'énergie maudite.', level: 75 }
        ],
        relationships: [
          { name: 'Megumi Fushiguro', type: 'Meilleur Ami', description: 'Premier véritable ami au lycée.' },
          { name: 'Nobara Kugisaki', type: 'Amie / Camarade', description: 'Relation de camaraderie et respect mutuel.' },
          { name: 'Sukuna', type: 'Malédiction Intérieure', description: 'Cohabitation forcée et dangereuse.' },
          { name: 'Todo Aoi', type: 'Meilleur Ami (selon Todo)', description: 'Lien unique forgé au combat.' }
        ],
        quotes: ['"Je vais donner une mort digne à ceux que je ne peux pas sauver."', '"Je suis Itadori Yuji!"', '"Je ne veux pas mourir sans avoir accompli quelque chose."'],
        achievements: ['Survie à Shibuya', 'Maîtrise du Black Flash', 'Contrôle partiel de Sukuna'],
        weaknesses: ['Manque de technique innée', 'Sukuna peut prendre le contrôle', 'Trop empathique']
      },
      {
        id: 'megumi-fushiguro',
        name: 'FUSHIGURO MEGUMI',
        nativeName: '伏黒恵',
        title: 'Ten Shadows User',
        role: 'Grade 2 Sorcerer',
        rank: 'GRADE 2',
        image: megumiImg,
        description: 'Megumi Fushiguro est un utilisateur des Dix Ombres, l\'une des techniques les plus puissantes du monde jujutsu.',
        fullBio: 'Héritier de la technique des Dix Ombres du clan Zenin, Megumi a été repéré par Gojo qui l\'a protégé de son clan. Stoïque et réservé, il cache une détermination farouche à protéger ceux qu\'il juge dignes.',
        backstory: 'Fils de Toji Fushiguro, l\'homme qui a failli tuer Gojo, Megumi a hérité de la technique maudite de sa mère. Gojo l\'a sauvé de la cupidité du clan Zenin.',
        personality: ['Stoïque', 'Analytique', 'Protecteur', 'Réservé', 'Déterminé', 'Moral'],
        stats: { power: 78, speed: 82, technique: 88, intelligence: 90, stamina: 75, agility: 84 },
        status: { age: '15', birthday: '22 Décembre', height: '175 cm', weight: '60 kg', bloodType: 'O', status: 'Alive', occupation: 'Étudiant Première Année', origin: 'Japon' },
        affiliation: { team: 'Tokyo Jujutsu High', role: 'Étudiant Première Année', allies: ['Yuji Itadori', 'Nobara Kugisaki', 'Gojo Satoru'] },
        skills: [
          { name: 'Ten Shadows Technique', type: 'Support', description: 'Invocation de shikigami à partir des ombres.', level: 85 },
          { name: 'Divine Dog', type: 'Attack', description: 'Shikigami de base pour l\'attaque et la traque.', level: 80 },
          { name: 'Nue', type: 'Attack', description: 'Shikigami volant avec des attaques électriques.', level: 78 },
          { name: 'Domain Expansion: Chimera Shadow Garden', type: 'Ultimate', description: 'Domaine où toutes les surfaces deviennent des ombres.', level: 75 }
        ],
        relationships: [
          { name: 'Yuji Itadori', type: 'Meilleur Ami', description: 'Première personne à vraiment le comprendre.' },
          { name: 'Gojo Satoru', type: 'Mentor', description: 'L\'a sauvé du clan Zenin.' },
          { name: 'Tsumiki Fushiguro', type: 'Demi-Sœur', description: 'Sa principale motivation pour vivre.' }
        ],
        quotes: [
          '"俺は自分勝手に人を救う。" (Ore wa jibunkatte ni hito wo sukuu - Je vais sauver les gens de manière égoïste.)',
          '"正しくない人を助けたら許さない。" (Tadashikunai hito wo tasuketara yurusanai - Je ne me pardonne pas de sauver les mauvaises personnes.)'
        ],
        achievements: ['Maîtrise de la technique des Dix Ombres', 'Survie à Shibuya', 'Invocation de Mahoraga (partielle)'],
        weaknesses: ['Réserve de mana limitée', 'Émotionnellement distant', 'Tendance à se sacrifier']
      },
      {
        id: 'nobara',
        name: 'KUGISAKI NOBARA',
        nativeName: '釘崎野薔薇',
        title: 'The Hammer Witch',
        role: 'Grade 3 Sorcerer',
        rank: 'GRADE 3',
        image: nobaraImg,
        description: 'Nobara Kugisaki est une exorciste déterminée utilisant des clous et un marteau comme armes.',
        fullBio: 'Venue de la campagne à Tokyo pour devenir exorciste, Nobara combine confiance en soi et technique unique. Sa technique de Paille lui permet d\'infliger des dégâts à distance.',
        personality: ['Confiante', 'Directe', 'Fashionista', 'Loyale', 'Courageuse', 'Fière'],
        stats: { power: 75, speed: 78, technique: 85, intelligence: 80, stamina: 72, agility: 76 },
        status: { age: '16', birthday: '7 Août', height: '160 cm', weight: 'Inconnu', bloodType: 'O', status: 'Unknown', occupation: 'Étudiante Première Année', origin: 'Campagne japonaise' },
        affiliation: { team: 'Tokyo Jujutsu High', role: 'Étudiante Première Année', allies: ['Yuji Itadori', 'Megumi Fushiguro', 'Maki Zenin'] },
        skills: [
          { name: 'Straw Doll Technique', type: 'Attack', description: 'Technique utilisant des poupées de paille pour des attaques à distance.', level: 85 },
          { name: 'Hairpin', type: 'Attack', description: 'Fait exploser les clous dans l\'ennemi.', level: 80 },
          { name: 'Resonance', type: 'Attack', description: 'Connecte une cible à une poupée pour infliger des dégâts.', level: 82 }
        ],
        relationships: [
          { name: 'Yuji Itadori', type: 'Ami proche', description: 'Partenaire de combat de confiance.' },
          { name: 'Megumi Fushiguro', type: 'Ami', description: 'Respect mutuel.' },
          { name: 'Maki Zenin', type: 'Modèle', description: 'Admire sa force.' }
        ],
        quotes: [
          '"私を誰だと思ってるの!" (Watashi wo dare da to omotteru no! - Tu me prends pour qui!)',
          '"田舎に帰れ!" (Inaka ni kaere! - Retourne à la campagne!)',
          '"可愛くなきゃ意味ない!" (Kawaikunakya imi nai! - Si ce n\'est pas mignon, ça n\'a pas de sens!)'
        ],
        achievements: ['Défaite de malédictions de haut niveau', 'Survie à Shibuya', 'Maîtrise de la Résonance'],
        weaknesses: ['Impulsive', 'Portée limitée', 'Consommation d\'énergie élevée']
      },
      {
        id: 'sukuna',
        name: 'RYOMEN SUKUNA',
        nativeName: '両面宿儺',
        title: 'King of Curses',
        role: 'Special Grade Curse',
        rank: 'SPECIAL GRADE',
        image: sukunaImg,
        description: 'Sukuna est le Roi des Malédictions, l\'être maudit le plus puissant ayant jamais existé.',
        fullBio: 'Il y a mille ans, Sukuna était un sorcier humain d\'une puissance inégalée. Après sa mort, son pouvoir était si grand qu\'il ne pouvait être détruit. Ses 20 doigts, contenant son essence, ont survécu aux siècles.',
        personality: ['Sadique', 'Arrogant', 'Intelligent', 'Cruel', 'Raffiné', 'Impitoyable'],
        stats: { power: 100, speed: 98, technique: 100, intelligence: 95, stamina: 100, agility: 96 },
        status: { age: '1000+', birthday: 'Inconnu', height: 'Variable', weight: 'Variable', bloodType: 'Inconnu', status: 'Alive', occupation: 'Roi des Malédictions', origin: 'Ère Heian, Japon' },
        affiliation: { team: 'Aucune', role: 'Roi des Malédictions', allies: ['Aucun'] },
        skills: [
          { name: 'Cleave', type: 'Attack', description: 'Tranche s\'adaptant à la résistance de la cible.', level: 100 },
          { name: 'Dismantle', type: 'Attack', description: 'Coupe par défaut pour les objets inanimés.', level: 100 },
          { name: 'Malevolent Shrine', type: 'Ultimate', description: 'Domaine attaquant tout dans un rayon de 200m.', level: 100 },
          { name: 'Reverse Cursed Technique', type: 'Support', description: 'Régénération instantanée des blessures.', level: 98 }
        ],
        relationships: [
          { name: 'Yuji Itadori', type: 'Hôte', description: 'Le considère comme un divertissement.' },
          { name: 'Megumi Fushiguro', type: 'Intérêt', description: 'Fasciné par sa technique.' }
        ],
        quotes: [
          '"お前は退屈だ。" (Omae wa taikutsu da - Tu es ennuyeux.)',
          '"俺様を楽しませろ。" (Ore-sama wo tanoshimasero - Amuse-moi.)',
          '"これが呪いの王だ。" (Kore ga noroi no ou da - C\'est ça, le Roi des Malédictions.)'
        ],
        achievements: ['Roi des Malédictions incontesté', 'Survie pendant 1000 ans', 'Domaine parfait'],
        weaknesses: ['Emprisonné dans le corps de Yuji', 'Arrogance extrême', 'Incapacité à utiliser sa pleine puissance']
      },
      {
        id: 'nanami',
        name: 'NANAMI KENTO',
        nativeName: '七海建人',
        title: 'The Overtime Hater',
        role: 'Grade 1 Sorcerer',
        rank: 'GRADE 1',
        image: nanamiImg,
        description: 'Nanami est un sorcier de grade 1 et ancien salaryman qui déteste les heures supplémentaires.',
        fullBio: 'Après avoir quitté le monde de l\'exorcisme pour devenir salaryman, Nanami est revenu réalisant que les deux mondes étaient aussi absurdes. Son approche méthodique et sa technique Ratio font de lui un combattant redoutable.',
        personality: ['Pragmatique', 'Sérieux', 'Protecteur', 'Cynique', 'Professionnel', 'Mentor'],
        stats: { power: 85, speed: 82, technique: 92, intelligence: 90, stamina: 78, agility: 80 },
        status: { age: '28', birthday: '3 Juillet', height: '184 cm', weight: 'Inconnu', bloodType: 'B', status: 'Deceased', occupation: 'Sorcier Grade 1', origin: 'Japon' },
        affiliation: { team: 'Tokyo Jujutsu High', role: 'Sorcier Grade 1', allies: ['Gojo Satoru', 'Yuji Itadori', 'Haibara Yu'] },
        skills: [
          { name: 'Ratio Technique', type: 'Attack', description: 'Crée un point faible obligatoire sur la cible.', level: 90 },
          { name: 'Overtime', type: 'Passive', description: 'Augmente la puissance après les heures de travail.', level: 85 },
          { name: 'Binding Vow', type: 'Support', description: 'Contrat augmentant temporairement la puissance.', level: 82 }
        ],
        relationships: [
          { name: 'Yuji Itadori', type: 'Protégé', description: 'Le guide comme un mentor.' },
          { name: 'Gojo Satoru', type: 'Collègue', description: 'Respect mutuel malgré leurs différences.' },
          { name: 'Haibara Yu', type: 'Ancien Partenaire (Décédé)', description: 'Sa mort l\'a poussé à quitter.' }
        ],
        quotes: [
          '"残業は嫌いだ。" (Zangyou wa kirai da - Je déteste les heures supplémentaires.)',
          '"子供に大人の責任を負わせるな。" (Kodomo ni otona no sekinin wo owaseru na - Ne mettez pas les responsabilités d\'adultes sur les épaules des enfants.)',
          '"仕事だから。" (Shigoto dakara - C\'est le travail.)'
        ],
        achievements: ['Mentor de Yuji', 'Défaite de Mahito (temporaire)', 'Maîtrise du Ratio Technique'],
        weaknesses: ['Manque de technique défensive', 'Cynisme', 'Pas de technique de domaine']
      }
    ]
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer',
    titleJapanese: '鬼滅の刃',
    description: 'Un jeune garçon devient pourfendeur de démons pour sauver sa sœur transformée en démon.',
    fullDescription: 'Demon Slayer suit Tanjiro Kamado dont la famille a été massacrée par des démons. Sa sœur Nezuko, seule survivante, a été transformée en démon. Tanjiro rejoint le Corps des Pourfendeurs pour trouver un remède et venger sa famille.',
    image: tanjiroImg,
    banner: demonSlayerBanner,
    theme: 'theme-demon-slayer',
    genre: ['Action', 'Surnaturel', 'Historique'],
    year: 2019,
    episodes: 55,
    rating: 8.9,
    studio: 'Ufotable',
    status: 'Ongoing',
    characters: [
      {
        id: 'tanjiro',
        name: 'KAMADO TANJIRO',
        nativeName: '竈門炭治郎',
        title: 'The Demon Slayer',
        role: 'Demon Slayer Corps',
        rank: 'HASHIRA LEVEL',
        image: tanjiroImg,
        description: 'Tanjiro Kamado est un pourfendeur de démons dont la famille a été massacrée par Muzan Kibutsuji.',
        fullBio: 'Après le massacre de sa famille, Tanjiro s\'est entraîné pendant deux ans sous la tutelle de Sakonji Urokodaki. Sa gentillesse exceptionnelle fait de lui un personnage unique.',
        backstory: 'Aîné d\'une famille de charbonniers, Tanjiro vivait paisiblement dans les montagnes. Un jour, en rentrant de vendre du charbon, il découvrit sa famille massacrée et sa sœur transformée en démon.',
        personality: ['Gentil', 'Déterminé', 'Empathique', 'Courageux', 'Têtu', 'Optimiste'],
        stats: { power: 85, speed: 88, technique: 92, intelligence: 80, stamina: 90, agility: 86 },
        status: { age: '15', birthday: '14 Juillet', height: '165 cm', weight: '61 kg', bloodType: 'Inconnu', status: 'Alive', occupation: 'Pourfendeur de Démons', origin: 'Montagnes de la préfecture de Tokyo' },
        affiliation: { team: 'Demon Slayer Corps', role: 'Pourfendeur / Rang Hinoe', allies: ['Nezuko Kamado', 'Zenitsu Agatsuma', 'Inosuke Hashibira', 'Giyu Tomioka'] },
        skills: [
          { name: 'Water Breathing', type: 'Attack', description: 'Style de respiration imitant la fluidité de l\'eau.', level: 90 },
          { name: 'Sun Breathing', type: 'Ultimate', description: 'La première et plus puissante forme de respiration.', level: 85 },
          { name: 'Enhanced Smell', type: 'Passive', description: 'Odorat surdéveloppé détectant les démons et émotions.', level: 95 },
          { name: 'Hinokami Kagura', type: 'Ultimate', description: 'Danse rituelle transmise par sa famille, base du Sun Breathing.', level: 88 }
        ],
        relationships: [
          { name: 'Nezuko Kamado', type: 'Sœur', description: 'Sa raison de vivre et de combattre.' },
          { name: 'Zenitsu Agatsuma', type: 'Ami / Camarade', description: 'Compagnon loyal malgré sa lâcheté apparente.' },
          { name: 'Inosuke Hashibira', type: 'Rival / Ami', description: 'Rival devenu ami proche.' },
          { name: 'Giyu Tomioka', type: 'Mentor', description: 'Premier Hashira à croire en lui.' }
        ],
        quotes: ['"Je suis Tanjiro Kamado du Corps des Pourfendeurs de Démons!"', '"Je ne te laisserai jamais faire du mal à qui que ce soit!"', '"Même les démons étaient autrefois humains."'],
        equipment: [
          { name: 'Épée Nichirin Noire', type: 'Arme', description: 'Épée unique qui change de couleur selon l\'utilisateur.', rarity: 'Legendary' },
          { name: 'Boucles d\'oreilles Hanafuda', type: 'Accessoire', description: 'Héritage familial lié au Sun Breathing.', rarity: 'Mythic' }
        ],
        achievements: ['Défaite de plusieurs Lunes Supérieures', 'Maîtrise du Sun Breathing', 'Protection de Nezuko jusqu\'à sa guérison'],
        weaknesses: ['Trop empathique', 'Manque d\'expérience', 'Physique humain limitant']
      },
      {
        id: 'nezuko',
        name: 'KAMADO NEZUKO',
        nativeName: '竈門禰豆子',
        title: 'The Demon Girl',
        role: 'Demon',
        rank: 'UNIQUE',
        image: nezukoImg,
        description: 'Nezuko Kamado est la sœur de Tanjiro, transformée en démon mais conservant son humanité.',
        fullBio: 'Transformée en démon par Muzan lors du massacre de sa famille, Nezuko a réussi à conserver son humanité grâce à son lien avec son frère. Elle refuse de consommer des humains.',
        personality: ['Protectrice', 'Douce', 'Féroce en combat', 'Loyale', 'Silencieuse'],
        stats: { power: 88, speed: 90, technique: 70, intelligence: 60, stamina: 95, agility: 92 },
        status: { age: '14', birthday: '28 Décembre', height: '153 cm', weight: '45 kg', bloodType: 'Inconnu', status: 'Alive', occupation: 'Démon (Allié des humains)', origin: 'Montagnes de la préfecture de Tokyo' },
        affiliation: { team: 'Demon Slayer Corps (Allié)', role: 'Démon Protecteur', allies: ['Tanjiro Kamado', 'Zenitsu Agatsuma', 'Inosuke Hashibira'] },
        skills: [
          { name: 'Blood Demon Art: Exploding Blood', type: 'Attack', description: 'Enflamme son sang pour créer des explosions roses.', level: 88 },
          { name: 'Size Manipulation', type: 'Support', description: 'Peut modifier sa taille à volonté.', level: 85 },
          { name: 'Regeneration', type: 'Passive', description: 'Capacité de régénération rapide.', level: 90 },
          { name: 'Sunlight Resistance', type: 'Passive', description: 'Unique parmi les démons, elle peut résister au soleil.', level: 100 }
        ],
        relationships: [
          { name: 'Tanjiro Kamado', type: 'Frère', description: 'Son ancre à l\'humanité.' },
          { name: 'Zenitsu Agatsuma', type: 'Admirateur', description: 'Zenitsu est follement amoureux d\'elle.' }
        ],
        quotes: ['*Grognement protecteur*', '*Hochement de tête déterminé*'],
        achievements: ['Résistance au soleil', 'Contrôle de ses instincts démoniaques', 'Victoire contre plusieurs démons'],
        weaknesses: ['Communication limitée', 'Sommeil prolongé nécessaire', 'Instincts démoniaques']
      },
      {
        id: 'zenitsu',
        name: 'AGATSUMA ZENITSU',
        nativeName: '我妻善逸',
        title: 'Thunder Breather',
        role: 'Demon Slayer',
        rank: 'HASHIRA POTENTIAL',
        image: zenitsuImg,
        description: 'Zenitsu est un pourfendeur de démons extrêmement peureux mais incroyablement puissant quand il est inconscient.',
        fullBio: 'Zenitsu Agatsuma est un paradoxe vivant : éveillé, il est lâche et pleurnicheur, mais endormi ou inconscient, il devient un épéiste de génie utilisant la Respiration du Tonnerre.',
        personality: ['Peureux', 'Loyal', 'Amoureux', 'Bruyant', 'Courageux malgré lui', 'Dévoué'],
        stats: { power: 75, speed: 98, technique: 90, intelligence: 65, stamina: 70, agility: 95 },
        status: { age: '16', birthday: '3 Septembre', height: '164.5 cm', weight: '58 kg', bloodType: 'A', status: 'Alive', occupation: 'Pourfendeur de Démons', origin: 'Japon' },
        affiliation: { team: 'Demon Slayer Corps', role: 'Pourfendeur', allies: ['Tanjiro Kamado', 'Nezuko Kamado', 'Inosuke Hashibira'] },
        skills: [
          { name: 'Thunder Breathing: First Form', type: 'Ultimate', description: 'Thunderclap and Flash - Vitesse de l\'éclair concentrée.', level: 95 },
          { name: 'Godspeed', type: 'Attack', description: 'Version améliorée du Thunderclap.', level: 90 },
          { name: 'Enhanced Hearing', type: 'Passive', description: 'Ouïe exceptionnelle détectant les démons.', level: 88 },
          { name: 'Sleep Fighting', type: 'Passive', description: 'Combat inconsciemment avec une efficacité maximale.', level: 92 }
        ],
        relationships: [
          { name: 'Nezuko Kamado', type: 'Amour', description: 'Complètement dévoué à elle.' },
          { name: 'Tanjiro Kamado', type: 'Ami', description: 'Respecte profondément sa gentillesse.' },
          { name: 'Inosuke Hashibira', type: 'Rival / Ami', description: 'Relation conflictuelle mais amicale.' },
          { name: 'Jigoro Kuwajima', type: 'Maître', description: 'Ancien Hashira qui l\'a formé.' }
        ],
        quotes: ['"Je vais mourir, je vais mourir!"', '"Nezuko-chan est ma raison de vivre!"', '"Je ne connais qu\'une seule technique, mais je l\'ai perfectionnée."'],
        achievements: ['Maîtrise d\'une seule forme à la perfection', 'Défaite d\'une Lune Supérieure (en équipe)', 'Développement du Godspeed'],
        weaknesses: ['Lâcheté extrême éveillé', 'Ne connaît qu\'une forme', 'Émotionnellement instable']
      },
      {
        id: 'inosuke',
        name: 'HASHIBIRA INOSUKE',
        nativeName: '嘴平伊之助',
        title: 'Beast Breather',
        role: 'Demon Slayer',
        rank: 'HASHIRA POTENTIAL',
        image: inosukeImg,
        description: 'Inosuke est un pourfendeur de démons sauvage élevé par des sangliers dans les montagnes.',
        fullBio: 'Abandonné enfant, Inosuke a été élevé par des sangliers dans les montagnes. Il a développé son propre style de combat : la Respiration de la Bête. Malgré son comportement sauvage, il développe progressivement des liens avec ses compagnons.',
        personality: ['Sauvage', 'Compétitif', 'Loyal', 'Direct', 'Sensible (caché)', 'Impulsif'],
        stats: { power: 88, speed: 85, technique: 82, intelligence: 55, stamina: 92, agility: 90 },
        status: { age: '15', birthday: '22 Avril', height: '164 cm', weight: '63 kg', bloodType: 'O', status: 'Alive', occupation: 'Pourfendeur de Démons', origin: 'Montagnes du Japon' },
        affiliation: { team: 'Demon Slayer Corps', role: 'Pourfendeur', allies: ['Tanjiro Kamado', 'Zenitsu Agatsuma', 'Nezuko Kamado'] },
        skills: [
          { name: 'Beast Breathing', type: 'Attack', description: 'Style de combat unique créé par lui-même.', level: 85 },
          { name: 'Enhanced Touch', type: 'Passive', description: 'Sensibilité tactile détectant les mouvements d\'air.', level: 90 },
          { name: 'Dual Blade Style', type: 'Attack', description: 'Combat à deux épées ébréchées.', level: 88 },
          { name: 'Body Flexibility', type: 'Passive', description: 'Corps extrêmement flexible pour des positions impossibles.', level: 92 }
        ],
        relationships: [
          { name: 'Tanjiro Kamado', type: 'Rival / Ami', description: 'Le considère comme son rival principal.' },
          { name: 'Zenitsu Agatsuma', type: 'Rival / Ami', description: 'Relation tumultueuse mais sincère.' }
        ],
        quotes: ['"Je suis le roi des montagnes!"', '"Viens te battre, déchet!"', '"Tanjiro... merci."'],
        equipment: [
          { name: 'Épées Nichirin Ébréchées', type: 'Arme', description: 'Paire d\'épées qu\'il a lui-même ébréchées.', rarity: 'Rare' },
          { name: 'Masque de Sanglier', type: 'Accessoire', description: 'Masque de sa mère sanglier adoptive.', rarity: 'Legendary' }
        ],
        achievements: ['Création de sa propre Respiration', 'Défaite de démons puissants', 'Développement de liens humains'],
        weaknesses: ['Socialement inadapté', 'Impulsif', 'Difficulté à comprendre les émotions']
      },
      {
        id: 'rengoku',
        name: 'RENGOKU KYOJURO',
        nativeName: '煉獄杏寿郎',
        title: 'Flame Hashira',
        role: 'Hashira',
        rank: 'HASHIRA',
        image: rengokuImg,
        description: 'Rengoku est le Pilier de la Flamme, un des plus puissants pourfendeurs du Corps.',
        fullBio: 'Héritier d\'une lignée de Piliers de la Flamme, Kyojuro Rengoku incarne l\'esprit du Demon Slayer Corps. Son cœur ardent et sa détermination sans faille en font un mentor inspirant.',
        personality: ['Enthousiaste', 'Honorable', 'Protecteur', 'Passionné', 'Juste', 'Inspirant'],
        stats: { power: 95, speed: 92, technique: 98, intelligence: 88, stamina: 90, agility: 90 },
        status: { age: '20', birthday: '10 Mai', height: '177 cm', weight: '72 kg', bloodType: 'Inconnu', status: 'Deceased', occupation: 'Hashira', origin: 'Japon' },
        affiliation: { team: 'Demon Slayer Corps', role: 'Pilier de la Flamme', allies: ['Tanjiro Kamado', 'Mitsuri Kanroji', 'Senjuro Rengoku'] },
        skills: [
          { name: 'Flame Breathing: All Forms', type: 'Attack', description: 'Maîtrise totale des 9 formes de la Respiration de la Flamme.', level: 98 },
          { name: 'Rengoku', type: 'Ultimate', description: 'Neuvième forme : attaque finale concentrant toute la puissance.', level: 95 },
          { name: 'Flame Tiger', type: 'Attack', description: 'Attaque créant un tigre de flammes.', level: 90 }
        ],
        relationships: [
          { name: 'Tanjiro Kamado', type: 'Protégé', description: 'L\'a inspiré profondément.' },
          { name: 'Senjuro Rengoku', type: 'Frère', description: 'Son petit frère qu\'il encourage.' }
        ],
        quotes: [
          '"心を燃やせ!" (Kokoro wo moyase! - Enflamme ton cœur!)',
          '"俺は俺の責務を全うする!" (Ore wa ore no sekimu wo mattou suru! - J\'accomplirai mon devoir!)',
          '"うまい!" (Umai! - Délicieux!)'
        ],
        equipment: [
          { name: 'Épée Nichirin de Flamme', type: 'Arme', description: 'Épée rouge emblématique du Pilier de la Flamme.', rarity: 'Legendary' }
        ],
        achievements: ['Pilier de la Flamme', 'Protection du train Mugen', 'Inspiration de la nouvelle génération'],
        weaknesses: ['Sacrifice de soi', 'Manque de régénération', 'Mortel face aux Lunes Supérieures']
      },
      {
        id: 'giyu',
        name: 'TOMIOKA GIYU',
        nativeName: '冨岡義勇',
        title: 'Water Hashira',
        role: 'Hashira',
        rank: 'HASHIRA',
        image: giyuImg,
        description: 'Giyu est le Pilier de l\'Eau, connu pour sa maîtrise parfaite de la Respiration de l\'Eau.',
        fullBio: 'Silencieux et stoïque, Giyu Tomioka cache une profonde douleur due à la mort de sa sœur et de son ami. C\'est lui qui a épargné Tanjiro et Nezuko, lançant ainsi leur aventure.',
        personality: ['Stoïque', 'Protecteur', 'Silencieux', 'Déterminé', 'Solitaire', 'Juste'],
        stats: { power: 92, speed: 95, technique: 98, intelligence: 85, stamina: 88, agility: 94 },
        status: { age: '21', birthday: '8 Février', height: '176 cm', weight: '69 kg', bloodType: 'Inconnu', status: 'Alive', occupation: 'Hashira', origin: 'Japon' },
        affiliation: { team: 'Demon Slayer Corps', role: 'Pilier de l\'Eau', allies: ['Tanjiro Kamado', 'Shinobu Kocho', 'Sabito (Décédé)'] },
        skills: [
          { name: 'Water Breathing: All Forms', type: 'Attack', description: 'Maîtrise complète des 10 formes + forme créée.', level: 98 },
          { name: 'Dead Calm', type: 'Defense', description: 'Onzième forme : état de calme absolu annulant les attaques.', level: 95 },
          { name: 'Water Wheel', type: 'Attack', description: 'Attaque rotative puissante.', level: 92 }
        ],
        relationships: [
          { name: 'Tanjiro Kamado', type: 'Protégé', description: 'L\'a sauvé et guidé.' },
          { name: 'Shinobu Kocho', type: 'Collègue', description: 'Relation complexe mais respectueuse.' },
          { name: 'Sabito', type: 'Ami (Décédé)', description: 'Son meilleur ami mort en le protégeant.' }
        ],
        quotes: [
          '"俺は柱じゃない。" (Ore wa hashira janai - Je ne suis pas un Pilier.)',
          '"生殺与奪の権を他人に握らせるな。" (Seisatsu yodatsu no ken wo tanin ni nigiraseru na - Ne laisse pas les autres décider de ta vie et de ta mort.)',
          '"..." (Silence caractéristique)'
        ],
        equipment: [
          { name: 'Épée Nichirin Bleue', type: 'Arme', description: 'Épée bleue symbolisant la Respiration de l\'Eau.', rarity: 'Legendary' }
        ],
        achievements: ['Pilier de l\'Eau', 'Créateur du Dead Calm', 'Sauveur de Tanjiro et Nezuko'],
        weaknesses: ['Isolement social', 'Culpabilité du survivant', 'Difficulté à se faire des amis']
      }
    ]
  },
  {
    id: 'hunter-x-hunter',
    title: 'Hunter x Hunter',
    titleJapanese: 'ハンター×ハンター',
    description: 'Un jeune garçon part à l\'aventure pour devenir Hunter et retrouver son père légendaire.',
    fullDescription: 'Hunter x Hunter suit Gon Freecss, un garçon de 12 ans qui découvre que son père, qu\'il croyait mort, est l\'un des Hunters les plus célèbres du monde. Il décide de passer l\'examen des Hunters pour le retrouver.',
    image: gonImg,
    banner: hunterBanner,
    theme: 'theme-hunter',
    genre: ['Action', 'Aventure', 'Fantasy'],
    year: 2011,
    episodes: 148,
    rating: 9.0,
    studio: 'Madhouse',
    status: 'Hiatus',
    characters: [
      {
        id: 'gon',
        name: 'GON FREECSS',
        nativeName: 'ゴン＝フリークス',
        title: 'The Hunter',
        role: 'Rookie Hunter',
        rank: 'HUNTER',
        image: gonImg,
        description: 'Gon Freecss est un jeune garçon au cœur pur parti à l\'aventure pour retrouver son père Ging.',
        fullBio: 'Élevé par sa tante Mito sur l\'île de la Baleine, Gon a grandi en découvrant que son père était un Hunter célèbre. Déterminé à comprendre pourquoi son père a choisi cette vie, Gon s\'est lancé dans l\'examen des Hunters.',
        personality: ['Optimiste', 'Déterminé', 'Naïf', 'Loyal', 'Curieux', 'Imprévisible'],
        stats: { power: 82, speed: 85, technique: 75, intelligence: 70, stamina: 88, agility: 90 },
        status: { age: '14', birthday: '5 Mai', height: '154 cm', weight: '49 kg', bloodType: 'B', status: 'Alive', occupation: 'Hunter', origin: 'Île de la Baleine' },
        affiliation: { team: 'Hunter Association', role: 'Hunter / Enhancer', allies: ['Killua Zoldyck', 'Kurapika', 'Leorio Paladiknight'] },
        skills: [
          { name: 'Jajanken - Rock', type: 'Ultimate', description: 'Concentration de toute l\'aura dans le poing.', level: 88 },
          { name: 'Jajanken - Paper', type: 'Attack', description: 'Projection d\'aura à distance.', level: 75 },
          { name: 'Jajanken - Scissors', type: 'Attack', description: 'Lame d\'aura tranchante.', level: 70 },
          { name: 'Enhanced Senses', type: 'Passive', description: 'Sens aiguisés développés dans la nature.', level: 90 }
        ],
        relationships: [
          { name: 'Killua Zoldyck', type: 'Meilleur Ami', description: 'Inséparables depuis l\'examen.' },
          { name: 'Ging Freecss', type: 'Père', description: 'Sa quête pour le retrouver.' },
          { name: 'Kurapika', type: 'Ami', description: 'Compagnon de l\'examen.' },
          { name: 'Leorio', type: 'Ami', description: 'Comme un grand frère.' }
        ],
        quotes: ['"Je vais retrouver mon père!"', '"Killua est mon meilleur ami dans le monde entier!"'],
        achievements: ['Réussite de l\'examen Hunter', 'Maîtrise du Nen', 'Défaite de Neferpitou'],
        weaknesses: ['Naïveté', 'Impulsivité', 'Côté sombre quand ses amis sont menacés']
      },
      {
        id: 'killua',
        name: 'KILLUA ZOLDYCK',
        nativeName: 'キルア＝ゾルディック',
        title: 'The Assassin',
        role: 'Ex-Assassin Hunter',
        rank: 'HUNTER',
        image: killuaImg,
        description: 'Killua est l\'héritier de la famille d\'assassins la plus redoutée. Il a fui pour vivre librement.',
        fullBio: 'Entraîné depuis sa naissance pour devenir le parfait assassin, Killua possède des capacités de combat exceptionnelles. Sa rencontre avec Gon lui a ouvert les yeux sur une autre façon de vivre.',
        personality: ['Intelligent', 'Loyal', 'Protecteur', 'Sarcastique', 'Traumatisé', 'En quête de liberté'],
        stats: { power: 85, speed: 98, technique: 92, intelligence: 90, stamina: 80, agility: 98 },
        status: { age: '14', birthday: '7 Juillet', height: '158 cm', weight: '49 kg', bloodType: 'A', status: 'Alive', occupation: 'Hunter', origin: 'Montagne Kukuroo' },
        affiliation: { team: 'Hunter Association', role: 'Hunter / Transmuter', allies: ['Gon Freecss', 'Kurapika', 'Alluka Zoldyck'], previousAffiliations: ['Famille Zoldyck'] },
        skills: [
          { name: 'Godspeed', type: 'Ultimate', description: 'Transformation de l\'aura en électricité pour des mouvements ultra-rapides.', level: 95 },
          { name: 'Thunderbolt', type: 'Attack', description: 'Projection d\'électricité à haute voltage.', level: 88 },
          { name: 'Assassin Mode', type: 'Passive', description: 'État de concentration extrême.', level: 92 },
          { name: 'Rhythm Echo', type: 'Defense', description: 'Création d\'images résiduelles.', level: 85 }
        ],
        relationships: [
          { name: 'Gon Freecss', type: 'Meilleur Ami', description: 'La première personne à le voir comme un ami.' },
          { name: 'Alluka Zoldyck', type: 'Sœur', description: 'La protège de sa propre famille.' },
          { name: 'Illumi Zoldyck', type: 'Frère / Antagoniste', description: 'Relation toxique et manipulatrice.' }
        ],
        quotes: ['"Si tu bouges, je te tue."', '"Gon, tu es la lumière."', '"Je ne veux plus tuer."'],
        equipment: [
          { name: 'Yo-Yos de Combat', type: 'Arme', description: 'Yo-yos en métal extrêmement lourds.', rarity: 'Rare' }
        ],
        achievements: ['Évasion de la famille Zoldyck', 'Maîtrise de Godspeed', 'Protection d\'Alluka'],
        weaknesses: ['Conditionnement familial', 'Peur d\'Illumi', 'Tendance à fuir']
      },
      {
        id: 'kurapika',
        name: 'KURAPIKA',
        nativeName: 'クラピカ',
        title: 'The Chain User',
        role: 'Blacklist Hunter',
        rank: 'HUNTER',
        image: kurapikaImg,
        description: 'Kurapika est le dernier survivant du clan Kurta, cherchant à récupérer les yeux écarlates de son peuple.',
        fullBio: 'Seul survivant du massacre de son clan par la Brigade Fantôme, Kurapika a dédié sa vie à récupérer les yeux écarlates volés et à venger les siens. Ses chaînes sont devenues son arme signature.',
        personality: ['Intelligent', 'Déterminé', 'Vengeur', 'Loyal', 'Stratégique', 'Obsessionnel'],
        stats: { power: 85, speed: 88, technique: 95, intelligence: 98, stamina: 75, agility: 86 },
        status: { age: '17', birthday: '4 Avril', height: '171 cm', weight: '59 kg', bloodType: 'AB', status: 'Alive', occupation: 'Blacklist Hunter', origin: 'Région de Lukso' },
        affiliation: { team: 'Hunter Association / Nostrade Family', role: 'Hunter / Bodyguard', allies: ['Gon Freecss', 'Killua Zoldyck', 'Leorio Paladiknight'] },
        skills: [
          { name: 'Chain Jail', type: 'Attack', description: 'Chaîne emprisonnant et forçant Zetsu.', level: 95 },
          { name: 'Emperor Time', type: 'Passive', description: 'Yeux écarlates donnant accès à toutes les catégories Nen.', level: 98 },
          { name: 'Judgment Chain', type: 'Attack', description: 'Chaîne entrant dans le cœur avec des conditions mortelles.', level: 92 },
          { name: 'Dowsing Chain', type: 'Support', description: 'Chaîne détectant les mensonges et localisant les cibles.', level: 88 }
        ],
        relationships: [
          { name: 'Gon Freecss', type: 'Ami', description: 'Compagnon de l\'examen.' },
          { name: 'Leorio Paladiknight', type: 'Ami', description: 'Le plus proche de ses amis.' },
          { name: 'Brigade Fantôme', type: 'Ennemis', description: 'Cibles de sa vengeance.' }
        ],
        quotes: [
          '"私の復讐は終わらない。" (Watashi no fukushuu wa owaranai - Ma vengeance ne finira jamais.)',
          '"同胞の目を取り戻す。" (Douhou no me wo torimodosu - Je récupérerai les yeux de mon peuple.)',
          '"嘘をつくな。" (Uso wo tsuku na - Ne mens pas.)'
        ],
        achievements: ['Défaite d\'Uvogin', 'Récupération de plusieurs paires d\'yeux', 'Rang de Hunter obtenu'],
        weaknesses: ['Durée de vie réduite par Emperor Time', 'Obsession de la vengeance', 'Isolement émotionnel']
      },
      {
        id: 'hisoka',
        name: 'HISOKA MOROW',
        nativeName: 'ヒソカ＝モロウ',
        title: 'The Magician',
        role: 'Hunter / Antagonist',
        rank: 'HUNTER',
        image: hisokaImg,
        description: 'Hisoka est un combattant obsédé par les adversaires puissants, oscillant entre allié et ennemi.',
        fullBio: 'Magicien psychopathe et combattant d\'exception, Hisoka ne vit que pour le frisson du combat contre des adversaires dignes de lui. Il laisse mûrir ses proies potentielles comme Gon.',
        personality: ['Sadique', 'Charismatique', 'Imprévisible', 'Obsessionnel', 'Patient', 'Dangereux'],
        stats: { power: 95, speed: 94, technique: 98, intelligence: 92, stamina: 88, agility: 96 },
        status: { age: '28', birthday: '6 Juin', height: '187 cm', weight: '91 kg', bloodType: 'B', status: 'Alive', occupation: 'Chasseur / Combattant', origin: 'Inconnu' },
        affiliation: { team: 'Aucune (Ex-Brigade Fantôme)', role: 'Chasseur Solitaire', allies: ['Illumi Zoldyck (parfois)'], previousAffiliations: ['Brigade Fantôme'] },
        skills: [
          { name: 'Bungee Gum', type: 'Attack', description: 'Aura élastique et collante aux propriétés du caoutchouc et du chewing-gum.', level: 98 },
          { name: 'Texture Surprise', type: 'Support', description: 'Change l\'apparence des surfaces plates.', level: 90 },
          { name: 'Card Throwing', type: 'Attack', description: 'Cartes lancées avec une précision mortelle.', level: 95 }
        ],
        relationships: [
          { name: 'Gon Freecss', type: 'Proie / Intérêt', description: 'Attend qu\'il mûrisse pour l\'affronter.' },
          { name: 'Chrollo Lucilfer', type: 'Cible', description: 'Son adversaire ultime recherché.' },
          { name: 'Illumi Zoldyck', type: 'Allié temporaire', description: 'Relation complexe et dangereuse.' }
        ],
        quotes: [
          '"ゴンはまだ熟していない。" (Gon wa mada jukushite inai - Gon n\'est pas encore mûr.)',
          '"戦いが好きだ。" (Tatakai ga suki da - J\'aime les combats.)',
          '"♠♥♦♣" (Symboles de cartes caractéristiques)'
        ],
        achievements: ['Victoire au Heaven\'s Arena', 'Survie après décapitation', 'Défaite de membres de la Brigade'],
        weaknesses: ['Obsession du combat', 'Imprévisibilité', 'Tendances psychopathiques']
      },
      {
        id: 'leorio',
        name: 'LEORIO PALADIKNIGHT',
        nativeName: 'レオリオ＝パラディナイト',
        title: 'The Doctor Hunter',
        role: 'Hunter / Medical Student',
        rank: 'HUNTER',
        image: leorioImg,
        description: 'Leorio est un Hunter aspirant médecin, déterminé à soigner les pauvres gratuitement.',
        fullBio: 'Derrière son apparence cupide se cache un cœur d\'or. Leorio veut devenir médecin pour aider ceux qui ne peuvent pas payer, comme son ami d\'enfance décédé faute de soins.',
        personality: ['Passionné', 'Loyal', 'Colérique', 'Généreux', 'Déterminé', 'Émotionnel'],
        stats: { power: 70, speed: 65, technique: 60, intelligence: 85, stamina: 75, agility: 62 },
        status: { age: '21', birthday: '3 Mars', height: '193 cm', weight: '85 kg', bloodType: 'O', status: 'Alive', occupation: 'Étudiant en médecine / Hunter', origin: 'Inconnu' },
        affiliation: { team: 'Hunter Association', role: 'Hunter / Futur Médecin', allies: ['Gon Freecss', 'Killua Zoldyck', 'Kurapika'] },
        skills: [
          { name: 'Emission Punch', type: 'Attack', description: 'Coup de poing projeté à distance via le Nen.', level: 75 },
          { name: 'Medical Knowledge', type: 'Passive', description: 'Connaissances médicales avancées.', level: 85 },
          { name: 'Negotiation', type: 'Support', description: 'Capacités de négociation et de persuasion.', level: 80 }
        ],
        relationships: [
          { name: 'Gon Freecss', type: 'Ami', description: 'Comme un petit frère.' },
          { name: 'Kurapika', type: 'Meilleur Ami', description: 'Lien très fort.' },
          { name: 'Killua Zoldyck', type: 'Ami', description: 'Relation de taquineries.' }
        ],
        quotes: [
          '"俺は医者になる!" (Ore wa isha ni naru! - Je serai médecin!)',
          '"金のためじゃない!" (Kane no tame janai! - Ce n\'est pas pour l\'argent!)',
          '"友達を傷つけるな!" (Tomodachi wo kizutsukeru na! - Ne blesse pas mes amis!)'
        ],
        achievements: ['Réussite de l\'examen Hunter', 'Élection du nouveau président', 'Études de médecine'],
        weaknesses: ['Combat limité', 'Impulsif', 'Manque d\'entraînement Nen']
      }
    ]
  },
  {
    id: 'naruto',
    title: 'Naruto',
    titleJapanese: 'ナルト',
    description: 'Un jeune ninja orphelin rêve de devenir Hokage malgré le démon scellé en lui.',
    fullDescription: 'Naruto suit l\'histoire d\'un jeune ninja orphelin portant le démon renard à neuf queues. Rejeté par son village, il rêve de devenir Hokage pour gagner le respect de tous.',
    image: narutoImg,
    banner: narutoBanner,
    theme: 'theme-naruto',
    genre: ['Action', 'Aventure', 'Martial Arts'],
    year: 2002,
    episodes: 720,
    rating: 8.6,
    studio: 'Pierrot',
    status: 'Completed',
    characters: [
      {
        id: 'naruto-uzumaki',
        name: 'NARUTO UZUMAKI',
        nativeName: 'うずまきナルト',
        title: 'The Seventh Hokage',
        role: 'Ninja',
        rank: 'HOKAGE',
        image: narutoImg,
        description: 'Naruto Uzumaki est un ninja de Konoha qui porte le démon renard à neuf queues.',
        fullBio: 'Orphelin dès sa naissance et porteur du Kyuubi, Naruto a grandi rejeté par les villageois. Sa détermination l\'a mené à devenir le Septième Hokage.',
        personality: ['Déterminé', 'Optimiste', 'Loyal', 'Bruyant', 'Empathique', 'Charismatique'],
        stats: { power: 98, speed: 92, technique: 85, intelligence: 75, stamina: 100, agility: 88 },
        status: { age: '33', birthday: '10 Octobre', height: '180 cm', weight: '66 kg', bloodType: 'B', status: 'Alive', occupation: 'Septième Hokage', origin: 'Konohagakure' },
        affiliation: { team: 'Konoha / Team 7', role: 'Septième Hokage', allies: ['Sasuke Uchiha', 'Sakura Haruno', 'Kakashi Hatake', 'Kurama'] },
        skills: [
          { name: 'Rasengan', type: 'Attack', description: 'Sphère de chakra concentré.', level: 100 },
          { name: 'Shadow Clone Jutsu', type: 'Support', description: 'Création de clones solides.', level: 100 },
          { name: 'Sage Mode', type: 'Passive', description: 'Absorption de l\'énergie naturelle.', level: 95 },
          { name: 'Kurama Mode', type: 'Ultimate', description: 'Utilisation du chakra du Kyuubi.', level: 98 },
          { name: 'Six Paths Sage Mode', type: 'Ultimate', description: 'Pouvoir accordé par le Sage des Six Chemins.', level: 100 }
        ],
        relationships: [
          { name: 'Sasuke Uchiha', type: 'Meilleur Ami / Rival', description: 'Lien indéfectible malgré leurs conflits.' },
          { name: 'Hinata Hyuga', type: 'Épouse', description: 'Amour de sa vie.' },
          { name: 'Kakashi Hatake', type: 'Mentor', description: 'Premier vrai professeur.' },
          { name: 'Kurama', type: 'Partenaire', description: 'De prisonnier à ami.' }
        ],
        quotes: ['"Je ne reviens jamais sur ma parole, c\'est ma voie du ninja!"', '"Dattebayo!"', '"Je serai Hokage!"'],
        achievements: ['Septième Hokage', 'Défaite de Kaguya', 'Paix dans le monde ninja'],
        weaknesses: ['Trop confiant', 'Néglige parfois sa famille', 'Impulsif']
      },
      {
        id: 'sasuke-uchiha',
        name: 'SASUKE UCHIHA',
        nativeName: 'うちはサスケ',
        title: 'The Last Uchiha',
        role: 'Ninja',
        rank: 'KAGE LEVEL',
        image: sasukeImg,
        description: 'Sasuke Uchiha est le dernier survivant du clan Uchiha, massacré par son propre frère.',
        fullBio: 'Survivant du massacre de son clan par son frère Itachi, Sasuke a consacré sa vie à la vengeance. Après avoir découvert la vérité, il a trouvé la rédemption.',
        personality: ['Stoïque', 'Déterminé', 'Intelligent', 'Solitaire', 'Protecteur', 'Réservé'],
        stats: { power: 96, speed: 95, technique: 98, intelligence: 92, stamina: 85, agility: 94 },
        status: { age: '33', birthday: '23 Juillet', height: '182 cm', weight: '68 kg', bloodType: 'AB', status: 'Alive', occupation: 'Ninja Voyageur', origin: 'Konohagakure' },
        affiliation: { team: 'Konoha / Team 7', role: 'Ninja Voyageur', allies: ['Naruto Uzumaki', 'Sakura Haruno', 'Kakashi Hatake'] },
        skills: [
          { name: 'Chidori', type: 'Attack', description: 'Concentration de foudre pour une attaque perçante.', level: 98 },
          { name: 'Sharingan', type: 'Passive', description: 'Dojutsu permettant de copier des techniques.', level: 100 },
          { name: 'Rinnegan', type: 'Passive', description: 'L\'œil légendaire accordant des pouvoirs divins.', level: 95 },
          { name: 'Amaterasu', type: 'Attack', description: 'Flammes noires inextinguibles.', level: 95 },
          { name: 'Susanoo', type: 'Defense', description: 'Avatar de chakra géant.', level: 96 }
        ],
        relationships: [
          { name: 'Naruto Uzumaki', type: 'Meilleur Ami / Rival', description: 'Son lien le plus fort.' },
          { name: 'Sakura Haruno', type: 'Épouse', description: 'L\'a attendu pendant des années.' },
          { name: 'Itachi Uchiha', type: 'Frère (Décédé)', description: 'Complexe et tragique.' }
        ],
        quotes: ['"Je suis un vengeur."', '"Les liens... je les ai tous coupés."', '"Naruto... tu es mon seul ami."'],
        achievements: ['Défaite d\'Orochimaru', 'Défaite d\'Itachi', 'Protection du monde ninja'],
        weaknesses: ['Isolement émotionnel', 'Passé traumatique', 'Difficulté à exprimer ses émotions']
      },
      {
        id: 'kakashi',
        name: 'KAKASHI HATAKE',
        nativeName: 'はたけカカシ',
        title: 'Copy Ninja',
        role: 'Jonin / Hokage',
        rank: 'SIXTH HOKAGE',
        image: kakashiImg,
        description: 'Kakashi est le Copy Ninja légendaire et le mentor de la Team 7.',
        fullBio: 'Génie dès son plus jeune âge, Kakashi a vécu de nombreuses tragédies qui ont façonné son caractère. Son Sharingan hérité de son ami Obito et ses 1000 techniques copiées en font une légende.',
        personality: ['Décontracté', 'Intelligent', 'Protecteur', 'Mystérieux', 'Loyal', 'Sage'],
        stats: { power: 88, speed: 90, technique: 95, intelligence: 96, stamina: 78, agility: 88 },
        status: { age: '46', birthday: '15 Septembre', height: '181 cm', weight: '67.5 kg', bloodType: 'O', status: 'Alive', occupation: 'Sixième Hokage (Retraité)', origin: 'Konohagakure' },
        affiliation: { team: 'Konoha / Team 7', role: 'Sensei / Sixième Hokage', allies: ['Naruto Uzumaki', 'Sasuke Uchiha', 'Sakura Haruno', 'Guy Might'] },
        skills: [
          { name: 'Chidori', type: 'Attack', description: 'Technique de foudre originale.', level: 95 },
          { name: 'Sharingan', type: 'Passive', description: 'Sharingan d\'Obito permettant de copier.', level: 90 },
          { name: 'Kamui', type: 'Ultimate', description: 'Technique spatio-temporelle du Mangekyo.', level: 88 },
          { name: 'Purple Lightning', type: 'Attack', description: 'Nouvelle technique après perte du Sharingan.', level: 85 }
        ],
        relationships: [
          { name: 'Obito Uchiha', type: 'Meilleur Ami (Décédé)', description: 'Ami d\'enfance dont il a hérité le Sharingan.' },
          { name: 'Naruto Uzumaki', type: 'Élève', description: 'A cru en lui depuis le début.' },
          { name: 'Guy Might', type: 'Rival / Ami', description: 'Rivalité amicale légendaire.' }
        ],
        quotes: [
          '"私の名はカカシ。" (Watashi no na wa Kakashi - Mon nom est Kakashi.)',
          '"忍びの世界でルールを破る奴はクズだ。だが仲間を見捨てる奴はそれ以下だ。" (Shinobi no sekai de ruuru wo yaburu yatsu wa kuzu da. Daga nakama wo misuteru yatsu wa sore ika da - Dans le monde ninja, ceux qui brisent les règles sont des déchets. Mais ceux qui abandonnent leurs amis sont pires.)',
          '"やれやれ。" (Yare yare - Eh bien, eh bien.)'
        ],
        equipment: [
          { name: 'Bandeau de Konoha', type: 'Accessoire', description: 'Symbole du village caché.', rarity: 'Common' }
        ],
        achievements: ['Sixième Hokage', 'Survivant de la Quatrième Grande Guerre', 'Mentor de l\'équipe légendaire'],
        weaknesses: ['Perte du Sharingan', 'Traumatismes passés', 'Chakra limité sans Sharingan']
      },
      {
        id: 'itachi',
        name: 'ITACHI UCHIHA',
        nativeName: 'うちはイタチ',
        title: 'Clan Killer',
        role: 'Rogue Ninja',
        rank: 'S-RANK',
        image: itachiImg,
        description: 'Itachi a massacré son propre clan pour protéger Konoha et son petit frère Sasuke.',
        fullBio: 'Considéré comme l\'un des ninjas les plus talentueux de l\'histoire, Itachi a sacrifié sa réputation et sa vie pour protéger Konoha de l\'intérieur de l\'Akatsuki. Son amour pour Sasuke était sa seule faiblesse.',
        personality: ['Stoïque', 'Sacrificiel', 'Intelligent', 'Aimant', 'Mystérieux', 'Tragique'],
        stats: { power: 94, speed: 95, technique: 100, intelligence: 98, stamina: 70, agility: 92 },
        status: { age: '21', birthday: '9 Juin', height: '178 cm', weight: '58 kg', bloodType: 'AB', status: 'Deceased', occupation: 'Membre de l\'Akatsuki', origin: 'Konohagakure' },
        affiliation: { team: 'Akatsuki', role: 'Membre', allies: ['Kisame Hoshigaki', 'Sasuke Uchiha (secrètement)'], previousAffiliations: ['Konoha ANBU'] },
        skills: [
          { name: 'Tsukuyomi', type: 'Ultimate', description: 'Genjutsu suprême de torture mentale.', level: 100 },
          { name: 'Amaterasu', type: 'Attack', description: 'Flammes noires inextinguibles.', level: 98 },
          { name: 'Susanoo', type: 'Defense', description: 'Avatar de chakra avec épée Totsuka et bouclier Yata.', level: 95 },
          { name: 'Izanami', type: 'Ultimate', description: 'Genjutsu ultime piégeant dans une boucle.', level: 92 }
        ],
        relationships: [
          { name: 'Sasuke Uchiha', type: 'Frère', description: 'Tout ce qu\'il a fait était pour le protéger.' },
          { name: 'Shisui Uchiha', type: 'Meilleur Ami (Décédé)', description: 'L\'a influencé vers la paix.' }
        ],
        quotes: [
          '"許せサスケ、これが最後だ。" (Yuruse Sasuke, kore ga saigo da - Pardonne-moi Sasuke, c\'est la dernière fois.)',
          '"お前は弱い。なぜ弱いか？憎しみが足りないからだ。" (Omae wa yowai. Naze yowai ka? Nikushimi ga tarinai kara da - Tu es faible. Pourquoi es-tu faible ? Parce que tu manques de haine.)',
          '"俺は常にお前を愛している。" (Ore wa tsuneni omae wo aishiteiru - Je t\'aimerai toujours.)'
        ],
        equipment: [
          { name: 'Bague Akatsuki - Shu', type: 'Accessoire', description: 'Bague de membre de l\'Akatsuki.', rarity: 'Epic' }
        ],
        achievements: ['Massacre du clan Uchiha (sacrifice)', 'Protection secrète de Konoha', 'Libération d\'Edo Tensei'],
        weaknesses: ['Maladie mortelle', 'Amour pour Sasuke', 'Yeux affaiblis']
      }
    ]
  },
  {
    id: 'my-hero-academia',
    title: 'My Hero Academia',
    titleJapanese: '僕のヒーローアカデミア',
    description: 'Dans un monde où 80% de la population possède des super-pouvoirs, un garçon sans pouvoir rêve de devenir héros.',
    fullDescription: 'My Hero Academia suit Izuku Midoriya, né sans Alter (super-pouvoir) dans un monde où presque tout le monde en possède un. Sa rencontre avec le plus grand héros, All Might, va changer sa vie à jamais.',
    image: dekuImg,
    banner: mhaBanner,
    theme: 'theme-mha',
    genre: ['Action', 'Super-héros', 'École'],
    year: 2016,
    episodes: 138,
    rating: 8.4,
    studio: 'Bones',
    status: 'Ongoing',
    characters: [
      {
        id: 'deku',
        name: 'IZUKU MIDORIYA',
        nativeName: '緑谷出久',
        title: 'Deku',
        role: 'Hero Student',
        rank: 'TOP STUDENT',
        image: dekuImg,
        description: 'Izuku Midoriya, surnommé Deku, est né sans Alter mais a hérité du pouvoir d\'All Might : One For All.',
        fullBio: 'Né sans Alter, Izuku n\'a jamais abandonné son rêve de devenir héros. Sa rencontre avec All Might et l\'héritage du One For All lui ont donné l\'opportunité de prouver que n\'importe qui peut devenir un héros.',
        backstory: 'Enfant, Izuku admirait All Might plus que tout. Quand il a découvert qu\'il était sans Alter, il a été dévasté mais n\'a jamais cessé d\'étudier les héros et leurs pouvoirs.',
        personality: ['Analytique', 'Courageux', 'Déterminé', 'Empathique', 'Nerveux', 'Altruiste'],
        stats: { power: 85, speed: 80, technique: 88, intelligence: 95, stamina: 82, agility: 78 },
        status: { age: '16', birthday: '15 Juillet', height: '166 cm', weight: '62 kg', bloodType: 'O', status: 'Alive', occupation: 'Étudiant Héros', origin: 'Shizuoka, Japon' },
        affiliation: { team: 'U.A. High School - Classe 1-A', role: 'Étudiant Héros', allies: ['All Might', 'Katsuki Bakugo', 'Ochako Uraraka', 'Shoto Todoroki'] },
        skills: [
          { name: 'One For All', type: 'Passive', description: 'Alter hérité d\'All Might, accumulant la puissance de 8 utilisateurs.', level: 75 },
          { name: 'Full Cowling', type: 'Support', description: 'Distribution du One For All dans tout le corps.', level: 85 },
          { name: 'Shoot Style', type: 'Attack', description: 'Style de combat utilisant principalement les jambes.', level: 80 },
          { name: 'Blackwhip', type: 'Attack', description: 'Alter hérité permettant de créer des fouets noirs.', level: 70 },
          { name: 'Fa Jin', type: 'Attack', description: 'Stockage et libération d\'énergie cinétique.', level: 65 }
        ],
        relationships: [
          { name: 'All Might', type: 'Mentor', description: 'Son héros et père spirituel.' },
          { name: 'Katsuki Bakugo', type: 'Rival / Ami', description: 'Relation complexe depuis l\'enfance.' },
          { name: 'Ochako Uraraka', type: 'Amie proche', description: 'Soutien mutuel constant.' }
        ],
        quotes: ['"Je veux être un héros qui sauve les gens avec le sourire!"', '"Plus Ultra!"', '"C\'est mon tour maintenant!"'],
        achievements: ['Héritage du One For All', 'Multiples Alters débloqués', 'Top 3 de la classe'],
        weaknesses: ['Corps non adapté au One For All', 'Tendance à se blesser', 'Manque de confiance']
      },
      {
        id: 'bakugo',
        name: 'KATSUKI BAKUGO',
        nativeName: '爆豪勝己',
        title: 'Great Explosion Murder God Dynamight',
        role: 'Hero Student',
        rank: 'TOP STUDENT',
        image: bakugoImg,
        description: 'Bakugo est un prodige avec un Alter d\'explosion. Ancien intimidateur de Deku, il est devenu son rival.',
        fullBio: 'Bakugo est né avec un Alter puissant et a toujours été considéré comme un génie. Son complexe de supériorité a été ébranlé quand Deku, qu\'il méprisait, a obtenu un pouvoir.',
        personality: ['Agressif', 'Compétitif', 'Intelligent', 'Fier', 'Déterminé', 'Loyal (caché)'],
        stats: { power: 90, speed: 88, technique: 85, intelligence: 82, stamina: 85, agility: 86 },
        status: { age: '16', birthday: '20 Avril', height: '172 cm', weight: '67 kg', bloodType: 'A', status: 'Alive', occupation: 'Étudiant Héros', origin: 'Shizuoka, Japon' },
        affiliation: { team: 'U.A. High School - Classe 1-A', role: 'Étudiant Héros', allies: ['Izuku Midoriya', 'Eijiro Kirishima', 'Shoto Todoroki'] },
        skills: [
          { name: 'Explosion', type: 'Attack', description: 'Crée des explosions avec la sueur de ses paumes.', level: 92 },
          { name: 'AP Shot', type: 'Attack', description: 'Explosion concentrée et perçante.', level: 88 },
          { name: 'Howitzer Impact', type: 'Ultimate', description: 'Rotation à haute vitesse créant une explosion massive.', level: 90 },
          { name: 'Cluster', type: 'Attack', description: 'Multiples petites explosions en succession.', level: 85 }
        ],
        relationships: [
          { name: 'Izuku Midoriya', type: 'Rival / Ami', description: 'Relation évolutive de la haine au respect.' },
          { name: 'Eijiro Kirishima', type: 'Meilleur Ami', description: 'Seul à vraiment le comprendre.' },
          { name: 'All Might', type: 'Idole', description: 'Son héros depuis toujours.' }
        ],
        quotes: ['"SHINE!" (Meurs!)', '"Je serai le numéro 1!"', '"Ne me sous-estime pas, déchet!"'],
        achievements: ['Victoire au festival sportif', 'Développement du Cluster', 'Reconnaissance par All Might'],
        weaknesses: ['Tempérament explosif', 'Travail d\'équipe difficile', 'Orgueil excessif']
      },
      {
        id: 'todoroki',
        name: 'SHOTO TODOROKI',
        nativeName: '轟焦凍',
        title: 'Shoto',
        role: 'Hero Student',
        rank: 'TOP STUDENT',
        image: todorokiImg,
        description: 'Todoroki possède un double Alter de glace et de feu, hérité de ses deux parents.',
        fullBio: 'Fils du héros numéro 2 Endeavor, Shoto a été créé pour surpasser All Might. Son enfance traumatisante l\'a poussé à rejeter le côté feu de son Alter.',
        personality: ['Stoïque', 'Intelligent', 'Réservé', 'Déterminé', 'En quête d\'identité', 'Empathique'],
        stats: { power: 92, speed: 82, technique: 90, intelligence: 85, stamina: 80, agility: 80 },
        status: { age: '16', birthday: '11 Janvier', height: '176 cm', weight: '66 kg', bloodType: 'O', status: 'Alive', occupation: 'Étudiant Héros', origin: 'Japon' },
        affiliation: { team: 'U.A. High School - Classe 1-A', role: 'Étudiant Héros', allies: ['Izuku Midoriya', 'Katsuki Bakugo', 'Tenya Iida'] },
        skills: [
          { name: 'Half-Cold Half-Hot', type: 'Passive', description: 'Double Alter de glace (droite) et feu (gauche).', level: 88 },
          { name: 'Ice Wall', type: 'Defense', description: 'Création instantanée de murs de glace.', level: 90 },
          { name: 'Flashfire Fist', type: 'Attack', description: 'Technique de feu héritée d\'Endeavor.', level: 75 },
          { name: 'Heaven-Piercing Ice Wall', type: 'Ultimate', description: 'Mur de glace géant atteignant le ciel.', level: 92 }
        ],
        relationships: [
          { name: 'Endeavor', type: 'Père', description: 'Relation tendue en reconstruction.' },
          { name: 'Izuku Midoriya', type: 'Ami', description: 'L\'a aidé à accepter son côté feu.' },
          { name: 'Dabi', type: 'Frère', description: 'Révélation choquante sur son frère "mort".' }
        ],
        quotes: ['"Ce n\'est pas le pouvoir de mon père, c\'est le mien."', '"Je te vaincrai."'],
        achievements: ['Top 3 de la classe', 'Acceptation de son Alter complet', 'Maîtrise du Flashfire'],
        weaknesses: ['Température corporelle limitante', 'Trauma familial', 'Hésitation à utiliser le feu']
      },
      {
        id: 'all-might',
        name: 'ALL MIGHT',
        nativeName: 'オールマイト',
        title: 'Symbol of Peace',
        role: 'Pro Hero',
        rank: 'FORMER #1',
        image: allMightImg,
        description: 'All Might est le symbole de la paix, le plus grand héros de tous les temps.',
        fullBio: 'Toshinori Yagi, connu sous le nom d\'All Might, a été le héros numéro 1 pendant des décennies. Détenteur du One For All, il l\'a transmis à Izuku avant de prendre sa retraite.',
        personality: ['Héroïque', 'Optimiste', 'Protecteur', 'Paternel', 'Charismatique', 'Humble'],
        stats: { power: 100, speed: 95, technique: 90, intelligence: 85, stamina: 70, agility: 88 },
        status: { age: '49', birthday: '10 Juin', height: '220 cm', weight: '255 kg', bloodType: 'A', status: 'Alive', occupation: 'Professeur (retraité du héroïsme)', origin: 'Japon' },
        affiliation: { team: 'U.A. High School', role: 'Professeur', allies: ['Izuku Midoriya', 'Gran Torino', 'Sir Nighteye'] },
        skills: [
          { name: 'One For All (Former)', type: 'Ultimate', description: 'Alter accumulant la puissance des générations.', level: 100 },
          { name: 'Detroit Smash', type: 'Attack', description: 'Coup de poing dévastateur.', level: 100 },
          { name: 'United States of Smash', type: 'Ultimate', description: 'Sa dernière et plus puissante attaque.', level: 100 },
          { name: 'Texas Smash', type: 'Attack', description: 'Coup de poing créant une onde de choc.', level: 95 }
        ],
        relationships: [
          { name: 'Izuku Midoriya', type: 'Successeur', description: 'Comme un fils pour lui.' },
          { name: 'Nana Shimura', type: 'Mentor (Décédée)', description: 'Sa mentor qui lui a transmis One For All.' },
          { name: 'All For One', type: 'Nemesis', description: 'Son ennemi juré.' }
        ],
        quotes: ['"Je suis là!"', '"Plus Ultra!"', '"Maintenant, c\'est ton tour."'],
        achievements: ['Symbole de Paix pendant 40 ans', 'Défaite d\'All For One', 'Transmission réussie du One For All'],
        weaknesses: ['Blessure d\'All For One', 'Temps de transformation limité', 'Incapable de combattre maintenant']
      },
      {
        id: 'uraraka',
        name: 'OCHAKO URARAKA',
        nativeName: '麗日お茶子',
        title: 'Uravity',
        role: 'Hero Student',
        rank: 'TOP STUDENT',
        image: urarakaImg,
        description: 'Uraraka possède l\'Alter Zero Gravity, lui permettant d\'annuler la gravité des objets.',
        fullBio: 'Issue d\'une famille pauvre, Ochako veut devenir héroïne pour gagner de l\'argent et aider ses parents. Son alter lui permet de faire flotter les objets qu\'elle touche.',
        personality: ['Joyeuse', 'Déterminée', 'Empathique', 'Courageuse', 'Économe', 'Loyale'],
        stats: { power: 72, speed: 78, technique: 82, intelligence: 80, stamina: 75, agility: 85 },
        status: { age: '16', birthday: '27 Décembre', height: '156 cm', weight: '47 kg', bloodType: 'B', status: 'Alive', occupation: 'Étudiante Héroïne', origin: 'Mie, Japon' },
        affiliation: { team: 'U.A. High School - Classe 1-A', role: 'Étudiante Héroïne', allies: ['Izuku Midoriya', 'Tsuyu Asui', 'Tenya Iida'] },
        skills: [
          { name: 'Zero Gravity', type: 'Support', description: 'Annule la gravité des objets touchés.', level: 85 },
          { name: 'Gunhead Martial Arts', type: 'Attack', description: 'Techniques de combat rapproché.', level: 78 },
          { name: 'Comet Home Run', type: 'Attack', description: 'Utilise la gravité zéro pour des frappes dévastatrices.', level: 75 }
        ],
        relationships: [
          { name: 'Izuku Midoriya', type: 'Amour', description: 'Sentiments profonds mais non exprimés.' },
          { name: 'Tsuyu Asui', type: 'Meilleure Amie', description: 'Amitié sincère et soutien mutuel.' }
        ],
        quotes: [
          '"私、頑張るよ!" (Watashi, ganbaru yo! - Je vais faire de mon mieux!)',
          '"お父さんとお母さんのために!" (Otou-san to okaa-san no tame ni! - Pour papa et maman!)',
          '"デク君..." (Deku-kun... - Deku...)'
        ],
        achievements: ['Développement de techniques de combat', 'Résistance à la nausée', 'Sauvetage de nombreux civils'],
        weaknesses: ['Nausée après utilisation prolongée', 'Combat rapproché limité', 'Limite de poids flottant']
      },
      {
        id: 'aizawa',
        name: 'SHOTA AIZAWA',
        nativeName: '相澤消太',
        title: 'Eraserhead',
        role: 'Pro Hero / Teacher',
        rank: 'UNDERGROUND HERO',
        image: aizawaImg,
        description: 'Aizawa est le professeur principal de la classe 1-A et le héros underground Eraserhead.',
        fullBio: 'Héros underground préférant l\'ombre aux projecteurs, Aizawa peut annuler les Alters des autres en les regardant. Son dévouement envers ses élèves est absolu malgré son apparence apathique.',
        personality: ['Apathique', 'Rationnel', 'Protecteur', 'Strict', 'Dévoué', 'Pragmatique'],
        stats: { power: 70, speed: 82, technique: 95, intelligence: 92, stamina: 65, agility: 88 },
        status: { age: '31', birthday: '8 Novembre', height: '183 cm', weight: '76 kg', bloodType: 'B', status: 'Alive', occupation: 'Professeur / Héros Pro', origin: 'Japon' },
        affiliation: { team: 'U.A. High School', role: 'Professeur Principal Classe 1-A', allies: ['Hizashi Yamada', 'Classe 1-A', 'Oboro Shirakumo'] },
        skills: [
          { name: 'Erasure', type: 'Passive', description: 'Annule les Alters en regardant la cible.', level: 95 },
          { name: 'Binding Cloth', type: 'Attack', description: 'Écharpe de capture pour immobiliser.', level: 90 },
          { name: 'Combat Expert', type: 'Attack', description: 'Expert en combat sans Alter.', level: 88 }
        ],
        relationships: [
          { name: 'Hizashi Yamada', type: 'Meilleur Ami', description: 'Ami depuis l\'école.' },
          { name: 'Classe 1-A', type: 'Élèves', description: 'Les protège de sa vie.' },
          { name: 'Eri', type: 'Figure Paternelle', description: 'L\'a accueillie chez lui.' }
        ],
        quotes: [
          '"寝るぞ。" (Neru zo - Je vais dormir.)',
          '"合理的じゃない。" (Gouriteki janai - Ce n\'est pas rationnel.)',
          '"お前らは俺の生徒だ。" (Omaera wa ore no seito da - Vous êtes mes élèves.)'
        ],
        equipment: [
          { name: 'Binding Cloth', type: 'Arme', description: 'Écharpe spéciale en fibre de carbone.', rarity: 'Epic' },
          { name: 'Lunettes de Protection', type: 'Accessoire', description: 'Cache ses yeux pour des attaques surprises.', rarity: 'Rare' }
        ],
        achievements: ['Survie à l\'attaque USJ', 'Protection de la classe 1-A', 'Défaite de nombreux vilains'],
        weaknesses: ['Yeux secs après utilisation prolongée', 'Inefficace contre mutants', 'Manque de sommeil chronique']
      }
    ]
  },
  {
    id: 'one-piece',
    title: 'One Piece',
    titleJapanese: 'ワンピース',
    description: 'Un jeune pirate au chapeau de paille part à l\'aventure pour trouver le One Piece et devenir Roi des Pirates.',
    fullDescription: 'One Piece suit Monkey D. Luffy, un garçon dont le corps est devenu élastique après avoir mangé un Fruit du Démon. Il forme l\'équipage du Chapeau de Paille pour trouver le légendaire trésor One Piece.',
    image: luffyImg,
    banner: onepieceBanner,
    theme: 'theme-onepiece',
    genre: ['Action', 'Aventure', 'Comédie'],
    year: 1999,
    episodes: 1100,
    rating: 9.0,
    studio: 'Toei Animation',
    status: 'Ongoing',
    characters: [
      {
        id: 'luffy',
        name: 'MONKEY D. LUFFY',
        nativeName: 'モンキー・D・ルフィ',
        title: 'Straw Hat',
        role: 'Captain',
        rank: 'EMPEROR',
        image: luffyImg,
        description: 'Luffy est un pirate au corps élastique rêvant de devenir le Roi des Pirates.',
        fullBio: 'Ayant mangé le Fruit du Gum-Gum enfant, Luffy possède un corps élastique. Inspiré par le pirate Shanks, il a juré de devenir Roi des Pirates et a formé l\'équipage du Chapeau de Paille.',
        personality: ['Joyeux', 'Déterminé', 'Loyal', 'Insouciant', 'Courageux', 'Gourmand'],
        stats: { power: 95, speed: 90, technique: 85, intelligence: 60, stamina: 98, agility: 92 },
        status: { age: '19', birthday: '5 Mai', height: '174 cm', weight: '64 kg', bloodType: 'F', status: 'Alive', occupation: 'Capitaine Pirate', origin: 'Village de Fuchsia' },
        affiliation: { team: 'Équipage du Chapeau de Paille', role: 'Capitaine', allies: ['Roronoa Zoro', 'Nami', 'Sanji', 'Trafalgar Law'] },
        skills: [
          { name: 'Gomu Gomu no Mi', type: 'Passive', description: 'Corps entièrement élastique.', level: 95 },
          { name: 'Gear Second', type: 'Support', description: 'Accélération du flux sanguin pour plus de vitesse.', level: 90 },
          { name: 'Gear Third', type: 'Attack', description: 'Gonflage des os pour des attaques géantes.', level: 88 },
          { name: 'Gear Fourth', type: 'Ultimate', description: 'Combinaison de Haki et élasticité.', level: 92 },
          { name: 'Gear Fifth', type: 'Ultimate', description: 'Éveil du Fruit du Démon, pouvoir divin.', level: 98 },
          { name: 'Conqueror\'s Haki', type: 'Passive', description: 'Haki des Rois, capacité à dominer.', level: 95 }
        ],
        relationships: [
          { name: 'Roronoa Zoro', type: 'Premier Nakama', description: 'Son bras droit inébranlable.' },
          { name: 'Shanks', type: 'Mentor / Idole', description: 'Le pirate qui l\'a inspiré.' },
          { name: 'Ace', type: 'Frère (Décédé)', description: 'Frère adoptif dont la mort l\'a marqué.' }
        ],
        quotes: ['"Je serai le Roi des Pirates!"', '"Je ne mourrai pas!"', '"Mes nakamas sont ma plus grande force!"'],
        achievements: ['Empereur des Mers', 'Défaite de Kaido', 'Prime de 3 milliards de Berrys'],
        weaknesses: ['Ne sait pas nager', 'Impulsif', 'Naïf']
      },
      {
        id: 'zoro',
        name: 'RORONOA ZORO',
        nativeName: 'ロロノア・ゾロ',
        title: 'Pirate Hunter',
        role: 'Swordsman',
        rank: 'VICE-CAPTAIN',
        image: zoroImg,
        description: 'Zoro est un épéiste légendaire utilisant le style à trois sabres, rêvant de devenir le meilleur.',
        fullBio: 'Roronoa Zoro est le premier membre à rejoindre l\'équipage de Luffy. Il aspire à devenir le plus grand épéiste du monde pour honorer la promesse faite à son amie d\'enfance décédée.',
        personality: ['Stoïque', 'Loyal', 'Déterminé', 'Dormeur', 'Protecteur', 'Sens de l\'orientation nul'],
        stats: { power: 94, speed: 88, technique: 95, intelligence: 75, stamina: 95, agility: 85 },
        status: { age: '21', birthday: '11 Novembre', height: '181 cm', weight: '85 kg', bloodType: 'XF', status: 'Alive', occupation: 'Épéiste / Second', origin: 'East Blue' },
        affiliation: { team: 'Équipage du Chapeau de Paille', role: 'Combattant / Vice-Capitaine', allies: ['Monkey D. Luffy', 'Sanji', 'Nami'] },
        skills: [
          { name: 'Three Sword Style', type: 'Attack', description: 'Style unique utilisant trois sabres.', level: 95 },
          { name: 'Armament Haki', type: 'Passive', description: 'Haki de l\'Armement avancé.', level: 92 },
          { name: 'Conqueror\'s Haki', type: 'Passive', description: 'Haki des Rois récemment éveillé.', level: 80 },
          { name: 'Asura', type: 'Ultimate', description: 'Illusion démoniaque créant 9 sabres.', level: 90 }
        ],
        relationships: [
          { name: 'Monkey D. Luffy', type: 'Capitaine', description: 'Loyauté absolue.' },
          { name: 'Sanji', type: 'Rival', description: 'Rivalité constante mais respect mutuel.' },
          { name: 'Mihawk', type: 'Rival / Mentor', description: 'Le plus grand épéiste qu\'il doit surpasser.' }
        ],
        quotes: ['"Rien ne s\'est passé."', '"Je deviendrai le plus grand épéiste du monde!"', '"Je ne perdrai plus jamais!"'],
        equipment: [
          { name: 'Enma', type: 'Sabre', description: 'Sabre légendaire d\'Oden.', rarity: 'Legendary' },
          { name: 'Wado Ichimonji', type: 'Sabre', description: 'Sabre hérité de Kuina.', rarity: 'Legendary' },
          { name: 'Sandai Kitetsu', type: 'Sabre', description: 'Sabre maudit.', rarity: 'Epic' }
        ],
        achievements: ['Défaite de King', 'Maîtrise de Enma', 'Prime de 1.1 milliard'],
        weaknesses: ['Sens de l\'orientation catastrophique', 'Têtu', 'Rivalité avec Sanji']
      },
      {
        id: 'sanji',
        name: 'VINSMOKE SANJI',
        nativeName: 'ヴィンスモーク・サンジ',
        title: 'Black Leg',
        role: 'Cook',
        rank: 'COMMANDER',
        image: sanjiImg,
        description: 'Sanji est le cuisinier de l\'équipage, maître du style de combat "Black Leg".',
        fullBio: 'Prince en fuite de la famille Vinsmoke, Sanji est un cuisinier de génie et un combattant redoutable qui n\'utilise que ses jambes au combat pour protéger ses mains.',
        personality: ['Chevaleresque', 'Passionné', 'Cuisinier dévoué', 'Coureur de jupons', 'Loyal', 'Protecteur'],
        stats: { power: 88, speed: 92, technique: 90, intelligence: 85, stamina: 85, agility: 94 },
        status: { age: '21', birthday: '2 Mars', height: '180 cm', weight: '80 kg', bloodType: 'S', status: 'Alive', occupation: 'Cuisinier / Combattant', origin: 'North Blue' },
        affiliation: { team: 'Équipage du Chapeau de Paille', role: 'Cuisinier', allies: ['Monkey D. Luffy', 'Roronoa Zoro', 'Nami'] },
        skills: [
          { name: 'Black Leg Style', type: 'Attack', description: 'Arts martiaux utilisant uniquement les jambes.', level: 90 },
          { name: 'Diable Jambe', type: 'Attack', description: 'Jambes enflammées par friction.', level: 92 },
          { name: 'Observation Haki', type: 'Passive', description: 'Haki de l\'Observation très développé.', level: 88 },
          { name: 'Ifrit Jambe', type: 'Ultimate', description: 'Évolution de Diable Jambe avec exosquelette.', level: 95 }
        ],
        relationships: [
          { name: 'Roronoa Zoro', type: 'Rival', description: 'Disputes constantes mais confiance totale.' },
          { name: 'Zeff', type: 'Père adoptif', description: 'Lui a tout appris de la cuisine.' },
          { name: 'Nami', type: 'Amour', description: 'Dévoué à elle (comme à toutes les femmes).' }
        ],
        quotes: ['"Je ne frappe jamais une femme."', '"La nourriture est un cadeau des mers!"', '"Je trouverai All Blue!"'],
        achievements: ['Éveil de l\'exosquelette Germa', 'Prime de 1.032 milliard', 'Défaite de Queen'],
        weaknesses: ['Ne peut pas frapper les femmes', 'Susceptible aux charmes féminins', 'Saigne du nez facilement']
      },
      {
        id: 'nami',
        name: 'NAMI',
        nativeName: 'ナミ',
        title: 'Cat Burglar',
        role: 'Navigator',
        rank: 'NAVIGATOR',
        image: namiImg,
        description: 'Nami est la navigatrice géniale de l\'équipage du Chapeau de Paille.',
        fullBio: 'Ancienne voleuse travaillant pour Arlong pour racheter son village, Nami a été libérée par Luffy. Sa capacité à lire le temps et naviguer fait d\'elle un atout irremplaçable.',
        personality: ['Intelligente', 'Cupide', 'Courageuse', 'Protectrice', 'Débrouillarde', 'Loyale'],
        stats: { power: 55, speed: 70, technique: 90, intelligence: 95, stamina: 65, agility: 75 },
        status: { age: '20', birthday: '3 Juillet', height: '170 cm', weight: 'Secret', bloodType: 'X', status: 'Alive', occupation: 'Navigatrice Pirate', origin: 'Village de Cocoyama' },
        affiliation: { team: 'Équipage du Chapeau de Paille', role: 'Navigatrice', allies: ['Monkey D. Luffy', 'Roronoa Zoro', 'Sanji'] },
        skills: [
          { name: 'Clima-Tact', type: 'Attack', description: 'Arme créant des phénomènes météorologiques.', level: 88 },
          { name: 'Thunder Tempo', type: 'Attack', description: 'Crée des éclairs dévastateurs.', level: 85 },
          { name: 'Navigation', type: 'Passive', description: 'Capacité de navigation inégalée.', level: 100 },
          { name: 'Weather Reading', type: 'Passive', description: 'Prédiction météorologique instinctive.', level: 95 }
        ],
        relationships: [
          { name: 'Monkey D. Luffy', type: 'Capitaine', description: 'Lui fait confiance totalement.' },
          { name: 'Nojiko', type: 'Sœur', description: 'Sœur adoptive qu\'elle aime profondément.' },
          { name: 'Sanji', type: 'Nakama', description: 'Utilise son admiration à son avantage.' }
        ],
        quotes: [
          '"お金！" (Okane! - L\'argent!)',
          '"航海士として！" (Koukaishi toshite! - En tant que navigatrice!)',
          '"助けて..." (Tasukete... - À l\'aide...)'
        ],
        equipment: [
          { name: 'Clima-Tact Zeus', type: 'Arme', description: 'Bâton météo avec Zeus intégré.', rarity: 'Legendary' }
        ],
        achievements: ['Prime de 366 millions de Berrys', 'Cartographie de nombreuses îles', 'Maîtrise de Zeus'],
        weaknesses: ['Combat physique limité', 'Cupidité excessive', 'Peur des ennemis puissants']
      },
      {
        id: 'robin',
        name: 'NICO ROBIN',
        nativeName: 'ニコ・ロビン',
        title: 'Devil Child',
        role: 'Archaeologist',
        rank: 'ARCHAEOLOGIST',
        image: robinImg,
        description: 'Robin est l\'archéologue de l\'équipage, seule survivante d\'Ohara capable de lire les Ponéglyphes.',
        fullBio: 'Dernière survivante du massacre d\'Ohara, Robin a vécu en fuite pendant 20 ans. Elle a rejoint l\'équipage de Luffy et a enfin trouvé une famille.',
        personality: ['Calme', 'Intelligente', 'Mystérieuse', 'Morbide', 'Loyale', 'Protectrice'],
        stats: { power: 80, speed: 75, technique: 92, intelligence: 98, stamina: 78, agility: 82 },
        status: { age: '30', birthday: '6 Février', height: '188 cm', weight: 'Secret', bloodType: 'S', status: 'Alive', occupation: 'Archéologue Pirate', origin: 'Ohara' },
        affiliation: { team: 'Équipage du Chapeau de Paille', role: 'Archéologue', allies: ['Monkey D. Luffy', 'Franky', 'Saul'], previousAffiliations: ['Baroque Works'] },
        skills: [
          { name: 'Hana Hana no Mi', type: 'Attack', description: 'Peut faire pousser des parties de son corps partout.', level: 95 },
          { name: 'Demonio Fleur', type: 'Ultimate', description: 'Forme démoniaque géante.', level: 92 },
          { name: 'Poneglyph Reading', type: 'Passive', description: 'Seule personne vivante capable de lire les Ponéglyphes.', level: 100 }
        ],
        relationships: [
          { name: 'Monkey D. Luffy', type: 'Capitaine', description: 'Lui a donné une raison de vivre.' },
          { name: 'Saul', type: 'Ami (Décédé)', description: 'Lui a appris à sourire.' }
        ],
        quotes: [
          '"生きたい！" (Ikitai! - Je veux vivre!)',
          '"歴史の真実..." (Rekishi no shinjitsu... - La vérité de l\'histoire...)',
          '"ふふふ..." (Fufufu... - Rire caractéristique)'
        ],
        achievements: ['Prime de 930 millions de Berrys', 'Éveil du Hana Hana no Mi', 'Lecture de nombreux Ponéglyphes'],
        weaknesses: ['Vulnérable à l\'eau de mer', 'Passé traumatique', 'Pensées morbides']
      }
    ]
  },
  {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    titleJapanese: '進撃の巨人',
    description: 'L\'humanité vit retranchée derrière des murs gigantesques pour se protéger des Titans mangeurs d\'hommes.',
    fullDescription: 'Attack on Titan suit Eren Yeager dont la vie bascule quand les Titans détruisent sa ville et tuent sa mère. Il rejoint le Bataillon d\'Exploration pour exterminer les Titans et découvrir les secrets du monde.',
    image: erenImg,
    banner: aotBanner,
    theme: 'theme-aot',
    genre: ['Action', 'Dark Fantasy', 'Post-apocalyptique'],
    year: 2013,
    episodes: 94,
    rating: 9.1,
    studio: 'Wit Studio / MAPPA',
    status: 'Completed',
    characters: [
      {
        id: 'eren',
        name: 'EREN YEAGER',
        nativeName: 'エレン・イェーガー',
        title: 'Attack Titan',
        role: 'Titan Shifter',
        rank: 'FOUNDING TITAN',
        image: erenImg,
        description: 'Eren Yeager possède le pouvoir du Titan Assaillant et du Titan Originel.',
        fullBio: 'Après avoir vu sa mère dévorée par un Titan, Eren a juré d\'exterminer tous les Titans. Il a découvert qu\'il pouvait lui-même se transformer en Titan, changeant le cours de l\'histoire.',
        personality: ['Déterminé', 'Vengeur', 'Passionné', 'Imprévisible', 'Protecteur', 'Complexe'],
        stats: { power: 95, speed: 85, technique: 80, intelligence: 88, stamina: 90, agility: 82 },
        status: { age: '19', birthday: '30 Mars', height: '183 cm', weight: '82 kg', bloodType: 'A', status: 'Deceased', occupation: 'Soldat / Titan Shifter', origin: 'Shiganshina' },
        affiliation: { team: 'Bataillon d\'Exploration', role: 'Titan Shifter', allies: ['Mikasa Ackerman', 'Armin Arlert', 'Levi Ackerman'] },
        skills: [
          { name: 'Attack Titan', type: 'Ultimate', description: 'Titan de 15m avec une force immense.', level: 92 },
          { name: 'Founding Titan', type: 'Ultimate', description: 'Contrôle de tous les Titans et mémoires.', level: 98 },
          { name: 'War Hammer Titan', type: 'Attack', description: 'Création d\'armes à partir du durcissement.', level: 85 },
          { name: 'Hardening', type: 'Defense', description: 'Durcissement de la peau en cristal.', level: 88 }
        ],
        relationships: [
          { name: 'Mikasa Ackerman', type: 'Famille adoptive', description: 'Lien profond et complexe.' },
          { name: 'Armin Arlert', type: 'Meilleur Ami', description: 'Ami d\'enfance.' },
          { name: 'Zeke Yeager', type: 'Demi-Frère', description: 'Relation compliquée.' }
        ],
        quotes: ['"Je vais tous les exterminer!"', '"Tatakae."', '"Je suis libre."'],
        achievements: ['Activation du Grondement', 'Défaite de Reiner', 'Obtention du Founding Titan'],
        weaknesses: ['Durée de vie limitée', 'Obsession de la liberté', 'Actions moralement ambiguës']
      },
      {
        id: 'levi',
        name: 'LEVI ACKERMAN',
        nativeName: 'リヴァイ・アッカーマン',
        title: 'Humanity\'s Strongest',
        role: 'Captain',
        rank: 'CAPTAIN',
        image: leviImg,
        description: 'Levi est considéré comme le soldat le plus puissant de l\'humanité.',
        fullBio: 'Né dans les bas-fonds, Levi est devenu le soldat le plus redouté du Bataillon d\'Exploration. Sa force surhumaine et sa maîtrise du combat anti-titan sont légendaires.',
        personality: ['Stoïque', 'Propre (obsessionnel)', 'Protecteur', 'Sarcastique', 'Loyal', 'Traumatisé'],
        stats: { power: 98, speed: 99, technique: 100, intelligence: 90, stamina: 85, agility: 100 },
        status: { age: '30+', birthday: '25 Décembre', height: '160 cm', weight: '65 kg', bloodType: 'A', status: 'Alive', occupation: 'Capitaine', origin: 'Bas-fonds de Mitras' },
        affiliation: { team: 'Bataillon d\'Exploration', role: 'Capitaine de l\'Escouade Spéciale', allies: ['Erwin Smith', 'Hange Zoë', 'Eren Yeager'] },
        skills: [
          { name: 'ODM Gear Mastery', type: 'Passive', description: 'Maîtrise absolue de l\'équipement tridimensionnel.', level: 100 },
          { name: 'Ackerman Power', type: 'Passive', description: 'Force surhumaine héréditaire.', level: 98 },
          { name: 'Spinning Slash', type: 'Attack', description: 'Technique de rotation tranchante.', level: 95 },
          { name: 'Thunder Spears', type: 'Attack', description: 'Utilisation experte des lances foudroyantes.', level: 90 }
        ],
        relationships: [
          { name: 'Erwin Smith', type: 'Commandant', description: 'Loyauté absolue et respect.' },
          { name: 'Hange Zoë', type: 'Camarade', description: 'Partenaire de longue date.' },
          { name: 'Kenny Ackerman', type: 'Oncle (Décédé)', description: 'L\'a élevé dans les bas-fonds.' }
        ],
        quotes: ['"Ne regrette rien."', '"Tch."', '"Je vais le découper."'],
        equipment: [
          { name: 'ODM Gear Personnalisé', type: 'Équipement', description: 'Équipement modifié pour sa taille.', rarity: 'Legendary' },
          { name: 'Lames en Acier Renforcé', type: 'Arme', description: 'Lames de qualité supérieure.', rarity: 'Epic' }
        ],
        achievements: ['Plus de 200 Titans éliminés', 'Défaite de la Bête plusieurs fois', 'Survie à Zeke'],
        weaknesses: ['Taille', 'Blessures accumulées', 'Perte de ses camarades']
      },
      {
        id: 'mikasa',
        name: 'MIKASA ACKERMAN',
        nativeName: 'ミカサ・アッカーマン',
        title: 'Mikasa',
        role: 'Scout',
        rank: 'TOP SOLDIER',
        image: mikasaImg,
        description: 'Mikasa est l\'une des meilleures soldates de l\'humanité, dévouée à protéger Eren.',
        fullBio: 'Après avoir perdu ses parents et été sauvée par Eren enfant, Mikasa a développé une dévotion absolue envers lui. Elle possède la force surhumaine des Ackerman.',
        personality: ['Protectrice', 'Stoïque', 'Dévouée', 'Forte', 'Émotionnellement réservée', 'Loyale'],
        stats: { power: 95, speed: 96, technique: 98, intelligence: 85, stamina: 90, agility: 96 },
        status: { age: '19', birthday: '10 Février', height: '170 cm', weight: '68 kg', bloodType: 'AB', status: 'Alive', occupation: 'Soldat', origin: 'Shiganshina' },
        affiliation: { team: 'Bataillon d\'Exploration', role: 'Soldat d\'élite', allies: ['Eren Yeager', 'Armin Arlert', 'Levi Ackerman'] },
        skills: [
          { name: 'ODM Gear Mastery', type: 'Passive', description: 'Maîtrise exceptionnelle de l\'équipement.', level: 97 },
          { name: 'Ackerman Power', type: 'Passive', description: 'Force surhumaine héréditaire.', level: 95 },
          { name: 'Combat Instinct', type: 'Passive', description: 'Réflexes de combat innés.', level: 94 }
        ],
        relationships: [
          { name: 'Eren Yeager', type: 'Famille / Amour', description: 'Centre de son monde.' },
          { name: 'Armin Arlert', type: 'Ami', description: 'Ami proche depuis l\'enfance.' },
          { name: 'Levi Ackerman', type: 'Famille', description: 'Partage le sang Ackerman.' }
        ],
        quotes: ['"Eren..."', '"Je suis forte."', '"Je le protégerai toujours."'],
        achievements: ['Top 1 de sa promotion', 'Nombreux Titans éliminés', 'Fin du Grondement'],
        weaknesses: ['Obsession pour Eren', 'Difficulté émotionnelle', 'Manque d\'indépendance']
      },
      {
        id: 'armin',
        name: 'ARMIN ARLERT',
        nativeName: 'アルミン・アルレルト',
        title: 'Colossal Titan',
        role: 'Strategist',
        rank: 'COMMANDER',
        image: arminImg,
        description: 'Armin est le stratège génial de l\'équipe et détenteur du Titan Colossal.',
        fullBio: 'Physiquement faible mais intellectuellement brillant, Armin a toujours rêvé de voir le monde extérieur. Il est devenu le stratège le plus important de l\'humanité et a hérité du Titan Colossal.',
        personality: ['Intelligent', 'Courageux', 'Empathique', 'Stratégique', 'Déterminé', 'Idéaliste'],
        stats: { power: 90, speed: 70, technique: 75, intelligence: 100, stamina: 75, agility: 72 },
        status: { age: '19', birthday: '3 Novembre', height: '163 cm', weight: '55 kg', bloodType: 'A', status: 'Alive', occupation: 'Commandant', origin: 'Shiganshina' },
        affiliation: { team: 'Bataillon d\'Exploration', role: 'Commandant', allies: ['Eren Yeager', 'Mikasa Ackerman', 'Jean Kirstein'] },
        skills: [
          { name: 'Colossal Titan', type: 'Ultimate', description: 'Titan de 60m avec explosion de transformation.', level: 95 },
          { name: 'Strategic Mind', type: 'Passive', description: 'Capacité d\'analyse et stratégie exceptionnelle.', level: 100 },
          { name: 'ODM Gear', type: 'Support', description: 'Utilisation de l\'équipement tridimensionnel.', level: 75 }
        ],
        relationships: [
          { name: 'Eren Yeager', type: 'Meilleur Ami', description: 'Ami d\'enfance malgré les conflits.' },
          { name: 'Mikasa Ackerman', type: 'Amie', description: 'Trio inséparable depuis l\'enfance.' },
          { name: 'Annie Leonhart', type: 'Intérêt', description: 'Relation complexe et ambiguë.' }
        ],
        quotes: [
          '"海を見たい..." (Umi wo mitai... - Je veux voir la mer...)',
          '"誰かの特別になりたい。" (Dareka no tokubetsu ni naritai - Je veux être spécial pour quelqu\'un.)',
          '"戦わなければ勝てない。" (Tatakawanakereba katenai - Si on ne se bat pas, on ne peut pas gagner.)'
        ],
        achievements: ['Commandant du Bataillon', 'Héritage du Titan Colossal', 'Fin de la guerre'],
        weaknesses: ['Force physique limitée', 'Durée de vie réduite', 'Culpabilité']
      },
      {
        id: 'erwin',
        name: 'ERWIN SMITH',
        nativeName: 'エルヴィン・スミス',
        title: 'The Devil',
        role: 'Commander',
        rank: 'COMMANDER',
        image: erwinImg,
        description: 'Erwin était le commandant charismatique du Bataillon d\'Exploration.',
        fullBio: 'Leader visionnaire et stratège brillant, Erwin a mené le Bataillon vers la découverte de la vérité sur les Titans. Sa détermination et ses sacrifices ont changé le cours de l\'histoire.',
        personality: ['Charismatique', 'Déterminé', 'Stratégique', 'Sacrificiel', 'Mystérieux', 'Inspirant'],
        stats: { power: 80, speed: 82, technique: 88, intelligence: 98, stamina: 85, agility: 80 },
        status: { age: '35', birthday: '14 Octobre', height: '188 cm', weight: '92 kg', bloodType: 'AB', status: 'Deceased', occupation: 'Commandant', origin: 'Mur Rose' },
        affiliation: { team: 'Bataillon d\'Exploration', role: 'Commandant', allies: ['Levi Ackerman', 'Hange Zoë', 'Mike Zacharias'] },
        skills: [
          { name: 'Leadership', type: 'Passive', description: 'Capacité à inspirer et diriger.', level: 100 },
          { name: 'Strategy', type: 'Passive', description: 'Plans tactiques brillants.', level: 98 },
          { name: 'ODM Gear', type: 'Attack', description: 'Compétent même avec un bras.', level: 85 }
        ],
        relationships: [
          { name: 'Levi Ackerman', type: 'Bras Droit', description: 'Confiance absolue mutuelle.' },
          { name: 'Hange Zoë', type: 'Successeur', description: 'A transmis son héritage.' }
        ],
        quotes: [
          '"心臓を捧げよ!" (Shinzou wo sasageyo! - Offrez vos cœurs!)',
          '"進め！" (Susume! - En avant!)',
          '"私は... 真実を知りたかった。" (Watashi wa... shinjitsu wo shiritakatta - Je voulais... connaître la vérité.)'
        ],
        achievements: ['Récupération de Shiganshina', 'Découverte de la vérité', 'Charge finale légendaire'],
        weaknesses: ['Obsession de la vérité', 'Sacrifice de nombreux soldats', 'Mort']
      }
    ]
  },
  {
    id: 'dragon-ball',
    title: 'Dragon Ball',
    titleJapanese: 'ドラゴンボール',
    description: 'L\'histoire du plus grand guerrier de l\'univers, de son enfance jusqu\'à ses combats contre des dieux.',
    fullDescription: 'Dragon Ball suit Son Goku, un Saiyan envoyé sur Terre enfant, devenu le plus puissant guerrier de l\'univers. De la recherche des Dragon Balls à ses combats contre des dieux de la destruction.',
    image: gokuImg,
    banner: dragonballBanner,
    theme: 'theme-dragonball',
    genre: ['Action', 'Aventure', 'Arts Martiaux'],
    year: 1986,
    episodes: 575,
    rating: 8.8,
    studio: 'Toei Animation',
    status: 'Ongoing',
    characters: [
      {
        id: 'goku',
        name: 'SON GOKU',
        nativeName: '孫悟空',
        title: 'Kakarot',
        role: 'Saiyan Warrior',
        rank: 'ANGEL LEVEL',
        image: gokuImg,
        description: 'Goku est un Saiyan élevé sur Terre, devenu le plus puissant guerrier de l\'univers.',
        fullBio: 'Envoyé sur Terre bébé pour la conquérir, Goku a perdu la mémoire et est devenu le plus grand défenseur de l\'univers. Sa quête de dépassement et son cœur pur l\'ont amené à atteindre des niveaux de puissance divins.',
        personality: ['Joyeux', 'Naïf', 'Passionné', 'Protecteur', 'Obsédé par le combat', 'Pur'],
        stats: { power: 100, speed: 100, technique: 95, intelligence: 60, stamina: 100, agility: 98 },
        status: { age: '43', birthday: '16 Avril', height: '175 cm', weight: '62 kg', bloodType: 'Saiyan', status: 'Alive', occupation: 'Guerrier', origin: 'Planète Vegeta' },
        affiliation: { team: 'Z Fighters', role: 'Leader', allies: ['Vegeta', 'Gohan', 'Piccolo', 'Krillin'] },
        skills: [
          { name: 'Kamehameha', type: 'Ultimate', description: 'Vague d\'énergie signature.', level: 100 },
          { name: 'Ultra Instinct', type: 'Ultimate', description: 'État où le corps réagit seul.', level: 95 },
          { name: 'Instant Transmission', type: 'Support', description: 'Téléportation instantanée.', level: 98 },
          { name: 'Spirit Bomb', type: 'Ultimate', description: 'Énergie empruntée à tous les êtres vivants.', level: 92 },
          { name: 'Super Saiyan Forms', type: 'Passive', description: 'Transformations multipliant la puissance.', level: 100 }
        ],
        relationships: [
          { name: 'Vegeta', type: 'Rival / Ami', description: 'Rivaux éternels devenus amis.' },
          { name: 'Chi-Chi', type: 'Épouse', description: 'Sa femme dévouée.' },
          { name: 'Gohan', type: 'Fils', description: 'Son fils aîné.' }
        ],
        quotes: ['"Je suis Son Goku, et je suis un Saiyan de la Terre!"', '"Kamehameha!"', '"Je vais te surpasser!"'],
        achievements: ['Défaite de Frieza', 'Maîtrise de l\'Ultra Instinct', 'Défaite de Jiren'],
        weaknesses: ['Naïveté', 'Néglige sa famille', 'Donne des chances aux ennemis']
      },
      {
        id: 'vegeta',
        name: 'VEGETA',
        nativeName: 'ベジータ',
        title: 'Prince of Saiyans',
        role: 'Saiyan Prince',
        rank: 'GOD LEVEL',
        image: vegetaImg,
        description: 'Vegeta est le prince des Saiyans, rival éternel de Goku.',
        fullBio: 'Prince de la race guerrière Saiyan, Vegeta est venu sur Terre en conquérant mais est devenu l\'un de ses plus grands protecteurs. Sa fierté et sa détermination à surpasser Goku le poussent toujours plus loin.',
        personality: ['Fier', 'Déterminé', 'Arrogant', 'Protecteur', 'Honorable', 'Évolutif'],
        stats: { power: 98, speed: 97, technique: 92, intelligence: 85, stamina: 95, agility: 95 },
        status: { age: '48', birthday: 'Inconnu', height: '164 cm', weight: '56 kg', bloodType: 'Saiyan', status: 'Alive', occupation: 'Guerrier', origin: 'Planète Vegeta' },
        affiliation: { team: 'Z Fighters', role: 'Membre', allies: ['Son Goku', 'Bulma', 'Trunks'], previousAffiliations: ['Armée de Frieza'] },
        skills: [
          { name: 'Final Flash', type: 'Ultimate', description: 'Attaque d\'énergie dévastatrice.', level: 98 },
          { name: 'Big Bang Attack', type: 'Attack', description: 'Sphère d\'énergie concentrée.', level: 95 },
          { name: 'Ultra Ego', type: 'Ultimate', description: 'Forme divine destructrice.', level: 90 },
          { name: 'Galick Gun', type: 'Attack', description: 'Technique d\'énergie classique.', level: 92 }
        ],
        relationships: [
          { name: 'Son Goku', type: 'Rival', description: 'Rivalité définissant son existence.' },
          { name: 'Bulma', type: 'Épouse', description: 'L\'a transformé.' },
          { name: 'Trunks', type: 'Fils', description: 'Sa plus grande fierté.' }
        ],
        quotes: ['"Je suis le Prince des Saiyans!"', '"Kakarot!"', '"La fierté d\'un Saiyan n\'a pas de limites!"'],
        achievements: ['Maîtrise de l\'Ultra Ego', 'Défaite de Toppo', 'Rédemption complète'],
        weaknesses: ['Orgueil excessif', 'Obsession de Goku', 'Passé sombre']
      },
      {
        id: 'gohan',
        name: 'SON GOHAN',
        nativeName: '孫悟飯',
        title: 'The Scholar Warrior',
        role: 'Half-Saiyan',
        rank: 'ULTIMATE',
        image: gohanImg,
        description: 'Gohan est le fils aîné de Goku, un hybride Saiyan-Humain au potentiel illimité.',
        fullBio: 'Fils de Goku et Chi-Chi, Gohan possède un potentiel de combat supérieur à celui de son père. Malgré sa préférence pour les études, il a sauvé le monde à plusieurs reprises.',
        personality: ['Intelligent', 'Gentil', 'Courageux', 'Studieux', 'Protecteur', 'Pacifiste'],
        stats: { power: 98, speed: 92, technique: 88, intelligence: 95, stamina: 90, agility: 90 },
        status: { age: '23', birthday: '18 Mai', height: '176 cm', weight: '61 kg', bloodType: 'Saiyan/Humain', status: 'Alive', occupation: 'Chercheur', origin: 'Mont Paozu' },
        affiliation: { team: 'Z Fighters', role: 'Membre', allies: ['Son Goku', 'Piccolo', 'Videl'] },
        skills: [
          { name: 'Masenko', type: 'Attack', description: 'Technique enseignée par Piccolo.', level: 85 },
          { name: 'Kamehameha', type: 'Attack', description: 'Technique héritée de son père.', level: 90 },
          { name: 'Beast Form', type: 'Ultimate', description: 'Transformation ultime libérant tout son potentiel.', level: 100 },
          { name: 'Potential Unleashed', type: 'Passive', description: 'Potentiel débloqué par le Kaïoshin.', level: 95 }
        ],
        relationships: [
          { name: 'Son Goku', type: 'Père', description: 'Admiration et respect mutuel.' },
          { name: 'Piccolo', type: 'Mentor / Ami', description: 'Lien père-fils plus fort qu\'avec Goku.' },
          { name: 'Videl', type: 'Épouse', description: 'Amour de sa vie.' }
        ],
        quotes: [
          '"もう止まれない!" (Mou tomarenai! - Je ne peux plus m\'arrêter!)',
          '"父さんを... 許さない!" (Tou-san wo... yurusanai! - Je ne te pardonnerai pas... pour papa!)',
          '"僕は学者になりたい。" (Boku wa gakusha ni naritai - Je veux devenir chercheur.)'
        ],
        achievements: ['Défaite de Cell', 'Beast Form', 'Équilibre vie de famille et combats'],
        weaknesses: ['Manque d\'entraînement', 'Trop pacifiste', 'Potentiel sous-utilisé']
      },
      {
        id: 'piccolo',
        name: 'PICCOLO',
        nativeName: 'ピッコロ',
        title: 'The Namekian Warrior',
        role: 'Namekian',
        rank: 'GOD LEVEL',
        image: piccoloImg,
        description: 'Piccolo est un guerrier Namek, autrefois ennemi de Goku devenu l\'un de ses plus grands alliés.',
        fullBio: 'Réincarnation du Roi Piccolo, il était destiné à détruire Goku. Mais en entraînant Gohan, il a découvert sa capacité à aimer et est devenu un protecteur de la Terre.',
        personality: ['Stoïque', 'Sage', 'Protecteur', 'Stratégique', 'Froid', 'Dévoué'],
        stats: { power: 92, speed: 88, technique: 90, intelligence: 92, stamina: 88, agility: 86 },
        status: { age: 'Inconnu', birthday: '9 Mai', height: '226 cm', weight: '116 kg', bloodType: 'Namek', status: 'Alive', occupation: 'Guerrier / Mentor', origin: 'Planète Namek' },
        affiliation: { team: 'Z Fighters', role: 'Membre', allies: ['Son Gohan', 'Son Goku', 'Vegeta'] },
        skills: [
          { name: 'Special Beam Cannon', type: 'Attack', description: 'Rayon perçant concentré.', level: 90 },
          { name: 'Orange Piccolo', type: 'Ultimate', description: 'Transformation ultime via Shenron.', level: 98 },
          { name: 'Regeneration', type: 'Passive', description: 'Régénération des membres.', level: 85 },
          { name: 'Fusion', type: 'Support', description: 'Fusion avec d\'autres Nameks.', level: 88 }
        ],
        relationships: [
          { name: 'Son Gohan', type: 'Élève / Fils adoptif', description: 'Le considère comme son fils.' },
          { name: 'Son Goku', type: 'Ami / Rival', description: 'D\'ennemi à allié.' }
        ],
        quotes: [
          '"逃げろ悟飯!" (Nigero Gohan! - Fuis Gohan!)',
          '"俺は神と悪魔の融合体だ。" (Ore wa kami to akuma no yuugoutai da - Je suis la fusion d\'un dieu et d\'un démon.)',
          '"死ぬな!" (Shinu na! - Ne meurs pas!)'
        ],
        achievements: ['Fusion avec Kami', 'Orange Piccolo', 'Mentor de Gohan'],
        weaknesses: ['Eau (Nameks n\'en ont pas besoin)', 'Attachement à Gohan', 'Origine démoniaque']
      }
    ]
  },
  {
    id: 'death-note',
    title: 'Death Note',
    titleJapanese: 'デスノート',
    description: 'Un étudiant trouve un carnet qui tue quiconque dont le nom y est écrit.',
    fullDescription: 'Death Note suit Light Yagami, un étudiant brillant qui trouve le Death Note, un carnet permettant de tuer n\'importe qui en écrivant son nom. Il décide de créer un monde sans criminels, mais doit affronter le détective L.',
    image: lightImg,
    banner: deathnoteBanner,
    theme: 'theme-deathnote',
    genre: ['Thriller', 'Psychologique', 'Surnaturel'],
    year: 2006,
    episodes: 37,
    rating: 9.0,
    studio: 'Madhouse',
    status: 'Completed',
    characters: [
      {
        id: 'light',
        name: 'LIGHT YAGAMI',
        nativeName: '夜神月',
        title: 'Kira',
        role: 'Death Note Owner',
        rank: 'GOD OF NEW WORLD',
        image: lightImg,
        description: 'Light Yagami est un génie qui utilise le Death Note pour créer un monde sans criminels.',
        fullBio: 'Étudiant modèle et fils d\'un policier, Light découvre le Death Note et décide de devenir le dieu d\'un nouveau monde sans crime. Son intelligence et sa manipulation le rendent presque impossible à attraper.',
        personality: ['Intelligent', 'Calculateur', 'Charismatique', 'Mégalomane', 'Manipulateur', 'Ambitieux'],
        stats: { power: 30, speed: 40, technique: 100, intelligence: 100, stamina: 60, agility: 45 },
        status: { age: '23', birthday: '28 Février', height: '179 cm', weight: '54 kg', bloodType: 'A', status: 'Deceased', occupation: 'Étudiant / Kira', origin: 'Tokyo, Japon' },
        affiliation: { team: 'Aucune', role: 'Kira', allies: ['Misa Amane', 'Ryuk', 'Mikami Teru'] },
        skills: [
          { name: 'Death Note', type: 'Ultimate', description: 'Tue en écrivant un nom.', level: 100 },
          { name: 'Manipulation', type: 'Passive', description: 'Maître dans l\'art de manipuler.', level: 98 },
          { name: 'Déduction', type: 'Passive', description: 'Intelligence analytique exceptionnelle.', level: 97 },
          { name: 'Acting', type: 'Support', description: 'Dissimulation parfaite de ses intentions.', level: 95 }
        ],
        relationships: [
          { name: 'L', type: 'Nemesis', description: 'Duel intellectuel mortel.' },
          { name: 'Ryuk', type: 'Shinigami', description: 'Le dieu de la mort qui lui a donné le carnet.' },
          { name: 'Misa Amane', type: 'Alliée / Outil', description: 'L\'utilise pour ses yeux de Shinigami.' }
        ],
        quotes: ['"Je suis Kira."', '"Je serai le dieu du nouveau monde!"', '"Exactement comme prévu."'],
        equipment: [
          { name: 'Death Note', type: 'Artefact', description: 'Carnet du Shinigami Ryuk.', rarity: 'Mythic' }
        ],
        achievements: ['Éliminé des milliers de criminels', 'Dupé le monde entier', 'Défait L'],
        weaknesses: ['Ego démesuré', 'Dépendance au Death Note', 'Incapacité à voir les noms']
      },
      {
        id: 'l-lawliet',
        name: 'L LAWLIET',
        nativeName: 'エル・ローライト',
        title: 'World\'s Greatest Detective',
        role: 'Detective',
        rank: 'L',
        image: lLawlietImg,
        description: 'L est le plus grand détective du monde, seul capable de défier Kira.',
        fullBio: 'Détective de génie travaillant dans l\'ombre, L est le seul à avoir compris que Kira existait et à avoir trouvé des indices menant à Light. Ses méthodes peu orthodoxes et son intelligence rivalisent avec celles de Kira.',
        personality: ['Excentrique', 'Génial', 'Asocial', 'Observateur', 'Obstiné', 'Mystérieux'],
        stats: { power: 25, speed: 35, technique: 98, intelligence: 100, stamina: 50, agility: 40 },
        status: { age: '25', birthday: '31 Octobre', height: '179 cm', weight: '50 kg', bloodType: 'Inconnu', status: 'Deceased', occupation: 'Détective', origin: 'Angleterre' },
        affiliation: { team: 'Force d\'enquête Kira', role: 'Leader', allies: ['Watari', 'Near', 'Mello'] },
        skills: [
          { name: 'Déduction', type: 'Passive', description: 'Capacité d\'analyse inégalée.', level: 100 },
          { name: 'Observation', type: 'Passive', description: 'Détection des moindres détails.', level: 98 },
          { name: 'Manipulation', type: 'Support', description: 'Sait pousser ses suspects à se révéler.', level: 92 },
          { name: 'Capoeira', type: 'Attack', description: 'Arts martiaux brésiliens.', level: 75 }
        ],
        relationships: [
          { name: 'Light Yagami', type: 'Nemesis', description: 'Le seul adversaire à sa mesure.' },
          { name: 'Watari', type: 'Assistant / Père adoptif', description: 'Son seul véritable allié.' },
          { name: 'Near', type: 'Successeur', description: 'A hérité de son titre.' }
        ],
        quotes: ['"Si tu ne peux pas gagner au jeu, si tu ne peux pas résoudre le puzzle, tu es juste un perdant."', '"Je soupçonne Light Yagami d\'être Kira à 5%."', '"Je suis la justice."'],
        achievements: ['Identification de Kira', 'Résolution de nombreuses affaires mondiales', 'Formation de Near et Mello'],
        weaknesses: ['Obsession pour les sucreries', 'Méthodes parfois illégales', 'Isolement social']
      },
      {
        id: 'misa',
        name: 'MISA AMANE',
        nativeName: '弥海砂',
        title: 'Second Kira',
        role: 'Death Note Owner',
        rank: 'KIRA',
        image: misaImg,
        description: 'Misa est une idole pop dévouée à Kira après qu\'il ait tué le meurtrier de ses parents.',
        fullBio: 'Model et idole pop, Misa possède les yeux de Shinigami lui permettant de voir les vrais noms. Son amour obsessionnel pour Light fait d\'elle un outil précieux mais dangereux.',
        personality: ['Dévouée', 'Naïve', 'Enjouée', 'Obsessionnelle', 'Manipulable', 'Courageuse'],
        stats: { power: 20, speed: 45, technique: 60, intelligence: 55, stamina: 50, agility: 50 },
        status: { age: '19', birthday: '25 Décembre', height: '152 cm', weight: '36 kg', bloodType: 'AB', status: 'Deceased', occupation: 'Idole / Second Kira', origin: 'Kyoto, Japon' },
        affiliation: { team: 'Kira', role: 'Second Kira', allies: ['Light Yagami', 'Rem'] },
        skills: [
          { name: 'Shinigami Eyes', type: 'Passive', description: 'Voit les vrais noms et durée de vie.', level: 100 },
          { name: 'Death Note', type: 'Ultimate', description: 'Possède son propre Death Note.', level: 85 },
          { name: 'Acting', type: 'Support', description: 'Compétences d\'actrice pour la dissimulation.', level: 75 }
        ],
        relationships: [
          { name: 'Light Yagami', type: 'Amour (non réciproque)', description: 'Dévouée jusqu\'à la mort.' },
          { name: 'Rem', type: 'Shinigami', description: 'La protège par amour.' }
        ],
        quotes: [
          '"ライトは私の全て!" (Light wa watashi no subete! - Light est tout pour moi!)',
          '"キラのために死ねる。" (Kira no tame ni shineru - Je peux mourir pour Kira.)',
          '"ミサミサだよ～" (Misa-Misa da yo~ - C\'est Misa-Misa~)'
        ],
        equipment: [
          { name: 'Death Note', type: 'Artefact', description: 'Carnet de la Shinigami Rem.', rarity: 'Mythic' }
        ],
        achievements: ['Identification de nombreuses cibles pour Kira', 'Survie malgré les enquêtes', 'Yeux de Shinigami'],
        weaknesses: ['Amour aveugle', 'Intelligence limitée', 'Facilement manipulée']
      },
      {
        id: 'ryuk',
        name: 'RYUK',
        nativeName: 'リューク',
        title: 'The Bored Shinigami',
        role: 'Shinigami',
        rank: 'DEATH GOD',
        image: ryukImg,
        description: 'Ryuk est le Shinigami qui a laissé tomber le Death Note sur Terre par ennui.',
        fullBio: 'Dieu de la mort s\'ennuyant dans son monde, Ryuk a laissé un Death Note tomber sur Terre pour s\'amuser. Il observe les actions de Light avec un intérêt détaché.',
        personality: ['Ennuyé', 'Amusé', 'Neutre', 'Addictif aux pommes', 'Observateur', 'Imprévisible'],
        stats: { power: 100, speed: 90, technique: 85, intelligence: 80, stamina: 100, agility: 88 },
        status: { age: 'Éternel', birthday: 'Inconnu', height: '230 cm', weight: 'Inconnu', bloodType: 'Aucun', status: 'Alive', occupation: 'Shinigami', origin: 'Monde des Shinigami' },
        affiliation: { team: 'Aucune', role: 'Observateur', allies: ['Light Yagami (temporaire)'] },
        skills: [
          { name: 'Death Note', type: 'Ultimate', description: 'Pouvoir de tuer en écrivant un nom.', level: 100 },
          { name: 'Invisibility', type: 'Passive', description: 'Invisible à ceux sans Death Note.', level: 100 },
          { name: 'Flight', type: 'Support', description: 'Capacité de voler.', level: 95 },
          { name: 'Immortality', type: 'Passive', description: 'Vie éternelle de Shinigami.', level: 100 }
        ],
        relationships: [
          { name: 'Light Yagami', type: 'Divertissement', description: 'L\'observe par amusement.' }
        ],
        quotes: [
          '"人間って面白い。" (Ningen tte omoshiroi - Les humains sont intéressants.)',
          '"リンゴ..." (Ringo... - Des pommes...)',
          '"俺は退屈だった。" (Ore wa taikutsu datta - Je m\'ennuyais.)'
        ],
        achievements: ['Initiateur de l\'affaire Kira', 'Observateur neutre', 'Fin de Light'],
        weaknesses: ['Addiction aux pommes', 'Ennui constant', 'Attachement interdit aux humains']
      }
    ]
  },
  {
    id: 'bleach',
    title: 'Bleach',
    titleJapanese: 'ブリーチ',
    description: 'Un adolescent obtient les pouvoirs d\'un Shinigami et doit protéger les vivants et les morts.',
    fullDescription: 'Bleach suit Ichigo Kurosaki, un adolescent capable de voir les fantômes qui obtient les pouvoirs d\'une Shinigami nommée Rukia. Il doit maintenant protéger les humains des Hollows et naviguer dans le monde de la Soul Society.',
    image: ichigoImg,
    banner: bleachBanner,
    theme: 'theme-bleach',
    genre: ['Action', 'Surnaturel', 'Aventure'],
    year: 2004,
    episodes: 366,
    rating: 8.2,
    studio: 'Pierrot',
    status: 'Completed',
    characters: [
      {
        id: 'ichigo',
        name: 'ICHIGO KUROSAKI',
        nativeName: '黒崎一護',
        title: 'Substitute Shinigami',
        role: 'Shinigami',
        rank: 'TRANSCENDENT',
        image: ichigoImg,
        description: 'Ichigo est un Shinigami substitut possédant des pouvoirs de Hollow, Quincy et Shinigami.',
        fullBio: 'Ichigo Kurosaki a toujours pu voir les fantômes. Après avoir obtenu les pouvoirs de Rukia, il découvre qu\'il est en fait un hybride unique combinant les pouvoirs de Shinigami, Hollow, Quincy et Fullbring.',
        personality: ['Protecteur', 'Déterminé', 'Impulsif', 'Loyal', 'Grognon', 'Courageux'],
        stats: { power: 98, speed: 95, technique: 85, intelligence: 75, stamina: 92, agility: 90 },
        status: { age: '17', birthday: '15 Juillet', height: '181 cm', weight: '66 kg', bloodType: 'A', status: 'Alive', occupation: 'Étudiant / Shinigami Substitut', origin: 'Karakura Town' },
        affiliation: { team: 'Soul Society (Allié)', role: 'Shinigami Substitut', allies: ['Rukia Kuchiki', 'Renji Abarai', 'Uryu Ishida', 'Chad'] },
        skills: [
          { name: 'Getsuga Tensho', type: 'Attack', description: 'Onde d\'énergie spirituelle tranchante.', level: 95 },
          { name: 'Bankai: Tensa Zangetsu', type: 'Ultimate', description: 'Forme compressée amplifiant vitesse et puissance.', level: 98 },
          { name: 'Hollowfication', type: 'Passive', description: 'Accès aux pouvoirs Hollow.', level: 90 },
          { name: 'Blut', type: 'Defense', description: 'Technique Quincy héritée.', level: 80 },
          { name: 'Gran Rey Cero', type: 'Attack', description: 'Cero de niveau Espada.', level: 85 }
        ],
        relationships: [
          { name: 'Rukia Kuchiki', type: 'Amie proche', description: 'Celle qui a changé son destin.' },
          { name: 'Orihime Inoue', type: 'Épouse', description: 'Son amour.' },
          { name: 'Zangetsu', type: 'Zanpakuto', description: 'Son pouvoir intérieur.' }
        ],
        quotes: ['"Je protégerai tout le monde!"', '"Bankai!"', '"Je n\'ai pas le temps de douter."'],
        equipment: [
          { name: 'Zangetsu', type: 'Zanpakuto', description: 'Son épée spirituelle unique.', rarity: 'Mythic' }
        ],
        achievements: ['Défaite d\'Aizen', 'Défaite de Yhwach', 'Sauveur de la Soul Society'],
        weaknesses: ['Manque de contrôle du Hollow', 'Impulsivité', 'Charge émotionnelle']
      },
      {
        id: 'rukia',
        name: 'RUKIA KUCHIKI',
        nativeName: '朽木ルキア',
        title: 'Ice Queen',
        role: 'Shinigami Captain',
        rank: 'CAPTAIN',
        image: rukiaImg,
        description: 'Rukia est la Shinigami qui a donné ses pouvoirs à Ichigo, devenue Capitaine de la 13ème Division.',
        fullBio: 'Adoptée par la noble famille Kuchiki, Rukia a transféré ses pouvoirs à Ichigo pour sauver sa famille. Son Bankai de glace est l\'un des plus beaux et mortels.',
        personality: ['Noble', 'Courageuse', 'Déterminée', 'Douce', 'Forte', 'Loyale'],
        stats: { power: 88, speed: 90, technique: 95, intelligence: 88, stamina: 82, agility: 88 },
        status: { age: '150+', birthday: '14 Janvier', height: '144 cm', weight: '33 kg', bloodType: 'Inconnu', status: 'Alive', occupation: 'Capitaine 13ème Division', origin: 'Rukongai' },
        affiliation: { team: 'Soul Society - 13ème Division', role: 'Capitaine', allies: ['Ichigo Kurosaki', 'Renji Abarai', 'Byakuya Kuchiki'] },
        skills: [
          { name: 'Sode no Shirayuki', type: 'Attack', description: 'Le plus beau Zanpakuto de glace.', level: 92 },
          { name: 'Bankai: Hakka no Togame', type: 'Ultimate', description: 'Gèle tout dans un rayon absolu.', level: 95 },
          { name: 'Kido Master', type: 'Attack', description: 'Maîtrise des arts démoniaques.', level: 88 }
        ],
        relationships: [
          { name: 'Ichigo Kurosaki', type: 'Ami proche', description: 'Lien indéfectible.' },
          { name: 'Renji Abarai', type: 'Époux', description: 'Amour d\'enfance.' },
          { name: 'Byakuya Kuchiki', type: 'Frère adoptif', description: 'Relation complexe mais aimante.' }
        ],
        quotes: [
          '"戦え一護!" (Tatakae Ichigo! - Bats-toi Ichigo!)',
          '"私は死神だ。" (Watashi wa Shinigami da - Je suis une Shinigami.)'
        ],
        achievements: ['Capitaine de Division', 'Bankai de glace', 'Défaite d\'Äs Nödt'],
        weaknesses: ['Bankai risque de la tuer', 'Complexe d\'infériorité passé', 'Taille']
      },
      {
        id: 'aizen',
        name: 'SOSUKE AIZEN',
        nativeName: '藍染惣右介',
        title: 'The Mastermind',
        role: 'Former Captain / Villain',
        rank: 'TRANSCENDENT',
        image: aizenImg,
        description: 'Aizen est l\'antagoniste principal, un génie manipulateur ayant orchestré des siècles de complots.',
        fullBio: 'Ancien capitaine de la 5ème Division, Aizen a manipulé la Soul Society pendant des siècles. Fusionné avec le Hogyoku, il a atteint un niveau de puissance transcendant.',
        personality: ['Manipulateur', 'Génial', 'Calme', 'Arrogant', 'Calculateur', 'Charismatique'],
        stats: { power: 100, speed: 95, technique: 100, intelligence: 100, stamina: 98, agility: 94 },
        status: { age: 'Inconnu', birthday: '29 Mai', height: '186 cm', weight: '74 kg', bloodType: 'Inconnu', status: 'Alive', occupation: 'Prisonnier', origin: 'Soul Society' },
        affiliation: { team: 'Hueco Mundo (Ex)', role: 'Leader', allies: ['Gin Ichimaru', 'Kaname Tosen'], previousAffiliations: ['Soul Society'] },
        skills: [
          { name: 'Kyoka Suigetsu', type: 'Ultimate', description: 'Hypnose totale sur les 5 sens.', level: 100 },
          { name: 'Hogyoku Fusion', type: 'Passive', description: 'Immortalité et évolution constante.', level: 98 },
          { name: 'Reiatsu Master', type: 'Passive', description: 'Pression spirituelle écrasante.', level: 100 }
        ],
        relationships: [
          { name: 'Ichigo Kurosaki', type: 'Nemesis', description: 'Seul à l\'avoir vaincu.' },
          { name: 'Gin Ichimaru', type: 'Subordonné', description: 'Fidèle en apparence.' }
        ],
        quotes: [
          '"私を見上げろ。" (Watashi wo miagero - Lève les yeux vers moi.)',
          '"計画通り。" (Keikaku doori - Tout comme prévu.)'
        ],
        achievements: ['Création des Arrancars', 'Manipulation de la Soul Society', 'Transcendance'],
        weaknesses: ['Arrogance fatale', 'Emprisonné', 'Hogyoku l\'a rejeté']
      }
    ]
  }
];

// Theme colors for new animes
export const themeColors: Record<string, string> = {
  'theme-haikyuu': 'hsl(35, 100%, 50%)',
  'theme-solo-leveling': 'hsl(250, 100%, 65%)',
  'theme-hunter': 'hsl(145, 80%, 45%)',
  'theme-naruto': 'hsl(25, 100%, 50%)',
  'theme-demon-slayer': 'hsl(355, 90%, 55%)',
  'theme-jujutsu': 'hsl(280, 100%, 60%)',
  'theme-mha': 'hsl(145, 70%, 45%)',
  'theme-onepiece': 'hsl(200, 100%, 50%)',
  'theme-aot': 'hsl(30, 80%, 40%)',
  'theme-dragonball': 'hsl(35, 100%, 55%)',
  'theme-deathnote': 'hsl(0, 70%, 40%)',
  'theme-bleach': 'hsl(210, 100%, 50%)',
};

export const getAnimeById = (id: string): Anime | undefined => {
  return animeData.find(anime => anime.id === id);
};

export const getCharacterById = (animeId: string, characterId: string): Character | undefined => {
  const anime = getAnimeById(animeId);
  return anime?.characters.find(char => char.id === characterId);
};

export const getAllCharacters = (): (Character & { animeId: string; animeTitle: string; animeTheme: string })[] => {
  return animeData.flatMap(anime => 
    anime.characters.map(char => ({
      ...char,
      animeId: anime.id,
      animeTitle: anime.title,
      animeTheme: anime.theme
    }))
  );
};
