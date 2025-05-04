import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { RoundTimerProps } from './types';

export const RoundTimer: React.FC<RoundTimerProps> = ({
  seconds,
  onTimeEnd
}) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeEnd();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, onTimeEnd]);
  
  // Рассчитываем процент оставшегося времени
  const percentage = (timeLeft / seconds) * 100;
  
  // Определяем цвет индикатора в зависимости от оставшегося времени
  const getColorClass = () => {
    if (percentage > 50) return 'bg-green-600';
    if (percentage > 20) return 'bg-amber-500';
    return 'bg-red-600';
  };
  
  return (
    <div className="flex items-center space-x-2">
      <Clock size={18} className="text-gray-500" />
      <div className="w-32 h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getColorClass()} transition-all`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-700">{timeLeft} сек</span>
    </div>
  );
};