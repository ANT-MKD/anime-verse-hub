import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserProfile } from '@/contexts/UserProfileContext';
import { useAdmin } from '@/contexts/AdminContext';
import { toast } from 'sonner';

const UserProfileDropdown = () => {
  const navigate = useNavigate();
  const { profile, isProfileSet, updateProfile } = useUserProfile();
  const { isAdmin } = useAdmin();

  const handleLogout = () => {
    updateProfile({ pseudo: '', avatar: '', bio: '' });
    toast.success('Déconnexion réussie');
    navigate('/auth');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {isProfileSet ? (
            <span className="text-xl">{profile.avatar || '👤'}</span>
          ) : (
            <User className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-card border-border z-50"
      >
        {isProfileSet && (
          <>
            <div className="px-3 py-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{profile.avatar || '👤'}</span>
                <div>
                  <p className="font-medium text-sm">{profile.pseudo}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {profile.bio || 'Aucune bio'}
                  </p>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
          </>
        )}
        
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Mon Profil</span>
          </Link>
        </DropdownMenuItem>

        {isAdmin && (
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="/admin" className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-primary font-medium">Administration</span>
            </Link>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
