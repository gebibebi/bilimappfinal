import React, { useState, useEffect } from 'react';
import { Bell, Moon, Sun, Languages, User, Shield, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import useUserStore from '../store/userStore';
import { setPageTitle } from '../lib/utils';

const SettingsPage: React.FC = () => {
  const { user, language, setLanguage, logout } = useUserStore();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [studyReminders, setStudyReminders] = useState(true);
  const [testReminders, setTestReminders] = useState(true);
  
  useEffect(() => {
    setPageTitle('Настройки');
  }, []);
  
  const handleChangeLanguage = (newLanguage: 'russian' | 'kazakh') => {
    setLanguage(newLanguage);
  };
  
  const handleLogout = () => {
    logout();
    // Перенаправление на страницу входа обрабатывается компонентом макета приложения
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Настройки</h1>
        <p className="text-gray-500 mt-1">Управляйте вашими предпочтениями</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Уведомления */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell size={20} className="text-blue-600" />
                <span>Уведомления</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Включить уведомления</p>
                    <p className="text-sm text-gray-500">Получать обновления о вашей активности</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 cursor-pointer">
                    <input
                      type="checkbox"
                      id="toggle-notifications"
                      className="sr-only"
                      checked={notificationsEnabled}
                      onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    />
                    <div
                      className={`block w-12 h-6 rounded-full transition-colors ${
                        notificationsEnabled ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    />
                    <div
                      className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                        notificationsEnabled ? 'transform translate-x-6' : ''
                      }`}
                    />
                  </div>
                </div>
                
                {notificationsEnabled && (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Напоминания об учебе</p>
                        <p className="text-sm text-gray-500">Получать напоминания о вашем расписании</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 cursor-pointer">
                        <input
                          type="checkbox"
                          id="toggle-study"
                          className="sr-only"
                          checked={studyReminders}
                          onChange={() => setStudyReminders(!studyReminders)}
                        />
                        <div
                          className={`block w-12 h-6 rounded-full transition-colors ${
                            studyReminders ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                        />
                        <div
                          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                            studyReminders ? 'transform translate-x-6' : ''
                          }`}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Напоминания о тестах</p>
                        <p className="text-sm text-gray-500">Получать уведомления о предстоящих тестах</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 cursor-pointer">
                        <input
                          type="checkbox"
                          id="toggle-test"
                          className="sr-only"
                          checked={testReminders}
                          onChange={() => setTestReminders(!testReminders)}
                        />
                        <div
                          className={`block w-12 h-6 rounded-full transition-colors ${
                            testReminders ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                        />
                        <div
                          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                            testReminders ? 'transform translate-x-6' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Настройки интерфейса */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sun size={20} className="text-amber-600" />
                <span>Внешний вид</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900 mb-3">Тема</p>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      className={`flex flex-col items-center space-y-2 p-3 rounded-md border ${
                        theme === 'light' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setTheme('light')}
                    >
                      <div className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                        <Sun size={18} className="text-amber-500" />
                      </div>
                      <span className="text-sm font-medium">Светлая</span>
                    </button>
                    
                    <button
                      className={`flex flex-col items-center space-y-2 p-3 rounded-md border ${
                        theme === 'dark' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setTheme('dark')}
                    >
                      <div className="h-10 w-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                        <Moon size={18} className="text-gray-200" />
                      </div>
                      <span className="text-sm font-medium">Темная</span>
                    </button>
                    
                    <button
                      className={`flex flex-col items-center space-y-2 p-3 rounded-md border ${
                        theme === 'system' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setTheme('system')}
                    >
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-gray-100 to-gray-800 border border-gray-300 flex items-center justify-center">
                        <div className="h-5 w-5 rounded-full bg-white"></div>
                      </div>
                      <span className="text-sm font-medium">Системная</span>
                    </button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <p className="font-medium text-gray-900 mb-3">Язык</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      className={`flex items-center space-x-3 p-3 rounded-md border ${
                        language === 'russian' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleChangeLanguage('russian')}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Languages size={16} />
                      </div>
                      <span className="text-sm font-medium">Русский</span>
                    </button>
                    
                    <button
                      className={`flex items-center space-x-3 p-3 rounded-md border ${
                        language === 'kazakh' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleChangeLanguage('kazakh')}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Languages size={16} />
                      </div>
                      <span className="text-sm font-medium">Казахский</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Безопасность */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield size={20} className="text-emerald-600" />
                <span>Безопасность</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Email аутентификация</p>
                    <p className="text-sm text-gray-500">Требовать подтверждение email для входа</p>
                  </div>
                  <div className="relative inline-block w-12 h-6 cursor-pointer">
                    <input
                      type="checkbox"
                      id="toggle-email-auth"
                      className="sr-only"
                      checked={true}
                      onChange={() => {}}
                    />
                    <div className="block w-12 h-6 rounded-full transition-colors bg-blue-500" />
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-6" />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="text-gray-700 border-gray-300"
                  >
                    Изменить пароль
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {/* Профиль */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User size={20} className="text-purple-600" />
                <span>Профиль</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name.substring(0, 2).toUpperCase()}
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{user?.name}</h3>
                <p className="text-gray-500">{user?.grade} класс</p>
                <p className="text-sm text-gray-500 mt-1">
                  Язык: {language === 'russian' ? 'Русский' : 'Казахский'}
                </p>
                
                <div className="mt-6 w-full">
                  <Button
                    variant="outline"
                    fullWidth
                  >
                    Редактировать профиль
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Выход */}
          <Card>
            <CardContent className="p-6">
              <Button
                variant="outline"
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
                leftIcon={<LogOut size={18} />}
                onClick={handleLogout}
              >
                Выйти
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;