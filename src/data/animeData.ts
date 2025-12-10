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
    image?: string;
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
  characters: Character[];
}

export const animeData: Anime[] = [
  {
    id: 'haikyuu',
    title: 'Haikyuu!!',
    titleJapanese: 'ハイキュー!!',
    description: 'Un lycéen passionné de volleyball rêve de devenir le meilleur joueur malgré sa petite taille.',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&h=600&fit=crop',
    banner: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&h=600&fit=crop',
    theme: 'theme-haikyuu',
    characters: [
      {
        id: 'hinata',
        name: 'HINATA SHOUYOU',
        nativeName: '日向翔陽',
        title: 'The Little Giant',
        role: 'Wing Spiker',
        rank: 'Ace',
        image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&h=800&fit=crop',
        description: 'Shoyo Hinata est le protagoniste principal de la série Haikyuu. Malgré sa petite taille, il compense par son incroyable capacité de saut et sa détermination sans faille.',
        fullBio: 'Hinata a été inspiré à jouer au volleyball après avoir vu un joueur de petite taille surnommé "Le Petit Géant" dominer lors d\'un match de lycée. Déterminé à prouver que la taille n\'est pas tout dans le volleyball, il s\'est entraîné sans relâche pour perfectionner ses compétences de saut et sa vitesse.',
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
        rank: 'Genius',
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=800&fit=crop',
        description: 'Kageyama Tobio est un passeur prodige avec une précision inégalée. Ancien "Roi du Terrain" au style dictatorial, il apprend à faire confiance à ses coéquipiers.',
        fullBio: 'Surnommé le "Roi du Terrain" pour son attitude autoritaire au collège, Kageyama a dû apprendre à travailler en équipe à Karasuno. Son partenariat avec Hinata a créé l\'une des combinaisons d\'attaque les plus redoutables du volleyball lycéen.',
        stats: { power: 80, speed: 85, technique: 98, intelligence: 85, stamina: 85, agility: 80 },
        status: { age: '16', birthday: '22 Décembre', height: '181.9 cm', weight: '66.3 kg', bloodType: 'A', status: 'Alive' },
        affiliation: { team: 'Karasuno High School', role: 'Passeur Titulaire', allies: ['Hinata Shouyou', 'Sugawara Koushi', 'Oikawa Tooru'] },
        skills: [
          { name: 'Pinpoint Toss', type: 'Support', description: 'Passes d\'une précision millimétrique permettant aux attaquants de frapper dans les meilleures conditions.', level: 98 },
          { name: 'Quick Set', type: 'Support', description: 'Passe ultra-rapide synchronisée avec les attaquants pour des attaques éclairs.', level: 95 },
          { name: 'Serve', type: 'Attack', description: 'Service puissant et précis capable de marquer des aces.', level: 88 }
        ],
        relationships: [
          { name: 'Hinata Shouyou', type: 'Partenaire / Rival' },
          { name: 'Oikawa Tooru', type: 'Rival' },
          { name: 'Sugawara Koushi', type: 'Mentor' }
        ],
        quotes: ['"Aussi longtemps que je suis là, tu es invincible."', '"Les passes existent pour les attaquants."']
      },
      {
        id: 'tsukishima',
        name: 'TSUKISHIMA KEI',
        nativeName: '月島蛍',
        title: 'The Calm Blocker',
        role: 'Middle Blocker',
        rank: 'Strategist',
        image: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&h=800&fit=crop',
        description: 'Tsukishima Kei est un bloqueur analytique qui utilise son intelligence pour lire les attaques adverses. Son attitude froide cache une passion croissante pour le volleyball.',
        fullBio: 'Initialement désintéressé par le volleyball, Tsukishima a trouvé sa motivation après avoir compris l\'importance du block stratégique. Sa grande taille et son intelligence en font un bloqueur redoutable.',
        stats: { power: 75, speed: 70, technique: 85, intelligence: 95, stamina: 75, agility: 72 },
        status: { age: '16', birthday: '27 Septembre', height: '190.1 cm', weight: '68.4 kg', bloodType: 'A', status: 'Alive' },
        affiliation: { team: 'Karasuno High School', role: 'Middle Blocker', allies: ['Yamaguchi Tadashi', 'Kuroo Tetsurou', 'Akaashi Keiji'] },
        skills: [
          { name: 'Read Block', type: 'Defense', description: 'Analyse les mouvements adverses pour anticiper et bloquer les attaques.', level: 92 },
          { name: 'Guess Block', type: 'Defense', description: 'Bloc basé sur l\'intuition et la lecture du jeu adverse.', level: 85 },
          { name: 'Quick Attack', type: 'Attack', description: 'Attaques rapides depuis le centre du filet.', level: 78 }
        ],
        relationships: [
          { name: 'Yamaguchi Tadashi', type: 'Meilleur Ami' },
          { name: 'Kuroo Tetsurou', type: 'Mentor' },
          { name: 'Bokuto Koutarou', type: 'Influence' }
        ],
        quotes: ['"C\'est juste un club."', '"Le moment où tu bloques une attaque surpuissante avec juste tes mains..."']
      }
    ]
  },
  {
    id: 'solo-leveling',
    title: 'Solo Leveling',
    titleJapanese: '나 혼자만 레벨업',
    description: 'Dans un monde où des portails vers des donjons sont apparus, un chasseur de rang E découvre un système unique qui lui permet de devenir plus fort.',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop',
    banner: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=600&fit=crop',
    theme: 'theme-solo-leveling',
    characters: [
      {
        id: 'sung-jinwoo',
        name: 'SUNG JIN WOO',
        nativeName: '성진우',
        title: 'Shadow Monarch',
        role: 'S-Rank Hunter',
        rank: 'S RANK',
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=800&fit=crop',
        description: 'Sung Jin-Woo, anciennement connu comme le "Chasseur le Plus Faible du Monde", est devenu le Monarque des Ombres grâce au Système mystérieux.',
        fullBio: 'Jin-Woo était un chasseur de rang E qui survivait à peine dans les donjons de bas niveau. Après avoir survécu au Double Donjon et reçu le "Système", il a commencé son ascension pour devenir le chasseur le plus puissant de l\'humanité. Sa capacité à invoquer des ombres de ses ennemis vaincus fait de lui une armée à lui seul.',
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
          { name: 'Yoo Jin-Ho', type: 'Vice-Maître / Ami' },
          { name: 'Go Gun-Hee', type: 'Mentor / Allié' }
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
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
        description: 'Cha Hae-In est la Vice-Maître de la Guilde des Chasseurs et l\'une des femmes chasseuses les plus puissantes de Corée du Sud.',
        fullBio: 'Cha Hae-In possède la capacité unique de sentir l\'odeur du mana, ce qui lui cause habituellement de l\'inconfort autour des autres chasseurs. Étrangement, Jin-Woo est le seul chasseur dont l\'odeur lui est agréable. Son style de combat élégant lui a valu le surnom de "La Danseuse".',
        stats: { power: 88, speed: 94, technique: 96, intelligence: 85, stamina: 82, agility: 95 },
        status: { age: '22', birthday: 'Inconnu', height: '168 cm', weight: '52 kg', bloodType: 'O', status: 'Alive' },
        affiliation: { team: 'Hunters Guild', role: 'Vice-Guild Master / Chasseuse S-Rank', allies: ['Sung Jin-Woo', 'Baek Yoon-Ho', 'Choi Jong-In'] },
        skills: [
          { name: 'Sword Dance', type: 'Attack', description: 'Style d\'épée élégant et mortel combinant vitesse et précision.', level: 94 },
          { name: 'Mana Detection', type: 'Passive', description: 'Capacité à percevoir le mana des êtres vivants par l\'odorat.', level: 88 },
          { name: 'Quick Slash', type: 'Attack', description: 'Attaque rapide capable de trancher plusieurs ennemis simultanément.', level: 90 }
        ],
        relationships: [
          { name: 'Sung Jin-Woo', type: 'Intérêt Romantique' },
          { name: 'Baek Yoon-Ho', type: 'Collègue' },
          { name: 'Choi Jong-In', type: 'Allié' }
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
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=600&fit=crop',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=600&fit=crop',
    theme: 'theme-jujutsu',
    characters: [
      {
        id: 'gojo-satoru',
        name: 'GOJO SATORU',
        nativeName: '五条悟',
        title: 'The Strongest',
        role: 'Special Grade Sorcerer',
        rank: 'SPECIAL GRADE',
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&h=800&fit=crop',
        description: 'Gojo Satoru est considéré comme le sorcier le plus puissant du monde moderne. Son Infinity et ses Six Eyes font de lui un être pratiquement invincible.',
        fullBio: 'Né dans le clan Gojo, Satoru est le premier en 400 ans à hériter à la fois des Six Eyes et de la technique Limitless. Cette combinaison fait de lui le sorcier le plus puissant existant. Professeur à l\'école de jujutsu de Tokyo, il guide la nouvelle génération tout en défiant les traditions corrompues du monde de l\'exorcisme.',
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
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=800&fit=crop',
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
    description: 'Un jeune garçon devient pourfendeur de démons pour sauver sa sœur transformée en démon.',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop',
    banner: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=600&fit=crop',
    theme: 'theme-demon-slayer',
    characters: [
      {
        id: 'tanjiro',
        name: 'KAMADO TANJIRO',
        nativeName: '竈門炭治郎',
        title: 'The Demon Slayer',
        role: 'Demon Slayer Corps',
        rank: 'HASHIRA LEVEL',
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=800&fit=crop',
        description: 'Tanjiro Kamado est un jeune pourfendeur de démons dont la famille a été massacrée par Muzan Kibutsuji. Sa sœur Nezuko, transformée en démon, l\'accompagne dans sa quête.',
        fullBio: 'Après le massacre de sa famille, Tanjiro s\'est entraîné pendant deux ans sous la tutelle de Sakonji Urokodaki pour devenir pourfendeur de démons. Sa gentillesse exceptionnelle et sa capacité à comprendre même ses ennemis font de lui un personnage unique. Il maîtrise la Respiration de l\'Eau et a éveillé la Respiration du Soleil.',
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
      }
    ]
  },
  {
    id: 'hunter-x-hunter',
    title: 'Hunter x Hunter',
    titleJapanese: 'ハンター×ハンター',
    description: 'Un jeune garçon part à l\'aventure pour devenir Hunter et retrouver son père.',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=600&fit=crop',
    banner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=600&fit=crop',
    theme: 'theme-hunter',
    characters: [
      {
        id: 'gon',
        name: 'GON FREECSS',
        nativeName: 'ゴン＝フリークス',
        title: 'The Hunter',
        role: 'Rookie Hunter',
        rank: 'HUNTER',
        image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=800&fit=crop',
        description: 'Gon Freecss est un jeune garçon au cœur pur parti à l\'aventure pour retrouver son père Ging, un Hunter légendaire.',
        fullBio: 'Élevé par sa tante Mito sur l\'île de la Baleine, Gon a grandi en découvrant que son père était un Hunter célèbre. Déterminé à comprendre pourquoi son père a choisi cette vie plutôt que de l\'élever, Gon s\'est lancé dans l\'examen des Hunters où il a rencontré ses meilleurs amis.',
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
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop',
        description: 'Killua Zoldyck est l\'héritier de la famille d\'assassins la plus redoutée. Il a fui sa famille pour vivre librement et est devenu le meilleur ami de Gon.',
        fullBio: 'Entraîné depuis sa naissance pour devenir le parfait assassin, Killua possède des capacités de combat exceptionnelles. Sa rencontre avec Gon lors de l\'examen des Hunters lui a ouvert les yeux sur une autre façon de vivre, loin de la violence de sa famille.',
        stats: { power: 85, speed: 98, technique: 92, intelligence: 90, stamina: 80, agility: 98 },
        status: { age: '14', birthday: '7 Juillet', height: '158 cm', weight: '49 kg', bloodType: 'A', status: 'Alive' },
        affiliation: { team: 'Hunter Association', role: 'Hunter / Transmuter', allies: ['Gon Freecss', 'Kurapika', 'Leorio Paladiknight', 'Alluka Zoldyck'] },
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
  }
];

export const getAnimeById = (id: string): Anime | undefined => {
  return animeData.find(anime => anime.id === id);
};

export const getCharacterById = (animeId: string, characterId: string): Character | undefined => {
  const anime = getAnimeById(animeId);
  return anime?.characters.find(char => char.id === characterId);
};
