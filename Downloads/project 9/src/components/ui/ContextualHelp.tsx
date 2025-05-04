// src/components/ui/ContextualHelp.tsx
import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ContextualHelpProps {
  title: string;
  description: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  offset?: number;
  width?: number;
  className?: string;
  showDismissButton?: boolean;
  children?: React.ReactNode;
}

const ContextualHelp: React.FC<ContextualHelpProps> = ({
  title,
  description,
  position = 'top',
  offset = 8,
  width = 240,
  className,
  showDismissButton = true,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleHelp = () => {
    setIsOpen(!isOpen);
  };
  
  const handleDismiss = () => {
    setIsOpen(false);
  };
  
  // Calculate positioning styles based on the position prop
  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: offset
        };
      case 'right':
        return {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: offset
        };
      case 'bottom':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: offset
        };
      case 'left':
        return {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: offset
        };
      default:
        return {};
    }
  };
  
  // Add a little arrow/triangle indicator that points to the element
  const getArrowStyles = () => {
    const baseStyles = {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid'
    };
    
    switch (position) {
      case 'top':
        return {
          ...baseStyles,
          bottom: -6,
          left: '50%',
          marginLeft: -6,
          borderWidth: '6px 6px 0 6px',
          borderColor: 'white transparent transparent transparent'
        };
      case 'right':
        return {
          ...baseStyles,
          left: -6,
          top: '50%',
          marginTop: -6,
          borderWidth: '6px 6px 6px 0',
          borderColor: 'transparent white transparent transparent'
        };
      case 'bottom':
        return {
          ...baseStyles,
          top: -6,
          left: '50%',
          marginLeft: -6,
          borderWidth: '0 6px 6px 6px',
          borderColor: 'transparent transparent white transparent'
        };
      case 'left':
        return {
          ...baseStyles,
          right: -6,
          top: '50%',
          marginTop: -6,
          borderWidth: '6px 0 6px 6px',
          borderColor: 'transparent transparent transparent white'
        };
      default:
        return {};
    }
  };
  
  return (
    <div className="relative inline-block">
      {children || (
        <button
          onClick={toggleHelp}
          className={cn(
            "flex items-center justify-center rounded-full p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors",
            className
          )}
          aria-label="Показать подсказку"
        >
          <HelpCircle size={18} />
        </button>
      )}
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 bg-white rounded-lg shadow-lg p-3"
            style={{ ...getPositionStyles(), width: width }}
          >
            <div className="flex items-start justify-between mb-1">
              <h4 className="font-medium text-gray-900 text-sm">{title}</h4>
              {showDismissButton && (
                <button
                  onClick={handleDismiss}
                  className="text-gray-400 hover:text-gray-600 -mr-1 -mt-1"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <p className="text-xs text-gray-600">{description}</p>
            <div style={getArrowStyles() as React.CSSProperties} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContextualHelp;