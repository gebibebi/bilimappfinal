import React from 'react';
import { Shield, Star } from 'lucide-react';
import { PlayersListProps } from './types';

export const PlayersList: React.FC<PlayersListProps> = ({
  players,
  currentPlayerId
}) => {
  // Сортируем игроков по очкам (по убыванию)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  
  return (
    <div className="space-y-1">
      {sortedPlayers.map((player, index) => (
        <div 
          key={player.id}
          className={`flex items-center justify-between p-2 rounded-md ${
            player.id === currentPlayerId ? 'bg-indigo-50' : ''
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
              {player.avatar}
            </div>
            <div>
              <div className="flex items-center">
                <p className={`font-medium ${player.id === currentPlayerId ? 'text-indigo-600' : ''}`}>
                  {player.name}
                </p>
                {player.isHost && (
                  <span className="ml-2 inline-flex items-center text-xs text-indigo-600">
                    <Shield size={12} className="mr-1" />
                  </span>
                )}
                {index === 0 && players.length > 1 && player.score > 0 && (
                  <span className="ml-2 inline-flex items-center text-xs text-amber-600">
                    <Star size={12} className="mr-1" /> Лидирует
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold">{player.score}</span>
            <span className="text-gray-500 text-sm ml-1">pts</span>
          </div>
        </div>
      ))}
    </div>
  );
};