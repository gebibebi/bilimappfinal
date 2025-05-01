import React, { useState } from 'react';
import { Mic, Calculator, PenTool, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { ChatMessage as ChatMessageType } from '../../types';

interface ChatMessageProps {
  message: ChatMessageType;
  onVoiceRecord?: () => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onVoiceRecord }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showDrawingBoard, setShowDrawingBoard] = useState(false);
  
  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      if (onVoiceRecord) {
        onVoiceRecord();
      }
    }, 3000);
  };

  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`px-4 py-3 rounded-lg max-w-[85%] md:max-w-[70%] ${
          isUser 
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}
      >
        <p className="text-sm">{message.content}</p>
        
        {!isUser && message.attachments && (
          <div className="mt-3 flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleStartRecording}
              leftIcon={<Mic size={16} />}
              className={isRecording ? 'animate-pulse bg-red-50' : ''}
            >
              {isRecording ? 'Запись...' : 'Записать ответ'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCalculator(true)}
              leftIcon={<Calculator size={16} />}
            >
              Калькулятор
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDrawingBoard(true)}
              leftIcon={<PenTool size={16} />}
            >
              Доска
            </Button>
          </div>
        )}
        
        <div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>

      {/* Calculator Modal */}
      <AnimatePresence>
        {showCalculator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40"
            onClick={() => setShowCalculator(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Калькулятор
                </h3>
                <button
                  onClick={() => setShowCalculator(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <input
                  type="text"
                  className="w-full text-right text-2xl font-mono p-2 rounded border-0"
                  readOnly
                  value="0"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((key) => (
                  <button
                    key={key}
                    className="p-4 text-center rounded bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    {key}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawing Board Modal */}
      <AnimatePresence>
        {showDrawingBoard &&(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40"
            onClick={() => setShowDrawingBoard(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Интерактивная доска
                </h3>
                <button
                  onClick={() => setShowDrawingBoard(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="bg-gray-100 rounded-lg" style={{ height: '400px' }}>
                <div className="h-full flex items-center justify-center text-gray-500">
                  Здесь будет интерактивная доска для рисования
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline">
                  Очистить
                </Button>
                <Button variant="primary">
                  Сохранить
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatMessage;