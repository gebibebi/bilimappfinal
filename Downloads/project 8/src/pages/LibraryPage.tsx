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
import useTranslation from '../hooks/useTranslation';

const LibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<number | undefined>(undefined);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'favorites'>('all');
  
  const { getFilteredBooks, toggleFavorite, getAllBooks, getFavoriteBooks, setSelectedBook: storeSetSelectedBook } = useLibraryStore();
  const { language } = useUserStore();
  const { t } = useTranslation();
  
  useEffect(() => {
    // Set page title based on view mode
    setPageTitle(viewMode === 'all' ? t('Library') : t('My Textbooks'));
  }, [viewMode, t]);
  
  const filteredBooks = viewMode === 'all' 
    ? getFilteredBooks(selectedGrade, selectedSubject, searchTerm, language)
    : getFavoriteBooks().filter(book => {
        // Filter books to show only those in the user's selected language
        const matchesGrade = !selectedGrade || book.grade === selectedGrade;
        const matchesSubject = !selectedSubject || book.subject.toLowerCase().includes(selectedSubject.toLowerCase());
        const matchesSearch = !searchTerm || 
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLanguage = !language || book.language === language;
        
        return matchesGrade && matchesSubject && matchesSearch && matchesLanguage;
      });

  const grades = [
    { value: '1', label: `1 ${t('grade')}` },
    { value: '2', label: `2 ${t('grade')}` },
    { value: '3', label: `3 ${t('grade')}` },
    { value: '4', label: `4 ${t('grade')}` },
    { value: '5', label: `5 ${t('grade')}` },
    { value: '6', label: `6 ${t('grade')}` },
    { value: '7', label: `7 ${t('grade')}` },
    { value: '8', label: `8 ${t('grade')}` },
    { value: '9', label: `9 ${t('grade')}` },
    { value: '10', label: `10 ${t('grade')}` },
    { value: '11', label: `11 ${t('grade')}` },
    { value: '12', label: `12 ${t('grade')}` },
  ];

  const subjects = [
    { value: 'mathematics', label: t('Mathematics') },
    { value: 'physics', label: t('Physics') },
    { value: 'chemistry', label: t('Chemistry') },
    { value: 'biology', label: t('Biology') },
    { value: 'history', label: t('World History') },
    { value: 'literature', label: t('Literature') },
    { value: 'geography', label: t('Geography') },
    { value: 'kazakh language', label: t('Kazakh Language') },
    { value: 'russian language', label: t('Russian Language') },
    { value: 'english language', label: t('Foreign Language') },
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
        <Card className="book-card overflow-hidden h-full flex flex-col">
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
                aria-label={book.isFavorite ? t('Remove from favorites') : t('Add to favorites')}
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
                {book.grade} {t('grade')}
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
                {t('Details')}
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
          <h1 className="text-2xl font-bold text-gray-900">{viewMode === 'all' ? t('Library') : t('My Textbooks')}</h1>
          <p className="text-gray-500 mt-1">
            {viewMode === 'all' 
              ? t('Find textbooks for your education') 
              : t('Textbooks added to favorites')}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 mr-4">
            <Button
              variant={viewMode === 'all' ? 'primary' : 'outline'}
              onClick={() => setViewMode('all')}
            >
              {t('All textbooks')}
            </Button>
            <Button
              variant={viewMode === 'favorites' ? 'primary' : 'outline'}
              onClick={() => setViewMode('favorites')}
            >
              {t('My textbooks')}
            </Button>
          </div>
          
          <Input
            placeholder={t('Search for textbooks...')}
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
            {t('Filters')}
          </Button>
        </div>
      </div>
      
      {showFilters && (
       <motion.div 
  className="library-filters bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
  initial={{ opacity: 0, height: 0 }}
  animate={{ opacity: 1, height: 'auto' }}
  exit={{ opacity: 0, height: 0 }}
>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label={t('Grade')}
              options={[{ value: '', label: t('All grades') }, ...grades]}
              value={selectedGrade?.toString() || ''}
              onChange={handleGradeChange}
            />
            
            <Select
              label={t('Subject')}
              options={[{ value: '', label: t('All subjects') }, ...subjects]}
              value={selectedSubject}
              onChange={handleSubjectChange}
            />
            
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-auto"
              >
                {t('Reset filters')}
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
            {viewMode === 'all' ? t('No textbooks found') : t('You have no favorite textbooks')}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {viewMode === 'all'
              ? t('Try changing the filters or search query.')
              : t('Add textbooks to favorites by clicking on the heart icon.')}
          </p>
          <div className="mt-6">
            {viewMode === 'all' ? (
              <Button variant="outline" onClick={clearFilters}>
                {t('Reset filters')}
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setViewMode('all')}>
                {t('Go to library')}
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