// src/components/layout/AppLayout.tsx
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import useUserStore from '../../store/userStore';
import { setPageTitle } from '../../lib/utils';
import FirstTimeTutorial from '../ui/FirstTimeTutorial';
import { MascotHelper } from '../mascot'; // Импортируем новый компонент

const AppLayout: React.FC = () => {
  const { isRegistered, isOnboarded, user } = useUserStore();
  const navigate = useNavigate();
  const [showMascot, setShowMascot] = useState(true);
  
  useEffect(() => {
    setPageTitle('Dashboard');
    
    // Redirect if not registered or onboarded
    if (!isRegistered) {
      navigate('/register');
    } else if (!isOnboarded) {
      navigate('/onboarding');
    }
    
    // Скрыть маскота через 10 секунд
    const timer = setTimeout(() => {
      setShowMascot(false);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [isRegistered, isOnboarded, navigate]);
  
  if (!isRegistered || !isOnboarded) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Оставляем оригинальный компонент FirstTimeTutorial */}
      <FirstTimeTutorial />
      
      {/* Добавляем простой MascotHelper */}
      {showMascot && (
        <MascotHelper 
          tipText={`Привет, ${user?.name || 'ученик'}! Добро пожаловать в BilimApp. Нажимайте на иконки с вопросительным знаком, если нужна помощь.`}
          position="right"
          onClose={() => setShowMascot(false)}
        />
      )}
      
      <Sidebar />
      
      <main className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;