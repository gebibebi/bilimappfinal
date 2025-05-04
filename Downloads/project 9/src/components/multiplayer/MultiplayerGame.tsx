import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Trophy, 
  Timer, 
  Users, 
  CheckCircle2, 
  ChevronRight,
  AlertCircle,
  Zap,
  ArrowLeft,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { GameLobby } from './GameLobby';
import { QuestionDisplay } from './QuestionDisplay';
import { PlayersList } from './PlayersList';
import { ResultsBoard } from './ResultsBoard';
import { RoundTimer } from './RoundTimer';
import { Player, Question, GameState, GameStatus } from './types';

// Имитация задержки сети для более реалистичного поведения
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MultiplayerGame: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  
  // Состояния игры
  const [gameState, setGameState] = useState<GameState>({
    status: GameStatus.WAITING,
    players: [],
    currentQuestion: null,
    questionIndex: 0,
    totalQuestions: 10,
    timePerQuestion: 20,
    subject: 'Математика',
    difficulty: 'Средний',
    hostId: 'player-1', // ID текущего игрока (для проверки прав хоста)
    currentPlayerId: 'player-1', // ID текущего игрока
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Эмуляция присоединения к игре
  useEffect(() => {
    const joinGame = async () => {
      try {
        setIsLoading(true);
        
        // Имитация задержки сети
        await delay(1500);
        
        // Имитация получения данных игры
        const mockPlayers: Player[] = [
          { id: 'player-1', name: 'Вы', avatar: 'A', score: 0, isHost: true, isReady: true },
          { id: 'player-2', name: 'Игрок 2', avatar: 'B', score: 0, isHost: false, isReady: false },
          { id: 'player-3', name: 'Игрок 3', avatar: 'C', score: 0, isHost: false, isReady: false },
        ];
        
        setGameState(prev => ({
          ...prev,
          players: mockPlayers,
          status: GameStatus.WAITING,
        }));
        
        setIsLoading(false);
      } catch (err) {
        setError('Не удалось подключиться к игре. Попробуйте позже.');
        setIsLoading(false);
      }
    };
    
    joinGame();
  }, [gameId]);
  
  // Эмуляция начала игры
  const startGame = async () => {
    try {
      setGameState(prev => ({
        ...prev,
        status: GameStatus.STARTING,
      }));
      
      // Имитация задержки начала игры
      await delay(3000);
      
      // Имитация получения первого вопроса
      const mockQuestion: Question = {
        id: 'q-1',
        text: 'Найдите решение уравнения: 2x + 5 = 15',
        options: [
          { id: 'a', text: 'x = 5' },
          { id: 'b', text: 'x = 10' },
          { id: 'c', text: 'x = 7' },
          { id: 'd', text: 'x = 3' },
        ],
        correctAnswerId: 'a',
        explanation: 'Вычитаем 5 из обеих сторон: 2x = 10. Затем делим обе стороны на 2: x = 5.'
      };
      
      setGameState(prev => ({
        ...prev,
        status: GameStatus.QUESTION,
        currentQuestion: mockQuestion,
        questionIndex: 1,
      }));
    } catch (err) {
      setError('Не удалось начать игру. Попробуйте позже.');
    }
  };
  
  // Эмуляция ответа на вопрос
  const answerQuestion = async (answerId: string) => {
    const isCorrect = answerId === gameState.currentQuestion?.correctAnswerId;
    
    // Обновляем счет игрока
    setGameState(prev => ({
      ...prev,
      status: GameStatus.ANSWER_RESULT,
      players: prev.players.map(player => 
        player.id === prev.currentPlayerId
          ? { ...player, score: player.score + (isCorrect ? 100 : 0) }
          : player
      ),
    }));
    
    // Имитация задержки перед следующим вопросом
    await delay(2000);
    
    // Проверяем, все ли вопросы отвечены
    if (gameState.questionIndex >= gameState.totalQuestions) {
      setGameState(prev => ({
        ...prev,
        status: GameStatus.FINISHED,
      }));
    } else {
      // Имитация получения следующего вопроса
      const mockQuestion: Question = {
        id: `q-${gameState.questionIndex + 1}`,
        text: `Вопрос ${gameState.questionIndex + 1}: Найдите значение выражения 3² + 4²`,
        options: [
          { id: 'a', text: '25' },
          { id: 'b', text: '24' },
          { id: 'c', text: '9' },
          { id: 'd', text: '21' },
        ],
        correctAnswerId: 'a',
        explanation: '3² = 9, 4² = 16, 9 + 16 = 25'
      };
      
      setGameState(prev => ({
        ...prev,
        status: GameStatus.QUESTION,
        currentQuestion: mockQuestion,
        questionIndex: prev.questionIndex + 1,
      }));
    }
  };
  
  // Эмуляция изменения готовности
  const toggleReady = () => {
    setGameState(prev => ({
      ...prev,
      players: prev.players.map(player => 
        player.id === prev.currentPlayerId
          ? { ...player, isReady: !player.isReady }
          : player
      ),
    }));
  };
  
  // Функция для выхода из игры
  const leaveGame = () => {
    navigate('/testing/multiplayer');
  };
  
  // Визуализация состояния игры
  const renderGameContent = () => {
    switch (gameState.status) {
      case GameStatus.WAITING:
        return <GameLobby 
          gameId={gameId || ''} 
          players={gameState.players} 
          onStart={startGame} 
          onToggleReady={toggleReady}
          isHost={gameState.currentPlayerId === gameState.hostId}
          onLeave={leaveGame}
          subject={gameState.subject}
          difficulty={gameState.difficulty}
        />;
        
      case GameStatus.STARTING:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Игра начинается...</h2>
            <p className="text-gray-600 mb-8">Подготовьтесь к первому вопросу!</p>
            <div className="flex justify-center">
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        );
        
      case GameStatus.QUESTION:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-700">Вопрос {gameState.questionIndex} из {gameState.totalQuestions}</span>
              </div>
              <RoundTimer seconds={gameState.timePerQuestion} onTimeEnd={() => answerQuestion('')} />
            </div>
            
            <QuestionDisplay 
              question={gameState.currentQuestion!} 
              onAnswer={answerQuestion} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Игроки</CardTitle>
                </CardHeader>
                <CardContent>
                  <PlayersList players={gameState.players} currentPlayerId={gameState.currentPlayerId} />
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      case GameStatus.ANSWER_RESULT:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">
              {gameState.players.find(p => p.id === gameState.currentPlayerId)?.score 
                ? "Правильно! +100 очков" 
                : "Неправильно!"}
            </h2>
            <p className="text-gray-600 mb-8">{gameState.currentQuestion?.explanation}</p>
            <p className="text-gray-500">Следующий вопрос через несколько секунд...</p>
          </div>
        );
        
      case GameStatus.FINISHED:
        return (
          <div className="space-y-6">
            <div className="text-center py-6">
              <h2 className="text-2xl font-bold mb-4">Игра завершена!</h2>
              <div className="inline-block mb-6 p-4 bg-yellow-100 rounded-full">
                <Trophy size={48} className="text-yellow-600" />
              </div>
            </div>
            
            <ResultsBoard 
              players={gameState.players.sort((a, b) => b.score - a.score)} 
              currentPlayerId={gameState.currentPlayerId}
            />
            
            <div className="flex justify-center mt-8 space-x-4">
              <Button variant="outline" onClick={leaveGame}>
                Выйти
              </Button>
              <Button variant="primary" onClick={() => navigate('/testing/multiplayer/new')}>
                Новая игра
              </Button>
            </div>
          </div>
        );
        
      default:
        return <div>Неизвестное состояние игры</div>;
    }
  };
  
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold mb-4">Подключение к игре...</h2>
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="mb-6 text-red-600">
          <AlertCircle size={48} className="mx-auto" />
        </div>
        <h2 className="text-xl font-bold mb-4">Ошибка</h2>
        <p className="text-gray-600 mb-8">{error}</p>
        <Button variant="primary" onClick={() => navigate('/testing')}>
          Вернуться
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/testing')}
          leftIcon={<ArrowLeft size={16} />}
        >
          Назад к тестированию
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Мультиплеер: {gameState.subject}</CardTitle>
            <span className="px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full">
              Код: {gameId?.toUpperCase()}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {renderGameContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiplayerGame;