import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import { animeData, getAllCharacters, Character, Anime } from '@/data/animeData';
import { ArrowLeft, Trophy, RefreshCcw, Check, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
  type: 'character' | 'anime' | 'quote';
  question: string;
  image?: string;
  options: string[];
  correctAnswer: string;
}

const QuizPage = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  const allCharacters = useMemo(() => getAllCharacters(), []);

  const generateQuestions = useCallback(() => {
    const newQuestions: Question[] = [];
    const shuffledChars = [...allCharacters].sort(() => Math.random() - 0.5);
    const shuffledAnimes = [...animeData].sort(() => Math.random() - 0.5);

    // Character identification questions
    for (let i = 0; i < 4 && i < shuffledChars.length; i++) {
      const char = shuffledChars[i];
      const wrongAnswers = shuffledChars
        .filter(c => c.id !== char.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(c => c.name);
      
      newQuestions.push({
        type: 'character',
        question: 'Qui est ce personnage ?',
        image: char.image,
        options: [char.name, ...wrongAnswers].sort(() => Math.random() - 0.5),
        correctAnswer: char.name
      });
    }

    // Anime questions
    for (let i = 0; i < 3 && i < shuffledAnimes.length; i++) {
      const anime = shuffledAnimes[i];
      const char = anime.characters[Math.floor(Math.random() * anime.characters.length)];
      const wrongAnswers = shuffledAnimes
        .filter(a => a.id !== anime.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(a => a.title);
      
      newQuestions.push({
        type: 'anime',
        question: `De quel anime vient ${char.name.split(' ')[0]} ?`,
        image: char.image,
        options: [anime.title, ...wrongAnswers].sort(() => Math.random() - 0.5),
        correctAnswer: anime.title
      });
    }

    // Role questions
    for (let i = 4; i < 7 && i < shuffledChars.length; i++) {
      const char = shuffledChars[i];
      const roles = ['Protagoniste', 'Antagoniste', 'Support', 'Mentor', char.role];
      const uniqueRoles = [...new Set(roles)].slice(0, 4);
      
      if (uniqueRoles.length >= 4) {
        newQuestions.push({
          type: 'character',
          question: `Quel est le rôle de ${char.name.split(' ')[0]} ?`,
          image: char.image,
          options: uniqueRoles.sort(() => Math.random() - 0.5),
          correctAnswer: char.role
        });
      }
    }

    return newQuestions.sort(() => Math.random() - 0.5).slice(0, 10);
  }, [allCharacters]);

  const startGame = () => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameState('playing');
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameState('result');
      }
    }, 1500);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { emoji: '🏆', text: 'PARFAIT ! Vous êtes un vrai Otaku !' };
    if (percentage >= 80) return { emoji: '🌟', text: 'Excellent ! Vous connaissez bien vos animes !' };
    if (percentage >= 60) return { emoji: '👍', text: 'Bien joué ! Continuez à explorer !' };
    if (percentage >= 40) return { emoji: '📚', text: 'Pas mal ! Il y a encore à apprendre.' };
    return { emoji: '💪', text: 'Courage ! Réessayez pour vous améliorer !' };
  };

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground particleCount={30} />
      <Navbar />
      
      <main className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatePresence mode="wait">
            {/* Menu */}
            {gameState === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto text-center"
              >
                <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Retour à l'accueil
                </Link>
                <div className="glass-card rounded-3xl p-8 lg:p-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-primary" />
                  </div>
                  <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">
                    <span className="gradient-text">ANIME QUIZ</span>
                  </h1>
                  <p className="text-muted-foreground text-lg mb-8">
                    Testez vos connaissances sur les animes et personnages !
                    <br />10 questions pour prouver que vous êtes un vrai Otaku.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startGame}
                    className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/30"
                  >
                    Commencer le Quiz
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Playing */}
            {gameState === 'playing' && questions.length > 0 && (
              <motion.div
                key="playing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-3xl mx-auto"
              >
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Question {currentQuestion + 1}/{questions.length}</span>
                    <span className="text-sm font-medium">Score: {score}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question Card */}
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass-card rounded-3xl p-6 lg:p-8"
                >
                  {questions[currentQuestion].image && (
                    <div className="relative w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden">
                      <img 
                        src={questions[currentQuestion].image} 
                        alt="Question" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                  )}
                  
                  <h2 className="font-display text-xl lg:text-2xl font-bold text-center mb-8">
                    {questions[currentQuestion].question}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {questions[currentQuestion].options.map((option) => {
                      const isCorrect = option === questions[currentQuestion].correctAnswer;
                      const isSelected = option === selectedAnswer;
                      
                      return (
                        <motion.button
                          key={option}
                          whileHover={{ scale: showResult ? 1 : 1.02 }}
                          whileTap={{ scale: showResult ? 1 : 0.98 }}
                          onClick={() => handleAnswer(option)}
                          disabled={showResult}
                          className={cn(
                            "p-4 rounded-xl border-2 text-left font-medium transition-all duration-300",
                            showResult && isCorrect && "border-green-500 bg-green-500/20",
                            showResult && isSelected && !isCorrect && "border-red-500 bg-red-500/20",
                            !showResult && "border-border hover:border-primary/50 hover:bg-muted/30"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {showResult && isCorrect && <Check className="w-5 h-5 text-green-500" />}
                            {showResult && isSelected && !isCorrect && <X className="w-5 h-5 text-red-500" />}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Result */}
            {gameState === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="glass-card rounded-3xl p-8 lg:p-12">
                  <div className="text-6xl mb-6">{getScoreMessage().emoji}</div>
                  <h1 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                    Quiz Terminé !
                  </h1>
                  
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Trophy className="w-8 h-8 text-primary" />
                    <span className="font-display text-5xl font-bold gradient-text">{score}/{questions.length}</span>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-8">{getScoreMessage().text}</p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startGame}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold"
                    >
                      <RefreshCcw className="w-5 h-5" />
                      Rejouer
                    </motion.button>
                    <Link to="/">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 rounded-xl glass border border-border font-semibold"
                      >
                        Retour à l'accueil
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
