import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/contexts/UserProfileContext';
import { toast } from 'sonner';

interface AdminProtectedRouteProps {
  children: ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const { isAdmin, isProfileSet } = useUserProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isProfileSet) {
      toast.error('Vous devez être connecté pour accéder à cette page');
      navigate('/auth');
      return;
    }
    
    if (!isAdmin) {
      toast.error('Accès refusé. Vous devez être administrateur.');
      navigate('/');
    }
  }, [isAdmin, isProfileSet, navigate]);

  if (!isProfileSet || !isAdmin) {
    return null;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
