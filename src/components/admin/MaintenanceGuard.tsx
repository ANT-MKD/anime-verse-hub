import { useAdmin } from '@/contexts/AdminContext';
import { Construction } from 'lucide-react';

const MaintenanceGuard = ({ children }: { children: React.ReactNode }) => {
  const { settings, isAdmin } = useAdmin();

  if (settings.maintenanceMode && !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <Construction className="w-20 h-20 text-primary mx-auto animate-pulse" />
          <h1 className="text-3xl font-bold font-display gradient-text">Maintenance en cours</h1>
          <p className="text-muted-foreground max-w-md">
            Le site est temporairement en maintenance. Nous reviendrons bientôt avec des améliorations !
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default MaintenanceGuard;
