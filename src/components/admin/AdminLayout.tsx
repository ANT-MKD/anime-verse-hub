import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Film, Users, HelpCircle, Settings, 
  MessageSquare, Bell, ChevronLeft, Shield, Menu, X, UserCog
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Animes', path: '/admin/animes', icon: Film },
  { name: 'Personnages', path: '/admin/characters', icon: UserCog },
  { name: 'Quiz', path: '/admin/quiz', icon: HelpCircle },
  { name: 'Utilisateurs', path: '/admin/users', icon: Users },
  { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
  { name: 'Notifications', path: '/admin/notifications', icon: Bell },
  { name: 'Paramètres', path: '/admin/settings', icon: Settings },
];

const AdminLayout = ({ children, title }: { children: ReactNode; title: string }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, unreadMessagesCount, unreadNotificationsCount } = useAdmin();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Shield className="w-16 h-16 text-destructive mx-auto" />
          <h1 className="text-2xl font-bold">Accès refusé</h1>
          <p className="text-muted-foreground">Vous n'avez pas les droits administrateur.</p>
          <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  const SidebarContent = () => (
    <>
      <div className="p-5 border-b border-border">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-4">
          <ChevronLeft className="w-4 h-4" />
          Retour au site
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-display text-sm font-bold">Admin Panel</h2>
            <p className="text-[10px] text-muted-foreground">AnimeVerse</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {sidebarLinks.map(link => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          const badge = link.name === 'Messages' ? unreadMessagesCount : link.name === 'Notifications' ? unreadNotificationsCount : 0;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all',
                isActive 
                  ? 'bg-primary/10 text-primary font-medium shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="flex-1">{link.name}</span>
              {badge > 0 && (
                <Badge variant="destructive" className="text-[10px] px-1.5 py-0 min-w-[18px] h-[18px] flex items-center justify-center">
                  {badge}
                </Badge>
              )}
              {isActive && <div className="w-1 h-4 rounded-full bg-primary" />}
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden lg:flex flex-col fixed h-full">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-card flex flex-col z-10">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border p-3">
        <div className="flex items-center justify-between">
          <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-lg hover:bg-muted">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-display text-sm font-bold gradient-text">Admin Panel</span>
          <Link to="/" className="text-xs text-muted-foreground">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <div className="p-5 lg:p-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl lg:text-3xl font-display font-bold mb-6">{title}</h1>
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
