import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  UsersRound, 
  Zap, 
  Award, 
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

const JoinMultiplayerSection: React.FC = () => {
  const [joinCode, setJoinCode] = useState('');
  const [showJoinForm, setShowJoinForm] = useState(false);
  const navigate = useNavigate();
  
  // Generate a random game code
  const generateGameCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  // Handle creating a new game
  const handleCreateGame = () => {
    const gameCode = generateGameCode();
    navigate(`/testing/multiplayer/${gameCode}`);
  };
  
  // Handle joining an existing game
  const handleJoinGame = () => {
    if (joinCode.trim()) {
      navigate(`/testing/multiplayer/${joinCode.trim().toUpperCase()}`);
    }
  };
  
  return (
    <div className="space-y-6">
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
                onClick={() => navigate('/testing/quests')}
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
                    onClick={handleCreateGame}
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
                        onClick={handleJoinGame}
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
      
      {/* Recent Games Section */}
      <Card>
        <CardHeader>
          <CardTitle>Недавние игры</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Recent game items */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <Trophy size={20} />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Математика: Тригонометрия</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">Мультиплеер</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">3 игрока</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">3 минуты назад</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">Победа</p>
                <p className="text-sm text-gray-500">500 очков</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                    <Trophy size={20} />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Физика: Механика</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">Мультиплеер</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">4 игрока</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">10 минут назад</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-red-600">Поражение</p>
                <p className="text-sm text-gray-500">320 очков</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinMultiplayerSection;