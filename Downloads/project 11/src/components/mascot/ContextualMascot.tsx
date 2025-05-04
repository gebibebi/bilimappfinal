import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle } from 'lucide-react';

/**
 * ContextualMascot - A component that displays help hints with an animated mascot
 * 
 * @param {Object} props
 * @param {string} props.id - Unique identifier for this hint
 * @param {string} props.message - The help message to display
 * @param {string} props.targetSelector - CSS selector for the element to attach to
 * @param {string} props.position - Position relative to target (top, right, bottom, left)
 * @param {boolean} props.showOnMount - Whether to show the hint immediately on mount
 * @param {boolean} props.showIcon - Whether to show a help icon on the target
 * @param {function} props.onDismiss - Callback when hint is dismissed
 * @param {string} props.storageKey - Key for localStorage to remember dismissed state
 * @param {string} props.mascotImage - Path to mascot image
 */
const ContextualMascot = ({
  id,
  message,
  targetSelector,
  position = 'bottom',
  showOnMount = false,
  showIcon = true,
  onDismiss,
  storageKey,
  mascotImage = "/assets/mascot-sticker.png"
}) => {
  const [isVisible, setIsVisible] = useState(showOnMount);
  const [targetPosition, setTargetPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  
  // Check if this hint has been dismissed before
  useEffect(() => {
    if (storageKey) {
      const isDismissed = localStorage.getItem(`${storageKey}-${id}`) === 'true';
      if (isDismissed) {
        setIsVisible(false);
      }
    }
  }, [id, storageKey]);
  
  // Find target element and get its position
  useEffect(() => {
    if (!targetSelector) return;
    
    const updatePosition = () => {
      const targetElement = document.querySelector(targetSelector);
      
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setTargetPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        });
      }
    };
    
    updatePosition();
    
    // Update position on resize and scroll
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [targetSelector]);
  
  // Animation variants for mascot
  const mascotVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      y: position === 'top' ? -50 : position === 'bottom' ? 50 : 0,
      x: position === 'left' ? -50 : position === 'right' ? 50 : 0
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 15
      }
    },
    float: {
      y: [0, -10, 0],
      rotate: [0, 3, 0, -3, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  // Animation for message bubble
  const bubbleVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 10
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        delay: 0.2,
        duration: 0.3
      }
    }
  };
  
  // Calculate position based on target element and specified position
  const getPositionStyles = () => {
    const offset = 20; // Distance from target
    
    switch (position) {
      case 'top':
        return {
          top: targetPosition.top - offset,
          left: targetPosition.left + targetPosition.width / 2,
          transform: 'translate(-50%, -100%)'
        };
      case 'right':
        return {
          top: targetPosition.top + targetPosition.height / 2,
          left: targetPosition.left + targetPosition.width + offset,
          transform: 'translateY(-50%)'
        };
      case 'left':
        return {
          top: targetPosition.top + targetPosition.height / 2,
          left: targetPosition.left - offset,
          transform: 'translate(-100%, -50%)'
        };
      case 'bottom':
      default:
        return {
          top: targetPosition.top + targetPosition.height + offset,
          left: targetPosition.left + targetPosition.width / 2,
          transform: 'translateX(-50%)'
        };
    }
  };
  
  const handleDismiss = () => {
    setIsVisible(false);
    
    if (storageKey) {
      localStorage.setItem(`${storageKey}-${id}`, 'true');
    }
    
    if (onDismiss) {
      onDismiss(id);
    }
  };
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  
  // Add help icon to target element if needed
  useEffect(() => {
    if (!showIcon || !targetSelector) return;
    
    const targetElement = document.querySelector(targetSelector);
    
    if (targetElement) {
      targetElement.style.position = 'relative';
      
      const iconElement = document.createElement('div');
      iconElement.className = 'help-icon absolute -top-2 -right-2 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer z-10';
      iconElement.innerHTML = '?';
      iconElement.style.color = 'white';
      iconElement.style.fontSize = '10px';
      iconElement.style.fontWeight = 'bold';
      
      iconElement.addEventListener('click', toggleVisibility);
      
      targetElement.appendChild(iconElement);
      
      return () => {
        iconElement.removeEventListener('click', toggleVisibility);
        targetElement.removeChild(iconElement);
      };
    }
  }, [targetSelector, showIcon]);
  
  if (!targetPosition.width && !targetPosition.height) {
    return null; // Don't render until we have target position
  }
  
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed z-50" style={getPositionStyles()}>
          <div className="relative flex flex-col items-center">
            {/* Mascot */}
            <motion.div
              initial="hidden"
              animate={["visible", "float"]}
              exit="hidden"
              variants={mascotVariants}
              className="relative"
            >
              <img 
                src={mascotImage} 
                alt="Helper Mascot" 
                className="w-20 h-20 object-contain" 
              />
            </motion.div>
            
            {/* Message Bubble */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={bubbleVariants}
              className="bg-white rounded-lg shadow-lg border-2 border-blue-200 p-3 max-w-xs absolute"
              style={{
                top: position === 'bottom' ? '-90px' : 
                     position === 'top' ? '90px' : 
                     position === 'left' ? '0' : '0',
                left: position === 'right' ? '-250px' : 
                      position === 'left' ? '90px' : 
                      '50%',
                transform: (position === 'bottom' || position === 'top') ? 'translateX(-50%)' : 'none'
              }}
            >
              <button
                className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 text-xs w-4 h-4 flex items-center justify-center"
                onClick={handleDismiss}
              >
                <X size={12} />
              </button>
              
              <p className="text-gray-700 text-sm">{message}</p>
              
              {/* Triangle pointer */}
              <div 
                className="absolute w-0 h-0 border-solid"
                style={{
                  borderWidth: '8px',
                  borderColor: position === 'top' ? 'transparent transparent #e2edff transparent' :
                              position === 'bottom' ? '#e2edff transparent transparent transparent' :
                              position === 'left' ? 'transparent #e2edff transparent transparent' :
                              'transparent transparent transparent #e2edff',
                  bottom: position === 'top' ? '-16px' : 'auto',
                  top: position === 'bottom' ? '-16px' : 
                       (position === 'left' || position === 'right') ? '50%' : 'auto',
                  left: position === 'right' ? '-16px' :
                       position === 'left' ? 'auto' :
                       '50%',
                  right: position === 'left' ? '-16px' : 'auto',
                  transform: (position === 'left' || position === 'right') ? 'translateY(-50%)' :
                            (position === 'top' || position === 'bottom') ? 'translateX(-50%)' : 'none'
                }}
              ></div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Example usage component that demonstrates multiple contextual mascot hints
const MascotHintsDemo = () => {
  const hints = [
    {
      id: "chat-input",
      message: "Введите свой вопрос здесь или нажмите на микрофон, чтобы задать вопрос голосом!",
      targetSelector: ".voice-input-button",
      position: "top"
    },
    {
      id: "new-chat",
      message: "Создайте новый чат с BilimAI, чтобы начать новую тему обсуждения.",
      targetSelector: ".new-chat-button",
      position: "right",
      showOnMount: true
    },
    {
      id: "categories",
      message: "Выберите категорию чата в зависимости от вашей цели общения с BilimAI.",
      targetSelector: ".chat-categories",
      position: "bottom"
    }
  ];

  return (
    <div>
      {hints.map(hint => (
        <ContextualMascot
          key={hint.id}
          id={hint.id}
          message={hint.message}
          targetSelector={hint.targetSelector}
          position={hint.position}
          showOnMount={hint.showOnMount}
          storageKey="bilimapp-hints"
        />
      ))}
    </div>
  );
};

export default ContextualMascot;