// Обновленный интерфейс User с новыми полями
export type Language = 'kazakh' | 'russian';

export interface User {
  id: string;
  name: string;
  grade: number;
  language: Language;
  educationGoal: string;
  profileSubjects: string[];
  schedule?: Schedule;
  // Новые поля для целей поступления
  profession?: string;
  university?: string;
  speciality?: string;
}

export interface Schedule {
  days: {
    [key: string]: {
      startTime: string;
      endTime: string;
      subjects: string[];
    };
  };
}

export interface Book {
  id: string;
  title: string;
  author: string;
  grade: number;
  subject: string;
  language: Language;
  coverUrl: string;
  topics: string[];
  isFavorite?: boolean;
  details?: {
    publisher: string;
    year: number;
    pages: number;
    languages: Language[];
    contents: {
      title: string;
      topics: string[];
    }[];
  };
}

export interface Test {
  id: string;
  title: string;
  type: 'ENT' | 'SOR' | 'SOCh';
  subject?: string;
  date: string;
  totalQuestions: number;
  score?: number;
  maxScore: number;
  completed: boolean;
  analysis?: TestAnalysis;
}

export interface TestQuestion {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer?: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  explanation: string;
}

export interface TestAnalysis {
  totalScore: number;
  maxScore: number;
  subjectScores: {
    [subject: string]: {
      score: number;
      maxScore: number;
      byDifficulty: {
        basic: { correct: number; total: number };
        intermediate: { correct: number; total: number };
        advanced: { correct: number; total: number };
      };
      byTopic: {
        [topic: string]: { correct: number; total: number };
      };
    };
  };
}

// Обновление типов для ChatMessage, чтобы добавить поддержку голосовых сообщений и фото

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  attachments?: {
    type: 'voice' | 'image' | 'drawing' | 'calculator' | 'book';
    url?: string;
    bookId?: string;
  }[];
}

// Обновление типа ChatSession, чтобы добавить категорию 'admissions'
export interface ChatSession {
  id: string;
  title: string;
  category: 'homework' | 'tests' | 'SOR_SOCh' | 'revision' | 'motivation' | 'planning' | 'analysis' | 'exams' | 'admissions';
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  testId?: string;
  bookId?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  category: 'homework' | 'tests' | 'SOR_SOCh' | 'revision' | 'motivation' | 'planning' | 'analysis' | 'exams';
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  testId?: string;
  bookId?: string;
}

// Обновленный интерфейс для файла src/types/index.ts

export interface ChatSession {
  id: string;
  title: string;
  category: 'homework' | 'tests' | 'SOR_SOCh' | 'revision' | 'motivation' | 'planning' | 'analysis' | 'exams' | 'admissions';
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  testId?: string;
  bookId?: string;
}