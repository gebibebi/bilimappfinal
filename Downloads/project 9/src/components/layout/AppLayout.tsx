// src/components/layout/AppLayout.tsx
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import useUserStore from '../../store/userStore';
import { setPageTitle } from '../../lib/utils';
import FirstTimeTutorial from '../ui/FirstTimeTutorial';

const AppLayout: React.FC = () => {
  const { isRegistered, isOnboarded } = useUserStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    setPageTitle('Dashboard');
    
    // Redirect if not registered or onboarded
    if (!isRegistered) {
      navigate('/register');
    } else if (!isOnboarded) {
      navigate('/onboarding');
    }
  }, [isRegistered, isOnboarded, navigate]);
  
  if (!isRegistered || !isOnboarded) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add FirstTimeTutorial component */}
      <FirstTimeTutorial />
      
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