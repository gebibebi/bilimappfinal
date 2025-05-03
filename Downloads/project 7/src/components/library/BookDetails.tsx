import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, ChevronRight, PlayCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { Book as BookType } from '../../types';

interface BookDetailsProps {
  book: BookType;
  onClose: () => void;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book, onClose }) => {
  const navigate = useNavigate();

  const handleStartAnalysis = () => {
    // Navigate to chat with context
    navigate('/chat', { 
      state: { 
        bookId: book.id,
        action: 'analysis',
        title: `Разбор книги: ${book.title}`,
        bookTopics: getAllTopics(book),
      }
    });
  };

  // Extract all topics from the book details
  const getAllTopics = (book: BookType) => {
    if (!book.details?.contents) return book.topics || [];
    
    const topicsFromContents = book.details.contents.flatMap(section => 
      section.topics || []
    );
    
    return [...new Set([...book.topics, ...topicsFromContents])];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Book size={20} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {book.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Информация</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-gray-500">Предмет</dt>
                  <dd className="font-medium text-gray-900">{book.subject}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Класс</dt>
                  <dd className="font-medium text-gray-900">{book.grade} класс</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Автор</dt>
                  <dd className="font-medium text-gray-900">{book.author}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Издательство</dt>
                  <dd className="font-medium text-gray-900">{book.details?.publisher}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Год издания</dt>
                  <dd className="font-medium text-gray-900">{book.details?.year}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Страниц</dt>
                  <dd className="font-medium text-gray-900">{book.details?.pages}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Язык</dt>
                  <dd className="font-medium text-gray-900">
                    {book.details?.languages?.map(lang => 
                      lang === 'russian' ? 'Русский' : 'Казахский'
                    ).join(' / ') || (book.language === 'russian' ? 'Русский' : 'Казахский')}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Содержание</h3>
              {book.details?.contents ? (
                <div className="space-y-4">
                  {book.details.contents.map((section, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-gray-900">{section.title}</h4>
                      <ul className="mt-2 space-y-1">
                        {section.topics.map((topic, topicIndex) => (
                          <li 
                            key={topicIndex}
                            className="text-sm text-gray-600 flex items-center space-x-1"
                          >
                            <ChevronRight size={14} className="flex-shrink-0" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Основные темы</h4>
                  <ul className="mt-2 space-y-1">
                    {book.topics.map((topic, index) => (
                      <li 
                        key={index}
                        className="text-sm text-gray-600 flex items-center space-x-1"
                      >
                        <ChevronRight size={14} className="flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

         {/* Video lessons section */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="font-medium text-gray-900 mb-3">Видеоуроки по темам</h3>
            <div className="space-y-3">
              {book.details?.contents?.slice(0, 1).map((section, idx) => (
                <div key={idx}>
                  <h4 className="text-sm font-medium text-gray-800">{section.title}</h4>
                  <div className="mt-2 space-y-2">
                    {section.topics.slice(0, 2).map((topic, topicIdx) => (
                      <div key={topicIdx} className="pl-4 border-l-2 border-blue-200">
                        <p className="text-sm font-medium text-gray-700">{topic}</p>
                        <div className="mt-1 space-y-1">
                          <a 
                            href="https://www.youtube.com/watch?v=pJYcI4QADUM" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800"
                          >
                            <PlayCircle size={16} />
                            <span>Как решать {topic.toLowerCase()} за 5 минут (YouTube)</span>
                          </a>
                          <a 
                            href="https://www.youtube.com/watch?v=nYFd7VHKyWQ" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800"
                          >
                            <PlayCircle size={16} />
                            <span>Объяснение {topic.toLowerCase()} от учителя НИШ</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button
              variant="primary"
              onClick={handleStartAnalysis}
              leftIcon={<Book size={18} />}
            >
              Перейти к разбору книги
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookDetails;