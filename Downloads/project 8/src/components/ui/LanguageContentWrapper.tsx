import React, { ReactNode } from 'react';
import useUserStore from '../../store/userStore';

interface LanguageContentWrapperProps {
  children: ReactNode;
  russianContent: ReactNode;
  kazakhContent: ReactNode;
}

/**
 * Component that conditionally renders content based on the selected language
 * 
 * @param {ReactNode} children - Default content to show if no specific language content is provided
 * @param {ReactNode} russianContent - Content to show when Russian language is selected
 * @param {ReactNode} kazakhContent - Content to show when Kazakh language is selected
 * @returns {ReactNode} The content appropriate for the selected language
 */
const LanguageContentWrapper: React.FC<LanguageContentWrapperProps> = ({
  children,
  russianContent,
  kazakhContent
}) => {
  const { language } = useUserStore();
  
  // Return content based on the selected language
  if (language === 'kazakh' && kazakhContent) {
    return <>{kazakhContent}</>;
  }
  
  if (language === 'russian' && russianContent) {
    return <>{russianContent}</>;
  }
  
  // Default fallback
  return <>{children}</>;
};

export default LanguageContentWrapper;