// src/components/chat/HandwrittenSolution.tsx
import React, { useState, useEffect } from 'react';
import { FileText, Download, ZoomIn, ZoomOut } from 'lucide-react';
import Button from '../ui/Button';

interface HandwrittenSolutionProps {
  solutionId: string;
  subject: string;
  title: string;
  imageSrc: string;
  className?: string;
}

const HandwrittenSolution: React.FC<HandwrittenSolutionProps> = ({
  solutionId,
  subject,
  title,
  imageSrc,
  className
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    setZoomLevel(1); // Reset zoom level when toggling fullscreen
  };

  const increaseZoom = () => {
    if (zoomLevel < 2.5) {
      setZoomLevel(prev => prev + 0.25);
    }
  };

  const decreaseZoom = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(prev => prev - 0.25);
    }
  };

  // Handle download of the handwritten solution
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `${subject}-${title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`rounded-lg border border-gray-200 overflow-hidden bg-gray-50 ${className}`}>
      <div className="p-3 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
        <div className="flex items-center">
          <FileText size={18} className="text-blue-600 mr-2" />
          <div>
            <h3 className="font-medium text-blue-900 text-sm">{title}</h3>
            <p className="text-xs text-blue-700">{subject}</p>
          </div>
        </div>
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleZoom}
            leftIcon={<ZoomIn size={16} />}
            className="px-2 py-1 h-8"
          >
            {isZoomed ? 'Свернуть' : 'Увеличить'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            leftIcon={<Download size={16} />}
            className="px-2 py-1 h-8"
          >
            Скачать
          </Button>
        </div>
      </div>

      <div 
        className={`relative p-2 bg-white transition-all ${
          isZoomed ? 'fixed inset-0 z-50 p-4 bg-black bg-opacity-75 flex items-center justify-center' : ''
        }`}
        onClick={isZoomed ? toggleZoom : undefined}
      >
        <div 
          className={`${isZoomed ? 'relative max-w-3xl w-full mx-auto' : ''}`}
          onClick={isZoomed ? e => e.stopPropagation() : undefined}
        >
          <img 
            src={imageSrc} 
            alt={title}
            className="w-full h-auto rounded border border-gray-200"
            style={{ 
              transform: isZoomed ? `scale(${zoomLevel})` : 'none',
              transformOrigin: 'center',
              transition: 'transform 0.2s ease-in-out'
            }}
          />

          {isZoomed && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg p-1 flex items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={decreaseZoom}
                className="rounded-full p-1 h-8 w-8"
              >
                <ZoomOut size={16} />
              </Button>
              <span className="mx-2 text-sm font-medium">{Math.round(zoomLevel * 100)}%</span>
              <Button
                variant="outline"
                size="sm"
                onClick={increaseZoom}
                className="rounded-full p-1 h-8 w-8"
              >
                <ZoomIn size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="px-3 py-2 text-xs text-gray-500 border-t border-gray-200">
        Решение #{solutionId} • сгенерировано BilimAI
      </div>
    </div>
  );
};

export default HandwrittenSolution;