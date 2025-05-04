import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  ChevronRight 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import { formatDate } from '../../lib/utils';

const SorSochTestingSection: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedQuarter, setSelectedQuarter] = useState('1');
  
  // Mock subjects for SOR/SOCh
  const subjects = [
    { id: 'all', name: 'Все предметы' },
    { id: 'math', name: 'Математика' },
    { id: 'physics', name: 'Физика' },
    { id: 'chemistry', name: 'Химия' },
    { id: 'biology', name: 'Биология' },
    { id: 'history', name: 'История' },
    { id: 'literature', name: 'Литература' },
    { id: 'geography', name: 'География' },
    { id: 'kazakh', name: 'Казахский язык' },
    { id: 'russian', name: 'Русский язык' },
    { id: 'english', name: 'Английский язык' },
  ];
  
  // Mock grades
  const grades = [
    { id: 'all', name: 'Все классы' },
    { id: '1', name: '1 класс' },
    { id: '2', name: '2 класс' },
    { id: '3', name: '3 класс' },
    { id: '4', name: '4 класс' },
    { id: '5', name: '5 класс' },
    { id: '6', name: '6 класс' },
    { id: '7', name: '7 класс' },
    { id: '8', name: '8 класс' },
    { id: '9', name: '9 класс' },
    { id: '10', name: '10 класс' },
    { id: '11', name: '11 класс' },
    { id: '12', name: '12 класс' },
  ];
  
  // Mock quarters
  const quarters = [
    { id: '1', name: '1 четверть' },
    { id: '2', name: '2 четверть' },
    { id: '3', name: '3 четверть' },
    { id: '4', name: '4 четверть' },
  ];
  
  // Generate random SOR tests for demo
  const generateSORTests = () => {
    const subjectFilter = selectedSubject === 'all' ? null : selectedSubject;
    const gradeFilter = selectedGrade === 'all' ? null : selectedGrade;
    
    const mockSORTests = [
      {
        id: 'sor-math-1',
        title: 'СОР по математике (Уравнения)',
        type: 'SOR',
        subject: 'Математика',
        grade: '9',
        quarter: '1',
        date: '2025-05-20',
        totalQuestions: 15,
        maxScore: 30,
        completed: false
      },
      {
        id: 'soch-math-1',
        title: 'СОЧ по математике (1 четверть)',
        type: 'SOCh',
        subject: 'Математика',
        grade: '9',
        quarter: '1',
        date: '2025-05-25',
        totalQuestions: 25,
        maxScore: 50,
        completed: false
      },
      {
        id: 'sor-phys-1',
        title: 'СОР по физике (Механика)',
        type: 'SOR',
        subject: 'Физика',
        grade: '10',
        quarter: '1',
        date: '2025-05-18',
        totalQuestions: 12,
        maxScore: 24,
        completed: true,
        score: 20
      },
      {
        id: 'sor-chem-1',
        title: 'СОР по химии (Периодическая система)',
        type: 'SOR',
        subject: 'Химия',
        grade: '8',
        quarter: '2',
        date: '2025-05-15',
        totalQuestions: 10,
        maxScore: 20,
        completed: true,
        score: 17
      },
      {
        id: 'soch-history-1',
        title: 'СОЧ по истории (1 четверть)',
        type: 'SOCh',
        subject: 'История',
        grade: '9',
        quarter: '1',
        date: '2025-05-12',
        totalQuestions: 30,
        maxScore: 60,
        completed: true,
        score: 52
      }
    ];
    
    // Filter by subject and grade if selected
    return mockSORTests.filter(test => 
      (!subjectFilter || test.subject.toLowerCase().includes(subjectFilter)) &&
      (!gradeFilter || test.grade === gradeFilter) &&
      (test.quarter === selectedQuarter)
    );
  };
  
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
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Пробное суммативное оценивание</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Subject filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Предмет
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.id}>{subject.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Grade filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Класс
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                  >
                    {grades.map(grade => (
                      <option key={grade.id} value={grade.id}>{grade.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Quarter filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Четверть
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={selectedQuarter}
                    onChange={(e) => setSelectedQuarter(e.target.value)}
                  >
                    {quarters.map(quarter => (
                      <option key={quarter.id} value={quarter.id}>{quarter.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Доступные тесты</h3>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      as={Link}
                      to="/testing/new-sor"
                    >
                      СОР
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      as={Link}
                      to="/testing/new-soch"
                    >
                      СОЧ
                    </Button>
                  </div>
                </div>
                
                {generateSORTests().map((test) => (
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
                          <span className="text-xs text-gray-500">{test.grade} класс</span>
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
                
                {generateSORTests().length === 0 && (
                  <div className="text-center py-6 bg-gray-50 rounded-md">
                    <p className="text-gray-500">Тестов с выбранными параметрами не найдено</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Оценивание</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Типы оценивания</h3>
                  <div className="space-y-2">
                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="text-sm font-medium text-blue-800">СОР</p>
                      <p className="text-xs text-blue-600">Суммативное оценивание за раздел</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-md">
                      <p className="text-sm font-medium text-green-800">СОЧ</p>
                      <p className="text-xs text-green-600">Суммативное оценивание за четверть</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Преимущества</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Задания в формате настоящих СОР/СОЧ
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      AI-анализ ошибок после выполнения
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      Рекомендации для улучшения результатов
                    </li>
                  </ul>
                </div>
                
                <div className="pt-4">
                  <Button
                    variant="primary"
                    fullWidth
                    as={Link}
                    to="/testing/new-sor"
                  >
                    Создать новый тест
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SorSochTestingSection;