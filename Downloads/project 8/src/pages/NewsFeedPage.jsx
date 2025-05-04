import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell,
  MessageSquare, 
  Heart, 
  Eye, 
  Share2, 
  Filter, 
  Users, 
  Flag,
  Plus,
  Search,
  ThumbsUp,
  Bookmark,
  Clock,
  TrendingUp,
  X,
  UserPlus,
  UserCheck
} from 'lucide-react';

// Import mock profiles and user profile service
import MOCK_USER_PROFILES from '../data/mockUserProfiles';
import UserProfileService from '../services/UserProfileService';

// Mock data for news feed
const MOCK_NEWS = [
  {
    id: '1',
    type: 'official',
    title: 'Объявлены даты ЕНТ 2025 года',
    content: 'Министерство образования утвердило график проведения Единого Национального Тестирования в 2025 году. Основной этап пройдет с 10 по 25 июня.',
    author: {
      id: 'admin1',
      name: 'Администрация BilimApp',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Admin&backgroundColor=0369a1',
      isVerified: true
    },
    publishedAt: '2025-05-02T10:15:00Z',
    likes: 324,
    comments: 47,
    views: 1528,
    isOfficial: true,
  },
  {
    id: '2',
    type: 'official',
    title: 'Обновление платформы BilimApp',
    content: 'Мы рады представить новый функционал платформы: ленту новостей, социальные элементы и улучшенную систему антистресса. Обновление уже доступно всем пользователям.',
    author: {
      id: 'admin2',
      name: 'Команда разработчиков',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Dev&backgroundColor=059669',
      isVerified: true
    },
    publishedAt: '2025-05-01T14:30:00Z',
    likes: 256,
    comments: 32,
    views: 983,
    isOfficial: true,
  },
  {
    id: '3',
    type: 'user',
    title: 'Как я подготовился к ЕНТ за 3 месяца',
    content: 'Хочу поделиться своим опытом быстрой подготовки к ЕНТ. Я начал готовиться всего за 3 месяца до экзамена, но смог набрать 135 баллов! Вот мои секреты: 1) Ежедневные занятия по 3-4 часа 2) Пробные тесты каждую неделю 3) Использование BilimApp для отработки сложных тем...',
    author: {
      id: 'user1',
      name: 'Асан Кенжебеков',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AK&backgroundColor=4f46e5',
      isVerified: false
    },
    publishedAt: '2025-04-30T09:22:00Z',
    likes: 189,
    comments: 24,
    views: 752,
    isOfficial: false,
  },
  {
    id: '4',
    type: 'user',
    title: 'Сборник задач по физике',
    content: 'Я составил сборник задач по физике для подготовки к ЕНТ. Все задачи с решениями и разбором сложных моментов. Пользуйтесь и оставляйте комментарии, если что-то непонятно. Буду рад помочь!',
    author: {
      id: 'user2',
      name: 'Дамир Сериков',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DS&backgroundColor=be185d',
      isVerified: false
    },
    publishedAt: '2025-04-28T15:46:00Z',
    likes: 143,
    comments: 19,
    views: 529,
    isOfficial: false,
  }
];

// Mock comments data
const MOCK_COMMENTS = {
  '1': [
    {
      id: 'c1',
      postId: '1',
      text: 'Нужно начинать готовиться уже сейчас!',
      author: {
        id: 'user3',
        name: 'Айгуль Мухамбетова',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AM&backgroundColor=7c3aed'
      },
      likes: 21,
      publishedAt: '2025-05-02T11:23:00Z'
    },
    {
      id: 'c2',
      postId: '1',
      text: 'А будет ли пробное ЕНТ в этом году раньше?',
      author: {
        id: 'user4',
        name: 'Бакыт Ержанов',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=BE&backgroundColor=b45309'
      },
      likes: 13,
      publishedAt: '2025-05-02T12:54:00Z'
    }
  ],
  '3': [
    {
      id: 'c3',
      postId: '3',
      text: 'Спасибо за советы! А какие учебники ты использовал?',
      author: {
        id: 'user5',
        name: 'Мадина Омарова',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MO&backgroundColor=db2777'
      },
      likes: 8,
      publishedAt: '2025-04-30T10:12:00Z'
    }
  ]
};

const NewsFeedPage = () => {
  const navigate = useNavigate(); // Add React Router's navigate hook
  const [activeTab, setActiveTab] = useState('all');
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [expandedPost, setExpandedPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  
  // Local copy of data for interaction simulation
  const [news, setNews] = useState(MOCK_NEWS);
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [error, setError] = useState('');
  
  // User subscription states
  const [authorSubscriptions, setAuthorSubscriptions] = useState({});
  
  useEffect(() => {
    document.title = 'Новостная лента | BilimApp';
    
    // Initialize subscription states for all authors
    const subscriptionStates = {};
    news.forEach(post => {
      subscriptionStates[post.author.id] = UserProfileService.isSubscribedTo(post.author.id);
    });
    Object.values(comments).flat().forEach(comment => {
      subscriptionStates[comment.author.id] = UserProfileService.isSubscribedTo(comment.author.id);
    });
    setAuthorSubscriptions(subscriptionStates);
  }, []);
  
  // Handle navigation to user profile
  const navigateToProfile = (userId) => {
    // Navigate to profile page with userId
    navigate(`/profile/${userId}`);
  };
  
  // Toggle subscription for a user
  const toggleSubscription = (userId, event) => {
    event.stopPropagation(); // Prevent navigation to profile
    
    try {
      const result = UserProfileService.toggleSubscription(userId);
      
      // Update local state
      setAuthorSubscriptions(prev => ({
        ...prev,
        [userId]: result.isSubscribed
      }));
      
      // Update news data to reflect changes
      setNews(news.map(post => 
        post.author.id === userId 
          ? { 
              ...post, 
              author: { 
                ...post.author,
                followerCount: result.followerCount 
              } 
            } 
          : post
      ));
    } catch (error) {
      console.error('Error toggling subscription:', error);
    }
  };
  
  // Filter news based on criteria
  const getFilteredNews = () => {
    let filtered = [...news];
    
    // Filter by content type
    if (activeTab === 'official') {
      filtered = filtered.filter(item => item.isOfficial);
    } else if (activeTab === 'community') {
      filtered = filtered.filter(item => !item.isOfficial);
    }
    
    // Additional filters
    if (filterBy === 'popular') {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (filterBy === 'recent') {
      filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (filterBy === 'following') {
      filtered = filtered.filter(item => authorSubscriptions[item.author.id]);
    }
    
    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        item => item.title.toLowerCase().includes(term) || 
                item.content.toLowerCase().includes(term) ||
                item.author.name.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  };
  
  // Handle likes
  const handleLike = (postId) => {
    setNews(news.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 } 
        : post
    ));
  };
  
  // Validate text (check for profanity)
  const validateText = (text) => {
    // In a real app, this would be a more sophisticated algorithm
    const badWords = ['мат', 'бран'];
    return !badWords.some(word => text.toLowerCase().includes(word));
  };
  
  // Add new post
  const handleAddPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      setError('Заполните все поля');
      return;
    }
    
    if (!validateText(newPostTitle) || !validateText(newPostContent)) {
      setError('Пост содержит недопустимые выражения. Пожалуйста, отредактируйте его.');
      return;
    }
    
    const newPost = {
      id: `new-${Date.now()}`,
      type: 'user',
      title: newPostTitle,
      content: newPostContent,
      author: {
        id: 'currentUser',
        name: 'Вы',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=You&backgroundColor=0ea5e9',
        isVerified: false
      },
      publishedAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      views: 1,
      isOfficial: false,
    };
    
    setNews([newPost, ...news]);
    setNewPostTitle('');
    setNewPostContent('');
    setShowPostForm(false);
    setError('');
  };
  
  // Add comment
  const handleAddComment = (postId) => {
    if (!newComment.trim()) return;
    
    if (!validateText(newComment)) {
      setError('Комментарий содержит недопустимые выражения');
      return;
    }
    
    const newCommentObj = {
      id: `c-${Date.now()}`,
      postId,
      text: newComment,
      author: {
        id: 'currentUser',
        name: 'Вы',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=You&backgroundColor=0ea5e9'
      },
      likes: 0,
      publishedAt: new Date().toISOString()
    };
    
    const updatedComments = { ...comments };
    if (updatedComments[postId]) {
      updatedComments[postId] = [newCommentObj, ...updatedComments[postId]];
    } else {
      updatedComments[postId] = [newCommentObj];
    }
    
    setComments(updatedComments);
    setNewComment('');
    setError('');
    
    // Update comment count
    setNews(news.map(post => 
      post.id === postId 
        ? { ...post, comments: post.comments + 1 } 
        : post
    ));
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const filteredNews = getFilteredNews();
  
  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Новостная лента</h1>
          <p className="text-gray-500 mt-1">Будьте в курсе последних событий и общайтесь с сообществом</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative w-full md:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Поиск в ленте..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowPostForm(true)}
          >
            <Plus size={18} className="mr-2" />
            Создать пост
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div>
        <div className="flex justify-between items-center mb-4 border-b border-gray-200">
          <div className="flex space-x-1">
            <button
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'all' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('all')}
            >
              Все
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'official' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('official')}
            >
              Официальные
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'community' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('community')}
            >
              От сообщества
            </button>
          </div>
          
          <select
            className="h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="all">Все</option>
            <option value="popular">Популярные</option>
            <option value="recent">Недавние</option>
            <option value="following">От подписок</option>
          </select>
        </div>
        
        {/* Post creation form */}
        {showPostForm && (
          <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Создание нового поста</h3>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Заголовок
                  </label>
                  <input
                    type="text"
                    placeholder="Введите заголовок поста..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Содержание
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Напишите содержание поста..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                  />
                </div>
                
                {error && (
                  <div className="rounded-md bg-red-50 p-3">
                    <div className="flex">
                      <div className="text-sm text-red-600">
                        {error}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-2">
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    onClick={() => {
                      setShowPostForm(false);
                      setError('');
                    }}
                  >
                    Отмена
                  </button>
                  <button 
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    onClick={handleAddPost}
                  >
                    Опубликовать
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* News feed content */}
        <div className="space-y-4">
          {filteredNews.length > 0 ? (
            filteredNews.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-6">
                <div className="flex items-start space-x-4">
                  {/* Author Profile Section */}
                  <div className="relative">
                    {/* Add onClick to avatar image with cursor pointer styling */}
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="h-12 w-12 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-blue-300 transition"
                      onClick={() => navigateToProfile(post.author.id)}
                      title={`Профиль: ${post.author.name}`}
                    />
                    
                    {/* Subscribe button overlay */}
                    {post.author.id !== 'currentUser' && (
                      <button
                        className={`absolute -bottom-1 -right-1 rounded-full p-1 shadow-md ${
                          authorSubscriptions[post.author.id] 
                            ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        onClick={(e) => toggleSubscription(post.author.id, e)}
                        title={authorSubscriptions[post.author.id] ? "Отписаться" : "Подписаться"}
                      >
                        {authorSubscriptions[post.author.id] ? (
                          <UserCheck size={14} />
                        ) : (
                          <UserPlus size={14} />
                        )}
                      </button>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {/* Make author name clickable too */}
                      <h3 
                        className="font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition"
                        onClick={() => navigateToProfile(post.author.id)}
                      >
                        {post.author.name}
                      </h3>
                      {post.author.isVerified && (
                        <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                      {post.isOfficial && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          Официально
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatDate(post.publishedAt)}
                    </p>
                    
                    <div className="mt-3">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                      <p className="text-gray-700">
                        {expandedPost === post.id 
                          ? post.content 
                          : post.content.length > 200 
                            ? `${post.content.substring(0, 200)}...` 
                            : post.content
                        }
                      </p>
                      {post.content.length > 200 && expandedPost !== post.id && (
                        <button 
                          className="text-blue-600 text-sm mt-1 hover:text-blue-800"
                          onClick={() => setExpandedPost(post.id)}
                        >
                          Читать дальше
                        </button>
                      )}
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button 
                          className="flex items-center space-x-1 text-gray-500 hover:text-blue-600"
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart size={18} className="text-gray-400" />
                          <span>{post.likes}</span>
                        </button>
                        
                        <button 
                          className="flex items-center space-x-1 text-gray-500 hover:text-blue-600"
                          onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                        >
                          <MessageSquare size={18} className="text-gray-400" />
                          <span>{post.comments}</span>
                        </button>
                        
                        <div className="flex items-center space-x-1 text-gray-500">
                          <Eye size={18} className="text-gray-400" />
                          <span>{post.views}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Share2 size={18} />
                        </button>
                        
                        <button className="text-gray-400 hover:text-gray-600">
                          <Bookmark size={18} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Comments section */}
                    {expandedPost === post.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Комментарии</h4>
                        
                        <div className="flex space-x-2 mb-4">
                          <img 
                            src="https://api.dicebear.com/7.x/initials/svg?seed=You&backgroundColor=0ea5e9" 
                            alt="You"
                            className="h-8 w-8 rounded-full object-cover" 
                          />
                          <div className="flex-1">
                            <textarea
                              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                              rows={2}
                              placeholder="Напишите комментарий..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                            />
                            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
                            <div className="flex justify-end mt-2">
                              <button 
                                className="px-3 py-1 text-xs border border-transparent rounded-md shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                onClick={() => handleAddComment(post.id)}
                              >
                                Отправить
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Comments list with clickable avatars and subscription buttons */}
                        <div className="space-y-3">
                          {comments[post.id]?.map((comment) => (
                            <div key={comment.id} className="flex space-x-2">
                              <div className="relative">
                                <img 
                                  src={comment.author.avatar} 
                                  alt={comment.author.name}
                                  className="h-8 w-8 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-blue-300 transition" 
                                  onClick={() => navigateToProfile(comment.author.id)}
                                  title={`Профиль: ${comment.author.name}`}
                                />
                                
                                {/* Comment author subscribe button (smaller) */}
                                {comment.author.id !== 'currentUser' && (
                                  <button
                                    className={`absolute -bottom-1 -right-1 rounded-full p-0.5 shadow-sm ${
                                      authorSubscriptions[comment.author.id] 
                                        ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                    onClick={(e) => toggleSubscription(comment.author.id, e)}
                                    title={authorSubscriptions[comment.author.id] ? "Отписаться" : "Подписаться"}
                                  >
                                    {authorSubscriptions[comment.author.id] ? (
                                      <UserCheck size={10} />
                                    ) : (
                                      <UserPlus size={10} />
                                    )}
                                  </button>
                                )}
                              </div>
                              
                              <div className="flex-1 bg-gray-50 rounded-md p-3">
                                <div className="flex items-center justify-between">
                                  <span 
                                    className="font-medium text-sm text-gray-900 cursor-pointer hover:text-blue-600 transition"
                                    onClick={() => navigateToProfile(comment.author.id)}
                                  >
                                    {comment.author.name}
                                  </span>
                                  <span className="text-xs text-gray-500">{formatDate(comment.publishedAt)}</span>
                                </div>
                                <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                                <div className="flex items-center mt-2 text-xs text-gray-500">
                                  <button className="flex items-center space-x-1 hover:text-blue-600">
                                    <ThumbsUp size={14} />
                                    <span>{comment.likes}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {!comments[post.id] || comments[post.id].length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-2">
                              Пока нет комментариев. Будьте первым!
                            </p>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Bell size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Новости не найдены
              </h3>
              <p className="text-gray-500 mt-1">
                {searchTerm 
                  ? 'Попробуйте изменить параметры поиска' 
                  : 'Будьте первым, кто опубликует новость!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsFeedPage;