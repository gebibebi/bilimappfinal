import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  AlertCircle,
  CheckCircle,
  X,
  Mic,
  Calculator,
  PenTool
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import useTestStore from '../store/testStore';
import { setPageTitle } from '../lib/utils';
import TestAnalysisModal from '../components/test/TestAnalysisModal';

const TestPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  
  const [currentSubject, setCurrentSubject] = useState('История Казахстана');
  const [showResults, setShowResults] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedSubjectForAnalysis, setSelectedSubjectForAnalysis] = useState('');
  const [timeLeft, setTimeLeft] = useState(18000); // 5 hours in seconds
  const [isRecording, setIsRecording] = useState(false);
  const [showDrawingBoard, setShowDrawingBoard] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  
  const { 
    currentTest,
    currentQuestions,
    selectedAnswers,
    startTest,
    answerQuestion,
    submitTest,
    analyzeTest,
    setCurrentSubject: setStoreSubject
  } = useTestStore();

  useEffect(() => {
    setPageTitle('Пробное ЕНТ');
    if (type === 'ent') {
      startTest('ent-demo');
    }
  }, [type, startTest]);

  useEffect(() => {
    if (!showResults) {
      const timer = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showResults]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const subjects = [
    { id: 'История Казахстана', name: 'История Казахстана', questions: 20 },
    { id: 'Грамотность чтения', name: 'Грамотность чтения', questions: 10 },
    { id: 'Математическая грамотность', name: 'Математическая грамотность', questions: 10 },
    { id: 'Математика', name: 'Математика', questions: 40 },
    { id: 'Информатика', name: 'Информатика', questions: 40 }
  ];

  const handleSubjectChange = (subject: string) => {
    setCurrentSubject(subject);
    setStoreSubject(subject);
    setActiveQuestionIndex(0); // Reset to first question when changing subject
  };

  const handleAnswer = (answer: string) => {
    const subjectQuestions = currentQuestions.filter(q => q.subject === currentSubject);
    if (subjectQuestions && subjectQuestions.length > 0) {
      const question = subjectQuestions[activeQuestionIndex];
      if (question) {
        answerQuestion(question.id, answer);
      }
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    submitTest();
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      // Show mock response
      alert('Отлично! Ваш ответ записан и будет проанализирован.');
    }, 3000);
  };

  const getCurrentQuestion = () => {
    const subjectQuestions = currentQuestions.filter(q => q.subject === currentSubject);
    if (subjectQuestions && subjectQuestions.length > 0 && activeQuestionIndex < subjectQuestions.length) {
      return subjectQuestions[activeQuestionIndex];
    }
    return null;
  };

  const navigateToNextQuestion = () => {
    const subjectQuestions = currentQuestions.filter(q => q.subject === currentSubject);
    if (activeQuestionIndex < subjectQuestions.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    } else {
      // If last question, go to next subject
      const currentSubjectIndex = subjects.findIndex(s => s.id === currentSubject);
      if (currentSubjectIndex < subjects.length - 1) {
        handleSubjectChange(subjects[currentSubjectIndex + 1].id);
      }
    }
  };

  const navigateToPrevQuestion = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    } else {
      // If first question, go to previous subject's last question
      const currentSubjectIndex = subjects.findIndex(s => s.id === currentSubject);
      if (currentSubjectIndex > 0) {
        const prevSubject = subjects[currentSubjectIndex - 1].id;
        const prevSubjectQuestions = currentQuestions.filter(q => q.subject === prevSubject);
        handleSubjectChange(prevSubject);
        setActiveQuestionIndex(prevSubjectQuestions.length - 1);
      }
    }
  };

  const getTotalQuestionsForSubject = () => {
    return currentQuestions.filter(q => q.subject === currentSubject).length;
  };
  
  const handleShowAnalysis = (subject: string) => {
    setSelectedSubjectForAnalysis(subject);
    setShowAnalysis(true);
  };
  
  // Mock incorrect questions for demonstration
  const getMockIncorrectQuestions = (subject: string) => {
    if (subject === 'Информатика') {
      return [
        {
          id: '1',
          question: 'Переведите число 10011₂ в десятичную систему счисления',
          userAnswer: '17',
          correctAnswer: '19',
          explanation: 'При переводе из двоичной системы в десятичную нужно сложить степени двойки. 10011₂ = 1×2⁴ + 0×2³ + 0×2² + 1×2¹ + 1×2⁰ = 16 + 0 + 0 + 2 + 1 = 19'
        },
        {
          id: '2',
          question: 'Какой результат выполнения следующего кода на Python?\n\nprint(len([i for i in range(10) if i % 2 == 0]))',
          userAnswer: '4',
          correctAnswer: '5',
          explanation: 'Данный код создает список четных чисел от 0 до 9 и выводит его длину. Четные числа в диапазоне от 0 до 9: 0, 2, 4, 6, 8. Всего их 5.'
        },
        {
          id: '3',
          question: 'Что такое SQL?',
          userAnswer: 'Язык программирования для работы с реляционными базами данных',
          correctAnswer: 'Структурированный язык запросов для работы с реляционными базами данных',
          explanation: 'SQL (Structured Query Language) — это структурированный язык запросов, предназначенный для работы с реляционными базами данных. Он используется для создания, изменения и извлечения данных, но не является языком программирования в классическом понимании.'
        }
      ];
    } else if (subject === 'Математика') {
      return [
        {
          id: '4',
          question: 'Найдите производную функции f(x) = 3x² + 2x - 5',
          userAnswer: 'f\'(x) = 3x + 2',
          correctAnswer: 'f\'(x) = 6x + 2',
          explanation: 'Производная от x^n равна n*x^(n-1). Таким образом: f\'(x) = 3·2·x^(2-1) + 2·1·x^(1-1) - 0 = 6x + 2'
        },
        {
          id: '5',
          question: 'Решите неравенство: (x-3)(x+2) > 0',
          userAnswer: 'x > 3 или x < -2',
          correctAnswer: 'x > 3 или x < -2',
          explanation: 'Неравенство (x-3)(x+2) > 0 выполняется, когда оба множителя положительные или оба отрицательные. 1) Если x-3 > 0 и x+2 > 0, то x > 3 и x > -2. Значит x > 3. 2) Если x-3 < 0 и x+2 < 0, то x < 3 и x < -2. Значит x < -2. Ответ: x > 3 или x < -2.'
        }
      ];
    } else if (subject === 'История Казахстана') {
      return [
        {
          id: '6',
          question: 'В каком году была принята Декларация о государственном суверенитете Казахской ССР?',
          userAnswer: '1991',
          correctAnswer: '1990',
          explanation: 'Декларация о государственном суверенитете Казахской ССР была принята 25 октября 1990 года. Не следует путать с Декларацией о независимости, которая была принята 16 декабря 1991 года.'
        }
      ];
    } else if (subject === 'Физика') {
      return [
        {
          id: '7',
          question: 'Какой формулой выражается закон Ома для участка цепи?',
          userAnswer: 'I = U/P',
          correctAnswer: 'I = U/R',
          explanation: 'Закон Ома для участка цепи устанавливает связь между силой тока (I), напряжением (U) и сопротивлением (R). Закон гласит, что сила тока прямо пропорциональна напряжению и обратно пропорциональна сопротивлению: I = U/R'
        }
      ];
    }
    
    return [];
  };

  return (
    <div className="min-h-screen bg-gray-50 -m-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Пробное ЕНТ</h1>
            <p className="text-gray-500">Тестирование в режиме реального времени</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <Clock size={20} />
              <span className="font-medium">{formatTime(timeLeft)}</span>
            </div>
            {!showResults && (
              <Button
                variant="primary"
                onClick={handleSubmit}
              >
                Завершить тест
              </Button>
            )}
          </div>
        </div>

        {!showResults ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-4">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    currentSubject === subject.id
                      ? 'bg-blue-50 border-blue-200 border'
                      : 'bg-white border-gray-200 border hover:border-gray-300'
                  }`}
                  onClick={() => handleSubjectChange(subject.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      {subject.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {currentQuestions.filter(q => q.subject === subject.id).length} вопросов
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="md:col-span-3">
              {getCurrentQuestion() && (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Вопрос {activeQuestionIndex + 1} из {getTotalQuestionsForSubject()}
                      </h3>
                      <span className="text-sm text-gray-500">{currentSubject}</span>
                    </div>
                    <p className="text-lg text-gray-900 mb-6">
                      {getCurrentQuestion()?.question}
                    </p>
                    <div className="space-y-3">
                      {getCurrentQuestion()?.options.map((option, index) => (
                        <button
                          key={index}
                          className={`w-full text-left p-4 rounded-lg border transition-colors ${
                            selectedAnswers[getCurrentQuestion()?.id || ''] === option
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleAnswer(option)}
                        >
                          <span className="font-medium">{String.fromCharCode(65 + index)})</span>{' '}
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={navigateToPrevQuestion}
                      leftIcon={<ChevronLeft size={16} />}
                    >
                      Предыдущий вопрос
                    </Button>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowCalculator(!showCalculator)}
                        leftIcon={<Calculator size={16} />}
                      >
                        Калькулятор
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowDrawingBoard(!showDrawingBoard)}
                        leftIcon={<PenTool size={16} />}
                      >
                        Доска
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleStartRecording}
                        leftIcon={<Mic size={16} />}
                        className={isRecording ? 'animate-pulse bg-red-50' : ''}
                      >
                        {isRecording ? 'Запись...' : 'Записать ответ'}
                      </Button>
                    </div>

                    <Button
                      variant="outline"
                      onClick={navigateToNextQuestion}
                      rightIcon={<ChevronRight size={16} />}
                    >
                      Следующий вопрос
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Результаты тестирования</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">Общий балл</h4>
                    <p className="text-3xl font-bold text-blue-600">
                      104/140
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      74% выполнения
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900">Время выполнения</h4>
                    <p className="text-3xl font-bold text-green-600">
                      {formatTime(18000 - timeLeft)}
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      Осталось: {formatTime(timeLeft)}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Результаты по предметам</h4>
                  <div className="space-y-4">
                    {subjects.map((subject) => (
                      <div key={subject.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{subject.name}</h5>
                          <div className="flex items-center space-x-3">
                            <span className="font-medium text-gray-700">
                              {subject.id === 'История Казахстана' && '18/20'}
                              {subject.id === 'Грамотность чтения' && '8/10'}
                              {subject.id === 'Математическая грамотность' && '8/10'}
                              {subject.id === 'Математика' && '35/40'}
                              {subject.id === 'Информатика' && '30/40'}
                            </span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleShowAnalysis(subject.id)}
                            >
                              Анализ
                            </Button>
                          </div>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{
                              width: `${
                                subject.id === 'История Казахстана' ? 90 :
                                subject.id === 'Грамотность чтения' ? 80 :
                                subject.id === 'Математическая грамотность' ? 80 :
                                subject.id === 'Математика' ? 87.5 :
                                75
                              }%`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <Button
                    variant="primary"
                    onClick={() => handleShowAnalysis('Информатика')}
                    leftIcon={<ChevronRight size={16} />}
                  >
                    Подробный анализ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Модальное окно анализа теста */}
        {showAnalysis && (
          <TestAnalysisModal
            subject={selectedSubjectForAnalysis}
            analysis={analyzeTest(selectedAnswers)}
            onClose={() => setShowAnalysis(false)}
            showQuestionDetails={true}
            incorrectQuestions={getMockIncorrectQuestions(selectedSubjectForAnalysis)}
          />
        )}

        {/* Calculator Modal */}
        <AnimatePresence>
          {showCalculator && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40"
              onClick={() => setShowCalculator(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Калькулятор
                  </h3>
                  <button
                    onClick={() => setShowCalculator(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <input
                    type="text"
                    className="w-full text-right text-2xl font-mono p-2 rounded border-0"
                    readOnly
                    value="0"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((key) => (
                    <button
                      key={key}
                      className="p-4 text-center rounded bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drawing Board Modal */}
        <AnimatePresence>
          {showDrawingBoard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40"
              onClick={() => setShowDrawingBoard(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Интерактивная доска
                  </h3>
                  <button
                    onClick={() => setShowDrawingBoard(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="bg-gray-100 rounded-lg" style={{ height: '400px' }}>
                  <div className="h-full flex items-center justify-center text-gray-500">
                    Здесь будет интерактивная доска для рисования
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline">
                    Очистить
                  </Button>
                  <Button variant="primary">
                    Сохранить
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TestPage;