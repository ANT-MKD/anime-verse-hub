import { motion } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface FilterOptions {
  minPower: number;
  maxPower: number;
  status: string[];
  affiliations: string[];
  animes: string[];
  roles: string[];
}

interface AdvancedFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  availableAffiliations: string[];
  availableAnimes: string[];
  availableRoles: string[];
}

const AdvancedFilters = ({
  filters,
  onFiltersChange,
  availableAffiliations,
  availableAnimes,
  availableRoles,
}: AdvancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleArrayFilter = (
    key: 'status' | 'affiliations' | 'animes' | 'roles',
    value: string
  ) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: updated });
  };

  const resetFilters = () => {
    onFiltersChange({
      minPower: 0,
      maxPower: 100,
      status: [],
      affiliations: [],
      animes: [],
      roles: [],
    });
  };

  const hasActiveFilters =
    filters.minPower > 0 ||
    filters.maxPower < 100 ||
    filters.status.length > 0 ||
    filters.affiliations.length > 0 ||
    filters.animes.length > 0 ||
    filters.roles.length > 0;

  const statusOptions = ['Alive', 'Deceased', 'Unknown'];

  return (
    <div className="mb-6">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
          hasActiveFilters ? 'bg-primary text-primary-foreground' : 'glass hover:bg-primary/20'
        )}
      >
        <Filter className="w-4 h-4" />
        Filtres avancés
        {hasActiveFilters && (
          <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-background/20">
            {filters.status.length + filters.affiliations.length + filters.animes.length + filters.roles.length}
          </span>
        )}
        <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
      </motion.button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="glass-card rounded-xl p-4 mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Filtres</h3>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Réinitialiser
              </button>
            )}
          </div>

          {/* Power Range */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Puissance moyenne ({filters.minPower} - {filters.maxPower})
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={filters.minPower}
                onChange={(e) =>
                  onFiltersChange({ ...filters, minPower: Number(e.target.value) })
                }
                className="flex-1 accent-primary"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={filters.maxPower}
                onChange={(e) =>
                  onFiltersChange({ ...filters, maxPower: Number(e.target.value) })
                }
                className="flex-1 accent-primary"
              />
            </div>
          </div>

          {/* Status */}
          <FilterSection
            title="Statut"
            isExpanded={expandedSection === 'status'}
            onToggle={() => setExpandedSection(expandedSection === 'status' ? null : 'status')}
          >
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <FilterChip
                  key={status}
                  label={status}
                  isActive={filters.status.includes(status)}
                  onClick={() => toggleArrayFilter('status', status)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Animes */}
          <FilterSection
            title="Anime"
            isExpanded={expandedSection === 'animes'}
            onToggle={() => setExpandedSection(expandedSection === 'animes' ? null : 'animes')}
          >
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {availableAnimes.map((anime) => (
                <FilterChip
                  key={anime}
                  label={anime}
                  isActive={filters.animes.includes(anime)}
                  onClick={() => toggleArrayFilter('animes', anime)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Affiliations */}
          <FilterSection
            title="Affiliation"
            isExpanded={expandedSection === 'affiliations'}
            onToggle={() => setExpandedSection(expandedSection === 'affiliations' ? null : 'affiliations')}
          >
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {availableAffiliations.slice(0, 20).map((affiliation) => (
                <FilterChip
                  key={affiliation}
                  label={affiliation}
                  isActive={filters.affiliations.includes(affiliation)}
                  onClick={() => toggleArrayFilter('affiliations', affiliation)}
                />
              ))}
            </div>
          </FilterSection>

          {/* Roles */}
          <FilterSection
            title="Rôle"
            isExpanded={expandedSection === 'roles'}
            onToggle={() => setExpandedSection(expandedSection === 'roles' ? null : 'roles')}
          >
            <div className="flex flex-wrap gap-2">
              {availableRoles.map((role) => (
                <FilterChip
                  key={role}
                  label={role}
                  isActive={filters.roles.includes(role)}
                  onClick={() => toggleArrayFilter('roles', role)}
                />
              ))}
            </div>
          </FilterSection>
        </div>
      </motion.div>
    </div>
  );
};

const FilterSection = ({
  title,
  isExpanded,
  onToggle,
  children,
}: {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="border-t border-border/50 pt-3">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-primary transition-colors"
    >
      {title}
      <ChevronDown className={cn('w-4 h-4 transition-transform', isExpanded && 'rotate-180')} />
    </button>
    <motion.div
      initial={false}
      animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
      className="overflow-hidden"
    >
      <div className="pt-3">{children}</div>
    </motion.div>
  </div>
);

const FilterChip = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'px-3 py-1 rounded-full text-xs font-medium transition-colors',
      isActive
        ? 'bg-primary text-primary-foreground'
        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
    )}
  >
    {label}
  </button>
);

export default AdvancedFilters;
