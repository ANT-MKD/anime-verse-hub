import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  UserPlus, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Shield,
  ShieldCheck,
  User,
  Ban,
  Check
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdminData, AdminUser } from '@/hooks/useAdminData';
import { cn } from '@/lib/utils';
import { defaultAvatars } from '@/contexts/UserProfileContext';

const roleConfig = {
  admin: { label: 'Admin', icon: ShieldCheck, color: 'text-red-500 bg-red-500/10' },
  moderator: { label: 'Modérateur', icon: Shield, color: 'text-yellow-500 bg-yellow-500/10' },
  user: { label: 'Utilisateur', icon: User, color: 'text-blue-500 bg-blue-500/10' },
};

const AdminUsersPage = () => {
  const { users, addUser, updateUser, deleteUser, isLoading } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [newUser, setNewUser] = useState({
    email: '',
    pseudo: '',
    avatar: '👤',
    role: 'user' as 'admin' | 'moderator' | 'user',
    lastLogin: new Date().toISOString().split('T')[0],
    isActive: true,
  });

  const filteredUsers = users.filter(user => 
    user.pseudo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = () => {
    if (!newUser.email || !newUser.pseudo) return;
    addUser(newUser);
    setNewUser({
      email: '',
      pseudo: '',
      avatar: '👤',
      role: 'user',
      lastLogin: new Date().toISOString().split('T')[0],
      isActive: true,
    });
    setShowAddModal(false);
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;
    updateUser(editingUser.id, editingUser);
    setEditingUser(null);
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      deleteUser(id);
    }
  };

  const toggleUserStatus = (user: AdminUser) => {
    updateUser(user.id, { isActive: !user.isActive });
  };

  if (isLoading) {
    return (
      <AdminLayout title="Utilisateurs">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Utilisateurs" 
      description={`${users.length} utilisateurs enregistrés`}
    >
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
        >
          <UserPlus className="w-5 h-5" />
          Ajouter
        </motion.button>
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left p-4 font-medium">Utilisateur</th>
                <th className="text-left p-4 font-medium">Email</th>
                <th className="text-left p-4 font-medium">Rôle</th>
                <th className="text-left p-4 font-medium">Statut</th>
                <th className="text-left p-4 font-medium">Inscription</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => {
                const roleInfo = roleConfig[user.role];
                return (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border hover:bg-muted/20"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
                          {user.avatar}
                        </div>
                        <span className="font-medium">{user.pseudo}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{user.email}</td>
                    <td className="p-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium",
                        roleInfo.color
                      )}>
                        <roleInfo.icon className="w-3.5 h-3.5" />
                        {roleInfo.label}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium",
                        user.isActive 
                          ? "text-green-500 bg-green-500/10" 
                          : "text-red-500 bg-red-500/10"
                      )}>
                        {user.isActive ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{user.createdAt}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleUserStatus(user)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          {user.isActive ? <Ban className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card border border-border rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h2 className="font-display text-xl font-bold mb-4">Ajouter un utilisateur</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Pseudo</label>
                <input
                  type="text"
                  value={newUser.pseudo}
                  onChange={(e) => setNewUser({ ...newUser, pseudo: e.target.value })}
                  className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Avatar</label>
                <div className="flex flex-wrap gap-2">
                  {defaultAvatars.map((avatar) => (
                    <button
                      key={avatar}
                      onClick={() => setNewUser({ ...newUser, avatar })}
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-colors",
                        newUser.avatar === avatar ? "bg-primary" : "bg-muted/50 hover:bg-muted"
                      )}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rôle</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'admin' | 'moderator' | 'user' })}
                  className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg"
                >
                  <option value="user">Utilisateur</option>
                  <option value="moderator">Modérateur</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
              >
                Ajouter
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card border border-border rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h2 className="font-display text-xl font-bold mb-4">Modifier l'utilisateur</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Pseudo</label>
                <input
                  type="text"
                  value={editingUser.pseudo}
                  onChange={(e) => setEditingUser({ ...editingUser, pseudo: e.target.value })}
                  className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rôle</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as 'admin' | 'moderator' | 'user' })}
                  className="w-full px-4 py-2 bg-muted/50 border border-border rounded-lg"
                >
                  <option value="user">Utilisateur</option>
                  <option value="moderator">Modérateur</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleUpdateUser}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
              >
                Sauvegarder
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminUsersPage;
