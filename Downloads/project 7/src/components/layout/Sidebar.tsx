import React, { useState } from 'react';
import { 
  BookOpen, 
  Library, 
  MessageSquare, 
  BarChart2, 
  FileText, 
  TestTube, 
  Settings,
  Menu,
  X,
  Home,
  GraduationCap,
  User,
  Bell
} from 'lucide-react';
import useUserStore from '../../store/userStore'; // Импортируем хранилище пользователя
import { useNavigate } from 'react-router-dom'; // Импортируем хук для навигации

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate(); // Используем хук для программной навигации
  
  // Получаем данные пользователя из хранилища вместо моковых данных
  const user = useUserStore(state => state.user);
  
  const sidebarItems = [
    { name: 'Главная', icon: Home, path: '/home' },
    { name: 'Лента', icon: Bell, path: '/news', badgeCount: 5 }, 
    { name: 'Мои учебники', icon: BookOpen, path: '/my-textbooks', badgeCount: 2 },
    { name: 'Библиотека', icon: Library, path: '/library' },
    { name: 'Мой чат', icon: MessageSquare, path: '/chat', badgeCount: 3 },
    { name: 'Мой прогресс', icon: BarChart2, path: '/progress' },
    { name: 'Мои задания', icon: FileText, path: '/homework' },
    { name: 'Тестирование', icon: TestTube, path: '/testing' },
    { name: 'Поступление', icon: GraduationCap, path: '/admissions' },
    { name: 'Настройки', icon: Settings, path: '/settings' },
  ];
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };
  
  // Обновленная навигация на профиль
  const navigateToProfile = () => {
    navigate('/profile'); // Используем хук для навигации вместо window.location
    closeMobileSidebar(); // Закрываем мобильное меню при навигации
  };
  
  const isActive = (path) => {
    // Проверка активного пути
    const currentPath = window.location.pathname;
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };
  
  // Обработчик клика по пункту меню
  const handleMenuItemClick = (path, e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение ссылки
    navigate(path); // Используем navigate для программной навигации
    closeMobileSidebar(); // Закрываем мобильное меню
  };
  
  return (
    <>
      {/* Кнопка мобильного меню */}
      <button 
        className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-white shadow-md"
        onClick={toggleMobileSidebar}
        aria-label="Переключить меню"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Мобильное затемнение */}
      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={closeMobileSidebar}
        />
      )}
      
      {/* Боковая панель */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        } ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Логотип и кнопка сворачивания */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                <BookOpen size={20} />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">BilimApp</span>
            </div>
          )}
          
          {collapsed && (
            <div className="flex items-center justify-center w-full">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                <BookOpen size={20} />
              </div>
            </div>
          )}
          
          <button
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100"
            onClick={toggleSidebar}
            aria-label={collapsed ? "Развернуть меню" : "Свернуть меню"}
          >
            {collapsed ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Информация о пользователе - использует реальные данные из хранилища */}
        {!collapsed && user && (
          <div 
            onClick={navigateToProfile}
            className="flex items-center px-4 py-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-medium">
              {user.name?.substring(0, 2).toUpperCase() || 'U'}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.grade ? `${user.grade} класс` : 'Ученик'}</p>
            </div>
          </div>
        )}
        
        {/* Сокращенная информация о пользователе (для свернутого меню) */}
        {collapsed && user && (
          <div 
            onClick={navigateToProfile}
            className="flex items-center justify-center py-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-medium">
              {user.name?.substring(0, 2).toUpperCase() || 'U'}
            </div>
          </div>
        )}
        
        {/* Навигационные элементы с обновленной обработкой клика */}
        <div className="flex-1 px-2 py-4 overflow-y-auto">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`group flex items-center px-2 py-2 rounded-md transition-colors ${
                  isActive(item.path) 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={(e) => handleMenuItemClick(item.path, e)}
              >
                <item.icon 
                  size={20} 
                  className={`flex-shrink-0 ${
                    isActive(item.path) 
                      ? "text-blue-600" 
                      : "text-gray-500 group-hover:text-gray-700"
                  }`} 
                />
                {!collapsed && (
                  <span className="ml-3 text-sm font-medium">
                    {item.name}
                  </span>
                )}
                {!collapsed && item.badgeCount && (
                  <span className="ml-auto inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                    {item.badgeCount}
                  </span>
                )}
                {collapsed && item.badgeCount && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                    {item.badgeCount}
                  </span>
                )}
              </a>
            ))}
          </nav>
        </div>
        
        {/* Нижняя секция */}
        <div className="flex flex-col p-4 border-t border-gray-200">
          <div 
            className={`flex items-center px-2 py-2 rounded-md bg-green-50 text-green-700 cursor-pointer ${
              !collapsed ? "justify-start" : "justify-center"
            }`}
            onClick={(e) => handleMenuItemClick('/ai-assistant', e)}
          >
            <MessageSquare size={20} className="flex-shrink-0" />
            {!collapsed && (
              <span className="ml-3 text-sm font-medium">
                Спросить BilimAI
              </span>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;