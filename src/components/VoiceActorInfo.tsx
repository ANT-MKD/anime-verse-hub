import { motion } from 'framer-motion';
import { Mic, Globe } from 'lucide-react';

interface VoiceActorInfoProps {
  japanese?: { name: string; nativeName?: string };
  english?: { name: string };
}

const VoiceActorInfo = ({ japanese, english }: VoiceActorInfoProps) => {
  if (!japanese && !english) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <Mic className="w-5 h-5 text-primary" />
        <h4 className="font-display text-lg font-bold">Doubleurs (Seiyuu)</h4>
      </div>
      
      <div className="space-y-3">
        {japanese && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs">
              <Globe className="w-3 h-3" />
              JP
            </div>
            <div>
              <p className="text-sm font-medium">{japanese.name}</p>
              {japanese.nativeName && (
                <p className="text-xs text-muted-foreground">{japanese.nativeName}</p>
              )}
            </div>
          </div>
        )}
        
        {english && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs">
              <Globe className="w-3 h-3" />
              EN
            </div>
            <p className="text-sm font-medium">{english.name}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VoiceActorInfo;
