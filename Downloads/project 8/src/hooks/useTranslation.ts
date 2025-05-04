// src/hooks/useTranslation.ts
import { useCallback } from 'react';
import useUserStore from '../store/userStore';

// Translation dictionary
const translations: Record<string, Record<string, string>> = {
  // Navigation items
  'Home': {
    kazakh: 'Басты бет',
    russian: 'Главная'
  },
  'News Feed': {
    kazakh: 'Жаңалықтар',
    russian: 'Лента'
  },
  'My Textbooks': {
    kazakh: 'Менің оқулықтарым',
    russian: 'Мои учебники'
  },
  'Library': {
    kazakh: 'Кітапхана',
    russian: 'Библиотека'
  },
  'My Chat': {
    kazakh: 'Менің чатым',
    russian: 'Мой чат'
  },
  'My Progress': {
    kazakh: 'Менің үлгерімім',
    russian: 'Мой прогресс'
  },
  'My Assignments': {
    kazakh: 'Менің тапсырмаларым',
    russian: 'Мои задания'
  },
  'Testing': {
    kazakh: 'Тестілеу',
    russian: 'Тестирование'
  },
  'Admissions': {
    kazakh: 'Оқуға түсу',
    russian: 'Поступление'
  },
  'Settings': {
    kazakh: 'Параметрлер',
    russian: 'Настройки'
  },
  'Profile': {
    kazakh: 'Профиль',
    russian: 'Профиль'
  },
  
  // Common buttons and messages
  'Continue': {
    kazakh: 'Жалғастыру',
    russian: 'Продолжить'
  },
  'Cancel': {
    kazakh: 'Болдырмау',
    russian: 'Отмена'
  },
  'Save': {
    kazakh: 'Сақтау',
    russian: 'Сохранить'
  },
  'Next': {
    kazakh: 'Келесі',
    russian: 'Далее'
  },
  'Back': {
    kazakh: 'Артқа',
    russian: 'Назад'
  },
  'Send': {
    kazakh: 'Жіберу',
    russian: 'Отправить'
  },
  'Search': {
    kazakh: 'Іздеу',
    russian: 'Поиск'
  },
  'Details': {
    kazakh: 'Егжей-тегжейлі',
    russian: 'Подробнее'
  },
  'Login': {
    kazakh: 'Кіру',
    russian: 'Войти'
  },
  'Logout': {
    kazakh: 'Шығу',
    russian: 'Выйти'
  },
  
  // Welcome messages
  'Good morning': {
    kazakh: 'Қайырлы таң',
    russian: 'Доброе утро'
  },
  'Good afternoon': {
    kazakh: 'Қайырлы күн',
    russian: 'Добрый день'
  },
  'Good evening': {
    kazakh: 'Қайырлы кеш',
    russian: 'Добрый вечер'
  },
  'Are you ready to continue your education?': {
    kazakh: 'Оқуыңызды жалғастыруға дайынсыз ба?',
    russian: 'Готова продолжить свое обучение?'
  },
  
  // Registration and onboarding
  'Welcome to BilimApp': {
    kazakh: 'BilimApp-қа қош келдіңіз',
    russian: 'Добро пожаловать в BilimApp'
  },
  'Let\'s set up your profile to get started': {
    kazakh: 'Бастау үшін профиліңізді баптайық',
    russian: 'Давайте настроим ваш профиль для начала работы'
  },
  'Full Name': {
    kazakh: 'Толық аты-жөні',
    russian: 'Полное имя'
  },
  'Grade': {
    kazakh: 'Сынып',
    russian: 'Класс'
  },
  'Language of instruction': {
    kazakh: 'Оқыту тілі',
    russian: 'Язык обучения'
  },
  'Let\'s personalize your experience': {
    kazakh: 'Сіздің тәжірибеңізді жекелендірейік',
    russian: 'Давайте персонализируем ваш опыт'
  },
  'Help us adapt BilimApp to your needs': {
    kazakh: 'BilimApp-ті сіздің қажеттіліктеріңізге бейімдеуге көмектесіңіз',
    russian: 'Помогите нам адаптировать BilimApp под ваши нужды'
  },
  
  // Learning Goals
  'What is your main educational goal?': {
    kazakh: 'Сіздің негізгі оқу мақсатыңыз қандай?',
    russian: 'Какова ваша основная учебная цель?'
  },
  'Preparing for UNT': {
    kazakh: 'ҰБТ-ға дайындық',
    russian: 'Подготовка к ЕНТ'
  },
  'Preparing for the Unified National Testing': {
    kazakh: 'Ұлттық Бірыңғай Тестілеуге дайындық',
    russian: 'Подготовка к Единому Национальному Тестированию'
  },
  'Academic Performance': {
    kazakh: 'Мектептегі үлгерім',
    russian: 'Успеваемость в школе'
  },
  'Improving grades and academic performance': {
    kazakh: 'Бағалар мен академиялық үлгерімді жақсарту',
    russian: 'Улучшение оценок и академической успеваемости'
  },
  'Olympiad Preparation': {
    kazakh: 'Олимпиадаға дайындық',
    russian: 'Подготовка к олимпиадам'
  },
  'Preparation for academic competitions': {
    kazakh: 'Академиялық жарыстарға дайындық',
    russian: 'Подготовка к академическим соревнованиям'
  },
  
  // Subject selection
  'Choose two profile subjects': {
    kazakh: 'Екі профильді пәнді таңдаңыз',
    russian: 'Выберите два профильных предмета'
  },
  'These will be your specialized subjects for UNT': {
    kazakh: 'Бұл сіздің ҰБТ-ға арналған мамандандырылған пәндеріңіз болады',
    russian: 'Это будут ваши специализированные предметы для ЕНТ'
  },
  'These will be subjects for in-depth study': {
    kazakh: 'Бұл тереңдетіп оқытуға арналған пәндер болады',
    russian: 'Это будут предметы для углубленного изучения'
  },
  'Mathematics': {
    kazakh: 'Математика',
    russian: 'Математика'
  },
  'Physics': {
    kazakh: 'Физика',
    russian: 'Физика'
  },
  'Chemistry': {
    kazakh: 'Химия',
    russian: 'Химия'
  },
  'Biology': {
    kazakh: 'Биология',
    russian: 'Биология'
  },
  'Geography': {
    kazakh: 'География',
    russian: 'География'
  },
  'Computer Science': {
    kazakh: 'Информатика',
    russian: 'Информатика'
  },
  'World History': {
    kazakh: 'Дүниежүзі тарихы',
    russian: 'Всемирная история'
  },
  'Foreign Language': {
    kazakh: 'Шет тілі',
    russian: 'Иностранный язык'
  },
  
  // Schedule setup
  'Set your study schedule': {
    kazakh: 'Оқу кестеңізді орнатыңыз',
    russian: 'Установите свое учебное расписание'
  },
  'Choose the days and times when you can study': {
    kazakh: 'Оқи алатын күндер мен уақыттарды таңдаңыз',
    russian: 'Выберите дни и время, когда вы можете заниматься'
  },
  'Monday': {
    kazakh: 'Дүйсенбі',
    russian: 'Понедельник'
  },
  'Tuesday': {
    kazakh: 'Сейсенбі',
    russian: 'Вторник'
  },
  'Wednesday': {
    kazakh: 'Сәрсенбі',
    russian: 'Среда'
  },
  'Thursday': {
    kazakh: 'Бейсенбі',
    russian: 'Четверг'
  },
  'Friday': {
    kazakh: 'Жұма',
    russian: 'Пятница'
  },
  'Saturday': {
    kazakh: 'Сенбі',
    russian: 'Суббота'
  },
  'Sunday': {
    kazakh: 'Жексенбі',
    russian: 'Воскресенье'
  },
  'Start time': {
    kazakh: 'Басталу уақыты',
    russian: 'Время начала'
  },
  'End time': {
    kazakh: 'Аяқталу уақыты',
    russian: 'Время окончания'
  },
  
  // Completion message
  'Your personalized study plan is ready!': {
    kazakh: 'Сіздің жеке оқу жоспарыңыз дайын!',
    russian: 'Ваш персональный учебный план готов!'
  },
  'We\'ve created an individualized study plan based on your preferences.': {
    kazakh: 'Біз сіздің қалауыңыз негізінде жеке оқу жоспарын жасадық.',
    russian: 'Мы создали индивидуальный учебный план на основе ваших предпочтений.'
  },
  'Start learning': {
    kazakh: 'Оқуды бастау',
    russian: 'Начать обучение'
  },
  
  // Home page
  'Today\'s goal': {
    kazakh: 'Бүгінгі мақсат',
    russian: 'Сегодняшняя цель'
  },
  'Take a UNT practice test': {
    kazakh: 'ҰБТ практикалық тестін орындау',
    russian: 'Выполнить пробное ЕНТ тестирование'
  },
  'Study Streak': {
    kazakh: 'Оқу жолағы',
    russian: 'Study Streak'
  },
  'days': {
    kazakh: 'күн',
    russian: 'дней'
  },
  'Next test': {
    kazakh: 'Келесі тест',
    russian: 'Следующий тест'
  },
  
  // Quick actions
  'Quick actions': {
    kazakh: 'Жылдам әрекеттер',
    russian: 'Быстрые действия'
  },
  'Start UNT test': {
    kazakh: 'ҰБТ тестін бастау',
    russian: 'Начать тест ЕНТ'
  },
  'questions': {
    kazakh: 'сұрақтар',
    russian: 'вопросов'
  },
  'Ask BilimAI': {
    kazakh: 'BilimAI-дан сұрау',
    russian: 'Спросить BilimAI'
  },
  'Homework help': {
    kazakh: 'Үй тапсырмасына көмек',
    russian: 'Помощь с домашкой'
  },
  'My textbooks': {
    kazakh: 'Менің оқулықтарым',
    russian: 'Мои учебники'
  },
  'Saved books': {
    kazakh: 'Сақталған кітаптар',
    russian: 'Сохраненные книги'
  },
  
  // Learning progress
  'Learning progress': {
    kazakh: 'Оқу үлгерімі',
    russian: 'Прогресс обучения'
  },
  'More details': {
    kazakh: 'Толығырақ',
    russian: 'Подробнее'
  },
  'Hours per week': {
    kazakh: 'Апта сайынғы сағаттар',
    russian: 'Часов за неделю'
  },
  'Completed topics': {
    kazakh: 'Аяқталған тақырыптар',
    russian: 'Пройденных тем'
  },
  'Average score': {
    kazakh: 'Орташа балл',
    russian: 'Средний балл'
  },
  'Goal progress': {
    kazakh: 'Мақсат бойынша жетістік',
    russian: 'Прогресс цели'
  },
  
  // Last tests
  'Last tests': {
    kazakh: 'Соңғы тесттер',
    russian: 'Последние тесты'
  },
  'All tests': {
    kazakh: 'Барлық тесттер',
    russian: 'Все тесты'
  },
  'Start': {
    kazakh: 'Бастау',
    russian: 'Начать'
  },
  
  // Library page
  'Find textbooks for your education': {
    kazakh: 'Оқуыңызға арналған оқулықтарды табыңыз',
    russian: 'Найдите учебники для вашего обучения'
  },
  'Textbooks added to favorites': {
    kazakh: 'Таңдаулыларға қосылған оқулықтар',
    russian: 'Учебники, добавленные в избранное'
  },
  'All textbooks': {
    kazakh: 'Барлық оқулықтар',
    russian: 'Все учебники'
  },
  'My textbooks': {
    kazakh: 'Менің оқулықтарым',
    russian: 'Мои учебники'
  },
  'Search for textbooks...': {
    kazakh: 'Оқулықтарды іздеу...',
    russian: 'Поиск учебников...'
  },
  'Filters': {
    kazakh: 'Сүзгілер',
    russian: 'Фильтры'
  },
  'All grades': {
    kazakh: 'Барлық сыныптар',
    russian: 'Все классы'
  },
  'All subjects': {
    kazakh: 'Барлық пәндер',
    russian: 'Все предметы'
  },
  'Reset filters': {
    kazakh: 'Сүзгілерді қалпына келтіру',
    russian: 'Сбросить фильтры'
  },
  'No textbooks found': {
    kazakh: 'Оқулықтар табылмады',
    russian: 'Учебники не найдены'
  },
  'Try changing the filters or search query.': {
    kazakh: 'Сүзгілерді немесе іздеу сұрауын өзгертіп көріңіз.',
    russian: 'Попробуйте изменить фильтры или поисковый запрос.'
  },
  'You have no favorite textbooks': {
    kazakh: 'Сізде таңдаулы оқулықтар жоқ',
    russian: 'У вас нет избранных учебников'
  },
  'Add textbooks to favorites by clicking on the heart icon.': {
    kazakh: 'Жүрек белгішесін басу арқылы оқулықтарды таңдаулыларға қосыңыз.',
    russian: 'Добавьте учебники в избранное, нажав на значок сердечка.'
  },
  'Go to library': {
    kazakh: 'Кітапханаға өту',
    russian: 'Перейти в библиотеку'
  },
  
  // Testing page
  'Testing': {
    kazakh: 'Тестілеу',
    russian: 'Тестирование'
  },
  'Practice tests, grades and educational games': {
    kazakh: 'Практикалық тесттер, бағалар және білім беру ойындары',
    russian: 'Пробные тесты, оценки и образовательные игры'
  },
  'UNT Tests': {
    kazakh: 'ҰБТ тесттері',
    russian: 'Тесты ЕНТ'
  },
  'School Tests': {
    kazakh: 'Мектеп тесттері',
    russian: 'Школьные тесты'
  },
  'Learning Battles': {
    kazakh: 'Оқу шайқастары',
    russian: 'Учебные битвы'
  },
  'Average score': {
    kazakh: 'Орташа балл',
    russian: 'Средний балл'
  },
  'Percentile': {
    kazakh: 'Процентиль',
    russian: 'Процентиль'
  },
  'Completed tests': {
    kazakh: 'Аяқталған тесттер',
    russian: 'Пройдено тестов'
  },
  'Last test': {
    kazakh: 'Соңғы тест',
    russian: 'Последний тест'
  },
  'Days until UNT': {
    kazakh: 'ҰБТ-ға дейінгі күндер',
    russian: 'Дней до ЕНТ'
  },
  'Target score': {
    kazakh: 'Мақсатты балл',
    russian: 'Целевой балл'
  },
  
  // Admissions page
  'Admissions': {
    kazakh: 'Оқуға түсу',
    russian: 'Поступление'
  },
  'Everything you need to know about admission to universities in Kazakhstan': {
    kazakh: 'Қазақстандағы жоғары оқу орындарына түсу туралы білуіңіз керек барлық нәрсе',
    russian: 'Всё, что нужно знать о поступлении в вузы Казахстана'
  },
  'My admission goal': {
    kazakh: 'Менің оқуға түсу мақсатым',
    russian: 'Моя цель поступления'
  },
  'Profession': {
    kazakh: 'Мамандық',
    russian: 'Профессия'
  },
  'University': {
    kazakh: 'Университет',
    russian: 'Университет'
  },
  'Specialty': {
    kazakh: 'Мамандық',
    russian: 'Специальность'
  },
  'View admission chances': {
    kazakh: 'Оқуға түсу мүмкіндіктерін қарау',
    russian: 'Посмотреть шансы поступления'
  },
  
  // Settings
  'Settings': {
    kazakh: 'Параметрлер',
    russian: 'Настройки'
  },
  'Manage your preferences': {
    kazakh: 'Қалауларыңызды басқарыңыз',
    russian: 'Управляйте вашими предпочтениями'
  },
  'Notifications': {
    kazakh: 'Хабарламалар',
    russian: 'Уведомления'
  },
  'Enable notifications': {
    kazakh: 'Хабарламаларды қосу',
    russian: 'Включить уведомления'
  },
  'Get updates about your activity': {
    kazakh: 'Өз белсенділігіңіз туралы жаңартуларды алыңыз',
    russian: 'Получать обновления о вашей активности'
  },
  'Study reminders': {
    kazakh: 'Оқу еске салғыштары',
    russian: 'Напоминания об учебе'
  },
  'Test reminders': {
    kazakh: 'Тест еске салғыштары',
    russian: 'Напоминания о тестах'
  },
  'Appearance': {
    kazakh: 'Сыртқы түрі',
    russian: 'Внешний вид'
  },
  'Theme': {
    kazakh: 'Тақырып',
    russian: 'Тема'
  },
  'Light': {
    kazakh: 'Жарық',
    russian: 'Светлая'
  },
  'Dark': {
    kazakh: 'Қараңғы',
    russian: 'Темная'
  },
  'System': {
    kazakh: 'Жүйелік',
    russian: 'Системная'
  },
  'Language': {
    kazakh: 'Тіл',
    russian: 'Язык'
  },
  'Russian': {
    kazakh: 'Орыс тілі',
    russian: 'Русский'
  },
  'Kazakh': {
    kazakh: 'Қазақ тілі',
    russian: 'Казахский'
  }
};

/**
 * Custom hook for handling translations based on the user's language preference
 */
export default function useTranslation() {
  const { language } = useUserStore();
  
  /**
   * Translate a given key to the user's preferred language
   * @param key The key to translate
   * @param placeholders Optional key-value pairs to replace placeholders in the translated string
   * @returns The translated string in the user's preferred language
   */
  const t = useCallback((key: string, placeholders?: Record<string, string | number>): string => {
    // If the key doesn't exist in the translations dictionary, return the key itself
    if (!translations[key]) {
      console.warn(`Translation key not found: "${key}"`);
      return key;
    }
    
    // Get the translated string based on the user's language preference
    let translatedStr = translations[key][language] || key;
    
    // Replace any placeholders in the translated string
    if (placeholders) {
      Object.entries(placeholders).forEach(([placeholder, value]) => {
        const regex = new RegExp(`\\{${placeholder}\\}`, 'g');
        translatedStr = translatedStr.replace(regex, String(value));
      });
    }
    
    return translatedStr;
  }, [language]);
  
  // Return the translation function
  return { t };
}