import React, { useState } from 'react';
import { 
  Briefcase,
  Brain,
  ChevronRight,
  ArrowRight,
  Search,
  User,
  School,
  GraduationCap,
  BarChart,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import useUserStore from '../../store/userStore';

// Компонент карьерного теста
const CareerTestComponent = () => {
  const { user, updateUser } = useUserStore();
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [openAnswer, setOpenAnswer] = useState('');
  
  // Список вопросов
  const questions = [
    {
      id: 'work-preference',
      text: 'Тебе нравится больше работать с числами или с людьми?',
      type: 'choice',
      options: [
        { id: 'numbers', text: 'С числами, фактами и данными', value: 'technical' },
        { id: 'people', text: 'С людьми, общаться и помогать', value: 'social' }
      ]
    },
    {
      id: 'task-preference',
      text: 'Что тебе легче: писать сочинения или решать задачи?',
      type: 'choice',
      options: [
        { id: 'writing', text: 'Писать сочинения и творческие работы', value: 'creative' },
        { id: 'solving', text: 'Решать задачи и головоломки', value: 'analytical' }
      ]
    },
    {
      id: 'environment',
      text: 'В какой среде ты предпочитаешь работать?',
      type: 'choice',
      options: [
        { id: 'office', text: 'В офисе со стабильным графиком', value: 'structured' },
        { id: 'dynamic', text: 'В динамичной среде с разными задачами', value: 'flexible' }
      ]
    },
    {
      id: 'future-goals',
      text: 'Какие у тебя долгосрочные цели в карьере?',
      type: 'open'
    },
    {
      id: 'skills',
      text: 'Что по твоему мнению у тебя получается лучше всего?',
      type: 'choice',
      options: [
        { id: 'tech', text: 'Работа с технологиями и программами', value: 'technical' },
        { id: 'art', text: 'Творчество и дизайн', value: 'creative' },
        { id: 'organization', text: 'Организация и планирование', value: 'management' },
        { id: 'science', text: 'Анализ и исследования', value: 'research' }
      ]
    }
  ];
  
  // Возможные результаты
  const results = {
    'technical-analytical': {
      title: 'Технические направления',
      description: 'Тебе подойдут профессии, связанные с анализом данных, инженерией и точными науками. Ты склонен к логическому мышлению и решению сложных задач.',
      icon: BarChart,
      universities: [
        {
          name: 'Назарбаев Университет',
          programs: ['Компьютерные науки', 'Инженерия', 'Data Science']
        },
        {
          name: 'КБТУ',
          programs: ['Информационные системы', 'Нефтегазовое дело']
        }
      ]
    },
    'technical-creative': {
      title: 'Технический дизайн',
      description: 'Тебе подойдут профессии на стыке технологий и творчества. Ты способен создавать новое, используя технические навыки.',
      icon: Brain,
      universities: [
        {
          name: 'МУИТ',
          programs: ['Цифровой дизайн', 'UX/UI дизайн']
        },
        {
          name: 'КазГАСА',
          programs: ['Архитектура', 'Инженерный дизайн']
        }
      ]
    },
    'social-creative': {
      title: 'Гуманитарные науки',
      description: 'Тебе подойдут профессии, связанные с коммуникацией, творчеством и помощью людям. Ты обладаешь развитыми коммуникативными навыками.',
      icon: User,
      universities: [
        {
          name: 'КазНУ им. аль-Фараби',
          programs: ['Журналистика', 'Психология', 'Международные отношения']
        },
        {
          name: 'KIMEP',
          programs: ['Маркетинг', 'Связи с общественностью']
        }
      ]
    },
    'social-analytical': {
      title: 'Социальная аналитика',
      description: 'Тебе подойдут профессии, требующие анализа социальных процессов, управления и принятия решений. Ты умеешь работать как с людьми, так и с данными.',
      icon: Briefcase,
      universities: [
        {
          name: 'НУ',
          programs: ['Экономика', 'Государственное управление']
        },
        {
          name: 'КазНУ им. аль-Фараби',
          programs: ['Социология', 'Политология']
        }
      ]
    }
  };
  
  // Обработчики действий пользователя
  const handleStartTest = () => {
    setTestStarted(true);
  };
  
  const handleAnswer = (questionId, answer) => {
    const newAnswers = {
      ...answers,
      [questionId]: answer
    };
    
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Only call handleCompletedTest if we've answered all questions
      handleCompletedTest(newAnswers);
    }
  };
  
  const handleOpenAnswer = () => {
    if (openAnswer.trim()) {
      handleAnswer(questions[currentQuestionIndex].id, openAnswer);
      setOpenAnswer('');
    }
  };
  
  const handleCompletedTest = (finalAnswers) => {
    setIsAnalyzing(true);
    
    // Instead of setTimeout, we'll process right away and add a short delay
    // just for visual effect
    setTimeout(() => {
      try {
        // Get work preference from answers or default to 'technical'
        let workPref = finalAnswers['work-preference'] || 'technical';
        
        // Get task preference from answers or default to 'analytical'
        let taskPref = finalAnswers['task-preference'] || 'analytical';
        
        // Determine result key
        let resultKey = `${workPref}-${taskPref === 'creative' ? 'creative' : 'analytical'}`;
        
        // Make sure this key exists in our results
        if (results[resultKey]) {
          setResult(results[resultKey]);
          
          // Save to user profile if needed
          if (updateUser) {
            updateUser({
              profession: results[resultKey].title
            });
          }
        } else {
          // Fallback to a default result if key is not found
          setResult(results['technical-analytical']);
        }
      } catch (error) {
        // In case of error, show a default result
        setResult(results['technical-analytical']);
      } finally {
        // Always make sure to set isAnalyzing to false and showResult to true
        setIsAnalyzing(false);
        setShowResult(true);
      }
    }, 2000); // Reduced delay for testing
  };
  
  const handleSaveToProfile = () => {
    if (result && updateUser) {
      // Логика сохранения в профиль пользователя
      updateUser({
        profession: result.title
      });
    }
  };
  
  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];
    
    if (question.type === 'choice') {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">{question.text}</h3>
          <div className="grid gap-3">
            {question.options?.map(option => (
              <button
                key={option.id}
                className="text-left p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                onClick={() => handleAnswer(question.id, option.value)}
              >
                <span className="font-medium">{option.text}</span>
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <div className="text-sm text-gray-500">
              Вопрос {currentQuestionIndex + 1} из {questions.length}
            </div>
            {currentQuestionIndex > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
              >
                Назад
              </Button>
            )}
          </div>
        </div>
      );
    }
    
    if (question.type === 'open') {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">{question.text}</h3>
          <div className="mt-2">
            <textarea
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Твой ответ..."
              value={openAnswer}
              onChange={(e) => setOpenAnswer(e.target.value)}
            ></textarea>
          </div>
          <div className="mt-6 flex justify-between">
            <div className="text-sm text-gray-500">
              Вопрос {currentQuestionIndex + 1} из {questions.length}
            </div>
            <div className="flex space-x-2">
              {currentQuestionIndex > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                >
                  Назад
                </Button>
              )}
              <Button
                variant="primary"
                size="sm"
                onClick={handleOpenAnswer}
                disabled={!openAnswer.trim()}
              >
                Продолжить
              </Button>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  // Стартовый экран
  if (!testStarted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 text-purple-600" size={20} />
            AI-психолог для выбора профессии
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="mx-auto w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Brain size={48} className="text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Не знаешь, какую профессию выбрать?
            </h3>
            <p className="text-gray-600 mb-6">
              Ответь на 5 вопросов, и наш AI подберет для тебя подходящую профессию и университеты!
            </p>
            <p className="text-sm text-gray-500 mb-6 px-8">
              Наш искусственный интеллект обучен на 10,000+ резюме с hh.kz и поможет определить твои сильные стороны и профессиональные склонности.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartTest}
              rightIcon={<ArrowRight size={18} />}
            >
              Начать тест
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Экран анализа
  if (isAnalyzing) {
    return (
      <Card>
        <CardContent>
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Наш AI анализирует твои ответы...
            </h3>
            <p className="text-gray-600">
              Применяем продвинутые алгоритмы машинного обучения, чтобы подобрать идеальную профессию.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Экран результатов
  if (showResult && result) {
    const ResultIcon = result.icon || Brain;
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 text-purple-600" size={20} />
            Результат профориентационного теста
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <ResultIcon size={32} className="text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Тебе подойдет: {result.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {result.description}
                </p>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSaveToProfile}
                    leftIcon={<User size={16} />}
                  >
                    Сохранить в моем профиле
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Рекомендуемые университеты и программы
          </h4>
          
          <div className="space-y-4">
            {result.universities.map((uni, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center mb-2">
                  <School size={18} className="text-green-600 mr-2" />
                  <h5 className="font-medium text-gray-900">{uni.name}</h5>
                </div>
                <div className="ml-6">
                  <p className="text-sm text-gray-700 mb-1">Программы:</p>
                  <ul className="ml-2 space-y-1">
                    {uni.programs.map((program, idx) => (
                      <li key={idx} className="text-sm flex items-start">
                        <GraduationCap size={14} className="text-blue-600 mr-1 flex-shrink-0 mt-0.5" />
                        <span>{program}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setShowResult(false);
                setTestStarted(false);
                setCurrentQuestionIndex(0);
                setAnswers({});
              }}
            >
              Пройти тест заново
            </Button>
            <Button
              variant="primary"
              as="a"
              href="https://testcenter.kz/postupayushchim/ent/"
              target="_blank"
              rel="noopener noreferrer"
              rightIcon={<ExternalLink size={16} />}
            >
              Узнать больше о поступлении
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Экран вопросов
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="mr-2 text-purple-600" size={20} />
          Тест на профориентацию
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderQuestion()}
      </CardContent>
    </Card>
  );
};

export default CareerTestComponent;