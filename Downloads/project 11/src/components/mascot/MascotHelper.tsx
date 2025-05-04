// src/components/mascot/MascotHelper.tsx
import React, { useState } from 'react';

interface MascotHelperProps {
  tipText: string;
  mascotImage?: string;
  position?: 'left' | 'right';
  onClose?: () => void;
}

const MascotHelper: React.FC<MascotHelperProps> = ({ 
  tipText, 
  mascotImage = "/assets/mascot-sticker.png",
  position = "right",
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={`fixed bottom-8 z-50 flex items-end ${position === 'right' ? 'right-8' : 'left-8'}`}
      style={{ transition: 'all 0.3s ease' }}
    >
      {/* Tip Bubble */}
      <div className={`bg-white rounded-xl p-4 shadow-lg border-2 border-blue-200 max-w-xs ${position === "right" ? "mr-4" : "ml-4"}`}>
        <p className="text-gray-800 text-sm">{tipText}</p>
        <button 
          className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 text-xs rounded-full bg-gray-100 w-5 h-5 flex items-center justify-center"
          onClick={handleClose}
        >
          ×
        </button>
        {/* Small triangle for speech bubble effect */}
        <div 
          className={`absolute ${position === "right" ? "right-[-8px]" : "left-[-8px]"} bottom-4 w-0 h-0 border-solid border-transparent ${position === "right" ? "border-l-white border-l-8" : "border-r-white border-r-8"} border-y-8`}
        ></div>
      </div>

      {/* Mascot Image */}
      <div 
        className="relative animate-bounce"
        style={{ animation: 'bounce 2s infinite', transformOrigin: 'center bottom' }}
      >
        <img 
          src={mascotImage} 
          alt="Helper Mascot" 
          className="w-20 h-20 object-contain" 
        />
      </div>
    </div>
  );
};

export default MascotHelper;