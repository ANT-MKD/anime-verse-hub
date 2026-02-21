import { useAdmin } from '@/contexts/AdminContext';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeatureGuardProps {
  feature: 'allowQuiz' | 'allowBattle' | 'allowComparator' | 'allowTierList';
  children: React.ReactNode;
}

const featureNames: Record<string, string> = {
  allowQuiz: 'Quiz',
  allowBattle: 'Simulateur de combat',
  allowComparator: 'Comparateur',
  allowTierList: 'Tier List',
};

const FeatureGuard = ({ feature, children }: FeatureGuardProps) => {
  const { settings } = useAdmin();

  if (!settings[feature]) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <ShieldAlert className="w-16 h-16 text-muted-foreground mx-auto" />
          <h1 className="text-2xl font-bold font-display">Fonctionnalité désactivée</h1>
          <p className="text-muted-foreground">
            La fonctionnalité <strong>{featureNames[feature]}</strong> est actuellement désactivée par l'administrateur.
          </p>
          <Button asChild>
            <Link to="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default FeatureGuard;
