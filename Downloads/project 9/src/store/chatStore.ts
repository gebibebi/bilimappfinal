import { create } from 'zustand';
import { ChatMessage, ChatSession } from '../types';
import { generateId } from '../lib/utils';

const getCurrentTime = () => new Date().toISOString();

const mockChatSessions: ChatSession[] = [
  {
    id: '1',
    title: 'Помощь с домашкой по математике',
    category: 'homework',
    messages: [
      {
        id: '1',
        sender: 'user',
        content: 'Мне нужна помощь с квадратными уравнениями',
        timestamp: '2025-05-01T14:30:00Z',
      },
      {
        id: '2',
        sender: 'assistant',
        content: 'Конечно! Я могу помочь с квадратными уравнениями. Давайте начнем со стандартной формы: ax² + bx + c = 0. Можешь поделиться конкретной задачей, над которой работаешь?',
        timestamp: '2025-05-01T14:30:10Z',
      },
    ],
    createdAt: '2025-05-01T14:30:00Z',
    updatedAt: '2025-05-01T14:45:00Z',
  },
  {
    id: '2',
    title: 'Стратегия подготовки к ЕНТ',
    category: 'exams',
    messages: [
      {
        id: '1',
        sender: 'user',
        content: 'Можешь помочь составить план подготовки к ЕНТ?',
        timestamp: '2025-05-02T10:15:00Z',
      },
      {
        id: '2',
        sender: 'assistant',
        content: 'Конечно! Давай создадим индивидуальный план подготовки к ЕНТ. Сколько времени у тебя есть до экзамена и какие предметы ты планируешь сдавать?',
        timestamp: '2025-05-02T10:15:10Z',
      },
    ],
    createdAt: '2025-05-02T10:15:00Z',
    updatedAt: '2025-05-02T10:30:00Z',
  },
];

interface ChatState {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  
  getSessions: (category?: string) => ChatSession[];
  getSessionById: (id: string) => ChatSession | undefined;
  createSession: (title: string, category: ChatSession['category'], initialMessage?: string, bookId?: string, bookTopics?: string[], subjectData?: any) => ChatSession;
  setCurrentSession: (sessionId: string) => void;
  addMessage: (content: string, sender: 'user' | 'assistant', attachments?: ChatMessage['attachments']) => void;
  clearCurrentSession: () => void;
}

const useChatStore = create<ChatState>((set, get) => ({
  sessions: mockChatSessions,
  currentSession: null,
  
  getSessions: (category) => {
    const { sessions } = get();
    if (!category) return sessions;
    return sessions.filter(session => session.category === category);
  },
  
  getSessionById: (id) => get().sessions.find(session => session.id === id),
  
  createSession: (title, category, initialMessage, bookId, bookTopics, subjectData) => {
    const now = getCurrentTime();
    
    // Default initial message
    let firstMessage = initialMessage || "Чем я могу вам помочь?";
    
    // Default assistant response
    let assistantResponse = "Буду рад помочь тебе с этим. Какая именно помощь тебе нужна?";
    
    // Special handling for book analysis
    if (category === 'analysis' && bookId && bookTopics && bookTopics.length > 0) {
      firstMessage = `Я хочу разобрать материал по книге: ${title}`;
      
      // Create a message with topic selection options
      assistantResponse = "Какую тему из этой книги ты хотел бы разобрать? Вот темы, которые есть в книге:";
      
      // Add topics as a list
      bookTopics.forEach((topic, index) => {
        assistantResponse += `\n${index + 1}. ${topic}`;
      });
      
      assistantResponse += "\n\nВыбери тему, и мы начнем ее разбирать. Или ты можешь предложить другую тему из этой книги.";
    } 
    // Special handling for mistakes review after testing
    else if (category === 'analysis' && subjectData) {
      const { subject, score, maxScore, weakTopics = [] } = subjectData;
      
      firstMessage = `Я хочу разобрать мои ошибки по предмету "${subject}"`;
      
      // Create a message about test results and offering to review mistakes
      const percent = Math.round((score / maxScore) * 100);
      assistantResponse = `Я вижу, что ты набрал ${score} из ${maxScore} баллов (${percent}%) по предмету "${subject}". `;
      
      if (percent >= 80) {
        assistantResponse += "Это отличный результат! Но всегда есть возможность для улучшения. ";
      } else if (percent >= 60) {
        assistantResponse += "Это хороший результат, но есть темы, которые стоит повторить. ";
      } else {
        assistantResponse += "Этот результат показывает, что тебе нужно дополнительно поработать с материалом. ";
      }
      
      if (weakTopics.length > 0) {
        assistantResponse += "\n\nЯ заметил, что у тебя возникли сложности со следующими темами:\n";
        weakTopics.forEach((topic, index) => {
          assistantResponse += `${index + 1}. ${topic}\n`;
        });
        assistantResponse += "\nС какой темой ты хотел бы разобраться подробнее?";
      } else {
        assistantResponse += "\n\nС чем именно тебе хотелось бы разобраться?";
      }
    }
    
    const newSession: ChatSession = {
      id: generateId(),
      title,
      category,
      messages: [
        {
          id: generateId(),
          sender: 'user',
          content: firstMessage,
          timestamp: now,
        }
      ],
      createdAt: now,
      updatedAt: now,
      bookId: bookId,
    };
    
    set(state => ({
      sessions: [...state.sessions, newSession],
      currentSession: newSession,
    }));
    
    // Автоматический ответ ассистента
    setTimeout(() => {
      get().addMessage(assistantResponse, 'assistant');
    }, 1000);
    
    return newSession;
  },
  
  setCurrentSession: (sessionId) => {
    const session = get().sessions.find(s => s.id === sessionId);
    if (session) {
      set({ currentSession: session });
    }
  },
  
  addMessage: (content, sender, attachments) => {
    const { currentSession } = get();
    if (!currentSession) return;
    
    const now = getCurrentTime();
    const newMessage: ChatMessage = {
      id: generateId(),
      sender,
      content,
      timestamp: now,
      attachments,
    };
    
    const updatedSession: ChatSession = {
      ...currentSession,
      messages: [...currentSession.messages, newMessage],
      updatedAt: now,
    };
    
    set(state => ({
      currentSession: updatedSession,
      sessions: state.sessions.map(s => 
        s.id === updatedSession.id ? updatedSession : s
      ),
    }));
  },
  
  clearCurrentSession: () => set({ currentSession: null }),
}));

export default useChatStore;