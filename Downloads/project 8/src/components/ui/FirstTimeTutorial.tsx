// src/components/ui/FirstTimeTutorial.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, BookOpen, Brain, MessageSquare, BarChart2, TestTube } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from './Button';

interface TutorialStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageSrc?: string; // Optional image to illustrate the feature
}

const tutorialSteps: TutorialStep[] = [
  {
    icon: <BookOpen className="text-blue-600" size={24} />,
    title: 'Добро пожаловать в BilimApp!',
    description: 'BilimApp поможет вам эффективно подготовиться к ЕНТ и повысить ваши шансы на поступление в лучшие вузы. Давайте познакомимся с основными функциями приложения.'
  },
  {
    icon: <Brain className="text-purple-600" size={24} />,
    title: 'BilimAI - ваш персональный помощник',
    description: 'BilimAI - это искусственный интеллект, который поможет вам с учебой. Задавайте вопросы, получайте объяснения сложных тем и работайте над ошибками.',
    imageSrc: '/assets/tutorial/bilim-ai.png'
  },
  {
    icon: <MessageSquare className="text-green-600" size={24} />,
    title: 'Голосовой и текстовый чат',
    description: 'Вы можете общаться с BilimAI как текстом, так и голосом. Запишите свой вопрос или ответ голосом, и BilimAI проанализирует вашу речь.',
    imageSrc: '/assets/tutorial/voice-chat.png'
  },
  {
    icon: <TestTube className="text-amber-600" size={24} />,
    title: 'Интерактивное тестирование',
    description: 'Проходите тесты в формате ЕНТ, используйте вспомогательные инструменты и антистресс-функции для лучшего результата.',
    imageSrc: '/assets/tutorial/testing.png'
  },
  {
    icon: <BarChart2 className="text-blue-600" size={24} />,
    title: 'Отслеживание прогресса',
    description: 'Следите за своими успехами и узнавайте, насколько вы готовы к поступлению в выбранные университеты.',
    imageSrc: '/assets/tutorial/progress.png'
  }
];

interface FirstTimeTutorialProps {
  className?: string;
  onComplete?: () => void;
}

const FirstTimeTutorial: React.FC<FirstTimeTutorialProps> = ({ className, onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if user has seen the tutorial
    const hasSeenTutorial = localStorage.getItem('bilimapp-tutorial-completed') === 'true';
    
    if (!hasSeenTutorial) {
      // Show tutorial with a slight delay for better UX
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    localStorage.setItem('bilimapp-tutorial-completed', 'true');
    
    if (onComplete) {
      onComplete();
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    localStorage.setItem('bilimapp-tutorial-completed', 'true');
    
    if (onComplete) {
      onComplete();
    }
  };

  const currentTutorialStep = tutorialSteps[currentStep];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={cn(
              "bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                {currentTutorialStep.icon}
                <h2 className="text-xl font-bold text-gray-900">{currentTutorialStep.title}</h2>
              </div>
              
              <button
                onClick={handleSkip}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                {currentTutorialStep.description}
              </p>
              
              {currentTutorialStep.imageSrc && (
                <div className="flex justify-center mb-6">
                  <img 
                    src={currentTutorialStep.imageSrc}
                    alt={currentTutorialStep.title}
                    className="rounded-lg shadow-md max-h-56 w-auto"
                  />
                </div>
              )}
              
              {/* Progress dots */}
              <div className="flex justify-center space-x-2 mb-4">
                {tutorialSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <button 
                onClick={handleSkip}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium"
              >
                Пропустить
              </button>
              
              <Button
                variant="primary"
                onClick={handleNext}
                rightIcon={currentStep < tutorialSteps.length - 1 ? <ChevronRight size={16} /> : undefined}
              >
                {currentStep < tutorialSteps.length - 1 ? 'Далее' : 'Начать работу'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FirstTimeTutorial;