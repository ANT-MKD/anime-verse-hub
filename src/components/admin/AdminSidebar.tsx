import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Film,
  UserCircle,
  Trophy,
  HelpCircle,
  Swords,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { 
    title: 'Dashboard', 
    icon: LayoutDashboard, 
    path: '/admin',
    description: 'Vue d\'ensemble'
  },
  { 
    title: 'Utilisateurs', 
    icon: Users, 
    path: '/admin/users',
    description: 'Gestion des comptes'
  },
  { 
    title: 'Animes', 
    icon: Film, 
    path: '/admin/animes',
    description: 'Catalogue des animes'
  },
  { 
    title: 'Personnages', 
    icon: UserCircle, 
    path: '/admin/characters',
    description: 'Base de personnages'
  },
  { 
    title: 'Tier List', 
    icon: Trophy, 
    path: '/admin/tierlist',
    description: 'Votes et classements'
  },
  { 
    title: 'Quiz', 
    icon: HelpCircle, 
    path: '/admin/quiz',
    description: 'Scores et statistiques'
  },
  { 
    title: 'Battles', 
    icon: Swords, 
    path: '/admin/battles',
    description: 'Historique des combats'
  },
  { 
    title: 'Paramètres', 
    icon: Settings, 
    path: '/admin/settings',
    description: 'Configuration'
  },
];

const AdminSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen bg-card border-r border-border z-50 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-xl">⚔️</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-lg">Admin</h1>
              <p className="text-xs text-muted-foreground">AnimeVerse</p>
            </div>
          </motion.div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 shrink-0",
                isActive && "text-primary-foreground"
              )} />
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 min-w-0"
                >
                  <p className="font-medium truncate">{item.title}</p>
                  <p className={cn(
                    "text-xs truncate",
                    isActive ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {item.description}
                  </p>
                </motion.div>
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-popover border border-border rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  <p className="text-sm font-medium">{item.title}</p>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="font-medium">Retour au site</span>}
        </Link>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;
