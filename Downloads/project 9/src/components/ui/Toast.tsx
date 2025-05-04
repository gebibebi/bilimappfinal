import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 5000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const variants = {
    initial: { opacity: 0, y: 50, scale: 0.3 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } }
  };

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-900';
      case 'warning':
        return 'bg-amber-100 border-amber-500 text-amber-900';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-900';
      default:
        return 'bg-blue-100 border-blue-500 text-blue-900';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`fixed bottom-4 right-4 max-w-sm w-full shadow-lg rounded-lg border-l-4 ${getToastStyles()}`}
      >
        <div className="p-4 flex items-start">
          <div className="flex-1 mr-4">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;