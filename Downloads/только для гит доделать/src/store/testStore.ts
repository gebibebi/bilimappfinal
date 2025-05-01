import { create } from 'zustand';
import { Test, TestQuestion } from '../types';
import { generateId } from '../lib/utils';

const mockTestQuestions: TestQuestion[] = [
  {
    id: '1',
    subject: 'История Казахстана',
    question: 'В каком году была принята Декларация о государственном суверенитете Казахской ССР?',
    options: ['1989', '1990', '1991', '1992'],
    correctAnswer: '1990',
    difficulty: 'basic',
    explanation: 'Декларация о государственном суверенитете Казахской ССР была принята 25 октября 1990 года.',
  },
  {
    id: '2',
    subject: 'Грамотность чтения',
    question: 'Выберите верное утверждение на основе текста:\n\nИскусственный интеллект (ИИ) – это технология, которая позволяет компьютерам учиться на основе опыта, адаптироваться к новым данным и выполнять задачи, которые традиционно требовали человеческого интеллекта.',
    options: [
      'ИИ не способен к обучению',
      'ИИ может адаптироваться к новым данным',
      'ИИ заменяет человека во всех сферах',
      'ИИ работает только с готовыми алгоритмами'
    ],
    correctAnswer: 'ИИ может адаптироваться к новым данным',
    difficulty: 'basic',
    explanation: 'Согласно тексту, ИИ способен адаптироваться к новым данным и учиться на основе опыта.',
  },
  {
    id: '3',
    subject: 'Математическая грамотность',
    question: 'В магазине проходит акция: при покупке двух товаров третий товар (самый дешевый из трех) можно купить за полцены. Сколько нужно заплатить за три товара стоимостью 2000 тг, 3000 тг и 4000 тг?',
    options: ['8000 тг', '8500 тг', '9000 тг', '7000 тг'],
    correctAnswer: '8000 тг',
    difficulty: 'intermediate',
    explanation: 'Два самых дорогих товара (4000 тг + 3000 тг = 7000 тг) плюс половина стоимости самого дешевого товара (2000 тг ÷ 2 = 1000 тг). Итого: 7000 тг + 1000 тг = 8000 тг',
  },
  {
    id: '4',
    subject: 'Математика',
    question: 'Решите уравнение: log₂(x + 3) = 4',
    options: ['x = 13', 'x = 16', 'x = 19', 'x = 15'],
    correctAnswer: 'x = 13',
    difficulty: 'advanced',
    explanation: 'log₂(x + 3) = 4\n2⁴ = x + 3\n16 = x + 3\nx = 13',
  },
  {
    id: '5',
    subject: 'Информатика',
    question: 'Переведите число 1101₂ в десятичную систему счисления.',
    options: ['13', '11', '15', '9'],
    correctAnswer: '13',
    difficulty: 'basic',
    explanation: '1101₂ = 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = 13',
  }
];

const mockTests: Test[] = [
  {
    id: 'ent-demo',
    title: 'ENT Practice Test 1',
    type: 'ENT',
    subject: 'Math',
    date: '2024-05-15',
    totalQuestions: 120,
    maxScore: 140,
    completed: false
  },
  {
    id: '2',
    title: 'SOR Math',
    type: 'SOR',
    subject: 'Math',
    date: '2024-05-10',
    totalQuestions: 20,
    maxScore: 20,
    completed: true,
    score: 15
  },
  {
    id: '3',
    title: 'Kazakh History',
    type: 'ENT',
    subject: 'History',
    date: '2024-05-01',
    totalQuestions: 120,
    maxScore: 140,
    completed: true,
    score: 104
  }
];

interface TestAnalysis {
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

interface TestState {
  tests: Test[];
  currentTest: Test | null;
  currentQuestions: TestQuestion[];
  selectedAnswers: { [questionId: string]: string };
  currentSubject: string | null;
  
  getTests: () => Test[];
  getTestById: (id: string) => Test | undefined;
  startTest: (testId: string) => void;
  answerQuestion: (questionId: string, answer: string) => void;
  submitTest: () => Test | null;
  getAvgScoreByType: (type: 'ENT' | 'SOR' | 'SOCh') => number;
  setCurrentSubject: (subject: string | null) => void;
  getCurrentSubjectQuestions: () => TestQuestion[];
  analyzeTest: (answers: { [questionId: string]: string }) => TestAnalysis;
}

const useTestStore = create<TestState>((set, get) => ({
  tests: mockTests,
  currentTest: null,
  currentQuestions: [],
  selectedAnswers: {},
  currentSubject: null,
  
  getTests: () => get().tests,
  
  getTestById: (id) => get().tests.find(test => test.id === id),
  
  startTest: (testId) => {
    const test = get().tests.find(t => t.id === testId);
    if (test) {
      set({ 
        currentTest: test,
        currentQuestions: mockTestQuestions,
        selectedAnswers: {},
        currentSubject: 'История Казахстана'
      });
    }
  },
  
  setCurrentSubject: (subject) => {
    set({ currentSubject: subject });
  },
  
  getCurrentSubjectQuestions: () => {
    const { currentSubject, currentQuestions } = get();
    return currentQuestions.filter(q => q.subject === currentSubject);
  },
  
  answerQuestion: (questionId, answer) => set(state => ({
    selectedAnswers: {
      ...state.selectedAnswers,
      [questionId]: answer
    }
  })),
  
  analyzeTest: (answers) => {
    const analysis: TestAnalysis = {
      totalScore: 104,
      maxScore: 140,
      subjectScores: {
        'История Казахстана': {
          score: 18,
          maxScore: 20,
          byDifficulty: {
            basic: { correct: 8, total: 10 },
            intermediate: { correct: 6, total: 7 },
            advanced: { correct: 4, total: 3 }
          },
          byTopic: {
            'Древняя история': { correct: 5, total: 5 },
            'Средневековье': { correct: 4, total: 5 },
            'Новое время': { correct: 5, total: 5 },
            'XX век': { correct: 4, total: 5 }
          }
        },
        'Математическая грамотность': {
          score: 8,
          maxScore: 10,
          byDifficulty: {
            basic: { correct: 4, total: 4 },
            intermediate: { correct: 3, total: 4 },
            advanced: { correct: 1, total: 2 }
          },
          byTopic: {
            'Алгебра': { correct: 3, total: 4 },
            'Геометрия': { correct: 3, total: 3 },
            'Статистика': { correct: 2, total: 3 }
          }
        },
        'Грамотность чтения': {
          score: 8,
          maxScore: 10,
          byDifficulty: {
            basic: { correct: 4, total: 4 },
            intermediate: { correct: 3, total: 4 },
            advanced: { correct: 1, total: 2 }
          },
          byTopic: {
            'Анализ текста': { correct: 4, total: 5 },
            'Критическое мышление': { correct: 4, total: 5 }
          }
        },
        'Математика': {
          score: 35,
          maxScore: 40,
          byDifficulty: {
            basic: { correct: 12, total: 15 },
            intermediate: { correct: 10, total: 15 },
            advanced: { correct: 8, total: 10 }
          },
          byTopic: {
            'Алгебраические выражения': { correct: 8, total: 10 },
            'Уравнения и неравенства': { correct: 7, total: 8 },
            'Функции и графики': { correct: 6, total: 7 },
            'Последовательности': { correct: 7, total: 8 },
            'Производная': { correct: 7, total: 7 }
          }
        },
        'Информатика': {
          score: 30,
          maxScore: 40,
          byDifficulty: {
            basic: { correct: 12, total: 15 },
            intermediate: { correct: 10, total: 15 },
            advanced: { correct: 8, total: 13 }
          },
          byTopic: {
            'Компьютерные системы': { correct: 2, total: 3 },
            'Системы счисления': { correct: 3, total: 5 },
            'Программирование на Python': { correct: 5, total: 7 },
            'Реляционные базы данных': { correct: 1, total: 2 },
            'Веб-проектирование': { correct: 0, total: 2 }
          }
        }
      }
    };
    
    return analysis;
  },
  
  submitTest: () => {
    const { currentTest, selectedAnswers } = get();
    
    if (!currentTest) return null;
    
    const analysis = get().analyzeTest(selectedAnswers);
    
    const completedTest: Test = {
      ...currentTest,
      score: analysis.totalScore,
      completed: true,
      analysis: analysis
    };
    
    set(state => ({
      tests: state.tests.map(t => 
        t.id === completedTest.id ? completedTest : t
      ),
      currentTest: null,
      currentQuestions: [],
      selectedAnswers: {},
      currentSubject: null
    }));
    
    return completedTest;
  },
  
  getAvgScoreByType: (type) => {
    const typeTests = get().tests.filter(t => 
      t.type === type && t.completed && t.score !== undefined
    );
    
    if (typeTests.length === 0) return 0;
    
    const totalScore = typeTests.reduce((sum, test) => sum + (test.score || 0), 0);
    return Math.round(totalScore / typeTests.length);
  },
}));

export default useTestStore;