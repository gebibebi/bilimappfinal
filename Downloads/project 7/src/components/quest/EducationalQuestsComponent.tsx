import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Users, 
  Clock, 
  Star, 
  Award, 
  Zap, 
  Smile, 
  Heart,
  XCircle,
  CheckCircle,
  HelpCircle,
  BookOpen,
  GraduationCap,
  FileText,
  Brain
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Button from '../ui/Button';
import useUserStore from '../../store/userStore';

// Mock opponents for fake online mode
const MOCK_OPPONENTS = [
  { id: 1, name: 'Алия', avatar: '👧', level: 5, score: 0, grade: 9 },
  { id: 2, name: 'Арман', avatar: '👦', level: 6, score: 0, grade: 10 },
  { id: 3, name: 'Дамир', avatar: '👨', level: 4, score: 0, grade: 8 },
  { id: 4, name: 'Жанна', avatar: '👩', level: 7, score: 0, grade: 11 }
];

// Define subject categories
const SUBJECTS = [
  { id: 'math', name: 'Математика', icon: Brain, color: 'text-blue-600 bg-blue-100' },
  { id: 'physics', name: 'Физика', icon: Zap, color: 'text-purple-600 bg-purple-100' },
  { id: 'biology', name: 'Биология', icon: Heart, color: 'text-red-600 bg-red-100' },
  { id: 'history', name: 'История', icon: BookOpen, color: 'text-amber-600 bg-amber-100' },
  { id: 'kazakh', name: 'Казахский язык', icon: FileText, color: 'text-green-600 bg-green-100' },
  { id: 'russian', name: 'Русский язык', icon: FileText, color: 'text-indigo-600 bg-indigo-100' }
];

// Define ENT categories
const ENT_SUBJECTS = [
  { id: 'history_kz', name: 'История Казахстана', icon: BookOpen, color: 'text-amber-600 bg-amber-100' },
  { id: 'reading', name: 'Грамотность чтения', icon: FileText, color: 'text-indigo-600 bg-indigo-100' },
  { id: 'math_literacy', name: 'Математическая грамотность', icon: Brain, color: 'text-blue-600 bg-blue-100' }
];

// Mock questions database by subject and grade level
const getQuestions = (subject, grade, isENT = false) => {
  // ENT questions are fixed difficulty regardless of grade
  if (isENT) {
    switch (subject) {
      case 'history_kz':
        return [
          { 
            id: 1, 
            question: 'В каком году была принята Декларация о государственном суверенитете Казахской ССР?',
            options: ['1989', '1990', '1991', '1992'],
            correctAnswer: '1990',
            explanation: 'Декларация о государственном суверенитете Казахской ССР была принята 25 октября 1990 года.'
          },
          { 
            id: 2, 
            question: 'Какое событие произошло 16 декабря 1991 года?',
            options: [
              'Принятие первой Конституции РК',
              'Принятие Закона о государственной независимости РК',
              'Создание СНГ',
              'Образование Алашской автономии'
            ],
            correctAnswer: 'Принятие Закона о государственной независимости РК',
            explanation: '16 декабря 1991 года был принят Конституционный закон «О государственной независимости Республики Казахстан».'
          },
          { 
            id: 3, 
            question: 'Кто был первым президентом Республики Казахстан?',
            options: ['Н. Назарбаев', 'К. Токаев', 'Д. Кунаев', 'Н. Абдильдин'],
            correctAnswer: 'Н. Назарбаев',
            explanation: 'Нурсултан Назарбаев был избран первым Президентом Республики Казахстан 1 декабря 1991 года.'
          },
          { 
            id: 4, 
            question: 'Когда была принята первая Конституция независимого Казахстана?',
            options: ['16 декабря 1991 года', '2 марта 1992 года', '28 января 1993 года', '30 августа 1995 года'],
            correctAnswer: '28 января 1993 года',
            explanation: 'Первая Конституция независимого Казахстана была принята 28 января 1993 года. Действующая Конституция РК была принята 30 августа 1995 года.'
          },
          { 
            id: 5, 
            question: 'Какая культура бронзового века была распространена на территории Казахстана?',
            options: ['Кельтеминарская', 'Андроновская', 'Скифская', 'Монгольская'],
            correctAnswer: 'Андроновская',
            explanation: 'Андроновская культура была распространена в эпоху бронзы на территории Казахстана (II тыс. до н.э.).'
          }
        ];
      case 'reading':
        return [
          { 
            id: 1, 
            question: 'Выберите верное утверждение на основе текста:\n\nИскусственный интеллект (ИИ) – это технология, которая позволяет компьютерам учиться на основе опыта, адаптироваться к новым данным и выполнять задачи, которые традиционно требовали человеческого интеллекта.',
            options: [
              'ИИ не способен к обучению',
              'ИИ может адаптироваться к новым данным',
              'ИИ заменяет человека во всех сферах',
              'ИИ работает только с готовыми алгоритмами'
            ],
            correctAnswer: 'ИИ может адаптироваться к новым данным',
            explanation: 'Согласно тексту, ИИ способен адаптироваться к новым данным и учиться на основе опыта.'
          },
          {
            id: 2,
            question: 'Определите основную мысль текста:\n\nЯзык – живая система, он постоянно меняется. Новые слова появляются, старые уходят из активного употребления, значения слов трансформируются. Язык отражает изменения в обществе и культуре.',
            options: [
              'Язык никогда не меняется',
              'Язык – это стабильная система',
              'Язык постоянно развивается и меняется',
              'Язык не связан с обществом'
            ],
            correctAnswer: 'Язык постоянно развивается и меняется',
            explanation: 'Основная мысль текста заключается в том, что язык является живой системой, которая постоянно меняется и развивается, отражая изменения в обществе и культуре.'
          },
          {
            id: 3,
            question: 'Какой вывод можно сделать из текста:\n\nУченые из Швеции обнаружили, что регулярная физическая активность не только укрепляет мышцы и сердечно-сосудистую систему, но и положительно влияет на когнитивные функции мозга, особенно у людей старшего возраста.',
            options: [
              'Физическая активность полезна только для мышц',
              'Физическая активность полезна только молодым людям',
              'Физическая активность может улучшать работу мозга',
              'Шведские ученые занимаются только исследованиями мозга'
            ],
            correctAnswer: 'Физическая активность может улучшать работу мозга',
            explanation: 'Согласно тексту, ученые обнаружили, что физическая активность положительно влияет на когнитивные функции мозга, особенно у пожилых людей.'
          }
        ];
      case 'math_literacy':
        return [
          { 
            id: 1, 
            question: 'В магазине проходит акция: при покупке двух товаров третий товар (самый дешевый из трех) можно купить за полцены. Сколько нужно заплатить за три товара стоимостью 2000 тг, 3000 тг и 4000 тг?',
            options: ['8000 тг', '8500 тг', '9000 тг', '7000 тг'],
            correctAnswer: '8000 тг',
            explanation: 'Два самых дорогих товара (4000 тг + 3000 тг = 7000 тг) плюс половина стоимости самого дешевого товара (2000 тг ÷ 2 = 1000 тг). Итого: 7000 тг + 1000 тг = 8000 тг'
          },
          { 
            id: 2, 
            question: 'Автомобиль расходует 8 литров бензина на 100 км пути. Сколько литров бензина потребуется на путь длиной 250 км?',
            options: ['15 литров', '20 литров', '25 литров', '30 литров'],
            correctAnswer: '20 литров',
            explanation: 'Составляем пропорцию: 8 литров / 100 км = x литров / 250 км. Отсюда x = (8 × 250) / 100 = 20 литров.'
          },
          { 
            id: 3, 
            question: 'Вкладчик положил в банк 200 000 тенге под 10% годовых. Сколько денег будет на счету через 2 года при условии, что проценты начисляются в конце каждого года на всю сумму вклада?',
            options: ['220 000 тенге', '240 000 тенге', '242 000 тенге', '250 000 тенге'],
            correctAnswer: '242 000 тенге',
            explanation: 'После первого года: 200 000 + 200 000 × 0,1 = 220 000 тенге. После второго года: 220 000 + 220 000 × 0,1 = 242 000 тенге.'
          }
        ];
      default:
        return []; // Other ENT subjects would be defined here
    }
  }
  
  // Regular subject questions adjusted by grade
  const difficultyFactor = Math.min(1, grade / 11); // Scale difficulty up to 11th grade
  
  switch (subject) {
    case 'math':
      // For younger students (1-4 grade)
      if (grade <= 4) {
        return [
          { 
            id: 1, 
            question: 'Сколько будет 5 + 3?', 
            options: ['7', '8', '9', '10'], 
            correctAnswer: '8',
            explanation: '5 + 3 = 8'
          },
          { 
            id: 2, 
            question: 'Сколько будет 10 - 4?', 
            options: ['4', '5', '6', '7'], 
            correctAnswer: '6',
            explanation: '10 - 4 = 6'
          },
          { 
            id: 3, 
            question: 'Сколько будет 3 × 2?', 
            options: ['5', '6', '7', '8'], 
            correctAnswer: '6',
            explanation: '3 × 2 = 6'
          }
        ];
      }
      // For middle grades (5-8)
      else if (grade <= 8) {
        return [
          { 
            id: 1, 
            question: 'Найдите значение выражения: 2x + 3, если x = 5', 
            options: ['10', '12', '13', '15'], 
            correctAnswer: '13',
            explanation: '2x + 3 = 2 × 5 + 3 = 10 + 3 = 13'
          },
          { 
            id: 2, 
            question: 'Решите уравнение: 3x - 6 = 15', 
            options: ['x = 5', 'x = 7', 'x = 8', 'x = 9'], 
            correctAnswer: 'x = 7',
            explanation: '3x - 6 = 15\n3x = 21\nx = 7'
          },
          { 
            id: 3, 
            question: 'Вычислите площадь квадрата со стороной 6 см', 
            options: ['12 см²', '24 см²', '30 см²', '36 см²'], 
            correctAnswer: '36 см²',
            explanation: 'Площадь квадрата равна квадрату длины его стороны: S = a² = 6² = 36 см²'
          },
          { 
            id: 4, 
            question: 'Сколько будет 20% от 80?', 
            options: ['8', '16', '20', '24'], 
            correctAnswer: '16',
            explanation: '20% от 80 = 80 × 0,2 = 16'
          }
        ];
      } 
      // For high school (9-11)
      else {
        return [
          { 
            id: 1, 
            question: 'Решите уравнение: log₂(x + 3) = 4', 
            options: ['x = 13', 'x = 16', 'x = 19', 'x = 15'], 
            correctAnswer: 'x = 13',
            explanation: 'log₂(x + 3) = 4\n2⁴ = x + 3\n16 = x + 3\nx = 13'
          },
          { 
            id: 2, 
            question: 'Найдите производную функции f(x) = 3x² + 2x - 5', 
            options: ['f\'(x) = 3x + 2', 'f\'(x) = 6x + 2', 'f\'(x) = 6x - 5', 'f\'(x) = 3x² + 2'], 
            correctAnswer: 'f\'(x) = 6x + 2',
            explanation: 'f\'(x) = (3x²)\' + (2x)\' - (5)\' = 6x + 2 - 0 = 6x + 2'
          },
          { 
            id: 3, 
            question: 'Упростите выражение: (2x + 3)(x - 2)', 
            options: ['2x² - 4x - 6', '2x² - x - 6', '2x² + x - 6', '2x² - x + 6'], 
            correctAnswer: '2x² - x - 6',
            explanation: '(2x + 3)(x - 2) = 2x(x - 2) + 3(x - 2) = 2x² - 4x + 3x - 6 = 2x² - x - 6'
          }
        ];
      }
      
    case 'physics':
      // Physics would have different questions based on grade
      if (grade <= 6) {
        return [
          { 
            id: 1, 
            question: 'Какая единица измерения массы?', 
            options: ['Метр', 'Килограмм', 'Секунда', 'Ньютон'], 
            correctAnswer: 'Килограмм',
            explanation: 'Килограмм (кг) - это основная единица измерения массы в Международной системе единиц (СИ).'
          },
          { 
            id: 2, 
            question: 'Что измеряет термометр?', 
            options: ['Скорость', 'Температуру', 'Массу', 'Время'], 
            correctAnswer: 'Температуру',
            explanation: 'Термометр - прибор для измерения температуры.'
          }
        ];
      } else {
        return [
          { 
            id: 1, 
            question: 'Какой формулой выражается закон Ома для участка цепи?', 
            options: ['I = U/R', 'I = U/P', 'I = P/U', 'I = R/U'], 
            correctAnswer: 'I = U/R',
            explanation: 'Закон Ома: I = U/R, где I - сила тока, U - напряжение, R - сопротивление.'
          },
          { 
            id: 2, 
            question: 'Какая формула выражает потенциальную энергию тела, поднятого над землей?', 
            options: ['E = mgh', 'E = mv²/2', 'E = mc²', 'E = qU'], 
            correctAnswer: 'E = mgh',
            explanation: 'Потенциальная энергия тела, поднятого над землей: E = mgh, где m - масса, g - ускорение свободного падения, h - высота.'
          }
        ];
      }
      
    case 'history':
      // History questions
      if (grade <= 6) {
        return [
          { 
            id: 1, 
            question: 'Когда начался космический полет Юрия Гагарина?', 
            options: ['12 апреля 1961 года', '4 октября 1957 года', '20 июля 1969 года', '15 декабря 1970 года'], 
            correctAnswer: '12 апреля 1961 года',
            explanation: 'Юрий Гагарин совершил первый в мире полет человека в космос 12 апреля 1961 года.'
          }
        ];
      } else {
        return [
          { 
            id: 1, 
            question: 'В каком году произошло восстание Кенесары Касымова?', 
            options: ['1837-1847 гг.', '1822-1824 гг.', '1916-1917 гг.', '1867-1868 гг.'], 
            correctAnswer: '1837-1847 гг.',
            explanation: 'Восстание под предводительством Кенесары Касымова происходило в 1837-1847 годах.'
          },
          { 
            id: 2, 
            question: 'Кто был первым казахским ученым, ставшим членом-корреспондентом Российской Академии наук?', 
            options: ['Чокан Валиханов', 'Абай Кунанбаев', 'Ибрай Алтынсарин', 'Мухтар Ауэзов'], 
            correctAnswer: 'Чокан Валиханов',
            explanation: 'Чокан Валиханов (1835-1865) был первым казахским ученым, избранным членом-корреспондентом Российской Академии наук.'
          }
        ];
      }
    
    // Other subjects would follow the same pattern
    default:
      return [];
  }
};

// Quest Battle Component for curriculum or ENT tests
const QuestBattleComponent = ({ subject, subjectName, icon: Icon, color, grade, isENT, onComplete }) => {
  const [battleStarted, setBattleStarted] = useState(false);
  const [opponent, setOpponent] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [userWon, setUserWon] = useState(false);
  const [drawGame, setDrawGame] = useState(false);

  useEffect(() => {
    // Select a random opponent similar to user's grade
    const eligibleOpponents = MOCK_OPPONENTS.filter(op => Math.abs(op.grade - grade) <= 1);
    const randomOpponent = eligibleOpponents.length > 0 
      ? eligibleOpponents[Math.floor(Math.random() * eligibleOpponents.length)]
      : MOCK_OPPONENTS[Math.floor(Math.random() * MOCK_OPPONENTS.length)];
    
    setOpponent(randomOpponent);

    // Get questions based on subject and grade/ENT status
    setQuestions(getQuestions(subject, grade, isENT));
  }, [subject, grade, isENT]);

  useEffect(() => {
    if (battleStarted && !gameCompleted) {
      // Countdown timer
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [battleStarted, currentQuestionIndex, gameCompleted]);

  // Simulate opponent's progress
  useEffect(() => {
    if (battleStarted && opponent && !gameCompleted) {
      // Random intervals for opponent to "answer" questions
      // Adjust difficulty based on opponent's level - higher level means faster answers
      const baseSpeed = 5000; // Base speed in milliseconds
      const levelFactor = 1 - (opponent.level / 10); // Level factor (0.3 to 0.7)
      const opponentSpeed = baseSpeed * levelFactor + 2000; // 2-7 seconds between answers
      
      const opponentInterval = setInterval(() => {
        if (opponentScore < 5) {
          setOpponentScore((prev) => {
            const newScore = prev + 1;
            
            // Check if opponent won
            if (newScore >= 5) {
              setGameCompleted(true);
              setUserWon(false);
              clearInterval(opponentInterval);
            }
            
            // Check for a draw
            if (newScore === 4 && userScore === 4) {
              // Both players need one more point - chance for a draw
              const chanceOfDraw = Math.random() < 0.3; // 30% chance
              if (chanceOfDraw) {
                setGameCompleted(true);
                setDrawGame(true);
                clearInterval(opponentInterval);
              }
            }
            
            return newScore;
          });
        }
      }, opponentSpeed);

      return () => clearInterval(opponentInterval);
    }
  }, [battleStarted, opponent, opponentScore, gameCompleted, userScore]);

  const handleStartBattle = () => {
    setBattleStarted(true);
    setTimeLeft(30);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const currentQuestion = questions[currentQuestionIndex];
    
    if (answer === currentQuestion.correctAnswer) {
      // Correct answer
      setUserScore((prev) => {
        const newScore = prev + 1;
        
        // Check if user won
        if (newScore >= 5) {
          setGameCompleted(true);
          setUserWon(true);
        }
        
        return newScore;
      });
    }
    
    setShowExplanation(true);
    
    // Move to next question after a short delay
    setTimeout(() => {
      setShowExplanation(false);
      setSelectedAnswer(null);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setTimeLeft(30); // Reset timer for next question
      } else {
        // Loop back to first question
        setCurrentQuestionIndex(0);
        setTimeLeft(30);
      }
    }, 2000);
  };

  const handleTimeUp = () => {
    setShowExplanation(true);
    
    // Move to next question after showing explanation
    setTimeout(() => {
      setShowExplanation(false);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setTimeLeft(30); // Reset timer for next question
      } else {
        // Loop back to first question
        setCurrentQuestionIndex(0);
        setTimeLeft(30);
      }
    }, 2000);
  };

  const handlePlayAgain = () => {
    setUserScore(0);
    setOpponentScore(0);
    setCurrentQuestionIndex(0);
    setGameCompleted(false);
    setBattleStarted(false);
    setTimeLeft(30);
    setShowExplanation(false);
    setDrawGame(false);
    
    // Select a new random opponent
    const eligibleOpponents = MOCK_OPPONENTS.filter(op => Math.abs(op.grade - grade) <= 1);
    const randomOpponent = eligibleOpponents.length > 0 
      ? eligibleOpponents[Math.floor(Math.random() * eligibleOpponents.length)]
      : MOCK_OPPONENTS[Math.floor(Math.random() * MOCK_OPPONENTS.length)];
    
    setOpponent(randomOpponent);
  };

  if (!battleStarted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Icon className={`mr-2 ${color.split(' ')[0]}`} size={20} />
            <span>Испытание знаний: {subjectName}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className={`mx-auto w-20 h-20 ${color} rounded-full flex items-center justify-center mb-4`}>
              <Icon size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Сразись в {isENT ? 'ЕНТ' : 'учебной'} дуэли по предмету {subjectName}!
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Решай задачи быстрее, чем твой оппонент! Кто первым решит 5 задач правильно, тот и победил!
            </p>
            
            {opponent && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg inline-block">
                <p className="text-lg font-bold text-blue-800 mb-2">
                  Твой оппонент: {opponent.avatar} {opponent.name}
                </p>
                <p className="text-sm text-blue-600">
                  {opponent.grade} класс • Уровень сложности: {opponent.level}
                </p>
              </div>
            )}
            
            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                onClick={handleStartBattle}
                leftIcon={<Zap size={18} />}
              >
                Начать сражение
              </Button>
              
              <Button
                variant="outline"
                onClick={onComplete}
              >
                Выбрать другой предмет
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (gameCompleted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Icon className={`mr-2 ${color.split(' ')[0]}`} size={20} />
            <span>Результат сражения: {subjectName}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className={`mx-auto w-20 h-20 ${
              userWon ? 'bg-green-100' : (drawGame ? 'bg-amber-100' : 'bg-red-100')
            } rounded-full flex items-center justify-center mb-4`}>
              {userWon ? (
                <Trophy size={40} className="text-green-600" />
              ) : drawGame ? (
                <Award size={40} className="text-amber-600" />
              ) : (
                <XCircle size={40} className="text-red-600" />
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {userWon 
                ? 'Поздравляем с победой!' 
                : drawGame 
                  ? 'Ничья! Вы оба молодцы!' 
                  : 'В этот раз не получилось!'}
            </h3>
            <p className="text-gray-600 mb-6">
              {userWon 
                ? `Ты решил(а) 5 заданий быстрее, чем ${opponent.name}!` 
                : drawGame
                  ? `Ты и ${opponent.name} показали одинаковый результат!`
                  : `${opponent.name} оказался быстрее. Не сдавайся!`}
            </p>
            
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <p className="text-sm text-gray-500">Твой счет</p>
                <p className="text-3xl font-bold text-blue-600">{userScore}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Счет оппонента</p>
                <p className="text-3xl font-bold text-red-600">{opponentScore}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button
                variant="primary"
                onClick={handlePlayAgain}
                leftIcon={<Zap size={18} />}
              >
                Играть снова
              </Button>
              
              <Button
                variant="outline"
                onClick={onComplete}
              >
                Выбрать другой предмет
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  
  // If no questions available for this subject/grade
  if (!currentQuestion) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Icon className={`mr-2 ${color.split(' ')[0]}`} size={20} />
            <span>Предмет: {subjectName}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className={`mx-auto w-20 h-20 ${color} rounded-full flex items-center justify-center mb-4`}>
              <HelpCircle size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Извините, вопросы не найдены
            </h3>
            <p className="text-gray-600 mb-6">
              В настоящее время нет доступных вопросов для этого предмета.
            </p>
            
            <Button
              variant="primary"
              onClick={onComplete}
            >
              Выбрать другой предмет
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Icon className={`mr-2 ${color.split(' ')[0]}`} size={20} />
            <span>{isENT ? 'ЕНТ' : 'Сражение'}: {subjectName}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-blue-600">
              <span className="font-bold text-lg mr-1">{userScore}</span>
              <Users size={16} />
            </div>
            <span className="text-gray-400">vs</span>
            <div className="flex items-center text-red-600">
              <span className="font-bold text-lg mr-1">{opponentScore}</span>
              <span>{opponent?.avatar}</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">Вопрос {currentQuestionIndex + 1} из {questions.length}</p>
          <div className="flex items-center">
            <Clock size={16} className="text-amber-600 mr-1" />
            <span className={`font-medium ${timeLeft < 10 ? 'text-red-600' : 'text-gray-700'}`}>
              {timeLeft} сек
            </span>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg mb-4 ${showExplanation ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}>
          <h3 className="text-lg font-medium text-gray-900 mb-4">{currentQuestion.question}</h3>
          
          {!showExplanation ? (
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    selectedAnswer === option 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                  }`}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-3 bg-white rounded-lg border border-blue-200">
              <div className="flex items-start space-x-2">
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    {selectedAnswer === currentQuestion.correctAnswer 
                      ? 'Правильно!' 
                      : `Неправильно! Правильный ответ: ${currentQuestion.correctAnswer}`}
                  </p>
                  <p className="text-gray-700">{currentQuestion.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <div className="mt-0.5">
              <span className="text-2xl">{opponent?.avatar}</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{opponent?.name} сейчас решает задачу...</p>
              <div className="mt-2 flex space-x-1">
                <span className="animate-pulse">⌛</span>
                <span className="animate-pulse delay-100">⌛</span>
                <span className="animate-pulse delay-200">⌛</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Quest Component
const EducationalQuestsComponent = () => {
  const [activeSection, setActiveSection] = useState('subjects'); // 'subjects', 'ent', 'kids'
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  
  const user = useUserStore(state => state.user);
  const userGrade = user?.grade || 9; // Default to 9th grade if not specified
  
  // Determine if showing ENT options (only for 9-11 grades)
  const showENT = userGrade >= 9;
  
  const handleStartGame = (subject, isENT = false) => {
    setSelectedSubject({
      id: subject.id,
      name: subject.name,
      icon: subject.icon,
      color: subject.color,
      isENT: isENT
    });
    setGameStarted(true);
  };
  
  const handleBackToMenu = () => {
    setGameStarted(false);
    setSelectedSubject(null);
  };
  
  if (gameStarted && selectedSubject) {
    return (
      <div className="space-y-6">
        <QuestBattleComponent 
          subject={selectedSubject.id}
          subjectName={selectedSubject.name}
          icon={selectedSubject.icon}
          color={selectedSubject.color}
          grade={userGrade}
          isENT={selectedSubject.isENT}
          onComplete={handleBackToMenu}
        />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex space-x-2 mb-6">
        <Button
          variant={activeSection === 'subjects' ? 'primary' : 'outline'}
          onClick={() => setActiveSection('subjects')}
        >
          Школьные предметы
        </Button>
        
        {showENT && (
          <Button
            variant={activeSection === 'ent' ? 'primary' : 'outline'}
            onClick={() => setActiveSection('ent')}
          >
            Тесты ЕНТ
          </Button>
        )}
        
        {userGrade <= 4 && (
          <Button
            variant={activeSection === 'kids' ? 'primary' : 'outline'}
            onClick={() => setActiveSection('kids')}
          >
            Обучающие игры
          </Button>
        )}
      </div>
      
      {activeSection === 'subjects' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2 text-amber-600" size={20} />
              <span>Учебные сражения</span>
            </CardTitle>
            <CardDescription>
              Выберите предмет и сразитесь с одноклассниками в интеллектуальной дуэли!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {SUBJECTS.map((subject) => (
                <button
                  key={subject.id}
                  className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  onClick={() => handleStartGame(subject)}
                >
                  <div className={`flex h-16 w-16 items-center justify-center rounded-full ${subject.color} mb-4`}>
                    <subject.icon size={32} />
                  </div>
                  <h3 className="font-medium text-gray-900">{subject.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Сразись в битве знаний
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {activeSection === 'ent' && showENT && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="mr-2 text-blue-600" size={20} />
              <span>Подготовка к ЕНТ</span>
            </CardTitle>
            <CardDescription>
              Проверьте свои знания в формате ЕНТ и соревнуйтесь с другими абитуриентами
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {ENT_SUBJECTS.map((subject) => (
                <button
                  key={subject.id}
                  className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  onClick={() => handleStartGame(subject, true)}
                >
                  <div className={`flex h-16 w-16 items-center justify-center rounded-full ${subject.color} mb-4`}>
                    <subject.icon size={32} />
                  </div>
                  <h3 className="font-medium text-gray-900">{subject.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Подготовка к ЕНТ
                  </p>
                </button>
              ))}
              
              {/* Add profile subjects if the user has them */}
              {user?.profileSubjects?.map((subject, index) => (
                <button
                  key={`profile-${index}`}
                  className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  onClick={() => handleStartGame({ 
                    id: `profile-${index}`, 
                    name: subject,
                    icon: Brain,
                    color: 'text-emerald-600 bg-emerald-100'
                  }, true)}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full text-emerald-600 bg-emerald-100 mb-4">
                    <Brain size={32} />
                  </div>
                  <h3 className="font-medium text-gray-900">{subject}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Профильный предмет
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {activeSection === 'kids' && userGrade <= 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smile className="mr-2 text-green-600" size={20} />
              <span>Обучающие игры</span>
            </CardTitle>
            <CardDescription>
              Играй и учись с этими веселыми образовательными играми!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-colors"
                onClick={() => handleStartGame({
                  id: 'counting-stars',
                  name: 'Счет звезд',
                  icon: Star,
                  color: 'text-amber-600 bg-amber-100'
                })}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full text-amber-600 bg-amber-100 mb-4">
                  <Star size={32} />
                </div>
                <h3 className="font-medium text-gray-900">Счет звезд</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Посчитай звезды на небе и выбери правильный ответ
                </p>
              </button>
              
              <button
                className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                onClick={() => handleStartGame({
                  id: 'word-match',
                  name: 'Соедини слова',
                  icon: Heart,
                  color: 'text-red-600 bg-red-100'
                })}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full text-red-600 bg-red-100 mb-4">
                  <Heart size={32} />
                </div>
                <h3 className="font-medium text-gray-900">Соедини слова</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Соедини слова с их значениями
                </p>
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EducationalQuestsComponent;