import { useState, useEffect, useMemo } from 'react';
import { animeData, getAllCharacters } from '@/data/animeData';

// Types
export interface AdminUser {
  id: string;
  email: string;
  pseudo: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'user';
  createdAt: string;
  lastLogin: string;
  isActive: boolean;
}

export interface BattleRecord {
  id: string;
  fighter1: string;
  fighter2: string;
  winner: string;
  date: string;
  userId?: string;
}

export interface QuizScore {
  id: string;
  userId: string;
  pseudo: string;
  score: number;
  total: number;
  date: string;
}

export interface TierVote {
  characterKey: string;
  votes: number;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalAnimes: number;
  totalCharacters: number;
  totalVotes: number;
  totalBattles: number;
  totalQuizzes: number;
  averageQuizScore: number;
}

const STORAGE_KEYS = {
  users: 'admin-users',
  battles: 'admin-battles',
  quizzes: 'admin-quizzes',
  settings: 'admin-settings',
};

export const useAdminData = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [battles, setBattles] = useState<BattleRecord[]>([]);
  const [quizzes, setQuizzes] = useState<QuizScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const allCharacters = useMemo(() => getAllCharacters(), []);

  // Load data from localStorage
  useEffect(() => {
    setIsLoading(true);
    
    // Load users
    const storedUsers = localStorage.getItem(STORAGE_KEYS.users);
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Create mock users
      const mockUsers: AdminUser[] = [
        {
          id: '1',
          email: 'admin@animeverse.com',
          pseudo: 'Admin',
          avatar: '👤',
          role: 'admin',
          createdAt: '2024-01-01',
          lastLogin: new Date().toISOString().split('T')[0],
          isActive: true,
        },
        {
          id: '2',
          email: 'moderator@animeverse.com',
          pseudo: 'Moderator',
          avatar: '🥷',
          role: 'moderator',
          createdAt: '2024-02-15',
          lastLogin: new Date().toISOString().split('T')[0],
          isActive: true,
        },
      ];
      setUsers(mockUsers);
      localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(mockUsers));
    }

    // Load battles
    const storedBattles = localStorage.getItem(STORAGE_KEYS.battles);
    if (storedBattles) {
      setBattles(JSON.parse(storedBattles));
    } else {
      // Create mock battles
      const mockBattles: BattleRecord[] = Array.from({ length: 10 }, (_, i) => {
        const chars = allCharacters.sort(() => Math.random() - 0.5).slice(0, 2);
        return {
          id: `battle-${i}`,
          fighter1: chars[0]?.name || 'Unknown',
          fighter2: chars[1]?.name || 'Unknown',
          winner: Math.random() > 0.5 ? chars[0]?.name || 'Unknown' : chars[1]?.name || 'Unknown',
          date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        };
      });
      setBattles(mockBattles);
      localStorage.setItem(STORAGE_KEYS.battles, JSON.stringify(mockBattles));
    }

    // Load quizzes
    const storedQuizzes = localStorage.getItem(STORAGE_KEYS.quizzes);
    if (storedQuizzes) {
      setQuizzes(JSON.parse(storedQuizzes));
    } else {
      // Create mock quiz scores
      const mockQuizzes: QuizScore[] = Array.from({ length: 20 }, (_, i) => ({
        id: `quiz-${i}`,
        userId: `user-${Math.floor(Math.random() * 5)}`,
        pseudo: ['Goku_Fan', 'NarutoLover', 'OnePieceKing', 'JujutsuMaster', 'HxHExpert'][Math.floor(Math.random() * 5)],
        score: Math.floor(Math.random() * 10) + 1,
        total: 10,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      }));
      setQuizzes(mockQuizzes);
      localStorage.setItem(STORAGE_KEYS.quizzes, JSON.stringify(mockQuizzes));
    }

    setIsLoading(false);
  }, [allCharacters]);

  // Get tier list votes from existing hook storage
  const tierVotes = useMemo(() => {
    const stored = localStorage.getItem('tierlist-votes');
    if (stored) {
      return JSON.parse(stored) as Record<string, number>;
    }
    return {};
  }, []);

  // Calculate stats
  const stats: AdminStats = useMemo(() => {
    const totalVotes = Object.values(tierVotes).reduce((a, b) => a + b, 0);
    const avgQuiz = quizzes.length > 0 
      ? quizzes.reduce((sum, q) => sum + (q.score / q.total) * 100, 0) / quizzes.length 
      : 0;

    return {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.isActive).length,
      totalAnimes: animeData.length,
      totalCharacters: allCharacters.length,
      totalVotes,
      totalBattles: battles.length,
      totalQuizzes: quizzes.length,
      averageQuizScore: Math.round(avgQuiz),
    };
  }, [users, battles, quizzes, tierVotes, allCharacters]);

  // User management
  const addUser = (user: Omit<AdminUser, 'id' | 'createdAt'>) => {
    const newUser: AdminUser = {
      ...user,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [...users, newUser];
    setUsers(updated);
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(updated));
  };

  const updateUser = (id: string, updates: Partial<AdminUser>) => {
    const updated = users.map(u => u.id === id ? { ...u, ...updates } : u);
    setUsers(updated);
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(updated));
  };

  const deleteUser = (id: string) => {
    const updated = users.filter(u => u.id !== id);
    setUsers(updated);
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(updated));
  };

  // Battle management
  const addBattle = (battle: Omit<BattleRecord, 'id'>) => {
    const newBattle: BattleRecord = {
      ...battle,
      id: `battle-${Date.now()}`,
    };
    const updated = [newBattle, ...battles];
    setBattles(updated);
    localStorage.setItem(STORAGE_KEYS.battles, JSON.stringify(updated));
  };

  const deleteBattle = (id: string) => {
    const updated = battles.filter(b => b.id !== id);
    setBattles(updated);
    localStorage.setItem(STORAGE_KEYS.battles, JSON.stringify(updated));
  };

  // Quiz management
  const addQuizScore = (quiz: Omit<QuizScore, 'id'>) => {
    const newQuiz: QuizScore = {
      ...quiz,
      id: `quiz-${Date.now()}`,
    };
    const updated = [newQuiz, ...quizzes];
    setQuizzes(updated);
    localStorage.setItem(STORAGE_KEYS.quizzes, JSON.stringify(updated));
  };

  const deleteQuizScore = (id: string) => {
    const updated = quizzes.filter(q => q.id !== id);
    setQuizzes(updated);
    localStorage.setItem(STORAGE_KEYS.quizzes, JSON.stringify(updated));
  };

  return {
    users,
    battles,
    quizzes,
    stats,
    tierVotes,
    isLoading,
    animes: animeData,
    characters: allCharacters,
    addUser,
    updateUser,
    deleteUser,
    addBattle,
    deleteBattle,
    addQuizScore,
    deleteQuizScore,
  };
};
