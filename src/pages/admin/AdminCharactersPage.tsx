import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, UserCircle, Plus, Edit, Trash2, Eye } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData } from '@/hooks/useAdminData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const AdminCharactersPage = () => {
  const navigate = useNavigate();
  const { characters, animes, isLoading } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnime, setSelectedAnime] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const allRoles = [...new Set(characters.map(c => c.role))];

  const filteredCharacters = characters.filter(char => {
    const matchesSearch = char.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAnime = selectedAnime === 'all' || char.animeId === selectedAnime;
    const matchesRole = selectedRole === 'all' || char.role === selectedRole;
    return matchesSearch && matchesAnime && matchesRole;
  });

  const handleDelete = (characterId: string, characterName: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${characterName} ?`)) {
      // Get custom characters from localStorage
      const storedCustom = localStorage.getItem('admin-custom-characters');
      const customCharacters = storedCustom ? JSON.parse(storedCustom) : [];
      const updatedCustom = customCharacters.filter((c: any) => c.id !== characterId);
      localStorage.setItem('admin-custom-characters', JSON.stringify(updatedCustom));
      toast.success(`${characterName} a été supprimé`);
      // Force refresh
      window.location.reload();
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Personnages">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Personnages" 
      description={`${characters.length} personnages dans la base de données`}
    >
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un personnage..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          <select
            value={selectedAnime}
            onChange={(e) => setSelectedAnime(e.target.value)}
            className="px-4 py-2 bg-muted/50 border border-border rounded-lg"
          >
            <option value="all">Tous les animes</option>
            {animes.map(anime => (
              <option key={anime.id} value={anime.id}>{anime.title}</option>
            ))}
          </select>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 bg-muted/50 border border-border rounded-lg"
          >
            <option value="all">Tous les rôles</option>
            {allRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/admin/characters/new')}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
          >
            <Plus className="w-5 h-5" />
            Ajouter
          </motion.button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-primary">{characters.length}</p>
          <p className="text-sm text-muted-foreground">Total</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-500">
            {characters.filter(c => c.status.status === 'Alive').length}
          </p>
          <p className="text-sm text-muted-foreground">En vie</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-red-500">
            {characters.filter(c => c.status.status === 'Deceased').length}
          </p>
          <p className="text-sm text-muted-foreground">Décédés</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-yellow-500">
            {characters.filter(c => c.status.status === 'Unknown').length}
          </p>
          <p className="text-sm text-muted-foreground">Inconnu</p>
        </div>
      </div>

      {/* Characters Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-4 font-medium">Personnage</th>
                <th className="text-left p-4 font-medium">Anime</th>
                <th className="text-left p-4 font-medium">Rôle</th>
                <th className="text-left p-4 font-medium">Stats</th>
                <th className="text-left p-4 font-medium">Statut</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCharacters.slice(0, 50).map((char, index) => {
                const avgStats = Math.round(
                  (char.stats.power + char.stats.speed + char.stats.technique + 
                   char.stats.intelligence + char.stats.stamina + char.stats.agility) / 6
                );
                
                return (
                  <motion.tr
                    key={`${char.animeId}-${char.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="border-b border-border hover:bg-muted/20"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                          <img 
                            src={char.image} 
                            alt={char.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{char.name}</p>
                          {char.title && (
                            <p className="text-xs text-muted-foreground">{char.title}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">{char.animeTitle}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {char.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary"
                            style={{ width: `${avgStats}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{avgStats}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "px-2 py-1 text-xs rounded-full font-medium",
                        char.status.status === 'Alive' 
                          ? "bg-green-500/10 text-green-500"
                          : char.status.status === 'Deceased'
                          ? "bg-red-500/10 text-red-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      )}>
                        {char.status.status === 'Alive' ? 'En vie' : 
                         char.status.status === 'Deceased' ? 'Décédé' : 'Inconnu'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/admin/characters/${char.id}`)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          title="Voir"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/admin/characters/${char.id}/edit`)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(char.id, char.name)}
                          className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredCharacters.length > 50 && (
          <div className="p-4 text-center text-muted-foreground border-t border-border">
            Affichage des 50 premiers résultats sur {filteredCharacters.length}
          </div>
        )}
      </div>

      {filteredCharacters.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <UserCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Aucun personnage trouvé</p>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCharactersPage;
