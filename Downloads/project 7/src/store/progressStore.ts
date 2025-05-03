import { create } from 'zustand';
import { ProgressStats } from '../types';

const initialProgressStats: ProgressStats = {
  weeklyStudyHours: 12,
  completedTopics: 24,
  completedHomeworks: 8,
  averageTestScore: 86,
  bookProgress: [
    {
      bookId: '1',
      title: 'Algebra 9',
      progress: 65,
    },
    {
      bookId: '3',
      title: 'Kazakh History 9',
      progress: 42,
    },
  ],
};

interface ProgressState {
  stats: ProgressStats;
  getStats: () => ProgressStats;
  updateStudyHours: (hours: number) => void;
  completeHomework: () => void;
  completeTopic: () => void;
  updateTestScore: (score: number) => void;
  updateBookProgress: (bookId: string, progress: number) => void;
}

const useProgressStore = create<ProgressState>((set, get) => ({
  stats: initialProgressStats,
  
  getStats: () => get().stats,
  
  updateStudyHours: (hours) => set((state) => ({
    stats: {
      ...state.stats,
      weeklyStudyHours: state.stats.weeklyStudyHours + hours,
    },
  })),
  
  completeHomework: () => set((state) => ({
    stats: {
      ...state.stats,
      completedHomeworks: state.stats.completedHomeworks + 1,
    },
  })),
  
  completeTopic: () => set((state) => ({
    stats: {
      ...state.stats,
      completedTopics: state.stats.completedTopics + 1,
    },
  })),
  
  updateTestScore: (score) => set((state) => {
    const currentAvg = state.stats.averageTestScore;
    // Simple running average calculation
    const newAvg = Math.round((currentAvg + score) / 2);
    
    return {
      stats: {
        ...state.stats,
        averageTestScore: newAvg,
      },
    };
  }),
  
  updateBookProgress: (bookId, progress) => set((state) => ({
    stats: {
      ...state.stats,
      bookProgress: state.stats.bookProgress.map(book => 
        book.bookId === bookId 
          ? { ...book, progress } 
          : book
      ),
    },
  })),
}));

export default useProgressStore;