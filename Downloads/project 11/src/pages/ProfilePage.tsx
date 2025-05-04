import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import { 
  Camera, 
  Heart, 
  Users, 
  Award, 
  BookOpen, 
  Calendar, 
  Clock, 
  BarChart2,
  MessageSquare,
  UserPlus,
  UserCheck,
  Share2,
  Star,
  AtSign,
  Zap,
  Search
} from 'lucide-react';

// Import mock profiles
import MOCK_USER_PROFILES from '../data/mockUserProfiles';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user: currentUser } = useUserStore();
  
  // If userId is provided, show that user's profile, otherwise show current user's profile
  const viewingUserId = userId || currentUser?.id || 'currentUser';
  const isOwnProfile = !userId || userId === currentUser?.id;
  
  // State for profile data
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionCount, setSubscriptionCount] = useState({ followers: 0, following: 0 });
  const [showSubscribers, setShowSubscribers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  
  // Fetch profile data
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchProfileData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call with timeout
        setTimeout(() => {
          // Get profile data from mock data
          const profile = MOCK_USER_PROFILES[viewingUserId] || MOCK_USER_PROFILES['currentUser'];
          
          // Check if current user is subscribed to this profile
          const isAlreadySubscribed = MOCK_USER_PROFILES['currentUser']?.subscriptions?.includes(viewingUserId);
          
          setProfileData(profile);
          setIsSubscribed(isAlreadySubscribed);
          setSubscriptionCount({
            followers: profile.followers,
            following: profile.following
          });
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setIsLoading(false);
      }
    };
    
    fetchProfileData();
  }, [viewingUserId]);
  
  // Handle subscription toggle
  const handleSubscription = () => {
    if (isSubscribed) {
      // Unsubscribe logic
      setIsSubscribed(false);
      setSubscriptionCount(prev => ({
        ...prev,
        followers: prev.followers - 1
      }));
    } else {
      // Subscribe logic
      setIsSubscribed(true);
      setSubscriptionCount(prev => ({
        ...prev,
        followers: prev.followers + 1
      }));
    }
  };
  
  // Avatar upload handler (pseudofunction)
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this to your server
      // For now, we'll just create a local URL
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData({
          ...profileData,
          avatar: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Calculate progress to next level
  const progressToNextLevel = 75; // As a percentage
  
  // Week days for activity chart
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  
  // Show subscribers modal
  const toggleSubscribersModal = () => {
    setShowSubscribers(!showSubscribers);
    if (showFollowing) setShowFollowing(false);
  };
  
  // Show following modal
  const toggleFollowingModal = () => {
    setShowFollowing(!showFollowing);
    if (showSubscribers) setShowSubscribers(false);
  };
  
  // Navigate to user profile
  const navigateToProfile = (userId) => {
    navigate(`/profile/${userId}`);
    // Close any open modals
    setShowSubscribers(false);
    setShowFollowing(false);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!profileData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Профиль не найден</h2>
          <p className="text-gray-500 mt-2">Пользователь не существует или был удален</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => navigate('/home')}
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="md:flex items-start">
          {/* Avatar section */}
          <div className="md:w-1/4 flex flex-col items-center mb-6 md:mb-0">
            <div className="relative group">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {profileData.avatar ? (
                  <img src={profileData.avatar} alt="User avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl text-gray-500">👤</span>
                )}
              </div>
              
              {isOwnProfile && (
                <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-600 transition">
                  <Camera size={16} />
                  <input type="file" className="hidden" onChange={handleAvatarUpload} accept="image/*" />
                </label>
              )}
            </div>
            
            {/* Level indicator */}
            <div className="mt-4 w-full max-w-[160px]">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Уровень {profileData.level}</span>
                <span className="text-gray-500">+{100 - progressToNextLevel}%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-blue-500 rounded-full" 
                  style={{ width: `${progressToNextLevel}%` }}
                ></div>
              </div>
            </div>
            
            {/* Title/Rank */}
            <div className="mt-3 flex items-center">
              <Award size={16} className="text-yellow-500 mr-1" />
              <span className="text-sm text-gray-700">{profileData.title}</span>
            </div>
            
            {/* Subscribe button - only show if not own profile */}
            {!isOwnProfile && (
              <button
                onClick={handleSubscription}
                className={`mt-4 w-full max-w-[160px] flex items-center justify-center gap-2 py-2 px-4 rounded-md transition ${
                  isSubscribed 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isSubscribed ? (
                  <>
                    <UserCheck size={16} />
                    <span>Вы подписаны</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={16} />
                    <span>Подписаться</span>
                  </>
                )}
              </button>
            )}
          </div>
          
          {/* User Info */}
          <div className="md:w-3/4 md:pl-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
              
              {/* Share profile button */}
              <button className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition">
                <Share2 size={20} />
              </button>
            </div>
            
            <div className="flex flex-wrap items-center mt-2 text-gray-600">
              {profileData.grade && (
                <div className="flex items-center mr-4 mb-2">
                  <BookOpen size={16} className="mr-1" />
                  <span className="text-sm">{profileData.grade} класс</span>
                </div>
              )}
              <div className="flex items-center mr-4 mb-2">
                <Calendar size={16} className="mr-1" />
                <span className="text-sm">С нами с {profileData.memberSince}</span>
              </div>
              <div className="flex items-center mb-2">
                <Clock size={16} className="mr-1" />
                <span className="text-sm">Онлайн сегодня</span>
              </div>
              
              {/* Verification badge if applicable */}
              {profileData.isVerified && (
                <div className="ml-2 flex items-center mb-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                  <Star size={12} className="mr-1" />
                  <span>Подтвержденный</span>
                </div>
              )}
              
              {/* Official badge if applicable */}
              {profileData.isOfficial && (
                <div className="ml-2 flex items-center mb-2 bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                  <Zap size={12} className="mr-1" />
                  <span>Официальный</span>
                </div>
              )}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-4 md:max-w-md">
              <div 
                className="bg-gray-50 p-3 rounded-lg text-center cursor-pointer hover:bg-gray-100 transition"
                onClick={toggleSubscribersModal}
              >
                <p className="text-gray-600 text-sm">Подписчики</p>
                <div className="flex items-center justify-center mt-1">
                  <Users size={14} className="text-blue-500 mr-1" />
                  <p className="text-xl font-bold text-gray-900">{subscriptionCount.followers}</p>
                </div>
              </div>
              <div 
                className="bg-gray-50 p-3 rounded-lg text-center cursor-pointer hover:bg-gray-100 transition"
                onClick={toggleFollowingModal}
              >
                <p className="text-gray-600 text-sm">Подписки</p>
                <div className="flex items-center justify-center mt-1">
                  <Users size={14} className="text-green-500 mr-1" />
                  <p className="text-xl font-bold text-gray-900">{profileData.following}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-gray-600 text-sm">Лайки</p>
                <div className="flex items-center justify-center mt-1">
                  <Heart size={14} className="text-red-500 mr-1" />
                  <p className="text-xl font-bold text-gray-900">{profileData.likes}</p>
                </div>
              </div>
            </div>
            
            {/* Weekly Activity Chart */}
            <div className="mt-6">
              <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                <BarChart2 size={18} className="mr-1 text-blue-500" />
                Активность на неделе
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-end h-32 gap-1">
                  {profileData.weeklyActivity.map((activity, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-blue-400 rounded-t"
                        style={{ height: `${activity}%` }}
                      ></div>
                      <span className="text-xs mt-1 text-gray-500">{weekDays[index]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Achievements Section */}
      {profileData.achievements && profileData.achievements.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Award size={18} className="mr-2 text-yellow-500" />
            Достижения
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {profileData.achievements.map((achievement, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                  {achievement.icon === 'Award' && <Award size={20} />}
                  {achievement.icon === 'Star' && <Star size={20} />}
                  {achievement.icon === 'Users' && <Users size={20} />}
                  {achievement.icon === 'Zap' && <Zap size={20} />}
                  {achievement.icon === 'Search' && <Search size={20} />}
                  {achievement.icon === 'Code' && <AtSign size={20} />}
                  {achievement.icon === 'Book' && <BookOpen size={20} />}
                  {achievement.icon === 'Calculator' && <Zap size={20} />}
                  {achievement.icon === 'Tool' && <Zap size={20} />}
                  {achievement.icon === 'MessageSquare' && <MessageSquare size={20} />}
                  {achievement.icon === 'Grid' && <Zap size={20} />}
                  {achievement.icon === 'Thermometer' && <Zap size={20} />}
                  {achievement.icon === 'Atom' && <Zap size={20} />}
                  {achievement.icon === 'Target' && <Zap size={20} />}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{achievement.name}</h3>
                  <p className="text-xs text-gray-500">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Learning Stats */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Статистика обучения</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">Выполнено тестов</p>
            <p className="text-2xl font-bold text-gray-900">{profileData.stats?.testsCompleted || 0}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">Прочитано книг</p>
            <p className="text-2xl font-bold text-gray-900">{profileData.stats?.booksRead || 0}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">Заработано баллов</p>
            <p className="text-2xl font-bold text-gray-900">{profileData.stats?.pointsEarned || 0}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">Решено задач</p>
            <p className="text-2xl font-bold text-gray-900">{profileData.stats?.problemsSolved || 0}</p>
          </div>
        </div>
      </div>
      
      {/* Posts Feed */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Публикации</h2>
        
        {profileData.posts && profileData.posts.length > 0 ? (
          <div className="space-y-4">
            {profileData.posts.map(post => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                <p className="text-gray-900 mb-3">{post.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Heart size={14} className="text-red-500 mr-1" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare size={14} className="text-blue-500 mr-1" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  <span>{post.date}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Нет публикаций</p>
          </div>
        )}
        
        {/* Load more button */}
        {profileData.posts && profileData.posts.length > 0 && (
          <div className="mt-6 text-center">
            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition">
              Загрузить еще
            </button>
          </div>
        )}
      </div>
      
      {/* Subscribers Modal */}
      {showSubscribers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium">Подписчики · {subscriptionCount.followers}</h3>
              <button 
                className="text-gray-400 hover:text-gray-600" 
                onClick={() => setShowSubscribers(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="overflow-y-auto p-4 flex-grow">
              {/* Mock subscribers for demonstration */}
              {Object.values(MOCK_USER_PROFILES)
                .filter(p => p.id !== viewingUserId && p.id !== 'currentUser')
                .slice(0, 4)
                .map(subscriber => (
                  <div 
                    key={subscriber.id} 
                    className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-md cursor-pointer"
                    onClick={() => navigateToProfile(subscriber.id)}
                  >
                    <div className="flex items-center">
                      <img 
                        src={subscriber.avatar} 
                        alt={subscriber.name} 
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{subscriber.name}</p>
                        <p className="text-xs text-gray-500">{subscriber.title}</p>
                      </div>
                    </div>
                    <button 
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Subscription logic would go here
                      }}
                    >
                      Посмотреть
                    </button>
                  </div>
                ))}
              {subscriptionCount.followers > 4 && (
                <div className="text-center py-3 text-gray-500 text-sm">
                  <p>Показаны 4 из {subscriptionCount.followers} подписчиков</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Following Modal */}
      {showFollowing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium">Подписки · {profileData.following}</h3>
              <button 
                className="text-gray-400 hover:text-gray-600" 
                onClick={() => setShowFollowing(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="overflow-y-auto p-4 flex-grow">
              {/* Mock following for demonstration */}
              {Object.values(MOCK_USER_PROFILES)
                .filter(p => p.id !== viewingUserId && p.id !== 'currentUser')
                .slice(0, 4)
                .map(following => (
                  <div 
                    key={following.id} 
                    className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-md cursor-pointer"
                    onClick={() => navigateToProfile(following.id)}
                  >
                    <div className="flex items-center">
                      <img 
                        src={following.avatar} 
                        alt={following.name} 
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{following.name}</p>
                        <p className="text-xs text-gray-500">{following.title}</p>
                      </div>
                    </div>
                    <button 
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Unfollow logic would go here
                      }}
                    >
                      Посмотреть
                    </button>
                  </div>
                ))}
              {profileData.following > 4 && (
                <div className="text-center py-3 text-gray-500 text-sm">
                  <p>Показаны 4 из {profileData.following} подписок</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;