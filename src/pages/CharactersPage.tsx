import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import CharacterCard from '@/components/CharacterCard';
import Pagination from '@/components/Pagination';
import AdvancedFilters, { FilterOptions } from '@/components/AdvancedFilters';
import { getAllCharacters, animeData } from '@/data/animeData';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Heart, Users, SortAsc, SortDesc } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const ITEMS_PER_PAGE = 12;

type SortField = 'name' | 'power' | 'speed' | 'intelligence';
type SortOrder = 'asc' | 'desc';

const CharactersPage = () => {
  const allCharacters = getAllCharacters();
  const { favorites, isFavorite } = useFavorites();
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [filters, setFilters] = useState<FilterOptions>({
    minPower: 0,
    maxPower: 100,
    status: [],
    affiliations: [],
    animes: [],
    roles: [],
  });

  // Extract unique values for filter options
  const filterOptions = useMemo(() => {
    const affiliations = new Set<string>();
    const roles = new Set<string>();
    
    allCharacters.forEach((char) => {
      if (char.affiliation?.team) affiliations.add(char.affiliation.team);
      if (char.role) roles.add(char.role);
    });

    return {
      affiliations: Array.from(affiliations).sort(),
      animes: animeData.map((a) => a.title).sort(),
      roles: Array.from(roles).sort(),
    };
  }, [allCharacters]);

  // Apply filters and sorting
  const filteredCharacters = useMemo(() => {
    let result = allCharacters;

    // Favorites filter
    if (showFavoritesOnly) {
      result = result.filter((char) => isFavorite(`${char.animeId}-${char.id}`));
    }

    // Power range filter
    result = result.filter((char) => {
      const avgPower = Object.values(char.stats).reduce((a, b) => a + b, 0) / 6;
      return avgPower >= filters.minPower && avgPower <= filters.maxPower;
    });

    // Status filter
    if (filters.status.length > 0) {
      result = result.filter((char) => filters.status.includes(char.status.status));
    }

    // Anime filter
    if (filters.animes.length > 0) {
      result = result.filter((char) => filters.animes.includes(char.animeTitle));
    }

    // Affiliation filter
    if (filters.affiliations.length > 0) {
      result = result.filter((char) =>
        char.affiliation?.team && filters.affiliations.includes(char.affiliation.team)
      );
    }

    // Role filter
    if (filters.roles.length > 0) {
      result = result.filter((char) => filters.roles.includes(char.role));
    }

    // Sorting
    result = [...result].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'power':
          comparison = a.stats.power - b.stats.power;
          break;
        case 'speed':
          comparison = a.stats.speed - b.stats.speed;
          break;
        case 'intelligence':
          comparison = a.stats.intelligence - b.stats.intelligence;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [allCharacters, showFavoritesOnly, isFavorite, filters, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCharacters = filteredCharacters.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (favoritesOnly: boolean) => {
    setShowFavoritesOnly(favoritesOnly);
    setCurrentPage(1);
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground particleCount={30} />
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-4xl lg:text-6xl font-black mb-4">
              <span className="gradient-text">PERSONNAGES</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-6">
              Découvrez {allCharacters.length} personnages. Filtrez par puissance, statut et plus!
            </p>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFilterChange(false)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                  !showFavoritesOnly ? 'bg-primary text-primary-foreground' : 'glass hover:bg-primary/20'
                )}
              >
                <Users className="w-4 h-4" />
                Tous ({allCharacters.length})
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFilterChange(true)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                  showFavoritesOnly ? 'bg-primary text-primary-foreground' : 'glass hover:bg-primary/20'
                )}
              >
                <Heart className="w-4 h-4" />
                Favoris ({favorites.length})
              </motion.button>
              <Link to="/favorites">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-primary/20 transition-colors"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  Page Favoris
                </motion.div>
              </Link>
            </div>

            {/* Sort Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-muted-foreground self-center mr-2">Trier par:</span>
              {(['name', 'power', 'speed', 'intelligence'] as SortField[]).map((field) => (
                <button
                  key={field}
                  onClick={() => toggleSort(field)}
                  className={cn(
                    'flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    sortField === field
                      ? 'bg-primary/20 text-primary'
                      : 'hover:bg-muted/50 text-muted-foreground'
                  )}
                >
                  {field === 'name' && 'Nom'}
                  {field === 'power' && '💪 Puissance'}
                  {field === 'speed' && '⚡ Vitesse'}
                  {field === 'intelligence' && '🧠 Intelligence'}
                  {sortField === field && (
                    sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Advanced Filters */}
          <AdvancedFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            availableAffiliations={filterOptions.affiliations}
            availableAnimes={filterOptions.animes}
            availableRoles={filterOptions.roles}
          />

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-4">
            {filteredCharacters.length} personnage{filteredCharacters.length !== 1 ? 's' : ''} trouvé{filteredCharacters.length !== 1 ? 's' : ''}
          </p>

          {paginatedCharacters.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg">Aucun personnage trouvé</p>
              <p className="text-sm text-muted-foreground">Essayez de modifier vos filtres</p>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                {paginatedCharacters.map((character, index) => (
                  <CharacterCard
                    key={`${character.animeId}-${character.id}`}
                    character={character}
                    animeId={character.animeId}
                    index={index}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CharactersPage;
