import React from 'react';
import { Languages } from 'lucide-react';
import useUserStore from '../../store/userStore';
import useTranslation from '../../hooks/useTranslation';

interface LanguageIndicatorProps {
  showLabel?: boolean;
  className?: string;
}

/**
 * A component that displays the currently selected language
 * 
 * @param {boolean} showLabel - Whether to show the full language name (true) or just the abbreviation (false)
 * @param {string} className - Additional CSS classes
 */
const LanguageIndicator: React.FC<LanguageIndicatorProps> = ({ 
  showLabel = true,
  className = ''
}) => {
  const { language } = useUserStore();
  const { t } = useTranslation();
  
  return (
    <div className={`flex items-center ${className}`}>
      <Languages size={16} className="text-gray-500 mr-1" />
      {showLabel ? (
        <span className="text-sm font-medium">
          {language === 'kazakh' ? t('Kazakh') : t('Russian')}
        </span>
      ) : (
        <span className="text-xs font-bold">
          {language === 'kazakh' ? 'KZ' : 'RU'}
        </span>
      )}
    </div>
  );
};

export default LanguageIndicator;