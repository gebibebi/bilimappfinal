import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Camera, 
  X, 
  RefreshCw
} from 'lucide-react';
import Button from '../ui/Button';

interface VoiceChatInputProps {
  onMessageSend: (content: string, audioBlob?: Blob, image?: string) => void;
  isLoading?: boolean;
  onVoiceRecord?: () => void;
}

const VoiceChatInput: React.FC<VoiceChatInputProps> = ({ 
  onMessageSend,
  isLoading = false,
  onVoiceRecord
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [messageInput, setMessageInput] = useState('');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);
  
  useEffect(() => {
    if (showCamera && videoRef.current) {
      const enableCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error('Ошибка доступа к камере:', err);
        }
      };
      
      enableCamera();
      
      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [showCamera]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const toggleRecording = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      if (onVoiceRecord) {
        onVoiceRecord();
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];
        
        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
        
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
          setAudioBlob(audioBlob);
          
          stream.getTracks().forEach(track => track.stop());
        };
        
        mediaRecorder.start();
        setIsRecording(true);
        setRecordingTime(0);
      } catch (err) {
        console.error('Ошибка при записи аудио:', err);
      }
    }
  };
  
  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      setCapturedImage(canvas.toDataURL('image/jpeg'));
      setShowCamera(false);
    }
  };
  
  const handleSendMessage = () => {
    let content = messageInput.trim();
    if (!content && audioBlob) {
      content = "[Голосовое сообщение]";
    }
    
    if (content || audioBlob || capturedImage) {
      onMessageSend(content, audioBlob || undefined, capturedImage || undefined);
      setMessageInput('');
      setAudioBlob(null);
      setCapturedImage(null);
    }
  };
  
  const handleCancel = () => {
    if (isRecording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    setAudioBlob(null);
    setCapturedImage(null);
  };
  
  return (
    <div className="border-t border-gray-200 p-4">
      {showCamera ? (
        <div className="space-y-4 mb-4">
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              className="w-full rounded-lg"
              style={{ maxHeight: '300px' }}
            />
          </div>
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setShowCamera(false)}
              leftIcon={<X size={16} />}
            >
              Отмена
            </Button>
            <Button
              variant="primary"
              onClick={captureImage}
              leftIcon={<Camera size={16} />}
            >
              Сделать снимок
            </Button>
          </div>
        </div>
      ) : null}
      
      {(audioBlob || capturedImage) && !isRecording && !showCamera ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {audioBlob && (
            <div className="flex items-center p-2 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2">
                <Mic size={16} className="text-blue-600" />
                <span className="text-sm text-blue-700">Голосовое сообщение ({formatTime(recordingTime)})</span>
              </div>
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={handleCancel}
              >
                <X size={16} />
              </button>
            </div>
          )}
          
          {capturedImage && (
            <div className="relative">
              <img 
                src={capturedImage} 
                alt="Снимок"
                className="h-16 w-16 object-cover rounded-lg border border-gray-200"
              />
              <button
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-gray-200 text-gray-500 hover:text-gray-700"
                onClick={() => setCapturedImage(null)}
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      ) : null}
      
      <div className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Введите сообщение..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            disabled={isRecording || isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          
          {isRecording && (
            <div className="absolute right-3 top-2 flex items-center space-x-2">
              <span className="animate-pulse text-red-500 text-sm font-medium">
                {formatTime(recordingTime)}
              </span>
              <div className="h-2 w-2 rounded-full bg-red-500 animate-ping"></div>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={toggleRecording}
            className={`voice-input-button ${isRecording ? 'text-red-500 border-red-300 bg-red-50' : ''}`}
          >
            {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowCamera(true)}
            disabled={isRecording || isLoading}
          >
            <Camera size={18} />
          </Button>
          
          <Button
            variant="primary"
            onClick={handleSendMessage}
            disabled={(!messageInput.trim() && !audioBlob && !capturedImage) || isLoading}
          >
            {isLoading ? <RefreshCw size={18} className="animate-spin" /> : "Отправить"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatInput;