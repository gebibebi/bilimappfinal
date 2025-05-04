import React from 'react';
import { Languages } from 'lucide-react';
import useUserStore from '../../store/userStore';
import useTranslation from '../../hooks/useTranslation';

interface LanguageSwitcherProps {
  compact?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ compact = false }) => {
  const { language, setLanguage } = useUserStore();
  const { t } = useTranslation();
  
  const handleChangeLanguage = (newLanguage: 'russian' | 'kazakh') => {
    setLanguage(newLanguage);
  };
  
  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        <button
          className={`relative px-2 py-1 rounded-md text-sm font-medium transition-colors ${
            language === 'russian' 
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => handleChangeLanguage('russian')}
        >
          RU
        </button>
        <button
          className={`relative px-2 py-1 rounded-md text-sm font-medium transition-colors ${
            language === 'kazakh' 
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => handleChangeLanguage('kazakh')}
        >
          KZ
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900 mb-3">{t('Language')}</h3>
      <div className="grid grid-cols-2 gap-3">
        <button
          className={`flex items-center space-x-3 p-3 rounded-md border ${
            language === 'russian' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => handleChangeLanguage('russian')}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Languages size={16} />
          </div>
          <span className="text-sm font-medium">{t('Russian')}</span>
        </button>
        
        <button
          className={`flex items-center space-x-3 p-3 rounded-md border ${
            language === 'kazakh' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => handleChangeLanguage('kazakh')}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Languages size={16} />
          </div>
          <span className="text-sm font-medium">{t('Kazakh')}</span>
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;