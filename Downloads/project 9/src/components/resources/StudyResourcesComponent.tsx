import React, { useState } from 'react';
import { 
  FileText, 
  Book, 
  Calendar, 
  Calculator, 
  ExternalLink,
  ChevronRight,
  Download,
  BookOpen,
  History,
  AlignJustify
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: React.ElementType;
  category: 'literature' | 'dates' | 'formulas' | 'guides';
}

const StudyResourcesComponent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const resources: Resource[] = [
    {
      id: 'rus-literature',
      title: 'Список литературы для ЕНТ-2025 (Русская литература)',
      description: 'Произведения для подготовки к ЕНТ по предмету «Русская литература» общественно-гуманитарного направления',
      url: 'https://testcenter.kz/upload/iblock/e80/2025_.pdf',
      icon: Book,
      category: 'literature'
    },
    {
      id: 'kaz-literature',
      title: 'Список литературы для ЕНТ-2025 (Казахская литература)',
      description: 'Список произведений для подготовки к ЕНТ по предмету «Қазақ әдебиеті» для школ с неказахским языком обучения',
      url: 'https://testcenter.kz/upload/iblock/ab4/_-_-_-_2025_-_-_-_.pdf',
      icon: Book,
      category: 'literature'
    },
    {
      id: 'history-dates',
      title: 'Хронологическая таблица по истории Казахстана',
      description: 'Важнейшие даты и события для подготовки к ЕНТ по предмету «История Казахстана»',
      url: 'https://testcenter.kz/upload/iblock/a79/_-_-_-_-_-_-_2025_.pdf',
      icon: History,
      category: 'dates'
    },
    {
      id: 'math-formulas',
      title: 'Основные формулы по математике',
      description: 'Справочник включающий все главные формулы по математике для подготовки к экзаменам',
      url: 'https://educon.by/files/math/FormMat.pdf',
      icon: Calculator,
      category: 'formulas'
    },
    {
      id: 'physics-formulas',
      title: 'Формулы по физике',
      description: 'Сборник основных формул по физике для подготовки к ЕНТ',
      url: '#',
      icon: Calculator,
      category: 'formulas'
    },
    {
      id: 'ent-guide',
      title: 'Руководство по подготовке к ЕНТ',
      description: 'Пошаговое руководство по эффективной подготовке к Единому Национальному Тестированию',
      url: '#',
      icon: FileText,
      category: 'guides'
    },
    {
      id: 'uni-calendar',
      title: 'Календарь поступления 2025',
      description: 'Расписание всех важных этапов поступления в вузы Казахстана в 2025 году',
      url: '#',
      icon: Calendar,
      category: 'dates'
    }
  ];

  const categories = [
    { id: 'literature', name: 'Литература', icon: BookOpen },
    { id: 'dates', name: 'Даты и события', icon: Calendar },
    { id: 'formulas', name: 'Формулы', icon: Calculator },
    { id: 'guides', name: 'Руководства', icon: AlignJustify }
  ];
  
  const filteredResources = activeCategory 
    ? resources.filter(resource => resource.category === activeCategory)
    : resources;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Полезные ресурсы</h2>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          Все ресурсы
          <ChevronRight size={16} className="ml-1" />
        </a>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm ${
            activeCategory === null
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setActiveCategory(null)}
        >
          <span>Все</span>
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm ${
              activeCategory === category.id
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <category.icon size={14} />
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map(resource => (
          <Card key={resource.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-0">
              <div className="p-5">
                <div className="flex items-start space-x-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <resource.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{resource.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{resource.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    <span>Скачать</span>
                    <Download size={14} />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-4 flex justify-center">
        <Button
          variant="outline"
          rightIcon={<ExternalLink size={14} />}
          as="a"
          href="https://testcenter.kz/postupayushchim/ent/edinoe-natsionalnoe-testirovanie/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Больше материалов на сайте Национального Центра Тестирования
        </Button>
      </div>
    </div>
  );
};

export default StudyResourcesComponent;