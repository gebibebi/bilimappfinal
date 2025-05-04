import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MascotHelper = ({ 
  tipText, 
  mascotImage = "/assets/mascot-sticker.png", // Path to your mascot sticker
  position = "right", 
  className = "" 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Animation variants for the floating effect
  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Animation for entrance
  const entranceAnimation = {
    hidden: { 
      opacity: 0, 
      x: position === "right" ? 50 : -50,
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: { duration: 0.3 }
    }
  };

  // Position styling
  const positionStyles = position === "right" 
    ? { right: "20px" } 
    : { left: "20px" };

  return (
    <motion.div
      className={`fixed bottom-8 z-50 flex items-end ${position === "right" ? "flex-row" : "flex-row-reverse"} ${className}`}
      style={positionStyles}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={entranceAnimation}
    >
      {/* Tip Bubble */}
      <motion.div 
        className={`bg-white rounded-xl p-4 shadow-lg border-2 border-blue-200 max-w-xs ${position === "right" ? "mr-4" : "ml-4"}`}
      >
        <p className="text-gray-800 text-sm">{tipText}</p>
        <button 
          className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 text-xs rounded-full bg-gray-100 w-5 h-5 flex items-center justify-center"
          onClick={() => setIsVisible(false)}
        >
          ×
        </button>
        {/* Small triangle for speech bubble effect */}
        <div 
          className={`absolute ${position === "right" ? "right-[-8px]" : "left-[-8px]"} bottom-4 w-0 h-0 border-solid border-transparent ${position === "right" ? "border-l-white border-l-8" : "border-r-white border-r-8"} border-y-8`}
        ></div>
      </motion.div>

      {/* Mascot Image */}
      <motion.div
        className="relative"
        variants={floatingAnimation}
        initial="initial"
        animate="animate"
      >
        <img 
          src={mascotImage} 
          alt="Helper Mascot" 
          className="w-20 h-20 object-contain" 
        />
      </motion.div>
    </motion.div>
  );
};

// Example usage component that creates multiple mascot helpers
const MascotHelpersManager = () => {
  // Different tips to display at different parts of the app
  const helpTips = [
    {
      id: "welcome",
      text: "Привет! Я помогу тебе разобраться в BilimApp. Нажми сюда, чтобы начать!",
      position: "right"
    },
    {
      id: "testing",
      text: "Здесь ты можешь пройти пробные тесты ЕНТ и подготовиться к экзаменам!",
      position: "left"
    },
    {
      id: "ai-chat",
      text: "Задавай вопросы нашему BilimAI и получай мгновенные ответы по любым предметам!",
      position: "right"
    }
  ];

  return (
    <div>
      {helpTips.map(tip => (
        <MascotHelper 
          key={tip.id}
          tipText={tip.text}
          position={tip.position}
        />
      ))}
    </div>
  );
};

export default MascotHelper;