import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, BookOpen, Brain, MessageSquare, BarChart2, TestTube } from 'lucide-react';
import Button from '../ui/Button';

const EnhancedFirstTimeTutorial = ({ className, onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Tutorial steps configuration with mascot positions
  const tutorialSteps = [
    {
      icon: <BookOpen className="text-blue-600" size={24} />,
      title: 'Добро пожаловать в BilimApp!',
      description: 'BilimApp поможет вам эффективно подготовиться к ЕНТ и повысить ваши шансы на поступление в лучшие вузы. Давайте познакомимся с основными функциями приложения.',
      mascotPosition: 'right',
    },
    {
      icon: <Brain className="text-purple-600" size={24} />,
      title: 'BilimAI - ваш персональный помощник',
      description: 'BilimAI - это искусственный интеллект, который поможет вам с учебой. Задавайте вопросы, получайте объяснения сложных тем и работайте над ошибками.',
      imageSrc: '/assets/tutorial/bilim-ai.png',
      mascotPosition: 'left',
    },
    {
      icon: <MessageSquare className="text-green-600" size={24} />,
      title: 'Голосовой и текстовый чат',
      description: 'Вы можете общаться с BilimAI как текстом, так и голосом. Запишите свой вопрос или ответ голосом, и BilimAI проанализирует вашу речь.',
      imageSrc: '/assets/tutorial/voice-chat.png',
      mascotPosition: 'right',
    },
    {
      icon: <TestTube className="text-amber-600" size={24} />,
      title: 'Интерактивное тестирование',
      description: 'Проходите тесты в формате ЕНТ, используйте вспомогательные инструменты и антистресс-функции для лучшего результата.',
      imageSrc: '/assets/tutorial/testing.png',
      mascotPosition: 'left',
    },
    {
      icon: <BarChart2 className="text-blue-600" size={24} />,
      title: 'Отслеживание прогресса',
      description: 'Следите за своими успехами и узнавайте, насколько вы готовы к поступлению в выбранные университеты.',
      imageSrc: '/assets/tutorial/progress.png',
      mascotPosition: 'right',
    }
  ];

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

  // Animation variants for mascot
  const mascotAnimation = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.5
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10,
        delay: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0,
      y: 50,
      transition: { duration: 0.3 }
    },
    float: {
      y: [0, -15, 0],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

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
            className={`bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden relative ${className}`}
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
            <div className="p-6 relative">
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
              
              {/* Animated Mascot */}
              <motion.div
                className={`absolute ${currentTutorialStep.mascotPosition === 'right' ? 'right-6' : 'left-6'} bottom-20`}
                initial="hidden"
                animate={["visible", "float"]}
                exit="exit"
                variants={mascotAnimation}
              >
                <img 
                  src="/assets/mascot-sticker.png" 
                  alt="BilimApp Mascot" 
                  className="w-24 h-24 object-contain"
                />
              </motion.div>
              
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

export default EnhancedFirstTimeTutorial;