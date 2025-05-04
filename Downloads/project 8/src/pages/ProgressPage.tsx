import React, { useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import useProgressStore from '../store/progressStore';
import useUserStore from '../store/userStore';
import { setPageTitle } from '../lib/utils';
import { TrendingUp, ChevronUp, Award, School, AlertTriangle } from 'lucide-react';

const ProgressPage: React.FC = () => {
  const stats = useProgressStore(state => state.stats);
  const user = useUserStore(state => state.user);
  
  useEffect(() => {
    setPageTitle('Мой прогресс');
  }, []);
  
  // Данные для графика часов обучения
  const weeklyStudyData = [
    { day: 'Пн', hours: 2.5 },
    { day: 'Вт', hours: 1.8 },
    { day: 'Ср', hours: 3.0 },
    { day: 'Чт', hours: 2.0 },
    { day: 'Пт', hours: 1.5 },
    { day: 'Сб', hours: 0.5 },
    { day: 'Вс', hours: 0.7 },
  ];
  
  // Данные для распределения по предметам
  const subjectDistributionData = [
    { name: 'Математика', value: 28 },
    { name: 'Физика', value: 22 },
    { name: 'История', value: 18 },
    { name: 'Литература', value: 12 },
    { name: 'Химия', value: 20 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  // Данные для результатов тестов
  const testScoreData = [
    { month: 'Янв', score: 72 },
    { month: 'Фев', score: 78 },
    { month: 'Мар', score: 81 },
    { month: 'Апр', score: 79 },
    { month: 'Май', score: 86 },
  ];
  
  // Данные для месячной динамики баллов за 4 месяца
  const monthlyScoreData = [
    { month: 'Февраль', score: 84, points: 84 },
    { month: 'Март', score: 88, points: 88 },
    { month: 'Апрель', score: 92, points: 92 },
    { month: 'Май', score: 99, points: 99 },
  ];

  // Данные для динамики по предметам
  const subjectProgressData = [
    { name: 'Февраль', Математика: 85, Физика: 72, Информатика: 90, История: 68 },
    { name: 'Март', Математика: 88, Физика: 76, Информатика: 92, История: 70 },
    { name: 'Апрель', Математика: 90, Физика: 79, Информатика: 94, История: 74 },
    { name: 'Май', Математика: 95, Физика: 82, Информатика: 98, История: 77 },
  ];

  // Получаем последний балл и предыдущий для расчета прогресса
  const currentScore = monthlyScoreData[monthlyScoreData.length - 1].score;
  const previousScore = monthlyScoreData[monthlyScoreData.length - 2].score;
  const scoreProgress = currentScore - previousScore;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Мой прогресс</h1>
        <p className="text-gray-500 mt-1">Отслеживайте ваше обучение и шансы поступления</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-lg font-medium text-gray-500">Часы обучения</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.weeklyStudyHours}</p>
              <p className="text-sm text-gray-500 mt-1">На этой неделе</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-lg font-medium text-gray-500">Пройденные темы</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completedTopics}</p>
              <p className="text-sm text-gray-500 mt-1">Всего</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-lg font-medium text-gray-500">Домашние задания</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completedHomeworks}</p>
              <p className="text-sm text-gray-500 mt-1">Выполнено</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <h3 className="text-lg font-medium text-gray-500">Результаты тестов</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.averageTestScore}%</p>
              <p className="text-sm text-gray-500 mt-1">Средний балл</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Новый блок - Средний балл за последние 4 месяца */}
      <Card>
        <CardHeader>
          <CardTitle>Средний балл за последние 4 месяца</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-700">Текущий средний балл</h3>
                <div className="flex items-center space-x-1 text-emerald-600 font-semibold">
                  <ChevronUp size={16} />
                  <span>+{scoreProgress}</span>
                </div>
              </div>
              <div className="flex items-end space-x-2">
                <p className="text-4xl font-bold text-gray-900">{currentScore}</p>
                <p className="text-xl font-medium text-gray-500 mb-1">/140</p>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-gray-500">Прогресс к цели (120 баллов)</p>
                  <p className="text-sm font-medium">{Math.round(currentScore / 120 * 100)}%</p>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.min(100, currentScore / 120 * 100)}%` }} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-600">
                <TrendingUp size={16} className="text-blue-600 mr-2" />
                <span>Выше, чем у 82% абитуриентов по Казахстану</span>
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-medium text-gray-700 mb-4">Динамика роста</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyScoreData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[75, 100]} />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="points" 
                      stroke="#3B82F6" 
                      fill="#93C5FD"
                      fillOpacity={0.6} 
                      name="Баллы"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Динамика роста по предметам */}
      <Card>
        <CardHeader>
          <CardTitle>Динамика по предметам</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={subjectProgressData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Математика" stroke="#0088FE" strokeWidth={2} />
                <Line type="monotone" dataKey="Физика" stroke="#00C49F" strokeWidth={2} />
                <Line type="monotone" dataKey="Информатика" stroke="#FFBB28" strokeWidth={2} />
                <Line type="monotone" dataKey="История" stroke="#FF8042" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Новый блок - Шансы поступления */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <School className="mr-2 text-blue-600" size={20} />
            Шансы поступления
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="bg-white p-6 rounded-lg border border-blue-200 shadow-sm">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Award size={24} className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Кибербезопасность в AITU</h3>
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-gray-500">Шанс поступления на грант</p>
                        <p className="text-sm font-bold text-emerald-600">87%</p>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: '87%' }} />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Проходной балл 2024 года:</span> 89
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Ваш прогнозируемый балл:</span> <span className="text-emerald-600 font-medium">91</span>
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Оценка по предметам</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Математика</span>
                      <span className="text-sm font-medium text-gray-900">95/100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Физика</span>
                      <span className="text-sm font-medium text-gray-900">82/100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Информатика</span>
                      <span className="text-sm font-medium text-gray-900">98/100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">История Казахстана</span>
                      <span className="text-sm font-medium text-gray-900">77/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col h-full">
                <div className="bg-white p-6 rounded-lg border border-blue-200 shadow-sm mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <School size={24} className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Computer Science в Nazarbayev University</h3>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm text-gray-500">Шанс поступления на грант</p>
                          <p className="text-sm font-bold text-amber-600">62%</p>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '62%' }} />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Проходной балл 2024 года:</span> 97
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Ваш прогнозируемый балл:</span> <span className="text-amber-600 font-medium">91</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 mt-auto">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <AlertTriangle size={24} className="text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Рекомендации для повышения шансов</h3>
                      <ul className="mt-2 space-y-1 text-sm text-gray-600">
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          Улучшите результаты по физике (нужно 85+ баллов)
                        </li>
                        <li className="flex items-start">
                          <span className="text-amber-500 mr-2">•</span>
                          Поддерживайте высокие баллы по информатике
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          Обязательно сдайте английский (минимум B2)
                        </li>
                      </ul>
                      <Button
                        variant="outline"
                        className="mt-3 text-amber-600 border-amber-300 hover:bg-amber-50"
                        size="sm"
                      >
                        Подробный план подготовки
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Результаты по предметам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyStudyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Распределение по предметам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {subjectDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Прогресс по учебникам</h2>
        <div className="space-y-4">
          {stats.bookProgress.map((book) => (
            <div key={book.bookId} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{book.title}</h3>
                <span className="text-sm font-medium text-gray-700">{book.progress}%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full" 
                  style={{ width: `${book.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;