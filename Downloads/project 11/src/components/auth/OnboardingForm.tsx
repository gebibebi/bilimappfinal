import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, GraduationCap, BookOpen } from 'lucide-react';
import Button from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import useUserStore from '../../store/userStore';
import { setPageTitle } from '../../lib/utils';

// Тип для шагов onboarding процесса
type Step = 'goal' | 'subjects' | 'schedule' | 'complete';

// Интерфейс для целей обучения
interface Goal {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Интерфейс для предметов
interface Subject {
  id: string;
  name: string;
  selected: boolean;
}

// Интерфейс для расписания на день
interface DaySchedule {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

const OnboardingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('goal'); // Текущий шаг
  const [selectedGoal, setSelectedGoal] = useState<string>(''); // Выбранная цель
  const [subjects, setSubjects] = useState<Subject[]>([]); // Список предметов
  const [schedule, setSchedule] = useState<DaySchedule[]>([]); // Расписание
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
  
  const navigate = useNavigate();
  const { user, completeOnboarding } = useUserStore();
  
  useEffect(() => {
    setPageTitle('Onboarding'); // Установка заголовка страницы
    
    // Инициализация предметов
    setSubjects([
      { id: '1', name: 'Математика', selected: false },
      { id: '2', name: 'Физика', selected: false },
      { id: '3', name: 'Химия', selected: false },
      { id: '4', name: 'Биология', selected: false },
      { id: '5', name: 'География', selected: false },
      { id: '6', name: 'Информатика', selected: false },
      { id: '7', name: 'Всемирная история', selected: false },
      { id: '8', name: 'Иностранный язык', selected: false },
    ]);
    
    // Инициализация расписания
    setSchedule([
      { day: 'Понедельник', enabled: true, startTime: '16:00', endTime: '18:00' },
      { day: 'Вторник', enabled: true, startTime: '16:00', endTime: '18:00' },
      { day: 'Среда', enabled: true, startTime: '16:00', endTime: '18:00' },
      { day: 'Четверг', enabled: true, startTime: '16:00', endTime: '18:00' },
      { day: 'Пятница', enabled: true, startTime: '16:00', endTime: '18:00' },
      { day: 'Суббота', enabled: false, startTime: '10:00', endTime: '12:00' },
      { day: 'Воскресенье', enabled: false, startTime: '10:00', endTime: '12:00' },
    ]);
  }, []);
  
  // Список целей обучения
  const goals: Goal[] = [
    {
      id: 'ent',
      title: 'Подготовка к ЕНТ',
      description: 'Подготовка к Единому Национальному Тестированию',
      icon: <GraduationCap size={24} />,
    },
    {
      id: 'school',
      title: 'Успеваемость в школе',
      description: 'Улучшение оценок и академической успеваемости',
      icon: <BookOpen size={24} />,
    },
    {
      id: 'olympiad',
      title: 'Подготовка к олимпиадам',
      description: 'Подготовка к академическим соревнованиям',
      icon: <Target size={24} />,
    },
  ];
  
  // Обработчик выбора цели
  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
  };
  
  // Переключение выбора предмета
  const handleSubjectToggle = (subjectId: string) => {
    setSubjects(subjects.map(subject => 
      subject.id === subjectId 
        ? { ...subject, selected: !subject.selected }
        : subject
    ));
  };
  
  // Переключение дня в расписании
  const handleDayToggle = (day: string) => {
    setSchedule(schedule.map(item => 
      item.day === day 
        ? { ...item, enabled: !item.enabled }
        : item
    ));
  };
  
  // Изменение времени в расписании
  const handleTimeChange = (day: string, field: 'startTime' | 'endTime', value: string) => {
    setSchedule(schedule.map(item => 
      item.day === day 
        ? { ...item, [field]: value }
        : item
    ));
  };
  
  // Переход к следующему шагу
  const handleNextStep = () => {
    if (currentStep === 'goal') {
      setCurrentStep('subjects');
    } else if (currentStep === 'subjects') {
      setCurrentStep('schedule');
    } else if (currentStep === 'schedule') {
      setCurrentStep('complete');
      
      // Имитация загрузки
      setIsLoading(true);
      setTimeout(() => {
        const selectedSubjects = subjects.filter(s => s.selected).map(s => s.name);
        completeOnboarding(selectedGoal, selectedSubjects);
        setIsLoading(false);
        navigate('/home');
      }, 1500);
    }
  };
  
  // Возврат к предыдущему шагу
  const handlePrevStep = () => {
    if (currentStep === 'subjects') {
      setCurrentStep('goal');
    } else if (currentStep === 'schedule') {
      setCurrentStep('subjects');
    }
  };
  
  // Проверка возможности перехода к следующему шагу
  const canProceed = (): boolean => {
    if (currentStep === 'goal') {
      return !!selectedGoal;
    } else if (currentStep === 'subjects') {
      return subjects.filter(s => s.selected).length === 2;
    } else if (currentStep === 'schedule') {
      return schedule.some(s => s.enabled);
    }
    return true;
  };
  
  // Получение контента для текущего шага
  const getStepContent = () => {
    switch (currentStep) {
      case 'goal':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">
              Какова ваша основная учебная цель?
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {goals.map((goal) => (
                <div 
                  key={goal.id}
                  className={`cursor-pointer rounded-lg border-2 p-6 transition-all ${
                    selectedGoal === goal.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleGoalSelect(goal.id)}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    {goal.icon}
                  </div>
                  <h4 className="mt-4 font-medium text-gray-900">{goal.title}</h4>
                  <p className="mt-1 text-sm text-gray-500">{goal.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'subjects':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Выберите два профильных предмета
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {selectedGoal === 'ent' 
                  ? 'Это будут ваши специализированные предметы для ЕНТ' 
                  : 'Это будут предметы для углубленного изучения'}
              </p>
            </div>
            
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-all ${
                    subject.selected 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleSubjectToggle(subject.id)}
                >
                  <span className="font-medium text-gray-900">{subject.name}</span>
                  <div 
                    className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                      subject.selected 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300'
                    }`}
                  >
                    {subject.selected && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-2 text-center">
              <p className="text-sm font-medium text-gray-700">
                Выбрано: {subjects.filter(s => s.selected).length}/2
              </p>
            </div>
          </div>
        );
        
      case 'schedule':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Установите свое учебное расписание
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Выберите дни и время, когда вы можете заниматься
              </p>
            </div>
            
            <div className="space-y-4">
              {schedule.map((day) => (
                <div 
                  key={day.day}
                  className={`rounded-lg border p-4 transition-all ${
                    day.enabled 
                      ? 'border-blue-200 bg-blue-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{day.day}</span>
                    <div className="relative inline-block w-12 h-6 cursor-pointer">
                      <input
                        type="checkbox"
                        id={`toggle-${day.day}`}
                        className="sr-only"
                        checked={day.enabled}
                        onChange={() => handleDayToggle(day.day)}
                      />
                      <div
                        className={`block w-12 h-6 rounded-full transition-colors ${
                          day.enabled ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      />
                      <div
                        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                          day.enabled ? 'transform translate-x-6' : ''
                        }`}
                      />
                    </div>
                  </div>
                  
                  {day.enabled && (
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700">
                          Время начала
                        </label>
                        <input
                          type="time"
                          value={day.startTime}
                          onChange={(e) => handleTimeChange(day.day, 'startTime', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700">
                          Время окончания
                        </label>
                        <input
                          type="time"
                          value={day.endTime}
                          onChange={(e) => handleTimeChange(day.day, 'endTime', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'complete':
        return (
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900">
              Ваш персональный учебный план готов!
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Мы создали индивидуальный учебный план на основе ваших предпочтений.
            </p>
            <div className="mt-6">
              <Button
                variant="primary"
                size="lg"
                isLoading={isLoading}
                onClick={() => navigate('/home')}
                fullWidth
              >
                Начать обучение
              </Button>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
            <BookOpen size={24} />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Давайте персонализируем ваш опыт
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Помогите нам адаптировать BilimApp под ваши нужды
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <Card>
          <CardContent className="p-8">
            {/* Индикатор шагов */}
            {currentStep !== 'complete' && (
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {['goal', 'subjects', 'schedule'].map((step, index) => (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center">
                        <div 
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            step === currentStep 
                              ? 'bg-blue-600 text-white' 
                              : index < ['goal', 'subjects', 'schedule'].indexOf(currentStep) 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span className="mt-1 text-xs">{step.charAt(0).toUpperCase() + step.slice(1)}</span>
                      </div>
                      
                      {index < 2 && (
                        <div 
                          className={`h-0.5 w-full ${
                            index < ['goal', 'subjects'].indexOf(currentStep) 
                              ? 'bg-blue-600' 
                              : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
            
            {/* Контент шага */}
            {getStepContent()}
            
            {/* Кнопки навигации */}
            {currentStep !== 'complete' && (
              <div className={`mt-8 flex ${currentStep === 'goal' ? 'justify-end' : 'justify-between'}`}>
                {currentStep !== 'goal' && (
                  <Button 
                    variant="outline"
                    onClick={handlePrevStep}
                  >
                    Назад
                  </Button>
                )}
                
                <Button
                  variant="primary"
                  disabled={!canProceed()}
                  onClick={handleNextStep}
                >
                  {currentStep === 'schedule' ? 'Создать план' : 'Продолжить'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingForm;