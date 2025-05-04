// src/components/chat/PhotoAttachment.tsx
import React, { useState, useRef } from 'react';
import { Camera, X, Image } from 'lucide-react';
import Button from '../ui/Button';

interface PhotoAttachmentProps {
  onPhotoSelected: (photo: File | string) => void;
  onPhotoRemove: () => void;
  previewUrl?: string;
}

const PhotoAttachment: React.FC<PhotoAttachmentProps> = ({
  onPhotoSelected,
  onPhotoRemove,
  previewUrl
}) => {
  const [preview, setPreview] = useState<string | null>(previewUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

// Убедитесь, что handleFileSelect правильно обрабатывает файл
const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageUrl = event.target.result as string;
        setPreview(imageUrl);
        // Убедитесь, что передаете либо File, либо строку URL, но не оба
        // Возможно, проблема именно тут:
        onPhotoSelected(imageUrl); // Используйте imageUrl вместо file
      }
    };
    reader.readAsDataURL(file);
  }
};

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onPhotoRemove();
  };

  return (
    <div className="my-2">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileSelect}
      />

      {!preview ? (
        <Button
          variant="outline"
          size="sm"
          onClick={handleButtonClick}
          leftIcon={<Camera size={16} />}
        >
          Прикрепить фото
        </Button>
      ) : (
        <div className="relative inline-block">
          <div className="relative border border-gray-200 rounded-lg overflow-hidden" style={{ maxWidth: '300px' }}>
            <img 
              src={preview} 
              alt="Preview" 
              className="max-w-full h-auto object-contain"
            />
            <button 
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
              onClick={handleRemovePhoto}
            >
              <X size={16} className="text-gray-600" />
            </button>
            <div className="bg-black bg-opacity-50 text-white text-xs py-1 px-2 absolute bottom-0 left-0 right-0">
              <div className="flex items-center">
                <Image size={12} className="mr-1" />
                <span>Прикрепленное фото</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoAttachment;