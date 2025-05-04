import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TestTube, 
  GraduationCap, 
  FileText, 
  CheckCircle2, 
  BookOpen,
  Trophy,
  Zap,
  Gamepad2,
  UsersRound,
  Languages
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { setPageTitle } from '../lib/utils';
import useUserStore from '../store/userStore';

// Import test section components directly rather than using index.ts
import EntTestingSection from '../components/test/EntTestingSection';
import SchoolTestingSection from '../components/test/SchoolTestingSection';
import SorSochTestingSection from '../components/test/SorSochTestingSection';
import IeltsTestingSection from '../components/test/IeltsTestingSection';
import JoinMultiplayerSection from '../components/test/JoinMultiplayerSection';
import EducationalQuestsComponent from '../components/quest/EducationalQuestsComponent';

// Define tab types
type TestingTab = 'ent' | 'school' | 'sor' | 'ielts' | 'quests' | 'multiplayer';

const TestingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TestingTab>('ent');
  const user = useUserStore(state => state.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    setPageTitle('Тестирование');
  }, []);
  
  // Render the appropriate section based on activeTab
// Render the appropriate section based on activeTab
  const renderActiveSection = () => {
    switch (activeTab) {
      case 'ent':
        return <EntTestingSection />;
      case 'school':
        return <SchoolTestingSection />;
      case 'sor':
        return <SorSochTestingSection />;
      case 'ielts':
        return <IeltsTestingSection />;
      case 'quests':
        return <EducationalQuestsComponent />;
      case 'multiplayer':
        return <JoinMultiplayerSection />;
      default:
        return <EntTestingSection />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Тестирование</h1>
          <p className="text-gray-500 mt-1">Пробные тесты, оценки и образовательные игры</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeTab === 'ent' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('ent')}
            leftIcon={<GraduationCap size={16} />}
          >
            Тесты ЕНТ
          </Button>
          <Button
            variant={activeTab === 'school' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('school')}
            leftIcon={<FileText size={16} />}
          >
            Школьные тесты
          </Button>
          <Button
            variant={activeTab === 'sor' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('sor')}
            leftIcon={<CheckCircle2 size={16} />}
          >
            СОР/СОЧ
          </Button>
          <Button
            variant={activeTab === 'ielts' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('ielts')}
            leftIcon={<Languages size={16} />}
          >
            IELTS
          </Button>
          <Button
            variant={activeTab === 'quests' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('quests')}
            leftIcon={<Gamepad2 size={16} />}
          >
            Учебные битвы
          </Button>
          <Button
            variant={activeTab === 'multiplayer' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('multiplayer')}
            leftIcon={<UsersRound size={16} />}
          >
            Мультиплеер
          </Button>
        </div>
      </div>
      
      {/* Render active section */}
      {renderActiveSection()}
      
      {/* Promotional banner for educational quests feature */}
      {activeTab !== 'quests' && activeTab !== 'multiplayer' && (
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <Trophy size={24} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-indigo-900">Попробуйте новый формат тестирования!</h3>
              <p className="text-indigo-700 mt-1">
                Теперь вы можете проверить свои знания в формате увлекательных битв с виртуальными соперниками. 
                Сразитесь в математических дуэлях и покажите, кто лучше знает предмет!
              </p>
              <Button
                variant="primary"
                className="mt-3 bg-indigo-600 hover:bg-indigo-700"
                onClick={() => setActiveTab('quests')}
                leftIcon={<Zap size={18} />}
              >
                Перейти к учебным битвам
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestingPage;