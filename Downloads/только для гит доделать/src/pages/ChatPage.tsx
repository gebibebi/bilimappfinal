import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  MessageSquare, 
  Send, 
  PlusCircle, 
  BookOpen, 
  FileText, 
  TestTube, 
  LayoutGrid,
  Calculator,
  PenTool,
  ChevronRight,
  X,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import useChatStore from '../store/chatStore';
import ChatMessage from '../components/chat/ChatMessage';
import { ChatSession, ChatMessage as ChatMessageType } from '../types';
import { setPageTitle, formatDate } from '../lib/utils';

const ChatPage: React.FC = () => {
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  const [activeChatCategory, setActiveChatCategory] = useState<ChatSession['category'] | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    sessions, 
    currentSession, 
    getSessions, 
    setCurrentSession, 
    createSession,
    addMessage,
    clearCurrentSession
  } = useChatStore();
  
  useEffect(() => {
    setPageTitle('Чат BilimAI');
    
    // Check if we're coming from a book detail page
    if (location.state?.bookId && location.state?.action === 'analysis') {
      const { bookId, title, action, bookTopics } = location.state;
      // Create a new chat session for book analysis
      createSession(
        title, 
        'analysis', 
        undefined, 
        bookId, 
        bookTopics
      );
    }
    // Check if we're coming from test results for mistake review
    else if (location.state?.action === 'mistakes_review') {
      const { subject, score, maxScore, weakTopics } = location.state;
      
      // Create a new chat session for mistake review
      createSession(
        `Работа над ошибками: ${subject}`,
        'analysis',
        undefined,
        undefined,
        undefined,
        { subject, score, maxScore, weakTopics }
      );
    }
  }, [location, createSession]);
  
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSession?.messages]);
  
  const handleStartNewChat = () => {
    setShowCategorySelect(true);
  };
  
  const handleSelectCategory = (category: ChatSession['category']) => {
    setActiveChatCategory(category);
    setShowCategorySelect(false);
    
    // Создаем заголовок на основе категории
    let title = '';
    switch (category) {
      case 'homework':
        title = 'Помощь с домашкой';
        break;
      case 'tests':
        title = 'Подготовка к тестам';
        break;
      case 'SOR_SOCh':
        title = 'Подготовка к СОР/СОЧ';
        break;
      case 'revision':
        title = 'Повторение темы';
        break;
      case 'motivation':
        title = 'Мотивация и советы';
        break;
      case 'planning':
        title = 'Планирование учебы';
        break;
      case 'analysis':
        title = 'Анализ ошибок';
        break;
      case 'exams':
        title = 'Подготовка к экзаменам';
        break;
    }
    
    createSession(title, category);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !currentSession) return;
    
    addMessage(message, 'user');
    setMessage('');
    
    // Имитация ответа ИИ
    setTimeout(() => {
      if (currentSession.category === 'analysis' && currentSession.bookId) {
        // Если это сессия анализа книги и пользователь выбрал тему
        if (message.match(/^\d+$/) || message.toLowerCase().includes('тема')) {
          addMessage(`Отлично! Давай разберем эту тему подробнее. О чем именно ты хотел бы узнать в рамках этой темы?`, 'assistant');
        } else {
          addMessage(`Я помогу тебе разобраться с этим материалом. Какой аспект этой темы тебе интересен больше всего?`, 'assistant');
        }
      } 
      // Если это сессия работы над ошибками теста
      else if (currentSession.category === 'analysis' && !currentSession.bookId) {
        if (message.toLowerCase().includes('производн')) {
          respondWithTestMistakeExample('Математика', 'Производная');
        } 
        else if (message.toLowerCase().includes('систем') && message.toLowerCase().includes('счисл')) {
          respondWithTestMistakeExample('Информатика', 'Системы счисления');
        }
        else if (message.toLowerCase().includes('ома') || message.toLowerCase().includes('сопротивлен')) {
          respondWithTestMistakeExample('Физика', 'Закон Ома');
        }
        else if (message.toLowerCase().includes('сувер') || message.toLowerCase().includes('деклар')) {
          respondWithTestMistakeExample('История Казахстана', 'Декларация о суверенитете');
        }
        else {
          addMessage(`Давай разберемся с этой темой. Хочешь, чтобы я объяснил теорию или показал примеры решения задач?`, 'assistant');
        }
      }
      else {
        addMessage(`Я помогу вам с этим. Не могли бы вы уточнить детали вашего вопроса по ${currentSession.category.replace('_', '/')}?`, 'assistant');
      }
    }, 1000);
  };
  
  // Функция для имитации ответа по конкретной ошибке из теста
  const respondWithTestMistakeExample = (subject: string, topic: string) => {
    let mistakeExample = '';
    
    if (subject === 'Математика' && topic === 'Производная') {
      mistakeExample = `Я вижу, что у тебя возникли сложности с нахождением производной функции. В тесте был такой вопрос:

**Найдите производную функции f(x) = 3x² + 2x - 5**

Твой ответ был: f'(x) = 3x + 2
Правильный ответ: f'(x) = 6x + 2

Давай разберем, почему это так:

1. При нахождении производной мы применяем правила дифференцирования для каждого члена:
   - Для x^n производная равна n·x^(n-1)
   - Для константы производная равна 0

2. Поэтому:
   - Производная от 3x² равна 3·2·x^(2-1) = 6x
   - Производная от 2x равна 2·1·x^(1-1) = 2
   - Производная от -5 равна 0

3. Итоговая производная: f'(x) = 6x + 2

Хочешь потренироваться и решить похожие примеры?`;
    } 
    else if (subject === 'Информатика' && topic === 'Системы счисления') {
      mistakeExample = `В тесте был вопрос по системам счисления:

**Переведите число 10011₂ в десятичную систему счисления**

Твой ответ: 17
Правильный ответ: 19

Давай разберем, как правильно выполнить перевод:

1. При переводе из двоичной системы в десятичную, нужно каждый разряд умножить на соответствующую степень двойки (справа налево, начиная с нулевой степени):
   - 1×2⁰ = 1
   - 1×2¹ = 2
   - 0×2² = 0
   - 0×2³ = 0
   - 1×2⁴ = 16

2. Затем сложить все полученные значения: 16 + 0 + 0 + 2 + 1 = 19

У тебя, скорее всего, была ошибка в подсчете разрядов или в вычислении. Хочешь, я предложу тебе еще несколько примеров для практики?`;
    }
    else if (subject === 'Физика' && topic === 'Закон Ома') {
      mistakeExample = `В тесте был вопрос по закону Ома:

**Какой формулой выражается закон Ома для участка цепи?**

Твой ответ: I = U/P
Правильный ответ: I = U/R

Давай разберем, в чем разница:

1. Закон Ома для участка цепи утверждает, что сила тока (I) прямо пропорциональна напряжению (U) и обратно пропорциональна сопротивлению (R).

2. Формула I = U/P, которую ты выбрал, содержит мощность (P) вместо сопротивления. Это неверная формула для закона Ома.

3. Помни также следующие взаимосвязанные формулы:
   - I = U/R — закон Ома
   - P = U·I — мощность тока
   - P = I²·R — мощность через силу тока и сопротивление
   - P = U²/R — мощность через напряжение и сопротивление

Хочешь попрактиковаться в решении задач на закон Ома или узнать больше о взаимосвязи электрических величин?`;
    }
    else if (subject === 'История Казахстана' && topic === 'Декларация о суверенитете') {
      mistakeExample = `В тесте был вопрос об истории Казахстана:

**В каком году была принята Декларация о государственном суверенитете Казахской ССР?**

Твой ответ: 1991
Правильный ответ: 1990

Давай разберемся с хронологией важных событий:

1. Декларация о государственном суверенитете Казахской ССР была принята 25 октября 1990 года.

2. Важно не путать её с Конституционным законом "О государственной независимости Республики Казахстан", который был принят 16 декабря 1991 года.

3. Декларация о суверенитете 1990 года стала первым шагом к независимости, но еще не провозглашала полную независимость Казахстана от СССР.

4. Полная независимость была провозглашена только в декабре 1991 года, после распада СССР.

Могу рассказать больше о содержании Декларации о суверенитете или о других важных исторических событиях этого периода?`;
    }
    else {
      mistakeExample = `Давай разберем допущенные ошибки в тесте по теме "${topic}". Я могу объяснить основные концепции и предложить дополнительные задачи для практики, чтобы улучшить твое понимание материала.

Какие именно аспекты этой темы вызывают у тебя затруднения?`;
    }
    
    addMessage(mistakeExample, 'assistant');
  };
  
  const handleVoiceRecord = () => {
    // Mock response after voice recording
    setTimeout(() => {
      addMessage(`Спасибо за аудиоответ! Я проанализировал его и вижу, что ты хорошо понимаешь основные концепции. 
      Давай еще рассмотрим несколько примеров, чтобы закрепить материал.`, 'assistant');
    }, 500);
  };
  
  const getSessionsByCategory = (category: ChatSession['category']) => {
    return getSessions(category);
  };
  
  const categories = [
    { id: 'homework', name: 'Помощь с домашкой', icon: FileText },
    { id: 'tests', name: 'Тесты и проверка знаний', icon: TestTube },
    { id: 'SOR_SOCh', name: 'Подготовка к СОР/СОЧ', icon: FileText },
    { id: 'revision', name: 'Повторение темы', icon: BookOpen },
    { id: 'motivation', name: 'Мотивация и советы', icon: MessageSquare },
    { id: 'planning', name: 'Планирование учебы', icon: LayoutGrid },
    { id: 'analysis', name: 'Работа над ошибками', icon: AlertCircle },
    { id: 'exams', name: 'Подготовка к экзаменам', icon: TestTube },
  ];
  
  const handleSelectSession = (sessionId: string) => {
    setCurrentSession(sessionId);
    setActiveChatCategory(null);
  };
  
  const renderChatSidebar = () => {
    return (
      <div className="w-full md:w-80 bg-white border-r border-gray-200 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <Button
            variant="primary"
            fullWidth
            leftIcon={<PlusCircle size={18} />}
            onClick={handleStartNewChat}
          >
            Новый чат
          </Button>
        </div>
        
        {showCategorySelect ? (
          <div className="overflow-y-auto flex-1 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">Выберите категорию</h3>
              <button
                onClick={() => setShowCategorySelect(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-100 text-left transition-colors"
                  onClick={() => handleSelectCategory(category.id as ChatSession['category'])}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600`}>
                    <category.icon size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{category.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : activeChatCategory ? (
          <div className="overflow-y-auto flex-1 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">
                {categories.find(cat => cat.id === activeChatCategory)?.name}
              </h3>
              <button
                onClick={() => setActiveChatCategory(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>
            
            {getSessionsByCategory(activeChatCategory).length > 0 ? (
              <div className="space-y-2">
                {getSessionsByCategory(activeChatCategory).map((session) => (
                  <button
                    key={session.id}
                    className={`w-full flex items-center justify-between p-3 rounded-md text-left ${
                      currentSession?.id === session.id 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'hover:bg-gray-100 border border-gray-200'
                    }`}
                    onClick={() => handleSelectSession(session.id)}
                  >
                    <div className="overflow-hidden">
                      <p className="font-medium text-gray-900 truncate">{session.title}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {formatDate(session.updatedAt)}
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 text-sm">В этой категории пока нет чатов</p>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-y-auto flex-1 p-4">
            <h3 className="font-medium text-gray-900 mb-3">Недавние чаты</h3>
            
            {sessions.length > 0 ? (
              <div className="space-y-2">
                {sessions.slice(0, 5).map((session) => (
                  <button
                    key={session.id}
                    className={`w-full flex items-center justify-between p-3 rounded-md text-left ${
                      currentSession?.id === session.id 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'hover:bg-gray-100 border border-gray-200'
                    }`}
                    onClick={() => handleSelectSession(session.id)}
                  >
                    <div className="overflow-hidden">
                      <p className="font-medium text-gray-900 truncate">{session.title}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {formatDate(session.updatedAt)}
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 text-sm">Нет недавних чатов</p>
              </div>
            )}
            
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-3">Категории</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-100 text-left"
                    onClick={() => setActiveChatCategory(category.id as ChatSession['category'])}
                  >
                    <div className="flex items-center space-x-2">
                      <category.icon size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-900">{category.name}</span>
                    </div>
                    <ChevronRight size={14} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  const renderChatInterface = () => {
    if (!currentSession) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
            <MessageSquare size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Добро пожаловать в BilimAI</h2>
          <p className="text-gray-500 text-center max-w-md mb-6">
            Я ваш помощник в обучении. Чем могу помочь вам сегодня?
          </p>
          <Button
            variant="primary"
            onClick={handleStartNewChat}
            leftIcon={<PlusCircle size={18} />}
          >
            Начать новый чат
          </Button>
        </div>
      );
    }
    
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-gray-200 p-4 flex items-center justify-between">
          <div>
            <h2 className="font-medium text-gray-900">{currentSession.title}</h2>
            <p className="text-xs text-gray-500">
              {categories.find(cat => cat.id === currentSession.category)?.name}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Calculator size={16} />}
            >
              Калькулятор
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<PenTool size={16} />}
            >
              Доска для рисования
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {currentSession.messages.map((msg) => (
            <ChatMessage 
              key={msg.id} 
              message={msg} 
              onVoiceRecord={handleVoiceRecord}
            />
          ))}
          <div ref={messageEndRef} />
        </div>
        
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Введите сообщение..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              disabled={!message.trim()}
              leftIcon={<Send size={18} />}
            >
              Отправить
            </Button>
          </form>
        </div>
      </div>
    );
  };
  
  return (
    <div className="h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] -mt-4 md:-mt-8 -mx-4 md:-mx-8 flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="md:hidden border-b border-gray-200">
          <div className="flex p-4 items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Чат BilimAI</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={clearCurrentSession}
            >
              {currentSession ? 'Назад к чатам' : 'Новый чат'}
            </Button>
          </div>
        </div>
        
        <div className={`${currentSession ? 'hidden md:block' : 'block'}`}>
          {renderChatSidebar()}
        </div>
        
        <div className={`flex-1 ${!currentSession ? 'hidden md:block' : 'block'}`}>
          {renderChatInterface()}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;