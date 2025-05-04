// src/components/ui/TooltipsManager.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Tooltip, { TooltipStep } from './Tooltip';

// Define tooltips for each page
const pageTooltips: Record<string, TooltipStep[]> = {
  // Home page tooltips
  '/home': [
    {
      id: 'welcome-banner',
      title: 'Добро пожаловать в BilimApp!',
      description: 'Здесь вы увидите всю необходимую информацию о своем обучении и прогрессе.',
      targetSelector: '.welcome-banner',
      position: 'bottom',
      width: 300
    },
    {
      id: 'quick-actions',
      title: 'Быстрые действия',
      description: 'Используйте эти кнопки для быстрого доступа к основным функциям приложения.',
      targetSelector: '.quick-actions',
      position: 'right',
      width: 280
    },
    {
      id: 'study-progress',
      title: 'Отслеживание прогресса',
      description: 'Здесь отображается ваш текущий прогресс обучения и статистика.',
      targetSelector: '.study-progress',
      position: 'left',
      width: 280
    }
  ],
  
  // Chat page tooltips
  '/chat': [
    {
      id: 'chat-new-session',
      title: 'Создание нового чата',
      description: 'Нажмите сюда, чтобы начать новый разговор с BilimAI.',
      targetSelector: '.new-chat-button',
      position: 'bottom',
      width: 280
    },
    {
      id: 'chat-categories',
      title: 'Категории чатов',
      description: 'Выберите категорию чата в зависимости от типа вашего вопроса.',
      targetSelector: '.chat-categories',
      position: 'right',
      width: 280
    },
    {
      id: 'voice-input',
      title: 'Голосовой ввод',
      description: 'Можете записать свой вопрос или ответ голосом, нажав на эту кнопку.',
      targetSelector: '.voice-input-button',
      position: 'top',
      width: 280
    }
  ],
  
  // Library page tooltips
  '/library': [
    {
      id: 'library-filters',
      title: 'Фильтры библиотеки',
      description: 'Используйте эти фильтры для поиска нужных учебников по классу, предмету или ключевым словам.',
      targetSelector: '.library-filters',
      position: 'bottom',
      width: 300
    },
    {
      id: 'favorite-books',
      title: 'Избранные учебники',
      description: 'Нажмите на значок сердечка, чтобы добавить книгу в избранное для быстрого доступа.',
      targetSelector: '.book-card',
      position: 'right',
      width: 280
    }
  ],
  
  // Testing page tooltips
  '/testing': [
    {
      id: 'test-types',
      title: 'Типы тестов',
      description: 'Переключайтесь между разными типами тестов с помощью этих вкладок.',
      targetSelector: '.test-tabs',
      position: 'bottom',
      width: 280
    },
    {
      id: 'start-test',
      title: 'Начало тестирования',
      description: 'Нажмите "Начать", чтобы приступить к выбранному тесту. Вы увидите таймер и сможете отслеживать свой прогресс.',
      targetSelector: '.start-test-button',
      position: 'right',
      width: 300
    },
    {
      id: 'quests-feature',
      title: 'Учебные битвы',
      description: 'Попробуйте новый интерактивный формат тестирования в виде учебных битв с виртуальными соперниками!',
      targetSelector: '.quests-feature',
      position: 'left',
      width: 300
    }
  ],
  
  // Progress page tooltips
  '/progress': [
    {
      id: 'progress-overview',
      title: 'Обзор прогресса',
      description: 'Здесь вы можете увидеть ваши основные показатели успеваемости.',
      targetSelector: '.progress-stats',
      position: 'bottom',
      width: 280
    },
    {
      id: 'monthly-score',
      title: 'Динамика баллов',
      description: 'Этот график показывает динамику ваших баллов за последние месяцы.',
      targetSelector: '.monthly-score-chart',
      position: 'left',
      width: 280
    },
    {
      id: 'admission-chances',
      title: 'Шансы поступления',
      description: 'Здесь вы можете увидеть ваши текущие шансы поступления в выбранные университеты и рекомендации по их улучшению.',
      targetSelector: '.admission-chances',
      position: 'right',
      width: 300
    }
  ],
  
  // Admissions page tooltips
  '/admissions': [
    {
      id: 'key-dates',
      title: 'Ключевые даты',
      description: 'Следите за важными датами приемной кампании, чтобы не пропустить сроки подачи документов.',
      targetSelector: '.key-dates',
      position: 'bottom',
      width: 280
    },
    {
      id: 'career-test',
      title: 'AI-психолог',
      description: 'Пройдите тест на профориентацию, чтобы узнать, какие профессии и специальности подходят вам лучше всего.',
      targetSelector: '.career-test-tab',
      position: 'right',
      width: 280
    },
    {
      id: 'admission-ai',
      title: 'Вопросы о поступлении',
      description: 'Задайте любой вопрос о поступлении нашему BilimAI, и он предоставит вам подробный ответ.',
      targetSelector: '.admission-question-component',
      position: 'top',
      width: 300
    }
  ],
  
  // Settings page tooltips
  '/settings': [
    {
      id: 'notifications-settings',
      title: 'Настройки уведомлений',
      description: 'Здесь вы можете настроить, какие уведомления хотите получать от BilimApp.',
      targetSelector: '.notifications-settings',
      position: 'right',
      width: 280
    },
    {
      id: 'theme-settings',
      title: 'Настройки темы',
      description: 'Выберите светлую, темную или системную тему для комфортного использования приложения.',
      targetSelector: '.theme-settings',
      position: 'bottom',
      width: 280
    },
    {
      id: 'profile-settings',
      title: 'Настройки профиля',
      description: 'Здесь вы можете изменить свои личные данные, цели обучения и информацию о поступлении.',
      targetSelector: '.profile-settings',
      position: 'left',
      width: 280
    }
  ]
};

// Root paths to handle nested routes
const rootPaths: Record<string, string> = {
  '/my-textbooks': '/library',
  '/testing/ent': '/testing',
  '/testing/school': '/testing',
  '/profile': '/settings'
};

interface TooltipsManagerProps {
  className?: string;
}

const TooltipsManager: React.FC<TooltipsManagerProps> = ({ className }) => {
  const location = useLocation();
  
  // Get current path and find matching tooltips
  const currentPath = location.pathname;
  const rootPath = rootPaths[currentPath] || currentPath;
  const tooltips = pageTooltips[rootPath] || [];
  
  // Skip rendering if no tooltips for this page
  if (tooltips.length === 0) {
    return null;
  }
  
  return (
    <Tooltip 
      steps={tooltips} 
      storageKey={`bilimapp-tooltips-${rootPath}`}
      className={className}
    />
  );
};

export default TooltipsManager;