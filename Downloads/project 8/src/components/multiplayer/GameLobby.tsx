import React, { useState } from 'react';
import { Copy, Users, ZoomIn, ZoomOut, Settings, Shield, CheckCircle2, X } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { GameLobbyProps, Player } from './types';

export const GameLobby: React.FC<GameLobbyProps> = ({
  gameId,
  players,
  onStart,
  onToggleReady,
  isHost,
  onLeave,
  subject,
  difficulty
}) => {
  const [copied, setCopied] = useState(false);
  
  const copyGameCode = () => {
    navigator.clipboard.writeText(gameId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const allPlayersReady = players.every(player => player.isReady);
  const currentPlayer = players.find(player => player.isHost === false);
  const isCurrentPlayerReady = currentPlayer?.isReady || false;
  
  return (
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
                onClick={copyGameCode}
                leftIcon={copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              >
                {copied ? 'Скопировано' : 'Копировать'}
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
                  <p className="font-medium">{subject}</p>
                </div>
                <div>
                  <p className="text-xs text-indigo-600 mb-1">Сложность</p>
                  <p className="font-medium">{difficulty}</p>
                </div>
                <div>
                  <p className="text-xs text-indigo-600 mb-1">Вопросов</p>
                  <p className="font-medium">10</p>
                </div>
                <div>
                  <p className="text-xs text-indigo-600 mb-1">Время на вопрос</p>
                  <p className="font-medium">20 секунд</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-indigo-900 mb-3">Игроки ({players.length}/5)</h3>
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
        <Button variant="outline" onClick={onLeave} leftIcon={<X size={16} />}>
          Покинуть игру
        </Button>
        
        <div className="space-x-3">
          {isHost ? (
            <Button
              variant="primary"
              onClick={onStart}
              disabled={!allPlayersReady || players.length < 2}
              leftIcon={<ZoomIn size={16} />}
            >
              Начать игру
            </Button>
          ) : (
            <Button
              variant={isCurrentPlayerReady ? "outline" : "primary"}
              onClick={onToggleReady}
              leftIcon={isCurrentPlayerReady ? <X size={16} /> : <CheckCircle2 size={16} />}
            >
              {isCurrentPlayerReady ? 'Не готов' : 'Готов'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};