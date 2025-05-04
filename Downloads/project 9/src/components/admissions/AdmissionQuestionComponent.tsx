import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HelpCircle, 
  Send,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import useChatStore from '../../store/chatStore';

interface AdmissionQuestionProps {
  className?: string;
}

const AdmissionQuestionComponent: React.FC<AdmissionQuestionProps> = ({ className }) => {
  const [questionInput, setQuestionInput] = useState('');
  const navigate = useNavigate();
  const { createSession } = useChatStore();
  
  const handleAskQuestion = () => {
    if (!questionInput.trim()) return;
    
    // Создаем новый чат с категорией "поступление"
    const chatSession = createSession(
      `Вопрос о поступлении: ${questionInput.slice(0, 30)}${questionInput.length > 30 ? '...' : ''}`,
      'admissions', // Используем новую категорию admissions для вопросов о поступлении
      questionInput
    );
    
    // Перейти в чат с контекстом вопроса
    navigate('/chat', { 
      state: { 
        action: 'admission_question',
        question: questionInput,
        sessionId: chatSession.id
      }
    });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskQuestion();
    }
  };
  
  return (
    <Card className={`bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <HelpCircle className="mr-2 text-green-600" size={20} />
          Не нашли ответа? Спросите BilimAI
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <p className="text-gray-700">
            Задайте любой вопрос о поступлении, и BilimAI постарается на него ответить.
            Например: "Можно ли подать на грант сразу в два университета?" или "Как поступить в зарубежный вуз по программе Болашак?"
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              placeholder="Ваш вопрос о поступлении..."
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button
              variant="primary"
              leftIcon={<Send size={18} />}
              onClick={handleAskQuestion}
              disabled={!questionInput.trim()}
            >
              Спросить
            </Button>
          </div>
          
          <div className="pt-3 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/chat')}
              leftIcon={<MessageSquare size={16} />}
            >
              Перейти ко всем чатам с BilimAI
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdmissionQuestionComponent;