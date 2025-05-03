import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getTimeGreeting } from '../../lib/utils';
import useUserStore from '../../store/userStore';
import Toast from '../ui/Toast';

const WelcomeBanner: React.FC = () => {
  const user = useUserStore(state => state.user);
  const [greeting, setGreeting] = useState(getTimeGreeting());
  const [showToast, setShowToast] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getTimeGreeting());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 p-8 shadow-md">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {greeting}, {user?.name || 'Student'}!
              </h2>
              <p className="mt-1 text-blue-100">
                Готова продолжить свое обучение?
              </p>
            </div>
            
            <motion.div 
              className="mt-4 md:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1L15.5 8.5H20L14.5 14L16 22L12 17.5L8 22L9.5 14L4 8.5H8.5L12 1Z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-md bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="text-sm font-medium text-white">Сегодняшняя цель</p>
              <p className="mt-1 text-xs text-blue-50">Выполнить пробное ЕНТ тестирование</p>
            </div>
            
            <div className="rounded-md bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="text-sm font-medium text-white">Study Streak</p>
              <p className="mt-1 text-xs text-blue-50">7 дней</p>
            </div>
            
            <div className="rounded-md bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="text-sm font-medium text-white">Следующий тест</p>
              <p className="mt-1 text-xs text-blue-50">СОР по Алгебре - Пятница</p>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-white/10" />
      </div>

      {showToast && (
        <Toast
          message="Скоро неделя СОЧ! Давай готовиться заранее."
          type="warning"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
};

export default WelcomeBanner;