
# Remplacement du modal par une page complete pour le CRUD des personnages

## Objectif
Remplacer le modal d'ajout/modification de personnage par une page dediee (`/admin/characters/new` et `/admin/characters/edit/:id`) avec un formulaire complet multi-onglets. La page liste existante conservera les actions Voir, Modifier et Supprimer.

## Architecture des pages

```text
/admin/characters          -> Liste des personnages (existant, ameliore)
/admin/characters/new      -> Page formulaire creation
/admin/characters/edit/:id -> Page formulaire modification
/admin/characters/view/:id -> Page vue detaillee d'un personnage custom
```

## Changements prevus

### 1. Page Liste (`AdminCharactersPage.tsx`) - Modification
- Supprimer tout le code du Dialog/modal
- Le bouton "Ajouter" redirige vers `/admin/characters/new`
- Bouton "Voir" (Eye) pour les personnages custom redirige vers `/admin/characters/view/:id`
- Bouton "Modifier" (Edit) redirige vers `/admin/characters/edit/:id`
- Bouton "Supprimer" (Trash) reste en place avec confirmation via `toast`
- Les personnages statiques gardent leur lien vers le profil client

### 2. Page Formulaire (`AdminCharacterForm.tsx`) - Creation
Page dediee avec formulaire multi-onglets (Tabs) contenant toutes les donnees du profil :

**Onglet 1 - Informations de base**
- Nom, Nom natif, Titre, Role, Rang
- Anime associe (select), URL image
- Description courte

**Onglet 2 - Biographie**
- Biographie complete (textarea large)
- Histoire / Backstory (textarea)
- Traits de personnalite (liste dynamique de tags : input + bouton "+", badges avec "x")
- Faiblesses (meme systeme de tags)
- Citations memorables (meme systeme de tags)

**Onglet 3 - Statut & Affiliation**
- Age, Anniversaire, Taille, Poids, Groupe sanguin
- Statut vital (select : Alive / Deceased / Unknown)
- Occupation, Origine
- Equipe, Role dans l'equipe
- Allies (tags dynamiques)
- Anciennes affiliations (tags dynamiques)

**Onglet 4 - Statistiques**
- 6 sliders : Puissance, Vitesse, Technique, Intelligence, Endurance, Agilite (0-100)

**Onglet 5 - Competences**
- Liste dynamique de competences, chacune avec :
  - Nom, Type (select : Attack/Defense/Support/Passive/Ultimate), Description, Niveau (slider 1-100)
- Boutons "Ajouter une competence" et "Supprimer" par element

**Onglet 6 - Relations**
- Liste dynamique avec : Nom du personnage, Type de relation, Description
- Boutons ajouter/supprimer

**Onglet 7 - Equipement**
- Liste dynamique avec : Nom, Type, Description, Rarete (select : Common/Rare/Epic/Legendary/Mythic)
- Boutons ajouter/supprimer

**Onglet 8 - Exploits & Doubleurs**
- Exploits/accomplissements (tags dynamiques)
- Doubleur japonais : nom + nom natif
- Doubleur anglais : nom

La page detecte via l'URL si c'est une creation (`/new`) ou une modification (`/edit/:id`) et pre-remplit le formulaire en consequence.

### 3. Page Vue (`AdminCharacterView.tsx`) - Creation
- Affiche toutes les donnees d'un personnage custom en lecture seule
- Layout similaire au profil client mais dans le AdminLayout
- Boutons "Modifier" et "Retour a la liste" en haut

### 4. Routes (`App.tsx`) - Modification
Ajout de 3 nouvelles routes :
- `/admin/characters/new`
- `/admin/characters/edit/:id`
- `/admin/characters/view/:id`

### 5. Contexte Admin (`AdminContext.tsx`) - Modification
- La fonction `addCustomCharacter` et `updateCustomCharacter` gerent deja tous les champs (stockage generique via spread `...char`)
- Ajout d'une fonction `getCustomCharacterById(id)` pour faciliter la recuperation d'un personnage specifique

## Details techniques

### Composants reutilisables dans la page formulaire
- **TagInput** : Composant pour gerer les listes de texte (personnalite, faiblesses, citations, allies, exploits). Un input + bouton "+" pour ajouter, badges avec icone "x" pour supprimer.
- **DynamicList** : Pattern pour les listes de sous-formulaires (competences, relations, equipement). Chaque element est un mini-formulaire avec bouton supprimer, et un bouton global "Ajouter" en bas.

### Structure du formulaire
Le state du formulaire contiendra tous les champs de l'interface `Character` definie dans `animeData.ts`, adapte pour le stockage localStorage :
- Champs texte simples
- Tableaux de strings pour les tags
- Tableaux d'objets pour skills, relationships, equipment
- Objet imbrique pour status et affiliation

### Navigation
- Bouton "Enregistrer" sauvegarde et redirige vers `/admin/characters`
- Bouton "Annuler" redirige vers `/admin/characters` sans sauvegarder
- Fil d'Ariane en haut : Administration > Personnages > Ajouter/Modifier
