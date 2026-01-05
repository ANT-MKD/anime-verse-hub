import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Palette, 
  Database, 
  Trash2, 
  RefreshCcw,
  Download,
  Upload,
  AlertTriangle,
  Check
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { cn } from '@/lib/utils';

const AdminSettingsPage = () => {
  const [showConfirmClear, setShowConfirmClear] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const storageKeys = [
    { key: 'tierlist-votes', label: 'Votes Tier List', icon: '🏆' },
    { key: 'admin-users', label: 'Utilisateurs Admin', icon: '👥' },
    { key: 'admin-battles', label: 'Historique Battles', icon: '⚔️' },
    { key: 'admin-quizzes', label: 'Scores Quiz', icon: '❓' },
    { key: 'anime-favorites', label: 'Favoris', icon: '❤️' },
    { key: 'anime-user-profile', label: 'Profil utilisateur', icon: '👤' },
  ];

  const getStorageSize = (key: string) => {
    const data = localStorage.getItem(key);
    if (!data) return '0 B';
    const bytes = new Blob([data]).size;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getStorageItemCount = (key: string) => {
    const data = localStorage.getItem(key);
    if (!data) return 0;
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed.length;
      if (typeof parsed === 'object') return Object.keys(parsed).length;
      return 1;
    } catch {
      return 1;
    }
  };

  const handleClearStorage = (key: string) => {
    localStorage.removeItem(key);
    setShowConfirmClear(null);
    setActionSuccess(key);
    setTimeout(() => setActionSuccess(null), 2000);
  };

  const handleClearAll = () => {
    storageKeys.forEach(({ key }) => localStorage.removeItem(key));
    setShowConfirmClear(null);
    setActionSuccess('all');
    setTimeout(() => setActionSuccess(null), 2000);
  };

  const handleExport = () => {
    const exportData: Record<string, unknown> = {};
    storageKeys.forEach(({ key }) => {
      const data = localStorage.getItem(key);
      if (data) {
        try {
          exportData[key] = JSON.parse(data);
        } catch {
          exportData[key] = data;
        }
      }
    });
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `animeverse-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    setActionSuccess('export');
    setTimeout(() => setActionSuccess(null), 2000);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        Object.entries(data).forEach(([key, value]) => {
          localStorage.setItem(key, JSON.stringify(value));
        });
        setActionSuccess('import');
        setTimeout(() => setActionSuccess(null), 2000);
      } catch (error) {
        alert('Erreur lors de l\'import du fichier');
      }
    };
    reader.readAsText(file);
  };

  return (
    <AdminLayout 
      title="Paramètres" 
      description="Configuration et gestion des données"
    >
      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleExport}
          className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:bg-muted/30 transition-colors"
        >
          <div className="p-3 rounded-lg bg-blue-500/10">
            <Download className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-left">
            <p className="font-medium">Exporter</p>
            <p className="text-sm text-muted-foreground">Télécharger une sauvegarde</p>
          </div>
          {actionSuccess === 'export' && <Check className="w-5 h-5 text-green-500 ml-auto" />}
        </motion.button>

        <label className="cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:bg-muted/30 transition-colors"
          >
            <div className="p-3 rounded-lg bg-green-500/10">
              <Upload className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-left">
              <p className="font-medium">Importer</p>
              <p className="text-sm text-muted-foreground">Restaurer une sauvegarde</p>
            </div>
            {actionSuccess === 'import' && <Check className="w-5 h-5 text-green-500 ml-auto" />}
          </motion.div>
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </label>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowConfirmClear('all')}
          className="flex items-center gap-3 p-4 bg-card border border-red-500/30 rounded-xl hover:bg-red-500/10 transition-colors"
        >
          <div className="p-3 rounded-lg bg-red-500/10">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <div className="text-left">
            <p className="font-medium text-red-500">Tout effacer</p>
            <p className="text-sm text-muted-foreground">Réinitialiser les données</p>
          </div>
        </motion.button>
      </div>

      {/* Storage Management */}
      <div className="bg-card border border-border rounded-xl overflow-hidden mb-8">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          <h3 className="font-display font-bold">Stockage Local</h3>
        </div>
        <div className="divide-y divide-border">
          {storageKeys.map(({ key, label, icon }) => (
            <div key={key} className="flex items-center justify-between p-4 hover:bg-muted/20">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="font-medium">{label}</p>
                  <p className="text-sm text-muted-foreground">
                    {getStorageItemCount(key)} éléments • {getStorageSize(key)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {actionSuccess === key && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Check className="w-5 h-5 text-green-500" />
                  </motion.div>
                )}
                <button
                  onClick={() => setShowConfirmClear(key)}
                  className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* App Info */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-primary" />
          <h3 className="font-display font-bold">Informations</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
            <span className="text-muted-foreground">Version</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
            <span className="text-muted-foreground">Mode</span>
            <span className="font-medium">LocalStorage</span>
          </div>
          <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
            <span className="text-muted-foreground">Framework</span>
            <span className="font-medium">React + Vite</span>
          </div>
          <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
            <span className="text-muted-foreground">UI</span>
            <span className="font-medium">Tailwind + shadcn</span>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmClear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card border border-border rounded-xl p-6 w-full max-w-md mx-4"
          >
            <div className="flex items-center gap-3 mb-4 text-red-500">
              <AlertTriangle className="w-6 h-6" />
              <h2 className="font-display text-xl font-bold">Confirmer la suppression</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              {showConfirmClear === 'all' 
                ? 'Êtes-vous sûr de vouloir supprimer toutes les données ? Cette action est irréversible.'
                : `Êtes-vous sûr de vouloir supprimer les données de "${storageKeys.find(k => k.key === showConfirmClear)?.label}" ?`
              }
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmClear(null)}
                className="px-4 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => showConfirmClear === 'all' ? handleClearAll() : handleClearStorage(showConfirmClear)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminSettingsPage;
