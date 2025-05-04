import { create } from 'zustand';
import { Book } from '../types';

const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Алгебра 9',
    author: 'Абылкасымова Т.',
    grade: 9,
    subject: 'Математика',
    language: 'russian',
    coverUrl: 'https://mektep.kz/images/w/norm/500/66de1a9259f990f8df424e31d8ee6741.jpg',
    topics: ['Квадратные уравнения', 'Функции и графики', 'Системы уравнений'],
    isFavorite: true,
    details: {
      publisher: 'Атамұра',
      year: 2019,
      pages: 384,
      languages: ['russian', 'kazakh'],
      contents: [
        {
          title: 'Глава 1: Квадратичная функция',
          topics: [
            'Квадратные уравнения',
            'График квадратичной функции',
            'Решение неравенств'
          ]
        },
        {
          title: 'Глава 2: Прогрессии',
          topics: [
            'Арифметическая прогрессия',
            'Геометрическая прогрессия',
            'Бесконечные последовательности'
          ]
        }
      ]
    }
  },
  {
    id: '2',
    title: 'Информатика 9',
    author: 'Кашкаров В.',
    grade: 9,
    subject: 'Информатика',
    language: 'russian',
    coverUrl: 'https://mari-home.kz/image/cache/catalog/atamurakaz/9synyp/14-800x800.jpg',
    topics: ['Системы счисления', 'Программирование на Python', 'Базы данных'],
    isFavorite: true,
    details: {
      publisher: 'Атамұра',
      year: 2019,
      pages: 272,
      languages: ['russian', 'kazakh'],
      contents: [
        {
          title: 'Раздел 1: Компьютерные системы',
          topics: [
            'Архитектура компьютера',
            'Процессоры и память',
            'Периферийные устройства'
          ]
        },
        {
          title: 'Раздел 2: Системы счисления',
          topics: [
            'Двоичная система',
            'Восьмеричная система',
            'Шестнадцатеричная система'
          ]
        }
      ]
    }
  },
  {
    id: '3',
    title: 'Физика 9',
    author: 'Башаров Р.',
    grade: 9,
    subject: 'Физика',
    language: 'russian',
    coverUrl: 'https://images.satu.kz/207821074_w640_h640_9-synyp-fizika.jpg',
    topics: ['Механика', 'Электричество', 'Оптика'],
    isFavorite: false,
    details: {
      publisher: 'Атамұра',
      year: 2019,
      pages: 320,
      languages: ['russian', 'kazakh'],
      contents: [
        {
          title: 'Раздел 1: Механика',
          topics: [
            'Кинематика',
            'Динамика',
            'Законы сохранения'
          ]
        },
        {
          title: 'Раздел 2: Электричество',
          topics: [
            'Электростатика',
            'Постоянный ток',
            'Магнитное поле'
          ]
        }
      ]
    }
  },
  {
    id: '4',
    title: 'Химия 9',
    author: 'Нурахметов Н.',
    grade: 9,
    subject: 'Химия',
    language: 'russian',
    coverUrl: 'https://mektep.kz/images/w/norm/500/2cf436c8b27c262559e9af1287c5a4ad.jpg',
    topics: ['Периодический закон', 'Химическая связь', 'Растворы'],
    isFavorite: false,
    details: {
      publisher: 'Атамұра',
      year: 2019,
      pages: 288,
      languages: ['russian', 'kazakh'],
      contents: [
        {
          title: 'Раздел 1: Периодический закон',
          topics: [
            'Строение атома',
            'Периодическая система',
            'Химические элементы'
          ]
        }
      ]
    }
  },
  {
    id: '5',
    title: 'Биология 9',
    author: 'Асанов Н.',
    grade: 9,
    subject: 'Биология',
    language: 'russian',
    coverUrl: 'https://images.satu.kz/207821044_9-klass-biologiya.jpg',
    topics: ['Клетка', 'Генетика', 'Эволюция'],
    isFavorite: false,
    details: {
      publisher: 'Атамұра',
      year: 2019,
      pages: 272,
      languages: ['russian', 'kazakh'],
      contents: [
        {
          title: 'Раздел 1: Клетка',
          topics: [
            'Строение клетки',
            'Деление клетки',
            'Обмен веществ'
          ]
        }
      ]
    }
  },
  {
    id: '6',
    title: 'География 9',
    author: 'Каримов М.',
    grade: 9,
    subject: 'География',
    language: 'russian',
    coverUrl: 'https://resources.cdn-kaspi.kz/img/m/p/h8e/h4c/86986936680478.png?format=gallery-large',
    topics: ['Физическая география', 'Экономическая география', 'Картография'],
    isFavorite: false,
    details: {
      publisher: 'Атамұра',
      year: 2019,
      pages: 256,
      languages: ['russian', 'kazakh'],
      contents: [
        {
          title: 'Раздел 1: Физическая география',
          topics: [
            'Рельеф',
            'Климат',
            'Гидрография'
          ]
        }
      ]
    }
  }
];

interface LibraryState {
  books: Book[];
  favoriteBooks: Book[];
  selectedBook: Book | null;
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setSelectedBook: (book: Book | null) => void;
  getFilteredBooks: (grade?: number, subject?: string, searchTerm?: string, language?: string) => Book[];
  getAllBooks: () => Book[];
  getFavoriteBooks: () => Book[];
}

const useLibraryStore = create<LibraryState>((set, get) => ({
  books: mockBooks,
  favoriteBooks: mockBooks.filter(book => book.isFavorite),
  selectedBook: null,
  
  addBook: (book) => set((state) => ({
    books: [...state.books, book],
    favoriteBooks: book.isFavorite 
      ? [...state.favoriteBooks, book] 
      : state.favoriteBooks,
  })),
  
  removeBook: (id) => set((state) => ({
    books: state.books.filter(book => book.id !== id),
    favoriteBooks: state.favoriteBooks.filter(book => book.id !== id),
  })),
  
  toggleFavorite: (id) => set((state) => {
    const updatedBooks = state.books.map(book => 
      book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
    );
    
    return {
      books: updatedBooks,
      favoriteBooks: updatedBooks.filter(book => book.isFavorite),
    };
  }),
  
  setSelectedBook: (book) => set({ selectedBook: book }),
  
  getFilteredBooks: (grade, subject, searchTerm, language) => {
    const { books } = get();
    return books.filter(book => {
      const matchesGrade = !grade || book.grade === grade;
      const matchesSubject = !subject || book.subject.toLowerCase().includes(subject.toLowerCase());
      const matchesSearch = !searchTerm || 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLanguage = !language || book.language === language;
      
      return matchesGrade && matchesSubject && matchesSearch && matchesLanguage;
    });
  },
  
  getAllBooks: () => get().books,
  
  getFavoriteBooks: () => get().favoriteBooks,
}));

export default useLibraryStore;