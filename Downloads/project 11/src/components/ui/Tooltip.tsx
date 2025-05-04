// src/components/ui/Tooltip.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export type TooltipStep = {
  id: string;
  title: string;
  description: string;
  targetSelector: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  width?: number; // Width in pixels
};

interface TooltipProps {
  steps: TooltipStep[];
  onComplete?: () => void;
  storageKey?: string; // To remember if user has seen tooltips
  autoStart?: boolean; // Whether to start automatically
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  steps,
  onComplete,
  storageKey = 'bilimapp-tooltips-seen',
  autoStart = true,
  className
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  useEffect(() => {
    // Check if user has already seen the tutorial
    const seen = localStorage.getItem(storageKey) === 'true';
    setHasSeenTutorial(seen);
    
    // Start automatically if not seen before
    if (autoStart && !seen && steps.length > 0) {
      setTimeout(() => {
        setIsVisible(true);
        updatePosition();
      }, 1000); // Small delay for page to fully render
    }
  }, [autoStart, storageKey, steps]);

  const updatePosition = () => {
    if (currentStepIndex >= steps.length) return;
    
    const step = steps[currentStepIndex];
    const target = document.querySelector(step.targetSelector);
    
    if (target) {
      const rect = target.getBoundingClientRect();
      const position = calculatePosition(rect, step.position || 'bottom');
      setPosition(position);
    }
  };

  const calculatePosition = (rect: DOMRect, position: 'top' | 'right' | 'bottom' | 'left') => {
    const gap = 12; // Gap between target and tooltip
    
    switch (position) {
      case 'top':
        return {
          top: rect.top - gap,
          left: rect.left + rect.width / 2
        };
      case 'right':
        return {
          top: rect.top + rect.height / 2,
          left: rect.right + gap
        };
      case 'left':
        return {
          top: rect.top + rect.height / 2,
          left: rect.left - gap
        };
      case 'bottom':
      default:
        return {
          top: rect.bottom + gap,
          left: rect.left + rect.width / 2
        };
    }
  };

  useEffect(() => {
    // Update position when step changes or when window is resized
    if (isVisible) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
    }
    
    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [currentStepIndex, isVisible]);

  const handleStartTutorial = () => {
    setIsVisible(true);
    setCurrentStepIndex(0);
    updatePosition();
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    localStorage.setItem(storageKey, 'true');
    setHasSeenTutorial(true);
    if (onComplete) onComplete();
  };

  const handleSkip = () => {
    setIsVisible(false);
  };

  const currentStep = steps[currentStepIndex];

  return (
    <>
      {/* Tutorial button */}
      <button
        className={cn(
          "fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-2 shadow-lg hover:bg-blue-700 transition-colors z-40",
          className
        )}
        onClick={handleStartTutorial}
        aria-label="Показать подсказки"
      >
        <HelpCircle size={24} />
      </button>

      {/* Tooltip overlay */}
      <AnimatePresence>
        {isVisible && currentStep && (
          <>
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              onClick={handleSkip}
            />

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed z-50 bg-white rounded-lg shadow-xl p-4"
              style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                transform: 'translate(-50%, -50%)',
                width: currentStep.width ? `${currentStep.width}px` : '280px',
                maxWidth: '90vw'
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">{currentStep.title}</h3>
                <button onClick={handleSkip} className="text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{currentStep.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  {currentStepIndex + 1} из {steps.length}
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={handleSkip}
                    className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700"
                  >
                    Пропустить
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded flex items-center hover:bg-blue-700"
                  >
                    {currentStepIndex < steps.length - 1 ? (
                      <>
                        Далее
                        <ChevronRight size={14} className="ml-1" />
                      </>
                    ) : (
                      'Завершить'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Tooltip;