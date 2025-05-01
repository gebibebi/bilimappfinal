import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TestTube, 
  GraduationCap, 
  FileText, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  AlertCircle,
  BookOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import useTestStore from '../store/testStore';
import { Test } from '../types';
import { setPageTitle, formatDate } from '../lib/utils';

const TestingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ent' | 'school'>('ent');
  const tests = useTestStore(state => state.tests);
  const avgEntScore = useTestStore(state => state.getAvgScoreByType('ENT'));
  const avgSchoolScore = useTestStore(state => state.getAvgScoreByType('SOR'));
  
  useEffect(() => {
    setPageTitle('Тестирование');
  }, []);
  
  const getFilteredTests = () => {
    if (activeTab === 'ent') {
      return tests.filter(test => test.type === 'ENT');
    } else {
      return tests.filter(test => test.type === 'SOR' || test.type === 'SOCh');
    }
  };
  
  const getTestStatusColor = (test: Test) => {
    if (!test.completed) return 'text-blue-600 bg-blue-100';
    
    if (!test.score) return 'text-gray-600 bg-gray-100';
    
    const scorePercentage = (test.score / test.maxScore) * 100;
    
    if (scorePercentage >= 80) return 'text-green-600 bg-green-100';
    if (scorePercentage >= 60) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };
  
  const getTestStatusText = (test: Test) => {
    if (!test.completed) return 'Ожидается';
    
    if (!test.score) return 'Нет оценки';
    
    const scorePercentage = (test.score / test.maxScore) * 100;
    
    if (scorePercentage >= 80) return 'Отлично';
    if (scorePercentage >= 60) return 'Хорошо';
    return 'Требует улучшений';
  };
  
  const renderENTSection = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Средний балл</p>
                    <p className="text-2xl font-bold text-gray-900">{avgEntScore}/140</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500">Процентиль</p>
                  <p className="text-2xl font-bold text-gray-900">75%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Пройдено тестов</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {tests.filter(t => t.type === 'ENT' && t.completed).length}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500">Последний тест</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatDate(
                      tests
                        .filter(t => t.type === 'ENT' && t.completed)
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]?.date
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Дней до ЕНТ</p>
                    <p className="text-2xl font-bold text-gray-900">47</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500">Целевой балл</p>
                  <p className="text-2xl font-bold text-gray-900">120+</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Результаты по предметам</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-700">История Казахстана</p>
                    <p className="text-sm font-medium text-gray-700">16/20</p>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-700">Грамотность чтения</p>
                    <p className="text-sm font-medium text-gray-700">8/10</p>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-700">Математическая грамотность</p>
                    <p className="text-sm font-medium text-gray-700">7/10</p>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-700">Математика</p>
                    <p className="text-sm font-medium text-gray-700">32/40</p>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-700">Информатика</p>
                    <p className="text-sm font-medium text-gray-700">35/40</p>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: '87.5%' }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Рекомендации</CardTitle>
              <Link to="/chat" className="text-sm text-blue-600">
                Спросить BilimAI
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 flex-shrink-0">
                    <AlertCircle size={14} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Сфокусируйтесь на математической грамотности
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Ваши результаты ниже среднего в этой области.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                    <CheckCircle2 size={14} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Сильные стороны в информатике
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Продолжайте практиковаться, чтобы сохранить отличные результаты.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                    <BookOpen size={14} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Повторите ключевые темы по истории
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Сосредоточьтесь на современной истории Казахстана (1991-настоящее время).
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button
                    variant="primary"
                    leftIcon={<TestTube size={18} />}
                    as={Link}
                    to="/testing/new-ent"
                    fullWidth
                  >
                    Начать новый тест ЕНТ
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };
  
  const renderSchoolSection = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Средний балл СОР</p>
                    <p className="text-2xl font-bold text-gray-900">{avgSchoolScore}/20</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500">Эквивалент оценки</p>
                  <p className="text-2xl font-bold text-gray-900">A-</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Пройдено тестов</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {tests.filter(t => (t.type === 'SOR' || t.type === 'SOCh') && t.completed).length}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500">Ожидающие тесты</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tests.filter(t => (t.type === 'SOR' || t.type === 'SOCh') && !t.completed).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Предстоящие и пройденные тесты</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getFilteredTests().map((test) => (
                <div 
                  key={test.id}
                  className="flex items-center justify-between p-4 rounded-md border border-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${getTestStatusColor(test)}`}>
                      {test.completed ? (
                        <CheckCircle2 size={20} />
                      ) : (
                        <Clock size={20} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{test.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{test.type}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">
                          {formatDate(test.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getTestStatusColor(test)}`}>
                          {getTestStatusText(test)}
                        </span>
                      </div>
                      {test.completed && test.score !== undefined && (
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {test.score}/{test.maxScore} ({Math.round((test.score / test.maxScore) * 100)}%)
                        </p>
                      )}
                    </div>
                    
                    <Button
                      variant={test.completed ? "outline" : "primary"}
                      size="sm"
                      as={Link}
                      to={`/testing/${test.id}`}
                      rightIcon={<ChevronRight size={16} />}
                    >
                      {test.completed ? "Обзор" : "Начать"}
                    </Button>
                  </div>
                </div>
              ))}
              
              {getFilteredTests().length === 0 && (
                <div className="text-center py-6">
                  <p className="text-gray-500">{activeTab === 'ent' ? 'ЕНТ' : 'Школьных'} тестов не найдено</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Тестирование</h1>
          <p className="text-gray-500 mt-1">Пробные тесты и оценки</p>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'ent' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('ent')}
          >
            Тесты ЕНТ
          </Button>
          <Button
            variant={activeTab === 'school' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('school')}
          >
            Школьные тесты
          </Button>
        </div>
      </div>
      
      {activeTab === 'ent' ? renderENTSection() : renderSchoolSection()}
    </div>
  );
};

export default TestingPage;