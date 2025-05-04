import React, { useState } from 'react';
import { QuestionDisplayProps } from './types';
import { Card, CardContent } from '../../components/ui/Card';
import { ChevronRight } from 'lucide-react';

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  onAnswer
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const handleOptionClick = (optionId: string) => {
    if (isSubmitting) return;
    
    setSelectedOption(optionId);
    setIsSubmitting(true);
    
    // Эмуляция небольшой задержки перед отправкой ответа
    setTimeout(() => {
      onAnswer(optionId);
    }, 500);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-medium text-gray-900 mb-4">{question.text}</h3>
          
          <div className="grid grid-cols-1 gap-3">
            {question.options.map(option => (
              <button
                key={option.id}
                className={`p-4 rounded-lg border ${
                  selectedOption === option.id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                } transition-colors text-left flex justify-between items-center`}
                onClick={() => handleOptionClick(option.id)}
                disabled={isSubmitting}
              >
                <div className="flex items-center space-x-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    selectedOption === option.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {option.id.toUpperCase()}
                  </div>
                  <span className={selectedOption === option.id ? 'font-medium' : ''}>{option.text}</span>
                </div>
                
                {selectedOption === option.id && (
                  <ChevronRight size={20} className="text-indigo-600" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};