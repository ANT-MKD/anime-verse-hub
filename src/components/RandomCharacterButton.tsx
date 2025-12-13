import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import { getAllCharacters } from '@/data/animeData';

const RandomCharacterButton = () => {
  const navigate = useNavigate();
  const allCharacters = useMemo(() => getAllCharacters(), []);

  const goToRandomCharacter = () => {
    const randomChar = allCharacters[Math.floor(Math.random() * allCharacters.length)];
    navigate(`/anime/${randomChar.animeId}/character/${randomChar.id}`);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={goToRandomCharacter}
      className="fixed bottom-24 right-6 z-40 p-4 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-shadow"
      title="Personnage aléatoire"
    >
      <Shuffle className="w-6 h-6" />
    </motion.button>
  );
};

export default RandomCharacterButton;
