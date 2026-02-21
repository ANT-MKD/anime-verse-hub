import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUserProfile } from './UserProfileContext';

export interface AdminMessage {
  id: string;
  from: string;
  avatar: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
}

export interface AdminNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface AdminSettings {
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  maxQuizQuestions: number;
  defaultTheme: string;
  showParticles: boolean;
  showChatbot: boolean;
  allowBattle: boolean;
  allowComparator: boolean;
  allowTierList: boolean;
  allowQuiz: boolean;
}

export interface CustomQuizQuestion {
  id: string;
  type: 'character' | 'anime' | 'quote';
  question: string;
  image?: string;
  options: string[];
  correctAnswer: string;
  createdAt: string;
}

interface AdminContextType {
  isAdmin: boolean;
  messages: AdminMessage[];
  notifications: AdminNotification[];
  settings: AdminSettings;
  quizQuestions: CustomQuizQuestion[];
  unreadMessagesCount: number;
  unreadNotificationsCount: number;
  addMessage: (msg: Omit<AdminMessage, 'id' | 'date' | 'read'>) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  addNotification: (notif: Omit<AdminNotification, 'id' | 'date' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;
  updateSettings: (updates: Partial<AdminSettings>) => void;
  addQuizQuestion: (q: Omit<CustomQuizQuestion, 'id' | 'createdAt'>) => void;
  updateQuizQuestion: (id: string, updates: Partial<CustomQuizQuestion>) => void;
  deleteQuizQuestion: (id: string) => void;
  getRegisteredUsers: () => any[];
  updateUserRole: (email: string, role: string) => void;
  deleteUser: (email: string) => void;
  // Custom CRUD
  getCustomAnimes: () => any[];
  addCustomAnime: (anime: any) => void;
  updateCustomAnime: (id: string, updates: any) => void;
  deleteCustomAnime: (id: string) => void;
  getCustomCharacters: () => any[];
  addCustomCharacter: (char: any) => void;
  updateCustomCharacter: (id: string, updates: any) => void;
  deleteCustomCharacter: (id: string) => void;
}

const defaultSettings: AdminSettings = {
  siteName: 'AnimeVerse',
  siteDescription: 'Explorez les profils détaillés de vos personnages d\'anime favoris.',
  maintenanceMode: false,
  allowRegistration: true,
  maxQuizQuestions: 10,
  defaultTheme: 'dark',
  showParticles: true,
  showChatbot: true,
  allowBattle: true,
  allowComparator: true,
  allowTierList: true,
  allowQuiz: true,
};

const ADMIN_EMAIL = 'admin@animeverse.com';
const MESSAGES_KEY = 'admin-messages';
const NOTIFICATIONS_KEY = 'admin-notifications';
const SETTINGS_KEY = 'admin-settings';
const QUIZ_KEY = 'admin-quiz-questions';
const CUSTOM_ANIMES_KEY = 'admin-custom-animes';
const CUSTOM_CHARACTERS_KEY = 'admin-custom-characters';
const LAST_USER_COUNT_KEY = 'admin-last-user-count';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const { profile } = useUserProfile();
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);
  const [quizQuestions, setQuizQuestions] = useState<CustomQuizQuestion[]>([]);

  const isAdmin = profile.email === ADMIN_EMAIL || (() => {
    const users = JSON.parse(localStorage.getItem('anime-users') || '[]');
    const user = users.find((u: any) => u.email === profile.email);
    return user?.role === 'admin';
  })();

  useEffect(() => {
    const stored = localStorage.getItem(MESSAGES_KEY);
    if (stored) setMessages(JSON.parse(stored));
    const storedNotifs = localStorage.getItem(NOTIFICATIONS_KEY);
    if (storedNotifs) setNotifications(JSON.parse(storedNotifs));
    const storedSettings = localStorage.getItem(SETTINGS_KEY);
    if (storedSettings) setSettings({ ...defaultSettings, ...JSON.parse(storedSettings) });
    const storedQuiz = localStorage.getItem(QUIZ_KEY);
    if (storedQuiz) setQuizQuestions(JSON.parse(storedQuiz));
  }, []);

  // Watch for new user registrations
  useEffect(() => {
    const checkNewUsers = () => {
      const users = JSON.parse(localStorage.getItem('anime-users') || '[]');
      const lastCount = parseInt(localStorage.getItem(LAST_USER_COUNT_KEY) || '0');
      if (users.length > lastCount && lastCount > 0) {
        const newUsers = users.slice(lastCount);
        newUsers.forEach((user: any) => {
          const notif: AdminNotification = {
            id: crypto.randomUUID(),
            type: 'success',
            title: 'Nouvel utilisateur inscrit',
            message: `${user.pseudo} (${user.email}) vient de s'inscrire !`,
            date: new Date().toISOString(),
            read: false,
          };
          setNotifications(prev => {
            const updated = [notif, ...prev];
            localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
            return updated;
          });
        });
      }
      localStorage.setItem(LAST_USER_COUNT_KEY, String(users.length));
    };

    checkNewUsers();
    const interval = setInterval(checkNewUsers, 2000);
    return () => clearInterval(interval);
  }, []);

  const saveMessages = (msgs: AdminMessage[]) => { setMessages(msgs); localStorage.setItem(MESSAGES_KEY, JSON.stringify(msgs)); };
  const saveNotifications = (notifs: AdminNotification[]) => { setNotifications(notifs); localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifs)); };

  const addMessage = (msg: Omit<AdminMessage, 'id' | 'date' | 'read'>) => {
    const newMsg: AdminMessage = { ...msg, id: crypto.randomUUID(), date: new Date().toISOString(), read: false };
    saveMessages([newMsg, ...messages]);
  };
  const markMessageRead = (id: string) => saveMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  const deleteMessage = (id: string) => saveMessages(messages.filter(m => m.id !== id));

  const addNotification = (notif: Omit<AdminNotification, 'id' | 'date' | 'read'>) => {
    const newNotif: AdminNotification = { ...notif, id: crypto.randomUUID(), date: new Date().toISOString(), read: false };
    saveNotifications([newNotif, ...notifications]);
  };
  const markNotificationRead = (id: string) => saveNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllNotificationsRead = () => saveNotifications(notifications.map(n => ({ ...n, read: true })));
  const deleteNotification = (id: string) => saveNotifications(notifications.filter(n => n.id !== id));

  const updateSettings = (updates: Partial<AdminSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
  };

  const addQuizQuestion = (q: Omit<CustomQuizQuestion, 'id' | 'createdAt'>) => {
    const newQ: CustomQuizQuestion = { ...q, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    const updated = [...quizQuestions, newQ];
    setQuizQuestions(updated);
    localStorage.setItem(QUIZ_KEY, JSON.stringify(updated));
  };
  const updateQuizQuestion = (id: string, updates: Partial<CustomQuizQuestion>) => {
    const updated = quizQuestions.map(q => q.id === id ? { ...q, ...updates } : q);
    setQuizQuestions(updated);
    localStorage.setItem(QUIZ_KEY, JSON.stringify(updated));
  };
  const deleteQuizQuestion = (id: string) => {
    const updated = quizQuestions.filter(q => q.id !== id);
    setQuizQuestions(updated);
    localStorage.setItem(QUIZ_KEY, JSON.stringify(updated));
  };

  const getRegisteredUsers = () => JSON.parse(localStorage.getItem('anime-users') || '[]');
  const updateUserRole = (email: string, role: string) => {
    const users = getRegisteredUsers();
    const updated = users.map((u: any) => u.email === email ? { ...u, role } : u);
    localStorage.setItem('anime-users', JSON.stringify(updated));
  };
  const deleteUser = (email: string) => {
    const users = getRegisteredUsers().filter((u: any) => u.email !== email);
    localStorage.setItem('anime-users', JSON.stringify(users));
  };

  // Custom Animes CRUD
  const getCustomAnimes = () => JSON.parse(localStorage.getItem(CUSTOM_ANIMES_KEY) || '[]');
  const addCustomAnime = (anime: any) => {
    const animes = getCustomAnimes();
    animes.push({ ...anime, id: crypto.randomUUID() });
    localStorage.setItem(CUSTOM_ANIMES_KEY, JSON.stringify(animes));
  };
  const updateCustomAnime = (id: string, updates: any) => {
    const animes = getCustomAnimes().map((a: any) => a.id === id ? { ...a, ...updates } : a);
    localStorage.setItem(CUSTOM_ANIMES_KEY, JSON.stringify(animes));
  };
  const deleteCustomAnime = (id: string) => {
    const animes = getCustomAnimes().filter((a: any) => a.id !== id);
    localStorage.setItem(CUSTOM_ANIMES_KEY, JSON.stringify(animes));
  };

  // Custom Characters CRUD
  const getCustomCharacters = () => JSON.parse(localStorage.getItem(CUSTOM_CHARACTERS_KEY) || '[]');
  const addCustomCharacter = (char: any) => {
    const chars = getCustomCharacters();
    chars.push({ ...char, id: crypto.randomUUID() });
    localStorage.setItem(CUSTOM_CHARACTERS_KEY, JSON.stringify(chars));
  };
  const updateCustomCharacter = (id: string, updates: any) => {
    const chars = getCustomCharacters().map((c: any) => c.id === id ? { ...c, ...updates } : c);
    localStorage.setItem(CUSTOM_CHARACTERS_KEY, JSON.stringify(chars));
  };
  const deleteCustomCharacter = (id: string) => {
    const chars = getCustomCharacters().filter((c: any) => c.id !== id);
    localStorage.setItem(CUSTOM_CHARACTERS_KEY, JSON.stringify(chars));
  };

  const unreadMessagesCount = messages.filter(m => !m.read).length;
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <AdminContext.Provider value={{
      isAdmin, messages, notifications, settings, quizQuestions,
      unreadMessagesCount, unreadNotificationsCount,
      addMessage, markMessageRead, deleteMessage,
      addNotification, markNotificationRead, markAllNotificationsRead, deleteNotification,
      updateSettings, addQuizQuestion, updateQuizQuestion, deleteQuizQuestion,
      getRegisteredUsers, updateUserRole, deleteUser,
      getCustomAnimes, addCustomAnime, updateCustomAnime, deleteCustomAnime,
      getCustomCharacters, addCustomCharacter, updateCustomCharacter, deleteCustomCharacter,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};
