import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  X,
  Check,
  AlertCircle,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import { TestAnalysis } from '../../types';

interface TestAnalysisModalProps {
  subject: string;
  analysis: TestAnalysis;
  onClose: () => void;
  showQuestionDetails?: boolean;
  incorrectQuestions?: {
    id: string;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    explanation: string;
  }[];
}

const TestAnalysisModal: React.FC<TestAnalysisModalProps> = ({ 
  subject, 
  analysis, 
  onClose,
  showQuestionDetails = false,
  incorrectQuestions = []
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'questions'>('overview');
  const [showExplanation, setShowExplanation] = useState<{[key: string]: boolean}>({});
  
  const subjectData = analysis.subjectScores[subject] || {};
  
  const handleStartMistakesReview = () => {
    onClose();
    
    // Navigate to chat with context about mistakes
    navigate('/chat', { 
      state: { 
        action: 'mistakes_review',
        subject: subject,
        score: subjectData.score,
        maxScore: subjectData.maxScore,
        weakTopics: Object.entries(subjectData.byTopic || {})
          .filter(([_, data]) => (data.correct / data.total) < 0.7)
          .map(([topic, _]) => topic)
      }
    });
  };
  
  const toggleExplanation = (questionId: string) => {
    setShowExplanation(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Анализ теста: {subject}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-6">
              <button
                className={`pb-2 px-1 ${activeTab === 'overview' 
                  ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
                  : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('overview')}
              >
                Общий результат
              </button>
              <button
                className={`pb-2 px-1 ${activeTab === 'details' 
                  ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
                  : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('details')}
              >
                Детальный анализ
              </button>
              {showQuestionDetails && (
                <button
                  className={`pb-2 px-1 ${activeTab === 'questions' 
                    ? 'border-b-2 border-blue-500 text-blue-600 font-medium' 
                    : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('questions')}
                >
                  Мои ответы
                </button>
              )}
            </div>
          </div>

          {activeTab === 'overview' && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Общий результат</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-blue-600">
                      {subjectData.score}/{subjectData.maxScore}
                    </p>
                    <p className="text-gray-500 mt-1">баллов</p>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        Процент выполнения
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {Math.round((subjectData.score / subjectData.maxScore) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${(subjectData.score / subjectData.maxScore) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-100">
                    <h4 className="font-medium text-blue-900 mb-2">Анализ результата</h4>
                    <p className="text-blue-800 text-sm">
                      {(subjectData.score / subjectData.maxScore) >= 0.8
                        ? `Отличный результат! ${subjectData.score}/${subjectData.maxScore} баллов показывает, что вы хорошо владеете материалом по ${subject.toLowerCase()}.`
                        : (subjectData.score / subjectData.maxScore) >= 0.6
                        ? `Хороший результат! ${subjectData.score}/${subjectData.maxScore} баллов - это неплохой показатель, но есть темы, над которыми стоит поработать.`
                        : `Результат ${subjectData.score}/${subjectData.maxScore} баллов показывает, что вам следует уделить больше внимания изучению ${subject.toLowerCase()}.`
                      }
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={handleStartMistakesReview}
                      leftIcon={<BookOpen size={18} />}
                    >
                      Начать работу над ошибками
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>По уровням сложности</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          Базовый (A)
                        </span>
                        <span className="text-sm font-medium text-green-600">
                          {subjectData.byDifficulty?.basic.correct}/{subjectData.byDifficulty?.basic.total}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${(subjectData.byDifficulty?.basic.correct / subjectData.byDifficulty?.basic.total) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          Средний (B)
                        </span>
                        <span className="text-sm font-medium text-blue-600">
                          {subjectData.byDifficulty?.intermediate.correct}/{subjectData.byDifficulty?.intermediate.total}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${(subjectData.byDifficulty?.intermediate.correct / subjectData.byDifficulty?.intermediate.total) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          Сложный (C)
                        </span>
                        <span className="text-sm font-medium text-amber-600">
                          {subjectData.byDifficulty?.advanced.correct}/{subjectData.byDifficulty?.advanced.total}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${(subjectData.byDifficulty?.advanced.correct / subjectData.byDifficulty?.advanced.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'details' && (
            <Card>
              <CardHeader>
                <CardTitle>Результаты по темам</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(subjectData.byTopic || {}).map(([topic, data], index) => {
                    const percentCorrect = (data.correct / data.total) * 100;
                    let statusColor = 'bg-green-500';
                    let textColor = 'text-green-600';
                    let statusText = 'Отлично';
                    
                    if (percentCorrect < 60) {
                      statusColor = 'bg-red-500';
                      textColor = 'text-red-600';
                      statusText = 'Требуется внимание';
                    } else if (percentCorrect < 80) {
                      statusColor = 'bg-amber-500';
                      textColor = 'text-amber-600';
                      statusText = 'Хорошо';
                    }
                    
                    return (
                      <div key={index} className="grid grid-cols-12 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="col-span-1 font-medium text-gray-700">{index + 1}</div>
                        <div className="col-span-4 font-medium text-gray-900">
                          {topic}
                        </div>
                        <div className="col-span-2 text-center font-medium text-blue-600">
                          {data.correct}/{data.total}
                        </div>
                        <div className="col-span-3">
                          <div className="h-2 w-full bg-gray-200 rounded-full">
                            <div
                              className={`h-full ${statusColor} rounded-full`}
                              style={{ width: `${percentCorrect}%` }}
                            />
                          </div>
                        </div>
                        <div className={`col-span-2 text-right ${textColor}`}>
                          {statusText}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Рекомендации</h4>
                  <ul className="space-y-2">
                    {Object.entries(subjectData.byTopic || {})
                      .filter(([_, data]) => (data.correct / data.total) < 0.7)
                      .map(([topic, _], index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                            <AlertCircle size={14} className="text-amber-600" />
                          </span>
                          <span className="text-sm text-gray-700">
                            Уделите больше внимания теме «{topic}»
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeTab === 'questions' && showQuestionDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Мои ответы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {incorrectQuestions.map((q, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className="p-4 bg-gray-50 border-b">
                        <h4 className="font-medium text-gray-900">{q.question}</h4>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start space-x-3 mb-3 p-3 rounded-lg bg-red-50 border border-red-100">
                          <X size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-red-800">Ваш ответ:</p>
                            <p className="text-red-700">{q.userAnswer}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 border border-green-100">
                          <Check size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-green-800">Правильный ответ:</p>
                            <p className="text-green-700">{q.correctAnswer}</p>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <button
                            onClick={() => toggleExplanation(q.id)}
                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                          >
                            <HelpCircle size={16} />
                            <span className="text-sm font-medium">
                              {showExplanation[q.id] ? 'Скрыть объяснение' : 'Почему этот ответ правильный?'}
                            </span>
                          </button>
                          
                          {showExplanation[q.id] && (
                            <div className="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                              <p className="text-sm text-blue-800">{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-6 flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Закрыть
            </Button>
            <Button
              variant="primary"
              onClick={handleStartMistakesReview}
              leftIcon={<ChevronRight size={16} />}
            >
              Начать работу над ошибками
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TestAnalysisModal;