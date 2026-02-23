
# Analyse et corrections des pages admin Animes et Personnages

## Problemes identifies

### Page Animes (`/admin/animes`)

**Champs manquants dans le formulaire** (comparaison avec l'interface `Anime` cote client) :
- `titleJapanese` (titre en japonais)
- `fullDescription` (description complete / synopsis detaille)
- `banner` (URL de l'image banniere)
- `theme` (theme CSS de l'anime)

**Boutons manquants** :
- Les animes statiques (provenant du code) n'ont qu'un bouton "Voir" -- il manque "Modifier" et "Supprimer"
- Pour rendre cela coherent, il faut permettre de "cloner" un anime statique en custom pour le modifier, OU afficher les 3 boutons sur tous les animes

**Page dediee manquante** :
- Contrairement aux personnages qui ont des pages `/admin/characters/new`, `/edit/:id`, `/view/:id`, les animes utilisent encore un simple modal. Il faudrait les memes pages dediees.

### Page Personnages (`/admin/characters`)

**Boutons manquants** :
- Les personnages statiques n'ont qu'un bouton "Voir" (oeil) -- il manque "Modifier" et "Supprimer"
- Seuls les personnages custom affichent les 3 boutons (Voir, Modifier, Supprimer)

---

## Plan de correction

### 1. Page Animes -- Remplacement du modal par des pages dediees

Comme pour les personnages, creer 3 nouvelles pages :

**`/admin/animes/new`** et **`/admin/animes/edit/:id`** -- Page formulaire (`AdminAnimeForm.tsx`)
- Formulaire multi-sections avec tous les champs de l'interface `Anime` :
  - Titre, Titre japonais, Description courte, Description complete (synopsis)
  - URL image, URL banniere
  - Theme CSS (select avec les themes existants)
  - Genres (tags dynamiques)
  - Annee, Episodes, Note, Studio, Statut

**`/admin/animes/view/:id`** -- Page vue detaillee (`AdminAnimeView.tsx`)
- Affichage complet en lecture seule de toutes les donnees d'un anime custom
- Boutons "Modifier" et "Retour a la liste"

### 2. Boutons Modifier et Supprimer sur TOUS les elements

**Logique proposee :**
- Pour les elements **statiques** (provenant du code) : le bouton "Modifier" creera une copie custom de l'element (clone editable). Le bouton "Supprimer" marquera l'element comme masque (via une liste de IDs masques dans le localStorage).
- Pour les elements **custom** : fonctionnement actuel (modification et suppression directes).

Cela permet a l'admin d'avoir un controle total sur tous les animes et personnages affiches.

### 3. Mise a jour de la page liste Animes (`AdminAnimesPage.tsx`)
- Supprimer le Dialog/modal
- Ajouter les 3 boutons (Voir, Modifier, Supprimer) sur chaque ligne
- Le bouton "Ajouter" redirige vers `/admin/animes/new`

### 4. Mise a jour de la page liste Personnages (`AdminCharactersPage.tsx`)
- Ajouter les boutons "Modifier" et "Supprimer" egalement sur les personnages statiques
- Le bouton "Modifier" sur un personnage statique cree une copie custom pre-remplie
- Le bouton "Supprimer" masque le personnage statique

### 5. Mise a jour du contexte Admin (`AdminContext.tsx`)
- Ajouter une liste `hiddenStaticAnimes: string[]` et `hiddenStaticCharacters: string[]` pour gerer les suppressions de contenus statiques
- Ajouter les fonctions `hideStaticAnime(id)`, `hideStaticCharacter(animeId, charId)`, `unhideStaticAnime(id)`, `unhideStaticCharacter(animeId, charId)`
- Persistance dans le localStorage

### 6. Routes (`App.tsx`)
Ajout de 3 nouvelles routes :
- `/admin/animes/new`
- `/admin/animes/edit/:id`
- `/admin/animes/view/:id`

---

## Details techniques

### Fichiers a creer
- `src/pages/admin/AdminAnimeForm.tsx` -- Formulaire complet pour creation/modification d'anime
- `src/pages/admin/AdminAnimeView.tsx` -- Page de vue detaillee d'un anime custom

### Fichiers a modifier
- `src/pages/admin/AdminAnimesPage.tsx` -- Supprimer le modal, ajouter navigation vers les pages dediees, ajouter boutons sur tous les elements
- `src/pages/admin/AdminCharactersPage.tsx` -- Ajouter boutons Modifier/Supprimer sur les personnages statiques
- `src/contexts/AdminContext.tsx` -- Ajouter gestion des elements statiques masques + fonction de clonage
- `src/App.tsx` -- Ajouter les 3 nouvelles routes animes

### Comportement des boutons sur les elements statiques

```text
Bouton "Voir" (statique)   -> Redirige vers la page client existante
Bouton "Modifier" (statique) -> Clone l'element en custom pre-rempli -> ouvre /admin/.../edit/:newId
Bouton "Supprimer" (statique) -> Ajoute l'ID a la liste des masques (avec confirmation toast)
```

### Structure du formulaire anime etendu
```text
form = {
  title, titleJapanese, description, fullDescription,
  image, banner, theme,
  genre: string[],
  year, episodes, rating, studio, status
}
```
