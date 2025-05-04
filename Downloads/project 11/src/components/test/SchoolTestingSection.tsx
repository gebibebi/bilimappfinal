import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  ChevronRight 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import useTestStore from '../../store/testStore';
import { formatDate } from '../../lib/utils';

const SchoolTestingSection: React.FC = () => {
  const tests = useTestStore(state => state.tests);
  const avgSchoolScore = useTestStore(state => state.getAvgScoreByType('SOR'));
  
  const schoolTests = tests.filter(test => (test.type === 'SOR' || test.type === 'SOCh'));
  
  const getTestStatusColor = (test) => {
    if (!test.completed) return 'text-blue-600 bg-blue-100';
    
    if (!test.score) return 'text-gray-600 bg-gray-100';
    
    const scorePercentage = (test.score / test.maxScore) * 100;
    
    if (scorePercentage >= 80) return 'text-green-600 bg-green-100';
    if (scorePercentage >= 60) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };
  
  const getTestStatusText = (test) => {
    if (!test.completed) return 'Ожидается';
    
    if (!test.score) return 'Нет оценки';
    
    const scorePercentage = (test.score / test.maxScore) * 100;
    
    if (scorePercentage >= 80) return 'Отлично';
    if (scorePercentage >= 60) return 'Хорошо';
    return 'Требует улучшений';
  };
  
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
                  <p className="text-sm font-medium text-gray-500">Средний балл</p>
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
                    {schoolTests.filter(t => t.completed).length}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-500">Ожидающие тесты</p>
                <p className="text-2xl font-bold text-gray-900">
                  {schoolTests.filter(t => !t.completed).length}
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
            <div className="flex justify-end mb-2">
              <Button
                variant="primary"
                size="sm"
                as={Link}
                to="/testing/new-school"
              >
                Создать новый тест
              </Button>
            </div>
            
            {schoolTests.map((test) => (
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
            
            {schoolTests.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-500">Школьных тестов не найдено</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <FileText size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-blue-900">Персонализированные школьные тесты</h3>
            <p className="text-blue-700 mt-1">
              Наш AI анализирует ваши результаты и создает персонализированные тесты, 
              которые помогут вам улучшить ваши слабые места и закрепить сильные стороны.
            </p>
            <Button
              variant="primary"
              className="mt-3 bg-blue-600 hover:bg-blue-700"
              as={Link}
              to="/testing/personalized"
            >
              Создать персонализированный тест
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolTestingSection;