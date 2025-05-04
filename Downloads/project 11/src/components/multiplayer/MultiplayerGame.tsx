import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Timer, 
  Users, 
  CheckCircle2, 
  ChevronRight,
  AlertCircle,
  Zap,
  ArrowLeft,
  MessageSquare,
  X,
  Shield,
  User
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

// Define types
interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  isHost: boolean;
  isReady: boolean;
}

interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctAnswerId: string;
  explanation: string;
  image?: string;
}

enum GameStatus {
  WAITING = 'waiting',
  STARTING = 'starting',
  QUESTION = 'question',
  ANSWER_RESULT = 'answer_result',
  FINISHED = 'finished',
}

const MultiplayerGame: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  
  // Game state
  const [status, setStatus] = useState<GameStatus>(GameStatus.WAITING);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [totalQuestions] = useState(10);
  const [timePerQuestion] = useState(20);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [scoreEarned, setScoreEarned] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isHost, setIsHost] = useState(true);
  const [isReady, setIsReady] = useState(true);
  const [currentPlayerId, setCurrentPlayerId] = useState('player-1');
  const [gameInfo, setGameInfo] = useState({
    subject: 'Математика',
    difficulty: 'Средний',
    maxPlayers: 5
  });
  
  // Load initial data
  useEffect(() => {
    // Generate mock players
    setPlayers([
      { id: 'player-1', name: 'Вы', avatar: 'A', score: 0, isHost: true, isReady: true },
      { id: 'player-2', name: 'Игрок 2', avatar: 'B', score: 0, isHost: false, isReady: Math.random() > 0.5 },
      { id: 'player-3', name: 'Игрок 3', avatar: 'C', score: 0, isHost: false, isReady: Math.random() > 0.5 },
    ]);
  }, []);
  
  // Timer effect
  useEffect(() => {
    if (status === GameStatus.QUESTION) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [status, currentQuestion]);
  
  // Simulate other players joining over time
  useEffect(() => {
    if (status === GameStatus.WAITING) {
      const joinTimer = setTimeout(() => {
        // Randomly add a new player
        if (players.length < 5 && Math.random() > 0.6) {
          const playerNumber = players.length + 1;
          const newPlayer = {
            id: `player-${playerNumber}`,
            name: `Игрок ${playerNumber}`,
            avatar: String.fromCharCode(64 + playerNumber),
            score: 0,
            isHost: false,
            isReady: false
          };
          
          setPlayers(prev => [...prev, newPlayer]);
          
          // After a short delay, make them ready
          setTimeout(() => {
            setPlayers(prev => 
              prev.map(p => 
                p.id === newPlayer.id ? { ...p, isReady: true } : p
              )
            );
          }, 2000);
        }
      }, 3000);
      
      return () => clearInterval(joinTimer);
    }
  }, [status, players]);
  
  // Simulate opponents' progress during questions
  useEffect(() => {
    if (status === GameStatus.QUESTION && selectedAnswer === null) {
      // Random intervals for opponent responses
      players.forEach(player => {
        if (player.id !== currentPlayerId) {
          const responseTime = Math.random() * 10000 + 5000; // 5-15 seconds
          setTimeout(() => {
            // Update player scores in real-time
            setPlayers(prev => 
              prev.map(p => 
                p.id === player.id 
                  ? { ...p, score: p.score + Math.floor(Math.random() * 200) + 50 } 
                  : p
              )
            );
          }, responseTime);
        }
      });
    }
  }, [status, currentQuestion, selectedAnswer, currentPlayerId]);
  
  // Mock questions data
  const questions: Question[] = [
    {
      id: 'q1',
      text: 'Какой из следующих вариантов является решением уравнения 2x + 5 = 15?',
      options: [
        { id: 'a', text: 'x = 5' },
        { id: 'b', text: 'x = 10' },
        { id: 'c', text: 'x = 7' },
        { id: 'd', text: 'x = 3' }
      ],
      correctAnswerId: 'a',
      explanation: '2x + 5 = 15, вычитаем 5 из обеих частей: 2x = 10, делим на 2: x = 5'
    },
    {
      id: 'q2',
      text: 'Найдите площадь квадрата со стороной 6 см',
      options: [
        { id: 'a', text: '12 см²' },
        { id: 'b', text: '24 см²' },
        { id: 'c', text: '36 см²' },
        { id: 'd', text: '48 см²' }
      ],
      correctAnswerId: 'c',
      explanation: 'Площадь квадрата = a², где a - длина стороны. S = 6² = 36 см²'
    },
    {
      id: 'q3',
      text: 'Упростите выражение: (a + b)² - (a - b)²',
      options: [
        { id: 'a', text: '4ab' },
        { id: 'b', text: '2ab' },
        { id: 'c', text: '2a² + 2b²' },
        { id: 'd', text: '2a² - 2b²' }
      ],
      correctAnswerId: 'a',
      explanation: '(a + b)² - (a - b)² = (a² + 2ab + b²) - (a² - 2ab + b²) = 4ab'
    },
    {
      id: 'q4',
      text: 'Точка пересечения диагоналей параллелограмма делит каждую из них на',
      options: [
        { id: 'a', text: 'Четыре равные части' },
        { id: 'b', text: 'Две неравные части' },
        { id: 'c', text: 'Две равные части' },
        { id: 'd', text: 'Три равные части' }
      ],
      correctAnswerId: 'c',
      explanation: 'Диагонали параллелограмма пересекаются и делят друг друга пополам.'
    },
    {
      id: 'q5',
      text: 'Если f(x) = 3x² + 2x - 5, то чему равно f\'(x)?',
      options: [
        { id: 'a', text: '3x + 2' },
        { id: 'b', text: '6x + 2' },
        { id: 'c', text: '3x² + 2' },
        { id: 'd', text: '6x² + 2x' }
      ],
      correctAnswerId: 'b',
      explanation: 'f\'(x) = (3x²)\' + (2x)\' - (5)\' = 6x + 2 - 0 = 6x + 2'
    }
  ];
  
  // Handler functions
  const handleStartGame = () => {
    setStatus(GameStatus.STARTING);
    
    // Simulate game start delay
    setTimeout(() => {
      setCurrentQuestion(questions[0]);
      setStatus(GameStatus.QUESTION);
      setTimeLeft(timePerQuestion);
    }, 3000);
  };
  
  const handleTimeUp = () => {
    if (!selectedAnswer) {
      handleAnswer(null);
    }
  };
  
  const handleAnswer = (answerId: string | null) => {
    setSelectedAnswer(answerId);
    
    if (currentQuestion) {
      const correct = answerId === currentQuestion.correctAnswerId;
      setIsCorrect(correct);
      
      // Calculate score based on time left and correctness
      const earnedPoints = correct ? Math.round((timeLeft / timePerQuestion) * 1000) : 0;
      setScoreEarned(earnedPoints);
      
      // Update player score
      setPlayers(prev => 
        prev.map(p => 
          p.id === currentPlayerId 
            ? { ...p, score: p.score + earnedPoints } 
            : p
        )
      );
      
      // Show answer result
      setStatus(GameStatus.ANSWER_RESULT);
      setShowExplanation(true);
      
      // Move to next question after delay
      setTimeout(() => {
        if (questionIndex < totalQuestions - 1) {
          setQuestionIndex(prev => prev + 1);
          setCurrentQuestion(questions[questionIndex + 1 >= questions.length ? 0 : questionIndex + 1]);
          setStatus(GameStatus.QUESTION);
          setTimeLeft(timePerQuestion);
          setSelectedAnswer(null);
          setIsCorrect(null);
          setScoreEarned(0);
          setShowExplanation(false);
        } else {
          // Game over
          setStatus(GameStatus.FINISHED);
        }
      }, 3000);
    }
  };
  
  const handleToggleReady = () => {
    setIsReady(!isReady);
    setPlayers(prev => 
      prev.map(p => 
        p.id === currentPlayerId ? { ...p, isReady: !isReady } : p
      )
    );
  };
  
  const handleGoBack = () => {
    navigate('/testing');
  };
  
  // Render functions for each game state
  const renderWaitingLobby = () => (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-indigo-900">Ожидание игроков</h2>
            <p className="text-indigo-700">Поделитесь кодом игры с друзьями</p>
          </div>
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-2 bg-white text-indigo-800 rounded border border-indigo-200 font-mono font-medium">
                {gameId}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigator.clipboard.writeText(`https://bilimapp.com/game/join/${gameId}`)}
              >
                Копировать
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-indigo-900 mb-3">Информация об игре</h3>
            <div className="bg-white rounded-lg p-4 border border-indigo-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-indigo-600 mb-1">Предмет</p>
                  <p className="font-medium">{gameInfo.subject}</p>
                </div>
                <div>
                  <p className="text-xs text-indigo-600 mb-1">Сложность</p>
                  <p className="font-medium">{gameInfo.difficulty}</p>
                </div>
                <div>
                  <p className="text-xs text-indigo-600 mb-1">Вопросов</p>
                  <p className="font-medium">{totalQuestions}</p>
                </div>
                <div>
                  <p className="text-xs text-indigo-600 mb-1">Время на вопрос</p>
                  <p className="font-medium">{timePerQuestion} секунд</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-indigo-900 mb-3">Игроки ({players.length}/{gameInfo.maxPlayers})</h3>
            <div className="bg-white rounded-lg p-4 border border-indigo-100">
              <ul className="divide-y divide-indigo-50">
                {players.map(player => (
                  <li key={player.id} className="py-2 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                        {player.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{player.name}</p>
                        {player.isHost && (
                          <span className="inline-flex items-center text-xs text-indigo-600">
                            <Shield size={12} className="mr-1" /> Организатор
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      {player.isReady ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                          <CheckCircle2 size={12} className="mr-1" /> Готов
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-700">
                          Не готов
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleGoBack} leftIcon={<X size={16} />}>
          Покинуть игру
        </Button>
        
        <div className="space-x-3">
          {isHost ? (
            <Button
              variant="primary"
              onClick={handleStartGame}
              disabled={!players.every(p => p.isReady)}
              leftIcon={<Zap size={16} />}
            >
              Начать игру
            </Button>
          ) : (
            <Button
              variant={isReady ? "outline" : "primary"}
              onClick={handleToggleReady}
              leftIcon={isReady ? <X size={16} /> : <CheckCircle2 size={16} />}
            >
              {isReady ? 'Не готов' : 'Готов'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
  
  const renderGameStarting = () => (
    <div className="py-12 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-20 h-20 mx-auto bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6"
      >
        <Zap size={40} />
      </motion.div>
      <h2 className="text-2xl font-bold mb-4">Игра начинается!</h2>
      <p className="text-gray-600 mb-6">Приготовьтесь к первому вопросу...</p>
      
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 3 }}
        className="h-2 bg-purple-500 rounded-full mx-auto max-w-md"
      />
    </div>
  );
  
  const renderQuestion = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="bg-gray-100 rounded-full px-3 py-1 text-sm font-medium">
          Вопрос {questionIndex + 1} из {totalQuestions}
        </div>
        <div className="flex items-center space-x-2">
          <Timer size={18} className="text-amber-500" />
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: `${(timeLeft / timePerQuestion) * 100}%` }}
              transition={{ duration: 0.1 }}
              className={`h-full ${timeLeft > 10 ? 'bg-green-500' : timeLeft > 5 ? 'bg-amber-500' : 'bg-red-500'}`}
            />
          </div>
          <span className={`text-sm font-medium ${timeLeft <= 5 ? 'text-red-500' : ''}`}>
            {timeLeft}с
          </span>
        </div>
      </div>
      
      <Card className="border-2 border-purple-200">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-center mb-6">{currentQuestion?.text}</h3>
          
          {currentQuestion?.image && (
            <div className="mb-6 flex justify-center">
              <img 
                src={currentQuestion.image} 
                alt="Question" 
                className="max-w-full h-auto max-h-64 object-contain rounded"
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion?.options.map(option => (
              <motion.button
                key={option.id}
                className={`p-4 rounded-lg text-left transition-colors ${
                  selectedAnswer === option.id
                    ? 'bg-purple-100 border-2 border-purple-400'
                    : 'bg-gray-50 border border-gray-200 hover:bg-purple-50 hover:border-purple-200'
                }`}
                onClick={() => handleAnswer(option.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={selectedAnswer !== null}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    selectedAnswer === option.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {option.id.toUpperCase()}
                  </div>
                  <span className={selectedAnswer === option.id ? 'font-medium' : ''}>
                    {option.text}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-medium mb-2">Игроки</h4>
        <div className="space-y-2">
          {players.map(player => (
            <div key={player.id} className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full mr-2 bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                  {player.avatar}
                </div>
                <span className={`font-medium ${player.id === currentPlayerId ? 'text-purple-600' : ''}`}>
                  {player.name}
                </span>
              </div>
              <div className="font-bold">{player.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  const renderAnswerResult = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
          isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}
      >
        {isCorrect ? (
          <CheckCircle2 size={40} />
        ) : (
          <X size={40} />
        )}
      </motion.div>
      
      <h2 className="text-2xl font-bold mb-2">
        {isCorrect ? 'Правильно!' : 'Неправильно!'}
      </h2>
      
      {isCorrect && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-purple-600 font-bold text-xl mb-4"
        >
          +{scoreEarned} очков
        </motion.div>
      )}
      
      {showExplanation && currentQuestion && (
        <div className="bg-gray-50 p-4 rounded-lg max-w-lg mx-auto mb-4 text-left">
          <p className="text-gray-800">{currentQuestion.explanation}</p>
        </div>
      )}
      
      <p className="text-gray-500">Приготовьтесь к следующему вопросу...</p>
    </motion.div>
  );
  
  const renderGameResults = () => {
    // Sort players by score
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const currentPlayerRank = sortedPlayers.findIndex(p => p.id === currentPlayerId) + 1;
    const isWinner = currentPlayerRank === 1;
    
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
              isWinner ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
            }`}
          >
            {isWinner ? (
              <Trophy size={48} />
            ) : (
              <User size={48} />
            )}
          </motion.div>
          
          <h2 className="text-2xl font-bold mb-2">
            {isWinner ? 'Поздравляем! Вы победили!' : `Вы заняли ${currentPlayerRank} место`}
          </h2>
          
          <p className="text-gray-600 mb-8">
            {isWinner 
              ? 'Вы набрали больше всех очков!' 
              : currentPlayerRank <= 3 
                ? 'Отличный результат!' 
                : 'Продолжайте тренироваться!'}
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Результаты игры</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sortedPlayers.map((player, index) => (
                <div 
                  key={player.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    player.id === currentPlayerId ? 'bg-purple-50 border border-purple-200' : ''
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-8 text-center font-bold text-gray-500 mr-3">
                      {index + 1}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-indigo-100 mr-3 flex items-center justify-center text-indigo-600 font-medium">
                      {player.avatar}
                    </div>
                    <div>
                      <p className={`font-medium ${player.id === currentPlayerId ? 'text-purple-700' : ''}`}>
                        {player.name}
                      </p>
                      {player.id === currentPlayerId && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                          Вы
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{player.score}</p>
                    <p className="text-xs text-gray-500">очков</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={handleGoBack}
          >
            Вернуться в меню
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              navigate('/testing');
              setTimeout(() => navigate(`/testing/multiplayer/${generateRandomCode()}`), 100);
            }}
          >
            Новая игра
          </Button>
        </div>
      </div>
    );
  };
  
  // Helper functions
  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  // Main render
  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="mb-6 flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={handleGoBack}
          leftIcon={<ArrowLeft size={16} />}
        >
          Вернуться
        </Button>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Код игры:</span>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-mono">
            {gameId}
          </span>
        </div>
      </div>
      
      <Card>
        <CardHeader className="border-b border-gray-200">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Users size={20} className="text-purple-600 mr-2" />
              Мультиплеер: {gameInfo.subject}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            {status === GameStatus.WAITING && renderWaitingLobby()}
            {status === GameStatus.STARTING && renderGameStarting()}
            {status === GameStatus.QUESTION && renderQuestion()}
            {status === GameStatus.ANSWER_RESULT && renderAnswerResult()}
            {status === GameStatus.FINISHED && renderGameResults()}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiplayerGame;