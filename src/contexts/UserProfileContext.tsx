import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const ADMIN_EMAIL = 'kironjallow12@gmail.com';

export interface UserProfile {
  pseudo: string;
  avatar: string;
  bio: string;
  email?: string;
  isAdmin?: boolean;
}

interface UserProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isProfileSet: boolean;
  isAdmin: boolean;
}

const defaultProfile: UserProfile = {
  pseudo: '',
  avatar: '',
  bio: '',
  email: '',
  isAdmin: false,
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

const STORAGE_KEY = 'anime-user-profile';

// Default avatars for users to choose from
export const defaultAvatars = [
  '👤', '🥷', '⚔️', '🔥', '💜', '🌊', '⚡', '🌸', '🐉', '👁️', '💀', '🦊'
];

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfile(parsed);
      } catch (e) {
        console.error('Failed to parse stored profile:', e);
      }
    }
  }, []);

  const updateProfile = (updates: Partial<UserProfile>) => {
    const isAdmin = updates.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
    const newProfile = { ...profile, ...updates, isAdmin };
    setProfile(newProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
  };

  const isProfileSet = profile.pseudo.trim() !== '';
  const isAdmin = profile.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile, isProfileSet, isAdmin }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
