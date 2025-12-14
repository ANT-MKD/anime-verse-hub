import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Star, Swords, Heart, Crown, Skull, Sparkles, ChevronDown, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import { animeData } from '@/data/animeData';

interface TimelineEvent {
  title: string;
  description: string;
  type: 'battle' | 'character' | 'plot' | 'death' | 'power' | 'relationship';
  importance: 'major' | 'minor';
}

interface Arc {
  name: string;
  episodes: string;
  description: string;
  events: TimelineEvent[];
}

const animeArcs: Record<string, Arc[]> = {
  'haikyuu': [
    {
      name: 'Arc Karasuno',
      episodes: '1-13',
      description: 'Formation de l\'équipe et entraînement initial',
      events: [
        { title: 'Rencontre Hinata-Kageyama', description: 'Les deux rivaux se retrouvent dans la même équipe', type: 'relationship', importance: 'major' },
        { title: 'Premier Quick Attack', description: 'Naissance du duo légendaire', type: 'power', importance: 'major' },
        { title: 'Match contre Nekoma', description: 'Premier match d\'entraînement interrégional', type: 'battle', importance: 'minor' },
      ]
    },
    {
      name: 'Arc Inter-High',
      episodes: '14-25',
      description: 'Tournoi préliminaire de la préfecture',
      events: [
        { title: 'Victoire contre Date Tech', description: 'Première victoire significative', type: 'battle', importance: 'major' },
        { title: 'Match contre Aoba Johsai', description: 'Confrontation avec Oikawa', type: 'battle', importance: 'major' },
        { title: 'Défaite au tournoi', description: 'Karasuno éliminé mais motivé', type: 'plot', importance: 'major' },
      ]
    },
    {
      name: 'Arc Spring High',
      episodes: '26-60',
      description: 'Qualifications pour les nationaux',
      events: [
        { title: 'Revanche contre Aoba Johsai', description: 'Victoire décisive de Karasuno', type: 'battle', importance: 'major' },
        { title: 'Match contre Shiratorizawa', description: 'Affrontement contre Ushijima', type: 'battle', importance: 'major' },
        { title: 'Qualification aux nationaux', description: 'Le rêve devient réalité', type: 'plot', importance: 'major' },
      ]
    },
    {
      name: 'Arc Nationaux',
      episodes: '61-85',
      description: 'Tournoi national à Tokyo',
      events: [
        { title: 'Match contre Inarizaki', description: 'Victoire difficile contre les jumeaux Miya', type: 'battle', importance: 'major' },
        { title: 'Match contre Nekoma', description: 'La Bataille du Dépotoir légendaire', type: 'battle', importance: 'major' },
        { title: 'Match contre Kamomedai', description: 'Affrontement contre le petit géant actuel', type: 'battle', importance: 'major' },
      ]
    },
  ],
  'solo-leveling': [
    {
      name: 'Arc du Double Donjon',
      episodes: '1-4',
      description: 'Jin-Woo découvre le Système',
      events: [
        { title: 'Raid du Donjon D', description: 'Jin-Woo est gravement blessé', type: 'battle', importance: 'major' },
        { title: 'Obtention du Système', description: 'Naissance du Chasseur des Ombres', type: 'power', importance: 'major' },
        { title: 'Premier niveau', description: 'Début de l\'ascension', type: 'character', importance: 'minor' },
      ]
    },
    {
      name: 'Arc Instance',
      episodes: '5-8',
      description: 'Entraînement dans les donjons secrets',
      events: [
        { title: 'Donjon de la Fatigue', description: 'Première quête d\'urgence', type: 'battle', importance: 'minor' },
        { title: 'Obtention de Kasaka', description: 'Première arme légendaire', type: 'power', importance: 'major' },
        { title: 'Changement de classe', description: 'Jin-Woo devient Nécromancien', type: 'power', importance: 'major' },
      ]
    },
    {
      name: 'Arc Red Gate',
      episodes: '9-12',
      description: 'Premier raid de rang élevé',
      events: [
        { title: 'Piège de la Red Gate', description: 'L\'équipe coincée dans un donjon de glace', type: 'plot', importance: 'major' },
        { title: 'Éveil complet', description: 'Jin-Woo montre sa vraie puissance', type: 'power', importance: 'major' },
        { title: 'Naissance de Beru', description: 'Le plus puissant soldat de l\'ombre', type: 'character', importance: 'major' },
      ]
    },
  ],
  'jujutsu-kaisen': [
    {
      name: 'Arc Introduction',
      episodes: '1-5',
      description: 'Yuji avale le doigt de Sukuna',
      events: [
        { title: 'Ingestion du doigt', description: 'Yuji devient l\'hôte de Sukuna', type: 'power', importance: 'major' },
        { title: 'Rencontre avec Gojo', description: 'Le plus fort exorciste apparaît', type: 'character', importance: 'major' },
        { title: 'Mort de Yuji', description: 'Première exécution planifiée', type: 'death', importance: 'major' },
      ]
    },
    {
      name: 'Arc Cursed Womb',
      episodes: '6-13',
      description: 'Missions dangereuses et entraînement',
      events: [
        { title: 'Mission du centre de détention', description: 'Confrontation avec les fléaux spéciaux', type: 'battle', importance: 'major' },
        { title: 'Réveil de Sukuna', description: 'Sukuna prend le contrôle temporairement', type: 'power', importance: 'major' },
        { title: 'Mort de Junpei', description: 'Première perte tragique pour Yuji', type: 'death', importance: 'major' },
      ]
    },
    {
      name: 'Arc Kyoto Goodwill',
      episodes: '14-21',
      description: 'Tournoi entre écoles d\'exorcisme',
      events: [
        { title: 'Attaque de l\'école', description: 'Les fléaux envahissent le tournoi', type: 'battle', importance: 'major' },
        { title: 'Révélation de Todo', description: 'Best Friend et techniques de combat', type: 'relationship', importance: 'minor' },
        { title: 'Apparition de Hanami', description: 'Premier affrontement avec un fléau majeur', type: 'battle', importance: 'major' },
      ]
    },
    {
      name: 'Arc Shibuya',
      episodes: '22-47',
      description: 'L\'incident catastrophique de Shibuya',
      events: [
        { title: 'Scellement de Gojo', description: 'Le plus fort est piégé dans la Prison', type: 'plot', importance: 'major' },
        { title: 'Massacre de Shibuya', description: 'Des milliers de victimes civiles', type: 'death', importance: 'major' },
        { title: 'Éveil de Megumi', description: 'Le Mahoraga est invoqué', type: 'power', importance: 'major' },
        { title: 'Mort de Nanami', description: 'Perte d\'un mentor bien-aimé', type: 'death', importance: 'major' },
      ]
    },
  ],
  'demon-slayer': [
    {
      name: 'Arc Sélection Finale',
      episodes: '1-5',
      description: 'Tanjiro devient pourfendeur',
      events: [
        { title: 'Massacre de la famille', description: 'Muzan tue la famille Kamado', type: 'death', importance: 'major' },
        { title: 'Entraînement avec Urokodaki', description: 'Apprentissage du Souffle de l\'Eau', type: 'power', importance: 'major' },
        { title: 'Réussite de la sélection', description: 'Tanjiro devient officiellement pourfendeur', type: 'plot', importance: 'major' },
      ]
    },
    {
      name: 'Arc Mont Natagumo',
      episodes: '15-21',
      description: 'Confrontation avec les Lunes Inférieures',
      events: [
        { title: 'Combat contre Rui', description: 'Première Lune Inférieure affrontée', type: 'battle', importance: 'major' },
        { title: 'Danse du Dieu du Feu', description: 'Tanjiro éveille le Souffle du Soleil', type: 'power', importance: 'major' },
        { title: 'Rencontre avec les Piliers', description: 'Les Hashira apparaissent', type: 'character', importance: 'major' },
      ]
    },
    {
      name: 'Arc Train de l\'Infini',
      episodes: 'Film + 22-26',
      description: 'Mission avec Rengoku',
      events: [
        { title: 'Piège d\'Enmu', description: 'Les passagers piégés dans des rêves', type: 'battle', importance: 'major' },
        { title: 'Combat contre Akaza', description: 'Apparition de la Lune Supérieure 3', type: 'battle', importance: 'major' },
        { title: 'Mort de Rengoku', description: 'Le Pilier de la Flamme tombe', type: 'death', importance: 'major' },
      ]
    },
    {
      name: 'Arc Quartier des Plaisirs',
      episodes: '27-37',
      description: 'Mission à Yoshiwara',
      events: [
        { title: 'Infiltration', description: 'Tanjiro, Zenitsu et Inosuke déguisés', type: 'plot', importance: 'minor' },
        { title: 'Combat contre Daki & Gyutaro', description: 'Lunes Supérieures 6', type: 'battle', importance: 'major' },
        { title: 'Marque de Pourfendeur', description: 'Tanjiro éveille sa marque', type: 'power', importance: 'major' },
      ]
    },
  ],
  'naruto': [
    {
      name: 'Arc Académie',
      episodes: '1-5',
      description: 'Naruto devient Genin',
      events: [
        { title: 'Vol du Parchemin', description: 'Naruto apprend le Multi-clonage', type: 'power', importance: 'major' },
        { title: 'Formation Équipe 7', description: 'Naruto, Sasuke et Sakura réunis', type: 'relationship', importance: 'major' },
        { title: 'Test des Clochettes', description: 'Leçon sur le travail d\'équipe', type: 'plot', importance: 'minor' },
      ]
    },
    {
      name: 'Arc Pays des Vagues',
      episodes: '6-19',
      description: 'Première mission dangereuse',
      events: [
        { title: 'Rencontre avec Zabuza', description: 'Premier ennemi de rang élevé', type: 'battle', importance: 'major' },
        { title: 'Éveil du Sharingan', description: 'Sasuke éveille son dojutsu', type: 'power', importance: 'major' },
        { title: 'Mort de Haku', description: 'Première leçon sur la mort ninja', type: 'death', importance: 'major' },
      ]
    },
    {
      name: 'Arc Examen Chunin',
      episodes: '20-67',
      description: 'Tournoi des ninjas',
      events: [
        { title: 'Forêt de la Mort', description: 'Rencontre avec Orochimaru', type: 'battle', importance: 'major' },
        { title: 'Invasion de Konoha', description: 'Attaque du Village Caché', type: 'battle', importance: 'major' },
        { title: 'Mort du Troisième Hokage', description: 'Sacrifice pour protéger le village', type: 'death', importance: 'major' },
        { title: 'Combat Naruto vs Gaara', description: 'Naruto invoque Gamabunta', type: 'battle', importance: 'major' },
      ]
    },
    {
      name: 'Arc Poursuite de Sasuke',
      episodes: '107-135',
      description: 'Sasuke quitte le village',
      events: [
        { title: 'Défection de Sasuke', description: 'Sasuke rejoint Orochimaru', type: 'plot', importance: 'major' },
        { title: 'Combat à la Vallée de la Fin', description: 'Naruto vs Sasuke épique', type: 'battle', importance: 'major' },
        { title: 'Promesse à Sakura', description: 'Naruto jure de ramener Sasuke', type: 'relationship', importance: 'major' },
      ]
    },
  ],
  'hunter': [
    {
      name: 'Arc Examen Hunter',
      episodes: '1-21',
      description: 'Gon passe l\'examen Hunter',
      events: [
        { title: 'Rencontre du quatuor', description: 'Gon, Killua, Kurapika et Leorio se rencontrent', type: 'relationship', importance: 'major' },
        { title: 'Tour des Astuces', description: 'Affrontement contre Hisoka', type: 'battle', importance: 'minor' },
        { title: 'Obtention de la licence', description: 'Gon devient officiellement Hunter', type: 'plot', importance: 'major' },
      ]
    },
    {
      name: 'Arc Famille Zoldyck',
      episodes: '22-26',
      description: 'Sauvetage de Killua',
      events: [
        { title: 'Infiltration du domaine', description: 'Gon affronte les épreuves Zoldyck', type: 'battle', importance: 'minor' },
        { title: 'Rencontre avec Silva', description: 'Le père de Killua teste Gon', type: 'character', importance: 'major' },
        { title: 'Libération de Killua', description: 'Les amis réunis à nouveau', type: 'relationship', importance: 'major' },
      ]
    },
    {
      name: 'Arc Greed Island',
      episodes: '59-75',
      description: 'Entraînement au Nen dans le jeu',
      events: [
        { title: 'Apprentissage du Nen', description: 'Gon et Killua maîtrisent le Nen', type: 'power', importance: 'major' },
        { title: 'Rencontre avec Biscuit', description: 'Nouveau maître d\'entraînement', type: 'character', importance: 'major' },
        { title: 'Combat contre les Bombers', description: 'Victoire tactique de Gon', type: 'battle', importance: 'major' },
      ]
    },
    {
      name: 'Arc Chimera Ants',
      episodes: '76-136',
      description: 'La menace des fourmis chimères',
      events: [
        { title: 'Naissance de Meruem', description: 'Le Roi des Chimera Ants naît', type: 'character', importance: 'major' },
        { title: 'Invasion du palais', description: 'Assaut final des Hunters', type: 'battle', importance: 'major' },
        { title: 'Transformation de Gon', description: 'Gon sacrifie son potentiel', type: 'power', importance: 'major' },
        { title: 'Mort de Meruem et Komugi', description: 'Fin tragique et belle', type: 'death', importance: 'major' },
      ]
    },
  ],
  'mha': [
    {
      name: 'Arc Origine',
      episodes: '1-4',
      description: 'Deku hérite de One For All',
      events: [
        { title: 'Rencontre avec All Might', description: 'Le héros n°1 reconnaît Deku', type: 'character', importance: 'major' },
        { title: 'Transfert de One For All', description: 'Deku obtient son Alter', type: 'power', importance: 'major' },
        { title: 'Admission à UA', description: 'Deku entre dans la meilleure école', type: 'plot', importance: 'major' },
      ]
    },
    {
      name: 'Arc USJ',
      episodes: '12-13',
      description: 'Attaque de la Ligue des Vilains',
      events: [
        { title: 'Invasion de l\'USJ', description: 'Première apparition de la Ligue', type: 'battle', importance: 'major' },
        { title: 'All Might vs Nomu', description: 'Combat légendaire du Symbol de Paix', type: 'battle', importance: 'major' },
        { title: 'Révélation de la faiblesse', description: 'All Might atteint ses limites', type: 'plot', importance: 'major' },
      ]
    },
    {
      name: 'Arc Festival Sportif',
      episodes: '14-25',
      description: 'Compétition entre étudiants',
      events: [
        { title: 'Course d\'obstacles', description: 'Deku montre son intelligence', type: 'battle', importance: 'minor' },
        { title: 'Todoroki vs Deku', description: 'Combat émotionnel et révélateur', type: 'battle', importance: 'major' },
        { title: 'Passé de Todoroki', description: 'Révélation sur Endeavor', type: 'character', importance: 'major' },
      ]
    },
    {
      name: 'Arc Kamino',
      episodes: '46-50',
      description: 'All Might vs All For One',
      events: [
        { title: 'Enlèvement de Bakugo', description: 'La Ligue capture Bakugo', type: 'plot', importance: 'major' },
        { title: 'Combat final', description: 'All Might utilise ses dernières forces', type: 'battle', importance: 'major' },
        { title: 'Fin de All Might', description: 'Le Symbol de Paix prend sa retraite', type: 'death', importance: 'major' },
      ]
    },
  ],
  'onepiece': [
    {
      name: 'Arc Romance Dawn',
      episodes: '1-3',
      description: 'Luffy commence son voyage',
      events: [
        { title: 'Promesse à Shanks', description: 'Luffy jure de devenir Roi des Pirates', type: 'relationship', importance: 'major' },
        { title: 'Pouvoir du Gomu Gomu', description: 'Luffy mange le fruit du démon', type: 'power', importance: 'major' },
        { title: 'Recrutement de Zoro', description: 'Premier membre de l\'équipage', type: 'character', importance: 'major' },
      ]
    },
    {
      name: 'Arc Arlong Park',
      episodes: '31-44',
      description: 'Sauvetage de Nami',
      events: [
        { title: 'Passé de Nami', description: 'Révélation de la tragédie de Nami', type: 'character', importance: 'major' },
        { title: 'Luffy vs Arlong', description: 'Combat pour la liberté de Nami', type: 'battle', importance: 'major' },
        { title: 'Nami rejoint officiellement', description: 'L\'équipage se solidifie', type: 'relationship', importance: 'major' },
      ]
    },
    {
      name: 'Arc Enies Lobby',
      episodes: '264-312',
      description: 'Sauvetage de Robin',
      events: [
        { title: 'Déclaration de guerre', description: 'Luffy brûle le drapeau du Gouvernement', type: 'plot', importance: 'major' },
        { title: 'Gear Second & Third', description: 'Nouvelles transformations de Luffy', type: 'power', importance: 'major' },
        { title: 'Victoire contre CP9', description: 'L\'équipage triomphe ensemble', type: 'battle', importance: 'major' },
        { title: 'Mort du Merry', description: 'Adieu au premier navire', type: 'death', importance: 'major' },
      ]
    },
    {
      name: 'Arc Marineford',
      episodes: '457-489',
      description: 'La guerre au sommet',
      events: [
        { title: 'Invasion d\'Impel Down', description: 'Luffy libère des prisonniers', type: 'battle', importance: 'major' },
        { title: 'Guerre au Sommet', description: 'Pirates vs Marine épique', type: 'battle', importance: 'major' },
        { title: 'Mort d\'Ace', description: 'Le frère de Luffy meurt dans ses bras', type: 'death', importance: 'major' },
        { title: 'Intervention de Shanks', description: 'Fin de la guerre', type: 'plot', importance: 'major' },
      ]
    },
  ],
  'aot': [
    {
      name: 'Arc Chute de Shiganshina',
      episodes: '1-5',
      description: 'Les Titans attaquent',
      events: [
        { title: 'Apparition du Titan Colossal', description: 'Le mur Maria est détruit', type: 'battle', importance: 'major' },
        { title: 'Mort de Carla', description: 'La mère d\'Eren est dévorée', type: 'death', importance: 'major' },
        { title: 'Serment d\'Eren', description: 'Eren jure d\'exterminer les Titans', type: 'character', importance: 'major' },
      ]
    },
    {
      name: 'Arc Trost',
      episodes: '6-13',
      description: 'Première bataille majeure',
      events: [
        { title: 'Mort de l\'escouade d\'Eren', description: 'Traumatisme initial', type: 'death', importance: 'major' },
        { title: 'Transformation d\'Eren', description: 'Eren devient un Titan', type: 'power', importance: 'major' },
        { title: 'Victoire à Trost', description: 'Premier succès humain', type: 'battle', importance: 'major' },
      ]
    },
    {
      name: 'Arc Femme Titan',
      episodes: '14-25',
      description: 'Chasse au traître',
      events: [
        { title: 'Expédition 57e', description: 'Première mission hors des murs', type: 'battle', importance: 'major' },
        { title: 'Révélation d\'Annie', description: 'Une camarade est le Titan Féminin', type: 'plot', importance: 'major' },
        { title: 'Combat à Stohess', description: 'Eren vs Annie dans la ville', type: 'battle', importance: 'major' },
      ]
    },
    {
      name: 'Arc Shiganshina',
      episodes: '51-59',
      description: 'Retour au mur Maria',
      events: [
        { title: 'Charge d\'Erwin', description: 'Sacrifice héroïque du commandant', type: 'death', importance: 'major' },
        { title: 'Révélation du sous-sol', description: 'La vérité sur le monde', type: 'plot', importance: 'major' },
        { title: 'Mort du Titan Bestial', description: 'Levi vs Zeke épique', type: 'battle', importance: 'major' },
      ]
    },
  ],
  'dragonball': [
    {
      name: 'Arc Tournoi',
      episodes: '1-28',
      description: 'Les débuts de Goku',
      events: [
        { title: 'Rencontre avec Bulma', description: 'Début de l\'aventure', type: 'relationship', importance: 'major' },
        { title: 'Entraînement Kame Sennin', description: 'Apprentissage du Kamehameha', type: 'power', importance: 'major' },
        { title: 'Premier Tenkaichi Budokai', description: 'Goku perd en finale', type: 'battle', importance: 'major' },
      ]
    },
    {
      name: 'Arc Saiyans',
      episodes: 'DBZ 1-35',
      description: 'Découverte des origines de Goku',
      events: [
        { title: 'Mort de Raditz', description: 'Goku sacrifie sa vie', type: 'death', importance: 'major' },
        { title: 'Arrivée de Vegeta', description: 'Le prince des Saiyans attaque', type: 'character', importance: 'major' },
        { title: 'Premier Kaioken', description: 'Nouvelle technique de Goku', type: 'power', importance: 'major' },
      ]
    },
    {
      name: 'Arc Namek',
      episodes: 'DBZ 36-107',
      description: 'Quête des Dragon Balls sur Namek',
      events: [
        { title: 'Transformation Freezer', description: 'Le tyran montre sa vraie forme', type: 'character', importance: 'major' },
        { title: 'Mort de Krillin', description: 'Déclenche la transformation de Goku', type: 'death', importance: 'major' },
        { title: 'Super Saiyan', description: 'Goku atteint la forme légendaire', type: 'power', importance: 'major' },
        { title: 'Défaite de Freezer', description: 'Victoire épique de Goku', type: 'battle', importance: 'major' },
      ]
    },
    {
      name: 'Arc Cell',
      episodes: 'DBZ 118-194',
      description: 'La menace des androïdes',
      events: [
        { title: 'Apparition de Cell', description: 'Le bio-androïde parfait', type: 'character', importance: 'major' },
        { title: 'Cell Games', description: 'Tournoi pour le sort de la Terre', type: 'battle', importance: 'major' },
        { title: 'Super Saiyan 2 Gohan', description: 'Gohan surpasse son père', type: 'power', importance: 'major' },
        { title: 'Sacrifice de Goku', description: 'Goku se téléporte avec Cell', type: 'death', importance: 'major' },
      ]
    },
  ],
  'deathnote': [
    {
      name: 'Arc Introduction',
      episodes: '1-7',
      description: 'Light trouve le Death Note',
      events: [
        { title: 'Découverte du Death Note', description: 'Light trouve le cahier mortel', type: 'power', importance: 'major' },
        { title: 'Premier meurtre', description: 'Light tue le premier criminel', type: 'death', importance: 'major' },
        { title: 'Apparition de L', description: 'Le détective mystérieux entre en jeu', type: 'character', importance: 'major' },
      ]
    },
    {
      name: 'Arc Investigation',
      episodes: '8-15',
      description: 'Le jeu du chat et de la souris',
      events: [
        { title: 'Confrontation à l\'université', description: 'L révèle son visage à Light', type: 'plot', importance: 'major' },
        { title: 'Light rejoint l\'équipe', description: 'Le tueur enquête sur lui-même', type: 'plot', importance: 'major' },
        { title: 'Sacrifice du FBI', description: 'Light élimine les agents', type: 'death', importance: 'major' },
      ]
    },
    {
      name: 'Arc Yotsuba',
      episodes: '16-25',
      description: 'Light perd ses souvenirs',
      events: [
        { title: 'Abandon du Death Note', description: 'Light perd ses souvenirs', type: 'plot', importance: 'major' },
        { title: 'Nouveau Kira', description: 'Higuchi utilise le cahier', type: 'character', importance: 'major' },
        { title: 'Récupération des souvenirs', description: 'Light redevient Kira', type: 'power', importance: 'major' },
      ]
    },
    {
      name: 'Arc L',
      episodes: '26-37',
      description: 'Fin de la confrontation L vs Light',
      events: [
        { title: 'Plan de Rem', description: 'Le Shinigami sacrifie tout pour Misa', type: 'death', importance: 'major' },
        { title: 'Mort de L', description: 'Light remporte la bataille', type: 'death', importance: 'major' },
        { title: 'Near et Mello', description: 'Nouveaux successeurs de L', type: 'character', importance: 'major' },
        { title: 'Chute de Kira', description: 'Light est finalement vaincu', type: 'death', importance: 'major' },
      ]
    },
  ],
  'bleach': [
    {
      name: 'Arc Agent of Shinigami',
      episodes: '1-20',
      description: 'Ichigo devient Shinigami',
      events: [
        { title: 'Transfert de pouvoirs', description: 'Rukia donne ses pouvoirs à Ichigo', type: 'power', importance: 'major' },
        { title: 'Premières batailles', description: 'Ichigo combat les Hollows', type: 'battle', importance: 'minor' },
        { title: 'Arrestation de Rukia', description: 'La Soul Society récupère Rukia', type: 'plot', importance: 'major' },
      ]
    },
    {
      name: 'Arc Soul Society',
      episodes: '21-63',
      description: 'Invasion de la Soul Society',
      events: [
        { title: 'Entraînement avec Urahara', description: 'Ichigo obtient son Shikai', type: 'power', importance: 'major' },
        { title: 'Combats des Capitaines', description: 'Ichigo affronte Kenpachi et Byakuya', type: 'battle', importance: 'major' },
        { title: 'Bankai d\'Ichigo', description: 'Ichigo maîtrise la forme ultime', type: 'power', importance: 'major' },
        { title: 'Trahison d\'Aizen', description: 'Le vrai antagoniste révélé', type: 'plot', importance: 'major' },
      ]
    },
    {
      name: 'Arc Arrancar',
      episodes: '110-167',
      description: 'La menace du Hueco Mundo',
      events: [
        { title: 'Apparition des Espadas', description: 'Les Arrancars d\'Aizen attaquent', type: 'character', importance: 'major' },
        { title: 'Hollow Ichigo', description: 'Ichigo perd le contrôle', type: 'power', importance: 'major' },
        { title: 'Enlèvement d\'Orihime', description: 'Mission de sauvetage lancée', type: 'plot', importance: 'major' },
      ]
    },
    {
      name: 'Arc Fake Karakura',
      episodes: '213-310',
      description: 'Bataille finale contre Aizen',
      events: [
        { title: 'Combats des Espadas', description: 'Tous contre les Espadas', type: 'battle', importance: 'major' },
        { title: 'Vasto Lorde Ichigo', description: 'Transformation complète en Hollow', type: 'power', importance: 'major' },
        { title: 'Final Getsuga Tensho', description: 'Ichigo sacrifie ses pouvoirs', type: 'power', importance: 'major' },
        { title: 'Défaite d\'Aizen', description: 'Le traître est scellé', type: 'battle', importance: 'major' },
      ]
    },
  ],
};

const TimelinePage = () => {
  const [selectedAnime, setSelectedAnime] = useState<string>('haikyuu');
  const [expandedArcs, setExpandedArcs] = useState<string[]>([]);

  const anime = animeData.find(a => a.id === selectedAnime);
  const arcs = animeArcs[selectedAnime] || [];

  const toggleArc = (arcName: string) => {
    setExpandedArcs(prev => 
      prev.includes(arcName) 
        ? prev.filter(a => a !== arcName)
        : [...prev, arcName]
    );
  };

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'battle': return <Swords className="w-4 h-4" />;
      case 'character': return <Star className="w-4 h-4" />;
      case 'plot': return <Sparkles className="w-4 h-4" />;
      case 'death': return <Skull className="w-4 h-4" />;
      case 'power': return <Crown className="w-4 h-4" />;
      case 'relationship': return <Heart className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'battle': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'character': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'plot': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'death': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'power': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'relationship': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

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

  return (
    <div className={`min-h-screen bg-background ${anime?.theme || ''}`}>
      <ParticleBackground 
        particleCount={40} 
        color={themeColors[anime?.theme || 'theme-haikyuu']} 
      />
      <Navbar />

      <main className="relative pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-primary" />
              <h1 className="font-display text-4xl md:text-5xl font-black gradient-text">
                Timeline des Arcs
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explorez les arcs narratifs et événements majeurs de chaque anime
            </p>
          </motion.div>

          {/* Anime Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {animeData.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  setSelectedAnime(a.id);
                  setExpandedArcs([]);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedAnime === a.id
                    ? 'bg-primary text-primary-foreground'
                    : 'glass hover:bg-muted'
                }`}
              >
                {a.title}
              </button>
            ))}
          </motion.div>

          {/* Selected Anime Header */}
          {anime && (
            <motion.div
              key={anime.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-2xl p-6 mb-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="text-center md:text-left">
                  <h2 className="font-display text-2xl font-bold text-foreground">{anime.title}</h2>
                  {anime.titleJapanese && (
                    <p className="text-muted-foreground">{anime.titleJapanese}</p>
                  )}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2">
                    <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs">
                      {anime.episodes} épisodes
                    </span>
                    <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs">
                      {arcs.length} arcs
                    </span>
                  </div>
                </div>
                <Link
                  to={`/anime/${anime.id}`}
                  className="ml-auto px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Voir les personnages
                </Link>
              </div>
            </motion.div>
          )}

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

            {/* Arcs */}
            <div className="space-y-8">
              {arcs.map((arc, arcIndex) => (
                <motion.div
                  key={arc.name}
                  initial={{ opacity: 0, x: arcIndex % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: arcIndex * 0.1 }}
                  className={`relative ${arcIndex % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />

                  {/* Arc Card */}
                  <div className={`ml-12 md:ml-0 ${arcIndex % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                    <div className="glass-card rounded-2xl overflow-hidden">
                      {/* Arc Header */}
                      <button
                        onClick={() => toggleArc(arc.name)}
                        className="w-full p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold">
                            {arcIndex + 1}
                          </div>
                          <div className="text-left">
                            <h3 className="font-display text-lg font-bold text-foreground">{arc.name}</h3>
                            <p className="text-sm text-muted-foreground">Épisodes {arc.episodes}</p>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedArcs.includes(arc.name) ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        </motion.div>
                      </button>

                      {/* Arc Description */}
                      <div className="px-6 pb-4">
                        <p className="text-sm text-muted-foreground">{arc.description}</p>
                      </div>

                      {/* Events */}
                      <AnimatePresence>
                        {expandedArcs.includes(arc.name) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 space-y-3">
                              {arc.events.map((event, eventIndex) => (
                                <motion.div
                                  key={event.title}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: eventIndex * 0.05 }}
                                  className={`flex items-start gap-3 p-3 rounded-xl border ${getEventColor(event.type)} ${
                                    event.importance === 'major' ? 'ring-1 ring-primary/30' : ''
                                  }`}
                                >
                                  <div className="mt-0.5">
                                    {getEventIcon(event.type)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-semibold text-sm">{event.title}</h4>
                                      {event.importance === 'major' && (
                                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-primary/20 text-primary">
                                          MAJEUR
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs opacity-80 mt-0.5">{event.description}</p>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TimelinePage;
