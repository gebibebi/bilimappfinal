import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Filter, Heart } from 'lucide-react';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import useLibraryStore from '../store/libraryStore';
import useUserStore from '../store/userStore';
import { Book } from '../types';
import { setPageTitle } from '../lib/utils';
import { motion } from 'framer-motion';
import BookDetails from '../components/library/BookDetails';

const LibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<number | undefined>(undefined);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'favorites'>('all');
  
  const { getFilteredBooks, toggleFavorite, getAllBooks, getFavoriteBooks, setSelectedBook: storeSetSelectedBook } = useLibraryStore();
  const language = useUserStore(state => state.language);
  
  useEffect(() => {
    // Set page title based on view mode
    setPageTitle(viewMode === 'all' ? 'Библиотека' : 'Мои учебники');
  }, [viewMode]);
  
  const filteredBooks = viewMode === 'all' 
    ? getFilteredBooks(selectedGrade, selectedSubject, searchTerm, language)
    : getFavoriteBooks().filter(book => {
        const matchesGrade = !selectedGrade || book.grade === selectedGrade;
        const matchesSubject = !selectedSubject || book.subject.toLowerCase().includes(selectedSubject.toLowerCase());
        const matchesSearch = !searchTerm || 
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          book.author.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesGrade && matchesSubject && matchesSearch;
      });

  const grades = [
    { value: '1', label: '1 класс' },
    { value: '2', label: '2 класс' },
    { value: '3', label: '3 класс' },
    { value: '4', label: '4 класс' },
    { value: '5', label: '5 класс' },
    { value: '6', label: '6 класс' },
    { value: '7', label: '7 класс' },
    { value: '8', label: '8 класс' },
    { value: '9', label: '9 класс' },
    { value: '10', label: '10 класс' },
    { value: '11', label: '11 класс' },
    { value: '12', label: '12 класс' },
  ];

  const subjects = [
    { value: 'mathematics', label: 'Математика' },
    { value: 'physics', label: 'Физика' },
    { value: 'chemistry', label: 'Химия' },
    { value: 'biology', label: 'Биология' },
    { value: 'history', label: 'История' },
    { value: 'literature', label: 'Литература' },
    { value: 'geography', label: 'География' },
    { value: 'kazakh language', label: 'Казахский язык' },
    { value: 'russian language', label: 'Русский язык' },
    { value: 'english language', label: 'Английский язык' },
  ];
  
  const handleGradeChange = (value: string) => {
    setSelectedGrade(value ? Number(value) : undefined);
  };
  
  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
  };
  
  const clearFilters = () => {
    setSelectedGrade(undefined);
    setSelectedSubject('');
    setSearchTerm('');
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    storeSetSelectedBook(book);
  };
  
  const handleCloseBookDetails = () => {
    setSelectedBook(null);
    storeSetSelectedBook(null);
  };
  
  const renderBookCard = (book: Book) => {
    return (
      <motion.div
        key={book.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden h-full flex flex-col">
          <div className="relative aspect-[3/4]">
            <img 
              src={book.coverUrl} 
              alt={book.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(book.id);
                }}
                className={`flex items-center justify-center h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm transition-colors ${
                  book.isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-gray-600'
                }`}
                aria-label={book.isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
              >
                <Heart size={16} fill={book.isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-medium text-gray-900 line-clamp-2">{book.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{book.author}</p>
            <div className="flex items-center mt-2 space-x-2">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                {book.grade} класс
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                {book.subject}
              </span>
            </div>
            <div className="mt-auto pt-4">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => handleBookClick(book)}
              >
                Подробнее
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{viewMode === 'all' ? 'Библиотека' : 'Мои учебники'}</h1>
          <p className="text-gray-500 mt-1">
            {viewMode === 'all' 
              ? 'Найдите учебники для вашего обучения' 
              : 'Учебники, добавленные в избранное'}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 mr-4">
            <Button
              variant={viewMode === 'all' ? 'primary' : 'outline'}
              onClick={() => setViewMode('all')}
            >
              Все учебники
            </Button>
            <Button
              variant={viewMode === 'favorites' ? 'primary' : 'outline'}
              onClick={() => setViewMode('favorites')}
            >
              Мои учебники
            </Button>
          </div>
          
          <Input
            placeholder="Поиск учебников..."
            leftIcon={<Search size={18} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-auto"
          />
          
          <Button
            variant="outline"
            onClick={toggleFilters}
            leftIcon={<Filter size={18} />}
          >
            Фильтры
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <motion.div 
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Класс"
              options={[{ value: '', label: 'Все классы' }, ...grades]}
              value={selectedGrade?.toString() || ''}
              onChange={handleGradeChange}
            />
            
            <Select
              label="Предмет"
              options={[{ value: '', label: 'Все предметы' }, ...subjects]}
              value={selectedSubject}
              onChange={handleSubjectChange}
            />
            
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-auto"
              >
                Сбросить фильтры
              </Button>
            </div>
          </div>
        </motion.div>
      )}
      
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map(renderBookCard)}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <BookOpen size={24} className="text-gray-500" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {viewMode === 'all' ? 'Учебники не найдены' : 'У вас нет избранных учебников'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {viewMode === 'all'
              ? 'Попробуйте изменить фильтры или поисковый запрос.'
              : 'Добавьте учебники в избранное, нажав на значок сердечка.'}
          </p>
          <div className="mt-6">
            {viewMode === 'all' ? (
              <Button variant="outline" onClick={clearFilters}>
                Сбросить фильтры
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setViewMode('all')}>
                Перейти в библиотеку
              </Button>
            )}
          </div>
        </div>
      )}
      
      {selectedBook && (
        <BookDetails 
          book={selectedBook} 
          onClose={handleCloseBookDetails} 
        />
      )}
    </div>
  );
};

export default LibraryPage;