// Mock user profiles for the app
const MOCK_USER_PROFILES = {
  // Administrative Accounts
  "admin1": {
    id: "admin1",
    name: "Администрация BilimApp",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Admin&backgroundColor=0369a1",
    grade: null,
    level: 50,
    title: "Официальный аккаунт",
    followers: 12547,
    following: 0,
    likes: 28954,
    memberSince: "10 января 2020",
    isVerified: true,
    isOfficial: true,
    weeklyActivity: [100, 100, 100, 100, 100, 100, 100], // Always active
    achievements: [
      { name: "Основатель", icon: "Award", description: "Создатель платформы BilimApp" },
      { name: "Разработчик", icon: "Code", description: "Разработка и поддержка платформы" },
      { name: "Эксперт", icon: "Star", description: "Официальный источник информации" }
    ],
    stats: {
      postsCount: 342,
      announcementsCount: 156,
      updatesCount: 87,
      helpfulResourcesCount: 215
    },
    posts: [
      {
        id: 1,
        content: "Объявлены даты ЕНТ 2025 года. Министерство образования утвердило график проведения Единого Национального Тестирования в 2025 году. Основной этап пройдет с 10 по 25 июня.",
        likes: 324,
        comments: 47,
        date: "2 мая 2025"
      },
      {
        id: 2,
        content: "Обновлен перечень вузов-партнеров программы. Теперь студенты имеют больше возможностей для поступления на льготных условиях.",
        likes: 187,
        comments: 23,
        date: "28 апреля 2025"
      },
      {
        id: 3,
        content: "Запущен новый раздел с пробными тестами по всем предметам ЕНТ 2025. Доступно более 500 новых заданий!",
        likes: 459,
        comments: 56,
        date: "15 апреля 2025"
      }
    ]
  },
  
  "admin2": {
    id: "admin2",
    name: "Команда разработчиков",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Dev&backgroundColor=059669",
    grade: null,
    level: 45,
    title: "Техническая поддержка",
    followers: 4328,
    following: 12,
    likes: 9874,
    memberSince: "5 февраля 2020",
    isVerified: true,
    isOfficial: true,
    weeklyActivity: [90, 95, 100, 85, 90, 60, 40], // Work week pattern
    achievements: [
      { name: "Разработчик", icon: "Code", description: "Разработка и поддержка платформы" },
      { name: "Инноватор", icon: "Zap", description: "Внедрение новых технологий и решений" },
      { name: "Решение проблем", icon: "Tool", description: "Более 1000 решенных технических задач" }
    ],
    stats: {
      updatesCount: 128,
      fixesCount: 342,
      featuresCount: 67,
      supportResponsesCount: 1458
    },
    posts: [
      {
        id: 1,
        content: "Обновление платформы BilimApp: ленту новостей, социальные элементы и улучшенную систему антистресса. Обновление уже доступно всем пользователям.",
        likes: 256,
        comments: 32,
        date: "1 мая 2025"
      },
      {
        id: 2,
        content: "Исправлены ошибки в модуле тестирования. Теперь система работает быстрее и стабильнее.",
        likes: 143,
        comments: 21,
        date: "20 апреля 2025"
      },
      {
        id: 3,
        content: "Запущена новая мобильная версия приложения. Доступно в Google Play и App Store.",
        likes: 378,
        comments: 64,
        date: "10 апреля 2025"
      }
    ]
  },
  
  // Regular Users
  "user1": {
    id: "user1",
    name: "Асан Кенжебеков",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AK&backgroundColor=4f46e5",
    grade: 11,
    level: 24,
    title: "Продвинутый ученик",
    followers: 158,
    following: 42,
    likes: 387,
    memberSince: "12 октября 2023",
    isVerified: false,
    isOfficial: false,
    weeklyActivity: [65, 40, 85, 30, 50, 75, 20], // Varied activity
    achievements: [
      { name: "Отличник", icon: "Award", description: "Средний балл 90+ за последние 10 тестов" },
      { name: "Математик", icon: "Calculator", description: "Решено более 500 задач по математике" },
      { name: "Активист", icon: "Users", description: "Активное участие в сообществе" }
    ],
    stats: {
      testsCompleted: 78,
      booksRead: 23,
      pointsEarned: 4750,
      problemsSolved: 842
    },
    posts: [
      {
        id: 1,
        content: "Как я подготовился к ЕНТ за 3 месяца. Я начал готовиться всего за 3 месяца до экзамена, но смог набрать 135 баллов! Вот мои секреты: 1) Ежедневные занятия по 3-4 часа 2) Пробные тесты каждую неделю 3) Использование BilimApp для отработки сложных тем...",
        likes: 189,
        comments: 24,
        date: "30 апреля 2025"
      },
      {
        id: 2,
        content: "Сегодня решил 30 задач по математике! #подготовка #математика",
        likes: 47,
        comments: 8,
        date: "25 апреля 2025"
      },
      {
        id: 3,
        content: "Мой результат по пробному тестированию: 118 баллов! Цель на следующий месяц - 125! #ент #цели",
        likes: 93,
        comments: 14,
        date: "20 апреля 2025"
      }
    ]
  },
  
  "user2": {
    id: "user2",
    name: "Дамир Сериков",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=DS&backgroundColor=be185d",
    grade: 12,
    level: 32,
    title: "Эксперт по физике",
    followers: 243,
    following: 37,
    likes: 592,
    memberSince: "3 сентября 2023",
    isVerified: false,
    isOfficial: false,
    weeklyActivity: [80, 75, 90, 85, 70, 60, 55], // Consistent high activity
    achievements: [
      { name: "Физик", icon: "Atom", description: "Эксперт в решении задач по физике" },
      { name: "Наставник", icon: "Users", description: "Помощь более 50 ученикам в подготовке" },
      { name: "Олимпиадник", icon: "Award", description: "Призер областной олимпиады по физике" }
    ],
    stats: {
      testsCompleted: 104,
      booksRead: 31,
      pointsEarned: 6240,
      problemsSolved: 1247
    },
    posts: [
      {
        id: 1,
        content: "Сборник задач по физике для подготовки к ЕНТ. Все задачи с решениями и разбором сложных моментов.",
        likes: 143,
        comments: 19,
        date: "28 апреля 2025"
      },
      {
        id: 2,
        content: "Разбор сложных заданий по электродинамике. В этом видео я объясняю принципы решения задач по закону Ома и правилам Кирхгофа.",
        likes: 87,
        comments: 13,
        date: "22 апреля 2025"
      },
      {
        id: 3,
        content: "Мои советы по подготовке к физике на ЕНТ: 1. Решайте как можно больше задач 2. Понимайте формулы, а не заучивайте 3. Анализируйте свои ошибки",
        likes: 156,
        comments: 27,
        date: "15 апреля 2025"
      }
    ]
  },
  
  "user3": {
    id: "user3",
    name: "Айгуль Мухамбетова",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AM&backgroundColor=7c3aed",
    grade: 11,
    level: 18,
    title: "Активный участник",
    followers: 87,
    following: 123,
    likes: 214,
    memberSince: "7 января 2024",
    isVerified: false,
    isOfficial: false,
    weeklyActivity: [40, 35, 55, 70, 80, 30, 25], // Weekend drop, midweek peak
    achievements: [
      { name: "Литератор", icon: "Book", description: "Эксперт в литературе и языках" },
      { name: "Общительный", icon: "MessageSquare", description: "Более 200 комментариев" },
      { name: "Новичок года", icon: "Award", description: "Быстрый прогресс в первый год" }
    ],
    stats: {
      testsCompleted: 42,
      booksRead: 19,
      pointsEarned: 2180,
      problemsSolved: 356
    },
    posts: [
      {
        id: 1,
        content: "Мои заметки по литературе для ЕНТ - анализ основных произведений и авторов.",
        likes: 73,
        comments: 12,
        date: "26 апреля 2025"
      },
      {
        id: 2,
        content: "Как я улучшила свой результат по языкам на 20 баллов за месяц. Делюсь лайфхаками!",
        likes: 58,
        comments: 9,
        date: "18 апреля 2025"
      },
      {
        id: 3,
        content: "Подборка полезных ресурсов для изучения казахской литературы. #литература #подготовка",
        likes: 41,
        comments: 7,
        date: "10 апреля 2025"
      }
    ]
  },
  
  "user4": {
    id: "user4",
    name: "Бакыт Ержанов",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=BE&backgroundColor=b45309",
    grade: 12,
    level: 27,
    title: "Будущий медик",
    followers: 192,
    following: 84,
    likes: 431,
    memberSince: "15 августа 2023",
    isVerified: false,
    isOfficial: false,
    weeklyActivity: [70, 75, 80, 70, 65, 50, 60], // Stable high pattern
    achievements: [
      { name: "Биолог", icon: "Thermometer", description: "Эксперт в биологии и химии" },
      { name: "Целеустремленный", icon: "Target", description: "Достижение всех поставленных целей" },
      { name: "Медицинский грант", icon: "Award", description: "Подготовка к поступлению в медицинский" }
    ],
    stats: {
      testsCompleted: 89,
      booksRead: 27,
      pointsEarned: 5120,
      problemsSolved: 732
    },
    posts: [
      {
        id: 1,
        content: "Подборка задач по химии и биологии для подготовки к медицинским вузам.",
        likes: 112,
        comments: 18,
        date: "27 апреля 2025"
      },
      {
        id: 2,
        content: "Мой путь к медицине: как я готовлюсь к поступлению и что нужно знать.",
        likes: 87,
        comments: 23,
        date: "20 апреля 2025"
      },
      {
        id: 3,
        content: "Разбор сложных тем по анатомии. Структурировал материал для удобного запоминания.",
        likes: 69,
        comments: 11,
        date: "12 апреля 2025"
      }
    ]
  },
  
  "user5": {
    id: "user5",
    name: "Мадина Омарова",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=MO&backgroundColor=db2777",
    grade: 10,
    level: 15,
    title: "Начинающий",
    followers: 45,
    following: 124,
    likes: 103,
    memberSince: "20 февраля 2024",
    isVerified: false,
    isOfficial: false,
    weeklyActivity: [30, 20, 45, 50, 60, 70, 35], // Weekend higher
    achievements: [
      { name: "Любознательный", icon: "Search", description: "Активное изучение различных предметов" },
      { name: "Стремительный старт", icon: "Zap", description: "Быстрый прогресс в первые месяцы" }
    ],
    stats: {
      testsCompleted: 31,
      booksRead: 14,
      pointsEarned: 1820,
      problemsSolved: 247
    },
    posts: [
      {
        id: 1,
        content: "Мои впечатления от пробного ЕНТ - что ожидать и как готовиться.",
        likes: 38,
        comments: 7,
        date: "25 апреля 2025"
      },
      {
        id: 2,
        content: "Вопросы по истории Казахстана, которые часто встречаются на тестах.",
        likes: 42,
        comments: 9,
        date: "18 апреля 2025"
      },
      {
        id: 3,
        content: "Как я планирую свое обучение, чтобы успевать по всем предметам. #организация #учеба",
        likes: 27,
        comments: 5,
        date: "10 апреля 2025"
      }
    ]
  },
  
  // Current user (for demonstration)
  "currentUser": {
    id: "currentUser",
    name: "Вы",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=You&backgroundColor=0ea5e9",
    grade: 11,
    level: 21,
    title: "Активный пользователь",
    followers: 73,
    following: 98,
    likes: 219,
    memberSince: "5 декабря 2023",
    isVerified: false,
    isOfficial: false,
    weeklyActivity: [50, 60, 70, 55, 65, 40, 35], // Personal pattern
    achievements: [
      { name: "Разносторонний", icon: "Grid", description: "Изучение всех предметов равномерно" },
      { name: "Социальный", icon: "Users", description: "Активное участие в дискуссиях" }
    ],
    stats: {
      testsCompleted: 52,
      booksRead: 17,
      pointsEarned: 2870,
      problemsSolved: 412
    },
    posts: [
      {
        id: 1,
        content: "Мои заметки по подготовке к ЕНТ по всем предметам - структурированный подход.",
        likes: 47,
        comments: 8,
        date: "24 апреля 2025"
      },
      {
        id: 2,
        content: "Обзор полезных ресурсов для самоподготовки. #самообучение #подготовка",
        likes: 32,
        comments: 6,
        date: "16 апреля 2025"
      },
      {
        id: 3,
        content: "Как я организую свое время для эффективной подготовки и отдыха.",
        likes: 29,
        comments: 5,
        date: "8 апреля 2025"
      }
    ],
    // Subscriptions management - for current user only
    subscriptions: [
      "user1", "user2", "admin1"
    ]
  }
};

export default MOCK_USER_PROFILES;