// Character images
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

// Banner images
import haikyuuBanner from '@/assets/haikyuu-banner.png';
import soloLevelingBanner from '@/assets/solo-leveling-banner.png';
import jujutsuBanner from '@/assets/jujutsu-banner.png';
import demonSlayerBanner from '@/assets/demon-slayer-banner.png';
import hunterBanner from '@/assets/hunter-banner.png';
import narutoBanner from '@/assets/naruto-banner.png';

export interface Skill {
  name: string;
  type: 'Attack' | 'Defense' | 'Support' | 'Passive';
  description: string;
  level: number;
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
  };
  affiliation: {
    team: string;
    role: string;
    allies: string[];
  };
  skills: Skill[];
  relationships: {
    name: string;
    type: string;
  }[];
  quotes: string[];
}

export interface Anime {
  id: string;
  title: string;
  titleJapanese?: string;
  description: string;
  image: string;
  banner: string;
  theme: string;
  genre: string[];
  year: number;
  episodes: number;
  rating: number;
  characters: Character[];
}

export const animeData: Anime[] = [
  {
    id: 'haikyuu',
    title: 'Haikyuu!!',
    titleJapanese: 'ハイキュー!!',
    description: 'Un lycéen passionné de volleyball rêve de devenir le meilleur joueur malgré sa petite taille. Rejoignez Karasuno dans leur quête vers les nationals!',
    image: hinataImg,
    banner: haikyuuBanner,
    theme: 'theme-haikyuu',
    genre: ['Sports', 'Comédie', 'Drame'],
    year: 2014,
    episodes: 85,
    rating: 8.7,
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
        fullBio: 'Hinata a été inspiré à jouer au volleyball après avoir vu un joueur de petite taille surnommé "Le Petit Géant" dominer lors d\'un match de lycée. Déterminé à prouver que la taille n\'est pas tout dans le volleyball, il s\'est entraîné sans relâche pour perfectionner ses compétences de saut et sa vitesse. Son énergie contagieuse et son optimisme inébranlable font de lui le cœur de l\'équipe de Karasuno.',
        stats: { power: 70, speed: 95, technique: 65, intelligence: 60, stamina: 90, agility: 98 },
        status: { age: '16', birthday: '21 Juin', height: '164.2 cm', weight: '51.9 kg', bloodType: 'A', status: 'Alive' },
        affiliation: { team: 'Karasuno High School', role: 'Middle Blocker / Wing Spiker', allies: ['Kageyama Tobio', 'Tsukishima Kei', 'Tanaka Ryunosuke'] },
        skills: [
          { name: 'Super Quick Attack', type: 'Attack', description: 'Une attaque rapide synchronisée avec le passeur permettant de frapper avant que les bloqueurs adverses ne réagissent.', level: 95 },
          { name: 'Broad Jump', type: 'Support', description: 'Capacité de saut horizontal exceptionnelle pour atteindre des positions optimales.', level: 90 },
          { name: 'Receives', type: 'Defense', description: 'Réception des attaques adverses avec précision croissante.', level: 70 }
        ],
        relationships: [
          { name: 'Kageyama Tobio', type: 'Rival / Partenaire' },
          { name: 'Nishinoya Yuu', type: 'Mentor' },
          { name: 'Kozume Kenma', type: 'Ami / Rival' }
        ],
        quotes: ['"Je suis là!" - La célèbre phrase avant chaque attaque', '"Aussi longtemps que je serai là, tu es invincible!"']
      },
      {
        id: 'kageyama',
        name: 'KAGEYAMA TOBIO',
        nativeName: '影山飛雄',
        title: 'King of the Court',
        role: 'Setter',
        rank: 'GENIUS',
        image: kageyamaImg,
        description: 'Kageyama Tobio est un passeur prodige avec une précision inégalée. Ancien "Roi du Terrain" au style dictatorial, il apprend à faire confiance à ses coéquipiers.',
        fullBio: 'Surnommé le "Roi du Terrain" pour son attitude autoritaire au collège, Kageyama a dû apprendre à travailler en équipe à Karasuno. Son partenariat avec Hinata a créé l\'une des combinaisons d\'attaque les plus redoutables du volleyball lycéen. Son obsession pour la perfection et son talent naturel font de lui l\'un des meilleurs passeurs de sa génération.',
        stats: { power: 80, speed: 85, technique: 98, intelligence: 85, stamina: 85, agility: 80 },
        status: { age: '16', birthday: '22 Décembre', height: '181.9 cm', weight: '66.3 kg', bloodType: 'A', status: 'Alive' },
        affiliation: { team: 'Karasuno High School', role: 'Passeur Titulaire', allies: ['Hinata Shouyou', 'Sugawara Koushi', 'Oikawa Tooru'] },
        skills: [
          { name: 'Pinpoint Toss', type: 'Support', description: 'Passes d\'une précision millimétrique permettant aux attaquants de frapper dans les meilleures conditions.', level: 98 },
          { name: 'Quick Set', type: 'Support', description: 'Passe ultra-rapide synchronisée avec les attaquants pour des attaques éclairs.', level: 95 },
          { name: 'Power Serve', type: 'Attack', description: 'Service puissant et précis capable de marquer des aces.', level: 88 }
        ],
        relationships: [
          { name: 'Hinata Shouyou', type: 'Partenaire / Rival' },
          { name: 'Oikawa Tooru', type: 'Rival' },
          { name: 'Sugawara Koushi', type: 'Mentor' }
        ],
        quotes: ['"Aussi longtemps que je suis là, tu es invincible."', '"Les passes existent pour les attaquants."']
      }
    ]
  },
  {
    id: 'solo-leveling',
    title: 'Solo Leveling',
    titleJapanese: '나 혼자만 레벨업',
    description: 'Dans un monde où des portails vers des donjons sont apparus, un chasseur de rang E découvre un système unique qui lui permet de devenir plus fort sans limite.',
    image: sungJinwooImg,
    banner: soloLevelingBanner,
    theme: 'theme-solo-leveling',
    genre: ['Action', 'Fantasy', 'Aventure'],
    year: 2024,
    episodes: 12,
    rating: 8.9,
    characters: [
      {
        id: 'sung-jinwoo',
        name: 'SUNG JIN WOO',
        nativeName: '성진우',
        title: 'Shadow Monarch',
        role: 'S-Rank Hunter',
        rank: 'S RANK',
        image: sungJinwooImg,
        description: 'Sung Jin-Woo, anciennement connu comme le "Chasseur le Plus Faible du Monde", est devenu le Monarque des Ombres grâce au Système mystérieux.',
        fullBio: 'Jin-Woo était un chasseur de rang E qui survivait à peine dans les donjons de bas niveau. Après avoir survécu au Double Donjon et reçu le "Système", il a commencé son ascension pour devenir le chasseur le plus puissant de l\'humanité. Sa capacité à invoquer des ombres de ses ennemis vaincus fait de lui une armée à lui seul. Son évolution de chasseur faible à Shadow Monarch est l\'une des progressions les plus spectaculaires de l\'histoire.',
        stats: { power: 100, speed: 98, technique: 95, intelligence: 92, stamina: 100, agility: 97 },
        status: { age: '24', birthday: 'Inconnu', height: '179 cm', weight: '72 kg', bloodType: 'AB', status: 'Alive' },
        affiliation: { team: 'Ahjin Guild', role: 'Guild Master / Chasseur National', allies: ['Cha Hae-In', 'Go Gun-Hee', 'Yoo Jin-Ho'] },
        skills: [
          { name: 'Shadow Extraction', type: 'Support', description: 'Permet d\'extraire les ombres des ennemis vaincus pour les transformer en soldats loyaux.', level: 100 },
          { name: 'Ruler\'s Authority', type: 'Attack', description: 'Manipulation télékinétique des objets avec une force immense.', level: 95 },
          { name: 'Domain of the Monarch', type: 'Passive', description: 'Augmente drastiquement toutes les capacités dans un territoire défini.', level: 98 },
          { name: 'Shadow Exchange', type: 'Support', description: 'Téléportation instantanée vers n\'importe quelle ombre invoquée.', level: 92 }
        ],
        relationships: [
          { name: 'Cha Hae-In', type: 'Intérêt Romantique' },
          { name: 'Sung Jin-Ah', type: 'Sœur' },
          { name: 'Yoo Jin-Ho', type: 'Vice-Maître / Ami' }
        ],
        quotes: ['"Arise." - Invocation des ombres', '"Je seul peux monter de niveau."']
      },
      {
        id: 'cha-haein',
        name: 'CHA HAE-IN',
        nativeName: '차해인',
        title: 'The Dancer',
        role: 'S-Rank Hunter',
        rank: 'S RANK',
        image: chaHaeinImg,
        description: 'Cha Hae-In est la Vice-Maître de la Guilde des Chasseurs et l\'une des femmes chasseuses les plus puissantes de Corée du Sud.',
        fullBio: 'Cha Hae-In possède la capacité unique de sentir l\'odeur du mana, ce qui lui cause habituellement de l\'inconfort autour des autres chasseurs. Étrangement, Jin-Woo est le seul chasseur dont l\'odeur lui est agréable. Son style de combat élégant lui a valu le surnom de "La Danseuse". Elle est reconnue comme l\'une des épéistes les plus talentueuses de Corée.',
        stats: { power: 88, speed: 94, technique: 96, intelligence: 85, stamina: 82, agility: 95 },
        status: { age: '22', birthday: 'Inconnu', height: '168 cm', weight: '52 kg', bloodType: 'O', status: 'Alive' },
        affiliation: { team: 'Hunters Guild', role: 'Vice-Guild Master', allies: ['Sung Jin-Woo', 'Baek Yoon-Ho', 'Choi Jong-In'] },
        skills: [
          { name: 'Sword Dance', type: 'Attack', description: 'Style d\'épée élégant et mortel combinant vitesse et précision.', level: 94 },
          { name: 'Mana Detection', type: 'Passive', description: 'Capacité à percevoir le mana des êtres vivants par l\'odorat.', level: 88 },
          { name: 'Quick Slash', type: 'Attack', description: 'Attaque rapide capable de trancher plusieurs ennemis simultanément.', level: 90 }
        ],
        relationships: [
          { name: 'Sung Jin-Woo', type: 'Intérêt Romantique' },
          { name: 'Baek Yoon-Ho', type: 'Collègue' }
        ],
        quotes: ['"Son odeur... elle est différente."', '"Je veux combattre à ses côtés."']
      }
    ]
  },
  {
    id: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    titleJapanese: '呪術廻戦',
    description: 'Un lycéen ordinaire avale un doigt maudit et se retrouve plongé dans le monde des exorcistes et des malédictions.',
    image: gojoImg,
    banner: jujutsuBanner,
    theme: 'theme-jujutsu',
    genre: ['Action', 'Surnaturel', 'École'],
    year: 2020,
    episodes: 48,
    rating: 8.8,
    characters: [
      {
        id: 'gojo-satoru',
        name: 'GOJO SATORU',
        nativeName: '五条悟',
        title: 'The Strongest',
        role: 'Special Grade Sorcerer',
        rank: 'SPECIAL GRADE',
        image: gojoImg,
        description: 'Gojo Satoru est considéré comme le sorcier le plus puissant du monde moderne. Son Infinity et ses Six Eyes font de lui un être pratiquement invincible.',
        fullBio: 'Né dans le clan Gojo, Satoru est le premier en 400 ans à hériter à la fois des Six Eyes et de la technique Limitless. Cette combinaison fait de lui le sorcier le plus puissant existant. Professeur à l\'école de jujutsu de Tokyo, il guide la nouvelle génération tout en défiant les traditions corrompues du monde de l\'exorcisme. Son attitude décontractée cache une intelligence stratégique redoutable.',
        stats: { power: 100, speed: 95, technique: 100, intelligence: 98, stamina: 95, agility: 92 },
        status: { age: '28', birthday: '7 Décembre', height: '190 cm', weight: 'Inconnu', bloodType: 'Inconnu', status: 'Alive' },
        affiliation: { team: 'Tokyo Jujutsu High', role: 'Professeur / Sorcier Grade Spécial', allies: ['Yuji Itadori', 'Megumi Fushiguro', 'Nobara Kugisaki'] },
        skills: [
          { name: 'Infinity', type: 'Defense', description: 'Barrière invisible qui ralentit tout ce qui s\'approche jusqu\'à l\'arrêt complet.', level: 100 },
          { name: 'Hollow Purple', type: 'Attack', description: 'Combinaison de Blue et Red créant une sphère d\'annihilation.', level: 98 },
          { name: 'Domain Expansion: Unlimited Void', type: 'Attack', description: 'Domaine qui surcharge l\'esprit de l\'adversaire avec des informations infinies.', level: 100 },
          { name: 'Six Eyes', type: 'Passive', description: 'Permet une perception parfaite du mana et une utilisation optimale des techniques.', level: 100 }
        ],
        relationships: [
          { name: 'Yuji Itadori', type: 'Étudiant' },
          { name: 'Megumi Fushiguro', type: 'Étudiant Préféré' },
          { name: 'Geto Suguru', type: 'Ancien Meilleur Ami' }
        ],
        quotes: ['"Je suis le plus fort."', '"Ne t\'inquiète pas. Je suis le plus fort, après tout."']
      },
      {
        id: 'itadori-yuji',
        name: 'ITADORI YUJI',
        nativeName: '虎杖悠仁',
        title: 'Sukuna\'s Vessel',
        role: 'Grade 1 Sorcerer',
        rank: 'GRADE 1',
        image: itadoriImg,
        description: 'Yuji Itadori est un lycéen au physique exceptionnel qui est devenu le réceptacle de Sukuna, le Roi des Malédictions.',
        fullBio: 'Après avoir avalé un doigt de Sukuna pour sauver ses amis, Yuji a été condamné à mort par le monde de l\'exorcisme. Gojo Satoru lui a offert un sursis : collecter tous les doigts de Sukuna avant son exécution. Malgré cette malédiction, Yuji reste déterminé à sauver les gens et à donner une mort digne à ceux qu\'il ne peut sauver.',
        stats: { power: 90, speed: 88, technique: 75, intelligence: 70, stamina: 92, agility: 85 },
        status: { age: '15', birthday: '20 Mars', height: '173 cm', weight: '80 kg', bloodType: 'B', status: 'Alive' },
        affiliation: { team: 'Tokyo Jujutsu High', role: 'Étudiant Première Année', allies: ['Gojo Satoru', 'Megumi Fushiguro', 'Nobara Kugisaki'] },
        skills: [
          { name: 'Divergent Fist', type: 'Attack', description: 'Coup de poing créant un second impact d\'énergie après le premier.', level: 80 },
          { name: 'Black Flash', type: 'Attack', description: 'Attaque créant une distorsion spatiale amplifiant la puissance de 2.5.', level: 85 },
          { name: 'Superhuman Physique', type: 'Passive', description: 'Force, vitesse et résistance largement supérieures à la normale.', level: 90 }
        ],
        relationships: [
          { name: 'Megumi Fushiguro', type: 'Meilleur Ami' },
          { name: 'Nobara Kugisaki', type: 'Amie / Camarade' },
          { name: 'Sukuna', type: 'Malédiction Intérieure' }
        ],
        quotes: ['"Je vais donner une mort digne à ceux que je ne peux pas sauver."', '"Je suis Itadori Yuji!"']
      }
    ]
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer',
    titleJapanese: '鬼滅の刃',
    description: 'Un jeune garçon devient pourfendeur de démons pour sauver sa sœur transformée en démon et venger sa famille.',
    image: tanjiroImg,
    banner: demonSlayerBanner,
    theme: 'theme-demon-slayer',
    genre: ['Action', 'Surnaturel', 'Historique'],
    year: 2019,
    episodes: 55,
    rating: 8.9,
    characters: [
      {
        id: 'tanjiro',
        name: 'KAMADO TANJIRO',
        nativeName: '竈門炭治郎',
        title: 'The Demon Slayer',
        role: 'Demon Slayer Corps',
        rank: 'HASHIRA LEVEL',
        image: tanjiroImg,
        description: 'Tanjiro Kamado est un jeune pourfendeur de démons dont la famille a été massacrée par Muzan Kibutsuji. Sa sœur Nezuko, transformée en démon, l\'accompagne dans sa quête.',
        fullBio: 'Après le massacre de sa famille, Tanjiro s\'est entraîné pendant deux ans sous la tutelle de Sakonji Urokodaki pour devenir pourfendeur de démons. Sa gentillesse exceptionnelle et sa capacité à comprendre même ses ennemis font de lui un personnage unique. Il maîtrise la Respiration de l\'Eau et a éveillé la Respiration du Soleil, la technique originelle.',
        stats: { power: 85, speed: 88, technique: 92, intelligence: 80, stamina: 90, agility: 86 },
        status: { age: '15', birthday: '14 Juillet', height: '165 cm', weight: '61 kg', bloodType: 'Inconnu', status: 'Alive' },
        affiliation: { team: 'Demon Slayer Corps', role: 'Pourfendeur / Rang Hinoe', allies: ['Nezuko Kamado', 'Zenitsu Agatsuma', 'Inosuke Hashibira'] },
        skills: [
          { name: 'Water Breathing', type: 'Attack', description: 'Style de respiration imitant la fluidité et l\'adaptabilité de l\'eau.', level: 90 },
          { name: 'Sun Breathing', type: 'Attack', description: 'La première et plus puissante forme de respiration, créée par Yoriichi.', level: 85 },
          { name: 'Enhanced Smell', type: 'Passive', description: 'Odorat surdéveloppé permettant de détecter les démons et émotions.', level: 95 }
        ],
        relationships: [
          { name: 'Nezuko Kamado', type: 'Sœur' },
          { name: 'Zenitsu Agatsuma', type: 'Ami / Camarade' },
          { name: 'Inosuke Hashibira', type: 'Rival / Ami' }
        ],
        quotes: ['"Je suis Tanjiro Kamado du Corps des Pourfendeurs de Démons!"', '"Je ne te laisserai jamais faire du mal à qui que ce soit!"']
      },
      {
        id: 'nezuko',
        name: 'KAMADO NEZUKO',
        nativeName: '竈門禰豆子',
        title: 'The Demon Girl',
        role: 'Demon',
        rank: 'UNIQUE',
        image: nezukoImg,
        description: 'Nezuko Kamado est la sœur de Tanjiro, transformée en démon mais conservant son humanité et protégeant les humains.',
        fullBio: 'Transformée en démon par Muzan Kibutsuji lors du massacre de sa famille, Nezuko a réussi à conserver son humanité grâce à son lien avec son frère. Elle refuse de consommer des humains et récupère son énergie par le sommeil. Sa transformation en démon lui a conféré des pouvoirs uniques, notamment sa capacité Blood Demon Art.',
        stats: { power: 88, speed: 90, technique: 70, intelligence: 60, stamina: 95, agility: 92 },
        status: { age: '14', birthday: '28 Décembre', height: '153 cm', weight: '45 kg', bloodType: 'Inconnu', status: 'Alive' },
        affiliation: { team: 'Demon Slayer Corps (Allié)', role: 'Démon Protecteur', allies: ['Tanjiro Kamado', 'Zenitsu Agatsuma', 'Inosuke Hashibira'] },
        skills: [
          { name: 'Blood Demon Art: Exploding Blood', type: 'Attack', description: 'Enflamme son sang pour créer des explosions roses dévastatrices.', level: 88 },
          { name: 'Size Manipulation', type: 'Support', description: 'Peut modifier sa taille à volonté, de petite fille à adulte.', level: 85 },
          { name: 'Regeneration', type: 'Passive', description: 'Capacité de régénération rapide typique des démons.', level: 90 }
        ],
        relationships: [
          { name: 'Tanjiro Kamado', type: 'Frère' },
          { name: 'Zenitsu Agatsuma', type: 'Admirateur' }
        ],
        quotes: ['*Grognement protecteur*', '*Hochement de tête déterminé*']
      }
    ]
  },
  {
    id: 'hunter-x-hunter',
    title: 'Hunter x Hunter',
    titleJapanese: 'ハンター×ハンター',
    description: 'Un jeune garçon part à l\'aventure pour devenir Hunter et retrouver son père légendaire.',
    image: gonImg,
    banner: hunterBanner,
    theme: 'theme-hunter',
    genre: ['Action', 'Aventure', 'Fantasy'],
    year: 2011,
    episodes: 148,
    rating: 9.0,
    characters: [
      {
        id: 'gon',
        name: 'GON FREECSS',
        nativeName: 'ゴン＝フリークス',
        title: 'The Hunter',
        role: 'Rookie Hunter',
        rank: 'HUNTER',
        image: gonImg,
        description: 'Gon Freecss est un jeune garçon au cœur pur parti à l\'aventure pour retrouver son père Ging, un Hunter légendaire.',
        fullBio: 'Élevé par sa tante Mito sur l\'île de la Baleine, Gon a grandi en découvrant que son père était un Hunter célèbre. Déterminé à comprendre pourquoi son père a choisi cette vie plutôt que de l\'élever, Gon s\'est lancé dans l\'examen des Hunters où il a rencontré ses meilleurs amis. Son innocence et sa détermination cachent un potentiel terrifiant.',
        stats: { power: 82, speed: 85, technique: 75, intelligence: 70, stamina: 88, agility: 90 },
        status: { age: '14', birthday: '5 Mai', height: '154 cm', weight: '49 kg', bloodType: 'B', status: 'Alive' },
        affiliation: { team: 'Hunter Association', role: 'Hunter / Enhancer', allies: ['Killua Zoldyck', 'Kurapika', 'Leorio Paladiknight'] },
        skills: [
          { name: 'Jajanken - Rock', type: 'Attack', description: 'Concentration de toute l\'aura dans le poing pour un coup dévastateur.', level: 88 },
          { name: 'Jajanken - Paper', type: 'Attack', description: 'Projection d\'aura à distance sous forme d\'onde.', level: 75 },
          { name: 'Enhanced Senses', type: 'Passive', description: 'Sens aiguisés développés en grandissant dans la nature.', level: 90 }
        ],
        relationships: [
          { name: 'Killua Zoldyck', type: 'Meilleur Ami' },
          { name: 'Ging Freecss', type: 'Père' },
          { name: 'Kurapika', type: 'Ami' }
        ],
        quotes: ['"Je vais retrouver mon père!"', '"Killua est mon meilleur ami dans le monde entier!"']
      },
      {
        id: 'killua',
        name: 'KILLUA ZOLDYCK',
        nativeName: 'キルア＝ゾルディック',
        title: 'The Assassin',
        role: 'Ex-Assassin Hunter',
        rank: 'HUNTER',
        image: killuaImg,
        description: 'Killua Zoldyck est l\'héritier de la famille d\'assassins la plus redoutée. Il a fui sa famille pour vivre librement.',
        fullBio: 'Entraîné depuis sa naissance pour devenir le parfait assassin, Killua possède des capacités de combat exceptionnelles. Sa rencontre avec Gon lors de l\'examen des Hunters lui a ouvert les yeux sur une autre façon de vivre, loin de la violence de sa famille. Malgré son passé sombre, il reste un ami loyal et protecteur.',
        stats: { power: 85, speed: 98, technique: 92, intelligence: 90, stamina: 80, agility: 98 },
        status: { age: '14', birthday: '7 Juillet', height: '158 cm', weight: '49 kg', bloodType: 'A', status: 'Alive' },
        affiliation: { team: 'Hunter Association', role: 'Hunter / Transmuter', allies: ['Gon Freecss', 'Kurapika', 'Alluka Zoldyck'] },
        skills: [
          { name: 'Godspeed', type: 'Attack', description: 'Transformation de l\'aura en électricité pour des mouvements ultra-rapides.', level: 95 },
          { name: 'Thunderbolt', type: 'Attack', description: 'Projection d\'électricité à haute voltage sur les ennemis.', level: 88 },
          { name: 'Assassin Mode', type: 'Passive', description: 'État de concentration extrême hérité de son entraînement.', level: 92 }
        ],
        relationships: [
          { name: 'Gon Freecss', type: 'Meilleur Ami' },
          { name: 'Alluka Zoldyck', type: 'Sœur' },
          { name: 'Illumi Zoldyck', type: 'Frère / Antagoniste' }
        ],
        quotes: ['"Si tu bouges, je te tue."', '"Gon, tu es la lumière."']
      }
    ]
  },
  {
    id: 'naruto',
    title: 'Naruto',
    titleJapanese: 'ナルト',
    description: 'Un jeune ninja orphelin rêve de devenir Hokage, le leader de son village, malgré le démon scellé en lui.',
    image: narutoImg,
    banner: narutoBanner,
    theme: 'theme-naruto',
    genre: ['Action', 'Aventure', 'Martial Arts'],
    year: 2002,
    episodes: 720,
    rating: 8.6,
    characters: [
      {
        id: 'naruto-uzumaki',
        name: 'NARUTO UZUMAKI',
        nativeName: 'うずまきナルト',
        title: 'The Seventh Hokage',
        role: 'Ninja',
        rank: 'HOKAGE',
        image: narutoImg,
        description: 'Naruto Uzumaki est un ninja de Konoha qui porte le démon renard à neuf queues en lui. Malgré une enfance solitaire, il a réalisé son rêve de devenir Hokage.',
        fullBio: 'Orphelin dès sa naissance et porteur du Kyuubi scellé en lui par son père le Quatrième Hokage, Naruto a grandi rejeté par les villageois. Sa détermination inébranlable et sa capacité à changer le cœur des gens l\'ont mené à devenir le Septième Hokage. Son parcours est une histoire de persévérance et de rédemption.',
        stats: { power: 98, speed: 92, technique: 85, intelligence: 75, stamina: 100, agility: 88 },
        status: { age: '33', birthday: '10 Octobre', height: '180 cm', weight: '66 kg', bloodType: 'B', status: 'Alive' },
        affiliation: { team: 'Konoha / Team 7', role: 'Septième Hokage', allies: ['Sasuke Uchiha', 'Sakura Haruno', 'Kakashi Hatake'] },
        skills: [
          { name: 'Rasengan', type: 'Attack', description: 'Sphère de chakra concentré créant une puissante attaque rotative.', level: 100 },
          { name: 'Shadow Clone Jutsu', type: 'Support', description: 'Création de multiples clones solides pouvant combattre.', level: 100 },
          { name: 'Sage Mode', type: 'Passive', description: 'Mode permettant d\'absorber l\'énergie naturelle pour décupler ses capacités.', level: 95 },
          { name: 'Kurama Mode', type: 'Attack', description: 'Utilisation du chakra du renard à neuf queues.', level: 98 }
        ],
        relationships: [
          { name: 'Sasuke Uchiha', type: 'Meilleur Ami / Rival' },
          { name: 'Hinata Hyuga', type: 'Épouse' },
          { name: 'Kakashi Hatake', type: 'Mentor' }
        ],
        quotes: ['"Je ne reviens jamais sur ma parole, c\'est ma voie du ninja!"', '"Dattebayo!"']
      },
      {
        id: 'sasuke-uchiha',
        name: 'SASUKE UCHIHA',
        nativeName: 'うちはサスケ',
        title: 'The Last Uchiha',
        role: 'Ninja',
        rank: 'KAGE LEVEL',
        image: sasukeImg,
        description: 'Sasuke Uchiha est le dernier survivant du clan Uchiha, massacré par son propre frère. Son parcours de vengeance l\'a mené sur un chemin sombre avant de trouver la rédemption.',
        fullBio: 'Survivant du massacre de son clan par son frère Itachi, Sasuke a consacré sa vie à la vengeance. Son talent naturel et sa détermination en ont fait l\'un des ninjas les plus puissants. Après avoir découvert la vérité sur son frère, il a finalement trouvé la rédemption aux côtés de Naruto.',
        stats: { power: 96, speed: 95, technique: 98, intelligence: 92, stamina: 85, agility: 94 },
        status: { age: '33', birthday: '23 Juillet', height: '182 cm', weight: '68 kg', bloodType: 'AB', status: 'Alive' },
        affiliation: { team: 'Konoha / Team 7', role: 'Ninja Voyageur', allies: ['Naruto Uzumaki', 'Sakura Haruno', 'Kakashi Hatake'] },
        skills: [
          { name: 'Chidori', type: 'Attack', description: 'Concentration de foudre dans la main pour une attaque perçante.', level: 98 },
          { name: 'Sharingan', type: 'Passive', description: 'Dojutsu permettant de copier des techniques et prédire les mouvements.', level: 100 },
          { name: 'Rinnegan', type: 'Passive', description: 'L\'œil légendaire accordant des pouvoirs divins.', level: 95 },
          { name: 'Amaterasu', type: 'Attack', description: 'Flammes noires inextinguibles brûlant tout.', level: 95 }
        ],
        relationships: [
          { name: 'Naruto Uzumaki', type: 'Meilleur Ami / Rival' },
          { name: 'Sakura Haruno', type: 'Épouse' },
          { name: 'Itachi Uchiha', type: 'Frère (Décédé)' }
        ],
        quotes: ['"Je suis un vengeur."', '"Les liens... je les ai tous coupés."']
      }
    ]
  }
];

export const getAnimeById = (id: string): Anime | undefined => {
  return animeData.find(anime => anime.id === id);
};

export const getCharacterById = (animeId: string, characterId: string): Character | undefined => {
  const anime = getAnimeById(animeId);
  return anime?.characters.find(char => char.id === characterId);
};

export const getAllCharacters = (): (Character & { animeId: string; animeTitle: string })[] => {
  return animeData.flatMap(anime => 
    anime.characters.map(char => ({
      ...char,
      animeId: anime.id,
      animeTitle: anime.title
    }))
  );
};
