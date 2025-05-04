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
  BookOpen,
  Trophy,
  Zap,
  Gamepad2,
  UsersRound,
  Headphones,
  Edit,
  MessageSquare,
  Share2,
  Award,
  User,
  Languages,
  Pencil,
  Video,
  Clock4,
  X // Добавлен импорт X из lucide-react
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import useTestStore from '../store/testStore';
import useUserStore from '../store/userStore';
import { Test } from '../types';
import { setPageTitle, formatDate } from '../lib/utils';
import EducationalQuestsComponent from '../components/quest/EducationalQuestsComponent';
import { useNavigate } from 'react-router-dom';


const TestingPage = () => {
  const [activeTab, setActiveTab] = useState<'ent' | 'school' | 'quests' | 'sor' | 'ielts' | 'multiplayer'>('ent');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedQuarter, setSelectedQuarter] = useState('1');
  const [selectedIeltsSection, setSelectedIeltsSection] = useState('reading');
  const [showMultiplayerModal, setShowMultiplayerModal] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(3);
  const [showJoinForm, setShowJoinForm] = useState(false);
 const navigate = useNavigate();

  
  const tests = useTestStore(state => state.tests);
  const avgEntScore = useTestStore(state => state.getAvgScoreByType('ENT'));
  const avgSchoolScore = useTestStore(state => state.getAvgScoreByType('SOR'));
  const user = useUserStore(state => state.user);
  
  useEffect(() => {
    setPageTitle('Тестирование');
  }, []);
  
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
    }
  ];
  
  // Filter tests based on active tab
  const getFilteredTests = () => {
    if (activeTab === 'ent') {
      return tests.filter(test => test.type === 'ENT');
    } else if (activeTab === 'school') {
      return tests.filter(test => test.type === 'SOR' || test.type === 'SOCh');
    } else if (activeTab === 'sor') {
      return generateSORTests();
    } else if (activeTab === 'ielts') {
      return ieltsTests.filter(test => 
        selectedIeltsSection === 'all' || test.section === selectedIeltsSection
      );
    }
    return [];
  };
  
  const getTestStatusColor = (test: any) => {
    if (!test.completed) return 'text-blue-600 bg-blue-100';
    
    if (!test.score) return 'text-gray-600 bg-gray-100';
    
    let scorePercentage;
    if (test.maxScore === 9.0) {
      // For IELTS tests
      scorePercentage = (test.score / test.maxScore) * 100;
    } else {
      // For regular tests
      scorePercentage = (test.score / test.maxScore) * 100;
    }
    
    if (scorePercentage >= 80) return 'text-green-600 bg-green-100';
    if (scorePercentage >= 60) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };
  
  const getTestStatusText = (test: any) => {
    if (!test.completed) return 'Ожидается';
    
    if (!test.score) return 'Нет оценки';
    
    let scorePercentage;
    if (test.maxScore === 9.0) {
      // For IELTS tests
      scorePercentage = (test.score / 9.0) * 100;
    } else {
      // For regular tests
      scorePercentage = (test.score / test.maxScore) * 100;
    }
    
    if (scorePercentage >= 80) return 'Отлично';
    if (scorePercentage >= 60) return 'Хорошо';
    return 'Требует улучшений';
  };
  
  const handleCreateMultiplayerGame = () => {
    // Generate random code for the game
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setInviteLink(`https://bilimapp.com/game/join/${randomCode}`);
    setJoinCode(randomCode);
  navigate(`/testing/multiplayer/${randomCode}`);
};
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    // Show toast notification (not implemented in this example)
    alert('Ссылка скопирована!');
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
              {getFilteredTests().map((test: any) => (
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
  
  const renderQuestsSection = () => {
    return (
      <EducationalQuestsComponent />
    );
  };
  const renderSORSection = () => {
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
                  
                  {generateSORTests().map((test: any) => (
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
  
  const renderIELTSSection = () => {
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
// Конец renderIELTSSection
                onClick={() => setSelectedIeltsSection('speaking')}
              >
                Speaking
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }; // <-- Вот эта строка была пропущена
  
// Теперь можно начинать новую функцию
const renderMultiplayerSection = () => {
    return (
      <div className="space-y-6">
        {/* Остальной код multiplayer section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Solo Game */}
          <Card className="overflow-hidden border-blue-200">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-blue-900">Битва знаний 1 на 1</h3>
                <Trophy size={24} className="text-blue-600" />
              </div>
              <p className="text-sm text-blue-700 mt-1">Соревнуйтесь один на один с AI-соперником</p>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Особенности</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Адаптивная сложность вопросов
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Счет ведется по времени и точности
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Возможность выбора предмета и темы
                    </li>
                  </ul>
                </div>
                
                <Button
                  variant="primary"
                  fullWidth
                  as={Link}
                  to="/testing/quests"
                  leftIcon={<Zap size={18} />}
                >
                  Начать игру
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Multiplayer Game */}
          <Card className="overflow-hidden border-purple-200 md:col-span-2">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-b border-purple-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-purple-900">Мультиплеер (до 5 игроков)</h3>
                <UsersRound size={24} className="text-purple-600" />
              </div>
              <p className="text-sm text-purple-700 mt-1">Соревнуйтесь с друзьями в реальном времени</p>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="text-sm font-medium text-purple-900 mb-2">Как играть</h4>
                    <ul className="space-y-2 text-sm text-purple-800">
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">1.</span>
                        Создайте игру и выберите предмет
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">2.</span>
                        Пригласите друзей по коду или ссылке
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">3.</span>
                        Отвечайте на вопросы быстрее соперников
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">4.</span>
                        Наблюдайте за рейтингом в реальном времени
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="primary"
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                      onClick={handleCreateMultiplayerGame}
                      leftIcon={<Zap size={18} />}
                    >
                      Создать игру
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowJoinForm(true)}
                    >
                      Присоединиться
                    </Button>
                  </div>
                </div>
                
                {showJoinForm ? (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Присоединиться к игре</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Код игры
                        </label>
                        <Input
                          placeholder="Введите код игры"
                          fullWidth
                          value={joinCode}
                          onChange={(e) => setJoinCode(e.target.value)}
                        />
                      </div>
                      
                      <div className="pt-2">
                        <Button
                          variant="primary"
                          fullWidth
                          disabled={!joinCode.trim()}
                        >
                          Присоединиться
                        </Button>
                      </div>
                      
                      <div className="text-center">
                        <button 
                          className="text-sm text-gray-500 hover:text-gray-700"
                          onClick={() => setShowJoinForm(false)}
                        >
                          Отмена
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-purple-50 rounded-lg flex flex-col items-center justify-center">
                    <div className="relative w-full aspect-video rounded-md overflow-hidden bg-purple-200 flex items-center justify-center">
                      <img 
                        src="https://www.quizizz.com/static/images/banner/home1.webp" 
                        alt="Multiplayer Quiz" 
                        className="w-full h-full object-cover opacity-30"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                        <Trophy size={40} className="text-purple-600 mb-2" />
                        <h3 className="text-xl font-bold text-purple-900 mb-1">Стань чемпионом!</h3>
                        <p className="text-sm text-purple-800">Соревнуйся с друзьями и побеждай</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-x-2 flex items-center">
                      <Award size={18} className="text-purple-600" />
                      <span className="text-sm font-medium text-purple-900">
                        Зарабатывайте больше баллов за правильные ответы!
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };
  
  // Modal for multiplayer game creation
  const renderGameCreationModal = () => {
    if (!showMultiplayerModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-lg w-full overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Создание мультиплеер игры</h3>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setShowMultiplayerModal(false)}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Предмет
                </label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {subjects.filter(s => s.id !== 'all').map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Уровень сложности
                </label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="easy">Легкий</option>
                  <option value="medium">Средний</option>
                  <option value="hard">Сложный</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Количество игроков (максимум)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min={2}
                    max={5}
                    value={maxPlayers}
                    onChange={(e) => setMaxPlayers(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="font-medium text-gray-900">{maxPlayers}</span>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-900">Код для присоединения</h4>
                  <button 
                    className="text-blue-600 hover:text-blue-800 text-sm"
                    onClick={handleCopyLink}
                  >
                    Скопировать
                  </button>
                </div>
                <div className="bg-white p-3 rounded border border-gray-300 text-center">
                  <span className="font-mono font-medium text-gray-900">{joinCode}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Поделитесь этим кодом с друзьями, чтобы они могли присоединиться к игре
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowMultiplayerModal(false)}
              >
                Отмена
              </Button>
              <Button
                variant="primary"
                as={Link}
                to={`/testing/multiplayer/${joinCode}`}
              >
                Начать игру
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Тестирование</h1>
          <p className="text-gray-500 mt-1">Пробные тесты, оценки и образовательные игры</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeTab === 'ent' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('ent')}
            leftIcon={<GraduationCap size={16} />}
          >
            Тесты ЕНТ
          </Button>
          <Button
            variant={activeTab === 'school' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('school')}
            leftIcon={<FileText size={16} />}
          >
            Школьные тесты
          </Button>
          <Button
            variant={activeTab === 'sor' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('sor')}
            leftIcon={<CheckCircle2 size={16} />}
          >
            СОР/СОЧ
          </Button>
          <Button
            variant={activeTab === 'ielts' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('ielts')}
            leftIcon={<Languages size={16} />}
          >
            IELTS
          </Button>
          <Button
            variant={activeTab === 'quests' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('quests')}
            leftIcon={<Gamepad2 size={16} />}
          >
            Учебные битвы
          </Button>
          <Button
            variant={activeTab === 'multiplayer' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('multiplayer')}
            leftIcon={<UsersRound size={16} />}
          >
            Мультиплеер
          </Button>
        </div>
      </div>
      
      {activeTab === 'ent' && renderENTSection()}
      {activeTab === 'school' && renderSchoolSection()}
      {activeTab === 'sor' && renderSORSection()}
      {activeTab === 'ielts' && renderIELTSSection()}
      {activeTab === 'quests' && renderQuestsSection()}
      {activeTab === 'multiplayer' && renderMultiplayerSection()}
      
      {showMultiplayerModal && renderGameCreationModal()}
      
      {activeTab !== 'quests' && activeTab !== 'multiplayer' && (
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <Trophy size={24} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-indigo-900">Попробуйте новый формат тестирования!</h3>
              <p className="text-indigo-700 mt-1">
                Теперь вы можете проверить свои знания в формате увлекательных битв с виртуальными соперниками. 
                Сразитесь в математических дуэлях и покажите, кто лучше знает предмет!
              </p>
              <Button
                variant="primary"
                className="mt-3 bg-indigo-600 hover:bg-indigo-700"
                onClick={() => setActiveTab('quests')}
                leftIcon={<Zap size={18} />}
              >
                Перейти к учебным битвам
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestingPage;