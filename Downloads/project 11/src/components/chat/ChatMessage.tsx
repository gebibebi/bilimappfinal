// src/components/chat/ChatMessage.tsx
import React, { useState, useEffect } from 'react';
import { Mic, Image, PlayCircle, PauseCircle, CheckCircle, Clock, AlertCircle, ThumbsUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { ChatMessage as ChatMessageType } from '../../types';
import HandwrittenSolution from './HandwrittenSolution';

interface ChatMessageProps {
  message: ChatMessageType;
  onVoiceRecord?: () => void;
  handwrittenSolution?: {
    id: string;
    subject: string;
    title: string;
    imageSrc: string;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  onVoiceRecord, 
  handwrittenSolution 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  
  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      if (onVoiceRecord) {
        onVoiceRecord();
      }
    }, 3000);
  };

  const handleShowAnalysis = () => {
    setAnalysisLoading(true);
    // Имитация загрузки анализа
    setTimeout(() => {
      setAnalysisLoading(false);
      setShowAnalysis(true);
    }, 2000);
  };

  const isUser = message.sender === 'user';
  const hasVoice = message.attachments?.some(att => att.type === 'voice');
  const hasImage = message.attachments?.some(att => att.type === 'image');
  
  // Анализ голосового ответа (псевдо)
  const voiceAnalysis = {
    pace: 'слишком быстрый',
    clarity: 'хорошая',
    confidence: 'средняя',
    content: 'неполный ответ',
    improvements: [
      'Говорите чуть медленнее - это поможет экзаменатору лучше понять ваш ответ',
      'Используйте больше конкретных фактов в ответе',
      'Сделайте паузу перед важными утверждениями для акцента'
    ],
    score: 7.2,
  };
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`px-4 py-3 rounded-lg max-w-[85%] md:max-w-[70%] ${
          isUser 
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}
      >
        {/* Текст сообщения */}
        <p className="text-sm">{message.content}</p>
        
        {/* Голосовое сообщение */}
        {hasVoice && (
          <div className={`mt-2 flex items-center space-x-2 ${isUser ? 'text-blue-100' : 'text-gray-700'}`}>
            <button 
              className={`p-1 rounded-full ${isUser ? 'hover:bg-blue-500' : 'hover:bg-gray-200'}`}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <PauseCircle size={18} />
              ) : (
                <PlayCircle size={18} />
              )}
            </button>
            <div className="flex-1 h-1 bg-gray-300 rounded-full overflow-hidden">
              <div 
                className={`h-full ${isUser ? 'bg-blue-300' : 'bg-blue-500'}`} 
                style={{ width: isPlaying ? '45%' : '0%', transition: 'width 0.1s linear' }}
              />
            </div>
            <span className="text-xs">0:12</span>
          </div>
        )}
        
        {/* Изображение */}
        {hasImage && (
          <div className="mt-2 rounded overflow-hidden">
            <img 
              src={message.attachments?.find(att => att.type === 'image')?.url || ''}
              alt="Вложение"
              className="max-w-full h-auto max-h-60 rounded"
            />
          </div>
        )}

        {/* Handwritten solution */}
        {handwrittenSolution && !isUser && (
          <div className="mt-4">
            <HandwrittenSolution
              solutionId={handwrittenSolution.id}
              subject={handwrittenSolution.subject}
              title={handwrittenSolution.title}
              imageSrc={handwrittenSolution.imageSrc}
            />
          </div>
        )}
        
        {/* Опции для сообщений помощника */}
        {!isUser && message.attachments && (
          <div className="mt-3 flex items-center space-x-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={handleStartRecording}
              leftIcon={<Mic size={16} />}
              className={isRecording ? 'animate-pulse bg-red-50' : ''}
            >
              {isRecording ? 'Запись...' : 'Записать ответ'}
            </Button>
            
            {hasVoice && !showAnalysis && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleShowAnalysis}
                leftIcon={analysisLoading ? <Clock size={16} className="animate-spin" /> : <AlertCircle size={16} />}
                disabled={analysisLoading}
              >
                {analysisLoading ? 'Анализ...' : 'Анализировать ответ'}
              </Button>
            )}
          </div>
        )}
        
        {/* Результаты анализа голоса */}
        <AnimatePresence>
          {showAnalysis && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-700">Анализ вашего ответа</h4>
                  <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    <span className="font-medium">{voiceAnalysis.score}/10</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 rounded p-2">
                    <span className="font-medium text-gray-700">Темп речи:</span>
                    <p className="text-gray-600">{voiceAnalysis.pace}</p>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <span className="font-medium text-gray-700">Чёткость:</span>
                    <p className="text-gray-600">{voiceAnalysis.clarity}</p>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-xs font-medium text-gray-700 mb-1">Рекомендации:</h5>
                  <ul className="space-y-1">
                    {voiceAnalysis.improvements.map((improvement, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-start">
                        <ThumbsUp size={12} className="text-blue-500 mr-1 flex-shrink-0 mt-0.5" />
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAnalysis(false)}
                  >
                    Закрыть
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Время сообщения */}
        <div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;