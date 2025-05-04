import { create } from 'zustand';
import { User, Language } from '../types';
import { generateId } from '../lib/utils';

interface UserStore {
  user: User | null;
  isRegistered: boolean;
  isOnboarded: boolean;
  language: Language;
  setUser: (user: User) => void;
  updateUser: (userData: Partial<User>) => void;
  setRegistered: (value: boolean) => void;
  setOnboarded: (value: boolean) => void;
  setLanguage: (language: Language) => void;
  logout: () => void;
  registerUser: (name: string, grade: number, language: Language) => void;
  completeOnboarding: (goal: string, subjects: string[]) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isRegistered: false,
  isOnboarded: false,
  language: 'russian',
  
  setUser: (user) => set({ user }),
  
  updateUser: (userData) => set((state) => ({
    user: state.user ? { ...state.user, ...userData } : null
  })),
  
  setRegistered: (value) => set({ isRegistered: value }),
  
  setOnboarded: (value) => set({ isOnboarded: value }),
  
  setLanguage: (language) => set({ language }),
  
  logout: () => set({ 
    user: null, 
    isRegistered: false, 
    isOnboarded: false 
  }),
  
  registerUser: (name, grade, language) => set({
    user: {
      id: generateId(),
      name,
      grade,
      language,
      educationGoal: '',
      profileSubjects: [],
      // Значения по умолчанию для новых полей
      profession: '',
      university: '',
      speciality: '',
    },
    isRegistered: true,
    language,
  }),
  
  completeOnboarding: (goal, subjects) => set((state) => ({
    user: state.user ? {
      ...state.user,
      educationGoal: goal,
      profileSubjects: subjects,
    } : null,
    isOnboarded: true,
  })),
}));

export default useUserStore;