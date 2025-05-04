import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Languages, 
  Headphones, 
  BookOpen, 
  Edit, 
  MessageSquare,
  CheckCircle2,
  Clock,
  ChevronRight,
  Video
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import { formatDate } from '../../lib/utils';

const IeltsTestingSection: React.FC = () => {
  const [selectedIeltsSection, setSelectedIeltsSection] = useState('all');
  
  // Mock IELTS tests
  const ieltsTests = [
    {
      id: 'ielts-reading-1',
      title: 'IELTS Reading Practice Test 1',
      section: 'reading',
      date: '2025-05-20',
      totalQuestions: 40,
      maxScore: 9.0,
      completed: false
    },
    {
      id: 'ielts-listening-1',
      title: 'IELTS Listening Practice Test 1',
      section: 'listening',
      date: '2025-05-20',
      totalQuestions: 40,
      maxScore: 9.0,
      completed: true,
      score: 7.5
    },
    {
      id: 'ielts-writing-1',
      title: 'IELTS Writing Practice Test 1',
      section: 'writing',
      date: '2025-05-18',
      totalQuestions: 2,
      maxScore: 9.0,
      completed: true,
      score: 6.5
    },
    {
      id: 'ielts-speaking-1',
      title: 'IELTS Speaking Practice Test 1',
      section: 'speaking',
      date: '2025-05-15',
      totalQuestions: 3,
      maxScore: 9.0,
      completed: true,
      score: 7.0
    },
    {
      id: 'ielts-full-1',
      title: 'IELTS Full Practice Test',
      section: 'all',
      date: '2025-05-10',
      totalQuestions: 85,
      maxScore: 9.0,
      completed: true,
      score: 7.0
    }
  ];
  
  const getFilteredTests = () => {
    return ieltsTests.filter(test => 
      selectedIeltsSection === 'all' || test.section === selectedIeltsSection
    );
  };
  
  const getTestStatusColor = (test) => {
    if (!test.completed) return 'text-blue-600 bg-blue-100';
    
    if (!test.score) return 'text-gray-600 bg-gray-100';
    
    // For IELTS tests
    const scorePercentage = (test.score / 9.0) * 100;
    
    if (scorePercentage >= 80) return 'text-green-600 bg-green-100';
    if (scorePercentage >= 60) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };
  
  const getTestStatusText = (test) => {
    if (!test.completed) return 'Ожидается';
    
    if (!test.score) return 'Нет оценки';
    
    // For IELTS tests
    const scorePercentage = (test.score / 9.0) * 100;
    
    if (scorePercentage >= 80) return 'Отлично';
    if (scorePercentage >= 60) return 'Хорошо';
    return 'Требует улучшений';
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* IELTS Overview Card */}
        <div className="md:col-span-4">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="md:flex items-start">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">
                    <Languages size={32} />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">IELTS Practice Test</h2>
                  <p className="text-gray-700">
                    Подготовьтесь к международному экзамену IELTS с нашими пробными тестами. 
                    Все секции экзамена представлены в формате, идентичном реальному тесту. 
                    Пройдите все модули: Listening, Reading, Writing и Speaking.
                  </p>
                  
                  <div className="grid grid-cols-4 gap-4 mt-6">
                    <div className="text-center">
                      <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-full bg-red-100 text-red-600 mb-2">
                        <Headphones size={18} />
                      </div>
                      <p className="text-sm font-medium">Listening</p>
                    </div>
                    <div className="text-center">
                      <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-2">
                        <BookOpen size={18} />
                      </div>
                      <p className="text-sm font-medium">Reading</p>
                    </div>
                    <div className="text-center">
                      <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-full bg-green-100 text-green-600 mb-2">
                        <Edit size={18} />
                      </div>
                      <p className="text-sm font-medium">Writing</p>
                    </div>
                    <div className="text-center">
                      <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-2">
                        <MessageSquare size={18} />
                      </div>
                      <p className="text-sm font-medium">Speaking</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* IELTS Section Tabs */}
        <div className="md:col-span-4">
          <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 flex overflow-x-auto">
            <button
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedIeltsSection === 'all' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedIeltsSection('all')}
            >
              Все секции
            </button>
            <button
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedIeltsSection === 'listening' 
                  ? 'bg-red-100 text-red-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedIeltsSection('listening')}
            >
              Listening
            </button>
            <button
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedIeltsSection === 'reading' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedIeltsSection('reading')}
            >
              Reading
            </button>
            <button
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedIeltsSection === 'writing' 
                  ? 'bg-green-100 text-green-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedIeltsSection('writing')}
            >
              Writing
            </button>
            <button
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedIeltsSection === 'speaking' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedIeltsSection('speaking')}
            >
              Speaking
            </button>
          </div>
        </div>
      </div>
      
      {/* IELTS Tests List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Доступные тесты IELTS</CardTitle>
            <Button
              variant="primary"
              size="sm"
              as={Link}
              to="/testing/new-ielts"
            >
              Новый тест
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getFilteredTests().map((test) => (
              <div 
                key={test.id}
                className="flex items-center justify-between p-4 rounded-md border border-gray-200 hover:border-gray-300 transition-colors"
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
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700 capitalize">
                        {test.section}
                      </span>
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
                        {test.score.toFixed(1)}/9.0
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
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Тесты не найдены. Выберите другую секцию или создайте новый тест.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* IELTS Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Ресурсы для подготовки к IELTS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div className="flex items-center mb-2">
                <BookOpen size={18} className="text-blue-600 mr-2" />
                <h4 className="font-medium text-gray-900">Банк заданий</h4>
              </div>
              <p className="text-sm text-gray-600">
                Более 500 заданий для всех разделов IELTS
              </p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div className="flex items-center mb-2">
                <Video size={18} className="text-blue-600 mr-2" />
                <h4 className="font-medium text-gray-900">Видеоуроки</h4>
              </div>
              <p className="text-sm text-gray-600">
                Видеокурсы от преподавателей с опытом работы
              </p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div className="flex items-center mb-2">
                <Headphones size={18} className="text-blue-600 mr-2" />
                <h4 className="font-medium text-gray-900">Аудиоматериалы</h4>
              </div>
              <p className="text-sm text-gray-600">
                Аудиозаписи для раздела Listening с транскриптами
              </p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div className="flex items-center mb-2">
                <Edit size={18} className="text-blue-600 mr-2" />
                <h4 className="font-medium text-gray-900">Образцы эссе</h4>
              </div>
              <p className="text-sm text-gray-600">
                Примеры эссе с высокими баллами и комментариями
              </p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div className="flex items-center mb-2">
                <MessageSquare size={18} className="text-blue-600 mr-2" />
                <h4 className="font-medium text-gray-900">Speaking тренажер</h4>
              </div>
              <p className="text-sm text-gray-600">
                AI-тренажер для практики разговорной речи
              </p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div className="flex items-center mb-2">
                <CheckCircle2 size={18} className="text-blue-600 mr-2" />
                <h4 className="font-medium text-gray-900">Стратегии и советы</h4>
              </div>
              <p className="text-sm text-gray-600">
                Практические рекомендации по сдаче экзамена
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IeltsTestingSection;