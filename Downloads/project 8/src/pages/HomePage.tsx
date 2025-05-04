import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  MessageSquare, 
  BarChart2, 
  Clock, 
  CheckCircle2,
  ChevronRight,
  TestTube,
  PlayCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

import WelcomeBanner from '../components/home/WelcomeBanner';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import StudyResourcesComponent from '../components/resources/StudyResourcesComponent';

import useUserStore from '../store/userStore';
import useLibraryStore from '../store/libraryStore';
import useTestStore from '../store/testStore';
import useProgressStore from '../store/progressStore';
import { setPageTitle } from '../lib/utils';

const HomePage: React.FC = () => {
  const user = useUserStore(state => state.user);
  const favoriteBooks = useLibraryStore(state => state.favoriteBooks);
  const recentTests = useTestStore(state => state.tests);
  const stats = useProgressStore(state => state.stats);
  
  useEffect(() => {
    setPageTitle('Главная');
  }, []);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="space-y-8">
      <WelcomeBanner />
      
      <motion.div 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Быстрые действия */}
     <motion.div variants={item}>
  <Card className="quick-actions">
    <CardHeader>
      <CardTitle>Быстрые действия</CardTitle>
    </CardHeader>
    <CardContent>
              <div className="space-y-2">
                <Link 
                  to="/testing/ent" 
                  className="flex items-center justify-between rounded-md border border-gray-200 p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <TestTube size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Начать тест ЕНТ</p>
                      <p className="text-xs text-gray-500">120 вопросов</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </Link>
                
                <Link 
                  to="/chat" 
                  className="flex items-center justify-between rounded-md border border-gray-200 p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Спросить BilimAI</p>
                      <p className="text-xs text-gray-500">Помощь с домашкой</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </Link>
                
                <Link 
                  to="/my-textbooks" 
                  className="flex items-center justify-between rounded-md border border-gray-200 p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Мои учебники</p>
                      <p className="text-xs text-gray-500">Сохраненные книги</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Прогресс обучения */}
       <motion.div variants={item}>
  <Card className="study-progress">
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center justify-between">
        Прогресс обучения
        <Link to="/progress" className="text-sm text-blue-600 font-normal">
          Подробнее
        </Link>
      </CardTitle>
    </CardHeader>
    <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-700">Часов за неделю</span>
                  </div>
                  <span className="font-medium">{stats.weeklyStudyHours}ч</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-700">Пройденных тем</span>
                  </div>
                  <span className="font-medium">{stats.completedTopics}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BarChart2 size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-700">Средний балл</span>
                  </div>
                  <span className="font-medium">{stats.averageTestScore}%</span>
                </div>
                
                <div className="pt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700">Прогресс цели</span>
                    <span className="text-xs font-medium text-gray-700">65%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: '65%' }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Последние тесты */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                Последние тесты
                <Link to="/testing" className="text-sm text-blue-600 font-normal">
                  Все тесты
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTests.slice(0, 3).map((test) => (
                  <div 
                    key={test.id}
                    className="flex items-center justify-between rounded-md border border-gray-200 p-3"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{test.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{test.type}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">
                          {new Date(test.date).toLocaleDateString('ru-RU', { 
                            day: 'numeric', 
                            month: 'short'
                          })}
                        </span>
                      </div>
                    </div>
                    
                    {test.completed ? (
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {test.score}/{test.maxScore}
                        </p>
                        <p className="text-xs text-gray-500">
                          {Math.round((test.score || 0) / test.maxScore * 100)}%
                        </p>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        as={Link}
                        to={`/testing/${test.id}`}
                      >
                        Начать
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      
      {/* Полезные ресурсы для подготовки к ЕНТ */}
      <StudyResourcesComponent />
      
      {/* Рекомендуемые учебники */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Ваши учебники</h2>
          <Link to="/my-textbooks" className="text-sm text-blue-600">
            Все учебники
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteBooks.slice(0, 4).map((book) => (
            <Card key={book.id} hoverable>
              <div className="aspect-[3/4] w-full relative">
                <img 
                  src={book.coverUrl} 
                  alt={book.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-sm font-medium text-white">{book.title}</h3>
                  <p className="text-xs text-gray-300">{book.author}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Совет от BilimAI */}
      <div className="rounded-lg bg-green-50 p-4 border border-green-200">
        <div className="flex items-start space-x-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-green-800">Совет от BilimAI</h3>
            <p className="mt-1 text-sm text-green-700">
              Попробуйте ставить конкретные цели для каждого занятия. Исследования показывают, что конкретные измеримые цели улучшают результаты обучения до 25%.
            </p>
            <div className="mt-3">
              <Button 
                variant="success" 
                size="sm"
                as={Link}
                to="/chat"
              >
                Получить советы
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;