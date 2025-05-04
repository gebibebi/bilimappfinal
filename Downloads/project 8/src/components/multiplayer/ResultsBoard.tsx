import React from 'react';
import { Trophy, Medal, Award, Shield } from 'lucide-react';
import { ResultsBoardProps } from './types';

export const ResultsBoard: React.FC<ResultsBoardProps> = ({
  players,
  currentPlayerId
}) => {
  // Предполагаем, что игроки уже отсортированы по убыванию очков
  
  // Определение места текущего игрока
  const currentPlayerRank = players.findIndex(player => player.id === currentPlayerId) + 1;
  
  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy size={20} className="text-yellow-500" />;
      case 2:
        return <Medal size={20} className="text-gray-400" />;
      case 3:
        return <Medal size={20} className="text-amber-600" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-4 bg-indigo-50 border-b border-indigo-100">
        <h3 className="font-medium text-indigo-900">Итоговые результаты</h3>
      </div>
      
      <div className="divide-y divide-gray-100">
        {players.map((player, index) => {
          const position = index + 1;
          const isCurrentPlayer = player.id === currentPlayerId;
          
          return (
            <div 
              key={player.id}
              className={`flex items-center justify-between p-4 ${
                isCurrentPlayer ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 text-center">
                  {getPositionIcon(position) || <span className="font-medium text-gray-500">{position}</span>}
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                    {player.avatar}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <p className={`font-medium ${isCurrentPlayer ? 'text-indigo-600' : ''}`}>
                        {player.name}
                      </p>
                      {player.isHost && (
                        <span className="ml-2 inline-flex items-center text-xs text-indigo-600">
                          <Shield size={12} className="mr-1" /> Организатор
                        </span>
                      )}
                      {isCurrentPlayer && (
                        <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-600">
                          Вы
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-lg">{player.score}</div>
                <div className="text-xs text-gray-500">очков</div>
              </div>
            </div>
          );
        })}
      </div>
      
      {currentPlayerRank === 1 ? (
        <div className="p-4 bg-yellow-50 border-t border-yellow-100">
          <div className="flex items-center space-x-3 text-yellow-700">
            <Award size={20} />
            <p className="font-medium">Поздравляем! Вы победили!</p>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <p className="text-gray-600 text-sm text-center">
            {currentPlayerRank <= 3
              ? `Вы заняли ${currentPlayerRank}-е место. Отличный результат!`
              : 'Спасибо за участие! В следующий раз повезет больше.'}
          </p>
        </div>
      )}
    </div>
  );
};