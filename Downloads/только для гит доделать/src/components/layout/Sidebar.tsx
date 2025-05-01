import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  GraduationCap, // Новая иконка для раздела "Поступление"
} from 'lucide-react';
import { cn } from '../../lib/utils';
import useUserStore from '../../store/userStore';

interface SidebarItem {
  name: string;
  icon: React.ElementType;
  path: string;
  badgeCount?: number;
}

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const user = useUserStore(state => state.user);
  
  const sidebarItems: SidebarItem[] = [
    { name: 'Главная', icon: Home, path: '/home' },
    { name: 'Мои учебники', icon: BookOpen, path: '/my-textbooks', badgeCount: 2 },
    { name: 'Библиотека', icon: Library, path: '/library' },
    { name: 'Мой чат', icon: MessageSquare, path: '/chat', badgeCount: 3 },
    { name: 'Мой прогресс', icon: BarChart2, path: '/progress' },
    { name: 'Мои задания', icon: FileText, path: '/homework' },
    { name: 'Тестирование', icon: TestTube, path: '/testing' },
    { name: 'Поступление', icon: GraduationCap, path: '/admissions' }, // Новый пункт меню
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
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
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
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
          collapsed ? "w-20" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
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
        
        {/* Информация о пользователе */}
        {!collapsed && user && (
          <div className="flex items-center px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-medium">
              {user.name?.substring(0, 2).toUpperCase() || 'U'}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.grade} класс</p>
            </div>
          </div>
        )}
        
        {/* Навигационные элементы */}
        <div className="flex-1 px-2 py-4 overflow-y-auto">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "group flex items-center px-2 py-2 rounded-md transition-colors",
                  isActive(item.path) 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={closeMobileSidebar}
              >
                <item.icon 
                  size={20} 
                  className={cn(
                    "flex-shrink-0",
                    isActive(item.path) ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"
                  )} 
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
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Нижняя секция */}
        <div className="flex flex-col p-4 border-t border-gray-200">
          <div className={cn(
            "flex items-center px-2 py-2 rounded-md bg-green-50 text-green-700",
            !collapsed ? "justify-start" : "justify-center"
          )}>
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