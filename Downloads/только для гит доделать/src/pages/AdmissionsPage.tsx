import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  School, 
  FileText, 
  Calendar, 
  HelpCircle,
  Search,
  Award,
  Send,
  ExternalLink,
  Briefcase,
  BookOpen,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import useUserStore from '../store/userStore';
import { setPageTitle } from '../lib/utils';

const AdmissionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [questionInput, setQuestionInput] = useState('');
  const navigate = useNavigate();
  const user = useUserStore(state => state.user);
  
  useEffect(() => {
    setPageTitle('Поступление');
  }, []);
  
  const handleToggleAccordion = (index: number) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };
  
  const handleAskQuestion = () => {
    if (!questionInput.trim()) return;
    
    // Перейти в чат с контекстом вопроса
    navigate('/chat', { 
      state: { 
        action: 'admission_question',
        question: questionInput
      }
    });
  };
  
  // Общие вопросы и ответы о поступлении
  const faqItems = [
    {
      question: 'Как подать на грант?',
      answer: `Для подачи на образовательный грант в Казахстане необходимо:
        1. Сдать ЕНТ (Единое Национальное Тестирование) и получить сертификат.
        2. Подать заявление на участие в конкурсе на присуждение образовательного гранта в приемную комиссию любого вуза.
        3. Указать до 4-х специальностей в порядке приоритета.
        4. Дождаться результатов конкурса (обычно в начале августа).
        
        Важно: Гранты присуждаются на конкурсной основе по результатам ЕНТ. Чем выше балл, тем больше шансов на получение гранта.`
    },
    {
      question: 'Какие документы нужны для поступления?',
      answer: `Для поступления в вуз Казахстана необходимы следующие документы:
        1. Заявление на имя ректора вуза.
        2. Документ о среднем общем (общем среднем), техническом и профессиональном (начальном или среднем профессиональном), послесреднем или высшем образовании (подлинник).
        3. Сертификат ЕНТ и сертификат о присуждении образовательного гранта (при наличии).
        4. Медицинская справка формы 086-У.
        5. Фотографии размером 3x4 (6 штук).
        6. Копия удостоверения личности.
        7. Приписное свидетельство или военный билет (для юношей).
        
        Некоторые вузы могут требовать дополнительные документы, поэтому лучше уточнить полный список в приемной комиссии конкретного университета.`
    },
    {
      question: 'Когда дедлайн подачи документов?',
      answer: `Дедлайны для поступления в вузы Казахстана:
        
        1. ЕНТ основное тестирование: обычно с 10 по 25 июня.
        2. Прием заявлений на образовательный грант: с 13 по 20 июля.
        3. Зачисление на платное отделение: до 25 августа.
        4. Зачисление обладателей грантов: до 15 августа.
        
        Важно: Даты могут немного меняться из года в год, поэтому всегда уточняйте актуальную информацию на официальных сайтах МОН РК или выбранных университетов.`
    },
    {
      question: 'Как выбрать университет?',
      answer: `При выборе университета в Казахстане обратите внимание на следующие факторы:
        
        1. Аккредитация и рейтинг - проверьте наличие государственной лицензии и позицию в национальных/международных рейтингах.
        2. Специализация - некоторые вузы имеют сильные программы в определенных областях (например, медицина, инженерия, IT).
        3. Перспективы трудоустройства - изучите статистику трудоустройства выпускников.
        4. Инфраструктура - наличие современных лабораторий, библиотек, общежитий.
        5. Международное сотрудничество - возможности обмена студентами и стажировок за рубежом.
        6. Финансовый аспект - стоимость обучения, возможность получения гранта или скидки.
        7. Расположение - учитывайте город, транспортную доступность и условия проживания.
        
        Рекомендуется посетить дни открытых дверей, поговорить с нынешними студентами и выпускниками, изучить официальные сайты вузов.`
    },
    {
      question: 'Можно ли подать на грант сразу в два университета?',
      answer: `Да, при подаче заявления на грант можно указать до 4-х специальностей в порядке приоритета, которые могут быть в разных университетах. 

        Важно понимать, что:
        1. Вы участвуете в общенациональном конкурсе на гранты, а не в конкурсе конкретного вуза.
        2. Заявление на грант подается только в одном вузе (любом по вашему выбору).
        3. В заявлении вы указываете приоритетность выбранных специальностей в разных вузах.
        4. При проходном балле на грант вы будете зачислены согласно указанным приоритетам.
        
        Таким образом, система позволяет "подаваться" сразу в несколько университетов в рамках одного заявления на грант.`
    },
    {
      question: 'Сколько баллов нужно для поступления на грант?',
      answer: `Проходные баллы на грант меняются каждый год и зависят от:
        
        1. Выбранной специальности (самые высокие баллы обычно на престижные специальности, такие как международные отношения, медицина, IT).
        2. Количества выделенных грантов на данную специальность.
        3. Конкуренции среди абитуриентов.
        
        В среднем проходные баллы варьируются:
        - Технические специальности: 75-110 баллов
        - Медицинские специальности: 100-130 баллов
        - IT-специальности: 85-120 баллов
        - Педагогические специальности: 70-90 баллов
        - Гуманитарные специальности: 90-120 баллов
        
        Точные проходные баллы определяются только после окончания конкурса на гранты, обычно в начале августа.`
    },
    {
      question: 'Что такое комплексное тестирование и кому оно нужно?',
      answer: `Комплексное тестирование (КТ) — это форма вступительного экзамена для определенных категорий абитуриентов:
        
        1. Выпускников колледжей (ТиПО), поступающих на родственные специальности высшего образования.
        2. Выпускников школ прошлых лет, не сдавших ЕНТ ранее.
        3. Лиц, окончивших организации образования за рубежом.
        4. Выпускников школ с нерусским или неказахским языком обучения, поступающих на специальности с английским языком обучения.
        
        КТ, как и ЕНТ, проверяет знания по основным предметам, но имеет иную структуру. Проводится несколько раз в год, обычно в январе и июле. Сертификаты КТ действительны для участия в конкурсе на присуждение грантов и для зачисления в вузы на платной основе.`
    }
  ];
  
  // Фильтрация FAQ по поисковому запросу
  const filteredFAQ = searchTerm 
    ? faqItems.filter(item => 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : faqItems;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Поступление</h1>
        <p className="text-gray-500 mt-1">Всё, что нужно знать о поступлении в вузы Казахстана</p>
      </div>
      
      {/* Если есть выбранный университет и специальность, показываем информацию */}
      {user?.university && user?.speciality && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-blue-600 p-3 text-white">
                <School size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Моя цель поступления</h2>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center text-gray-700">
                    <Briefcase className="mr-2 h-4 w-4 text-blue-600" />
                    <span className="font-medium">Профессия:</span>
                    <span className="ml-2">{user.profession}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <School className="mr-2 h-4 w-4 text-blue-600" />
                    <span className="font-medium">Университет:</span>
                    <span className="ml-2">{user.university}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <BookOpen className="mr-2 h-4 w-4 text-blue-600" />
                    <span className="font-medium">Специальность:</span>
                    <span className="ml-2">{user.speciality}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/progress')}
                  >
                    Посмотреть шансы поступления
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Ключевые даты */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 text-red-600" size={20} />
            Ключевые даты
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 rounded-lg bg-red-50 border border-red-100">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100 text-red-600 flex-shrink-0">
                <Calendar size={16} />
              </div>
              <div>
                <p className="font-medium text-red-900">10-25 июня 2025</p>
                <p className="text-sm text-red-700">Основное тестирование ЕНТ</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 rounded-lg bg-yellow-50 border border-yellow-100">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100 text-yellow-600 flex-shrink-0">
                <Calendar size={16} />
              </div>
              <div>
                <p className="font-medium text-yellow-900">13-20 июля 2025</p>
                <p className="text-sm text-yellow-700">Прием заявлений на образовательный грант</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 border border-green-100">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 text-green-600 flex-shrink-0">
                <Calendar size={16} />
              </div>
              <div>
                <p className="font-medium text-green-900">до 15 августа 2025</p>
                <p className="text-sm text-green-700">Зачисление обладателей грантов</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
                <Calendar size={16} />
              </div>
              <div>
                <p className="font-medium text-blue-900">до 25 августа 2025</p>
                <p className="text-sm text-blue-700">Зачисление на платное отделение</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Часто задаваемые вопросы */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <HelpCircle className="mr-2 text-blue-600" size={20} />
              <span>Ответы на частые вопросы</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              as="a" 
              href="https://edu.gov.kz" 
              target="_blank"
              rel="noopener noreferrer"
              rightIcon={<ExternalLink size={14} />}
            >
              Сайт МОН РК
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 border-b border-gray-200">
            <Input
              placeholder="Поиск по вопросам..."
              leftIcon={<Search size={18} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredFAQ.length > 0 ? (
              filteredFAQ.map((item, index) => (
                <div key={index} className="py-4 px-6">
                  <button
                    className="flex w-full items-center justify-between text-left font-medium text-gray-900"
                    onClick={() => handleToggleAccordion(index)}
                  >
                    <span>{item.question}</span>
                    <svg
                      className={`h-5 w-5 text-gray-500 transition-transform ${
                        activeAccordion === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeAccordion === index && (
                    <div className="mt-4 text-sm text-gray-600 whitespace-pre-line">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-gray-500">
                <HelpCircle className="mx-auto mb-2 h-10 w-10 text-gray-400" />
                <p>Ничего не найдено по запросу "{searchTerm}"</p>
                <p className="mt-1 text-sm">Попробуйте другие ключевые слова или задайте вопрос BilimAI ниже</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Задать вопрос BilimAI */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="mr-2 text-green-600" size={20} />
            Не нашли ответа? Спросите BilimAI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <p className="text-gray-700">
              Задайте любой вопрос о поступлении, и BilimAI постарается на него ответить.
              Например: "Могу ли я получить грант на платной основе после первого курса?" или "Как поступить в зарубежный вуз по программе Болашак?"
            </p>
            
            <div className="flex space-x-2">
              <Input
                placeholder="Ваш вопрос о поступлении..."
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="primary"
                leftIcon={<Send size={18} />}
                onClick={handleAskQuestion}
                disabled={!questionInput.trim()}
              >
                Спросить
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Полезные ресурсы */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2 text-blue-600" size={20} />
            Полезные ресурсы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://www.testcenter.kz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
                  <FileText size={20} />
                </div>
                <h3 className="font-medium text-gray-900">Национальный центр тестирования</h3>
              </div>
              <p className="text-sm text-gray-600">Официальный сайт с информацией о ЕНТ, пробные тесты, расписание.</p>
            </a>
            
            <a
              href="https://egov.kz/cms/ru/articles/professional_education"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
                  <Award size={20} />
                </div>
                <h3 className="font-medium text-gray-900">Портал электронного правительства</h3>
              </div>
              <p className="text-sm text-gray-600">Государственные услуги в сфере образования, гранты, стипендии.</p>
            </a>
            
            <a
              href="https://www.edu.gov.kz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600">
                  <School size={20} />
                </div>
                <h3 className="font-medium text-gray-900">Министерство образования и науки РК</h3>
              </div>
              <p className="text-sm text-gray-600">Официальный сайт с новостями, нормативными документами и полезной информацией.</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdmissionsPage;