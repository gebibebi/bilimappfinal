import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  X, 
  ChevronRight, 
  Upload, 
  Image, 
  Send, 
  MessageSquare,
  Calendar,
  Filter,
  AlertCircle,
  PenTool,
  BookOpen 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { setPageTitle } from '../lib/utils';

// Demo assignments data
const mockAssignments = [
  {
    id: 'assign-1',
    title: 'Эссе по казахской литературе',
    subject: 'Казахская литература',
    description: 'Написать эссе на тему "Роль Абая Кунанбаева в казахской литературе". Объем - 2-3 страницы.',
    deadline: '2025-05-10T23:59:00',
    status: 'pending', // pending, submitted, reviewed, expired
    teacherName: 'Алия Сагатовна',
    grade: null, // null or number
    feedback: null, // null or string
    attachments: [
      { name: 'Требования к эссе.pdf', url: '#' }
    ]
  },
  {
    id: 'assign-2',
    title: 'Задачи по алгебре',
    subject: 'Математика',
    description: 'Решить задачи №124-126 из учебника. Показать полное решение с пояснениями.',
    deadline: '2025-05-08T23:59:00',
    status: 'submitted',
    teacherName: 'Бауыржан Абдильдаевич',
    grade: null,
    feedback: null,
    attachments: []
  },
  {
    id: 'assign-3',
    title: 'Опыты по химии: окислительно-восстановительные реакции',
    subject: 'Химия',
    description: 'Провести опыты по окислительно-восстановительным реакциям, описанные на стр. 78-79 учебника. Заполнить лабораторный журнал и ответить на контрольные вопросы.',
    deadline: '2025-05-15T23:59:00',
    status: 'pending',
    teacherName: 'Жанна Маратовна',
    grade: null,
    feedback: null,
    attachments: [
      { name: 'Лабораторный журнал.docx', url: '#' },
      { name: 'Инструкция по технике безопасности.pdf', url: '#' }
    ]
  },
  {
    id: 'assign-4',
    title: 'Проект "Моя малая родина"',
    subject: 'История Казахстана',
    description: 'Подготовить презентацию о своем родном городе/селе. Рассказать об истории, известных людях, достопримечательностях.',
    deadline: '2025-05-20T23:59:00',
    status: 'pending',
    teacherName: 'Дамир Ахметович',
    grade: null,
    feedback: null,
    attachments: [
      { name: 'Рекомендации к проекту.pdf', url: '#' }
    ]
  },
  {
    id: 'assign-5',
    title: 'Контрольная работа по физике',
    subject: 'Физика',
    description: 'Выполнить контрольную работу по теме "Электромагнитные колебания". Решить все задачи с полным оформлением.',
    deadline: '2025-05-05T23:59:00',
    status: 'reviewed',
    teacherName: 'Аскар Сериков',
    grade: 85,
    feedback: 'Хорошая работа! Есть небольшие ошибки в вычислениях. Обратите внимание на задачу №3, неверно применена формула.',
    attachments: []
  }
];

// Component for attachments upload and preview
const AttachmentUploader = ({ onAttach }) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Create preview URLs
    const newFiles = selectedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      type: file.type
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Pass files to parent component
    if (onAttach) {
      onAttach([...files, ...newFiles]);
    }
  };
  
  const handleRemoveFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
    
    // Update parent component
    if (onAttach) {
      onAttach(files.filter((_, index) => index !== indexToRemove));
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700">Прикрепленные файлы</h4>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          leftIcon={<Upload size={16} />}
        >
          Прикрепить файл
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          onChange={handleFileSelect}
        />
      </div>
      
      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {files.map((file, index) => (
            <div key={index} className="border border-gray-200 rounded p-2 relative">
              {file.type.startsWith('image/') ? (
                <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded bg-gray-100">
                  <img src={file.preview} alt={file.name} className="object-cover w-full h-full" />
                </div>
              ) : (
                <div className="aspect-w-16 aspect-h-9 flex items-center justify-center bg-gray-100 rounded">
                  <FileText size={32} className="text-gray-400" />
                </div>
              )}
              <div className="text-xs text-gray-600 mt-1 truncate">{file.name}</div>
              <button
                className="absolute top-1 right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center shadow-sm"
                onClick={() => handleRemoveFile(index)}
              >
                <X size={12} className="text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Assignment submission modal
const SubmissionModal = ({ assignment, onClose, onSubmit }) => {
  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState([]);
  
  const handleSubmit = () => {
    onSubmit({
      assignmentId: assignment.id,
      text,
      attachments
    });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Загрузка задания
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Assignment info */}
          <div className="mb-6 border-b border-gray-200 pb-4">
            <h3 className="font-medium text-lg">{assignment.title}</h3>
            <p className="text-gray-600 mb-2">{assignment.subject} • {assignment.teacherName}</p>
            <p className="text-sm text-gray-700 mb-4">{assignment.description}</p>
            
            {assignment.attachments.length > 0 && (
              <div className="space-y-1 mb-2">
                <p className="text-sm font-medium text-gray-700">Материалы задания:</p>
                {assignment.attachments.map((att, index) => (
                  <a 
                    key={index} 
                    href={att.url} 
                    className="block text-sm text-blue-600 hover:underline"
                  >
                    {att.name}
                  </a>
                ))}
              </div>
            )}
            
            <div className="flex items-center text-amber-600 text-sm">
              <Clock size={16} className="mr-1" />
              <span>Срок сдачи: {new Date(assignment.deadline).toLocaleString('ru-RU', { 
                day: 'numeric', 
                month: 'long', 
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>
          
          {/* Submission form */}
          <div className="space-y-6">
            {/* Text response */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Текстовый ответ
              </label>
              <textarea
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
                placeholder="Введите ваш ответ..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
            
            {/* File attachments */}
            <AttachmentUploader onAttach={setAttachments} />
            
            {/* Submit button */}
            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Отмена
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={text.trim() === '' && attachments.length === 0}
                leftIcon={<Send size={16} />}
              >
                Отправить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
const MyAssignmentsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all'); // all, pending, submitted, reviewed
  const [searchTerm, setSearchTerm] = useState('');
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [assignments, setAssignments] = useState(mockAssignments);
  
  // Set page title on component mount
  React.useEffect(() => {
    setPageTitle('Мои задания');
  }, []);
  
  // Filter assignments
  const getFilteredAssignments = () => {
    let filtered = [...assignments];
    
    // Filter by status
    if (activeFilter !== 'all') {
      filtered = filtered.filter(a => a.status === activeFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(term) || 
        a.subject.toLowerCase().includes(term) ||
        a.description.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  };
  
  // Handle opening submission modal
  const handleOpenSubmission = (assignment) => {
    setSelectedAssignment(assignment);
    setShowSubmissionModal(true);
  };
  
  // Handle submission
  const handleSubmitAssignment = (data) => {
    // Update assignment status
    setAssignments(prev => 
      prev.map(a => 
        a.id === data.assignmentId 
          ? { ...a, status: 'submitted' } 
          : a
      )
    );
    
    // In a real app, you would send data to the server here
    console.log('Submitted assignment:', data);
  };
  
  // Get the appropriate status tag
  const getStatusTag = (status, deadline) => {
    const deadlineDate = new Date(deadline);
    const isNearDeadline = (Date.now() > deadlineDate.getTime() - 2 * 24 * 60 * 60 * 1000); // 2 days
    
    switch (status) {
      case 'pending':
        return (
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            isNearDeadline ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
          }`}>
            {isNearDeadline ? <AlertCircle size={12} className="mr-1" /> : <Clock size={12} className="mr-1" />}
            {isNearDeadline ? 'Скоро срок сдачи' : 'К выполнению'}
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-700">
            <CheckCircle2 size={12} className="mr-1" />
            Сдано
          </span>
        );
      case 'reviewed':
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle2 size={12} className="mr-1" />
            Проверено
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-700">
            <X size={12} className="mr-1" />
            Просрочено
          </span>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Мои задания</h1>
          <p className="text-gray-500 mt-1">Управление учебными заданиями и домашней работой</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск заданий..."
              className="pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
          
          <Button
            variant="outline"
            leftIcon={<Filter size={16} />}
          >
            Фильтры
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        <Button
          variant={activeFilter === 'all' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setActiveFilter('all')}
        >
          Все задания
        </Button>
        <Button
          variant={activeFilter === 'pending' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setActiveFilter('pending')}
        >
          К выполнению
        </Button>
        <Button
          variant={activeFilter === 'submitted' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setActiveFilter('submitted')}
        >
          Отправленные
        </Button>
        <Button
          variant={activeFilter === 'reviewed' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setActiveFilter('reviewed')}
        >
          Проверенные
        </Button>
      </div>
      
      {/* Assignments list */}
      <div className="space-y-4">
        {getFilteredAssignments().map((assignment) => (
          <Card key={assignment.id} className="hover:border-blue-300 transition-colors">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Left: Assignment info */}
                <div className="md:col-span-3 space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      assignment.subject.includes('Математика') || assignment.subject.includes('Физика') ? 'bg-blue-100 text-blue-600' :
                      assignment.subject.includes('Казахская') || assignment.subject.includes('История') ? 'bg-green-100 text-green-600' :
                      assignment.subject.includes('Химия') ? 'bg-purple-100 text-purple-600' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {assignment.subject.includes('Математика') || assignment.subject.includes('Физика') ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>
                        </svg>
                      ) : assignment.subject.includes('Казахская') || assignment.subject.includes('История') ? (
                        <BookOpen size={20} />
                      ) : assignment.subject.includes('Химия') ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 2a4.2 4.2 0 0 0 4 4 4.2 4.2 0 0 1 4 4 4.2 4.2 0 0 1-4 4 4.2 4.2 0 0 0-4 4 4.2 4.2 0 0 1-4-4 4.2 4.2 0 0 0-4-4 4.2 4.2 0 0 1 4-4 4.2 4.2 0 0 0 4-4"></path>
                        </svg>
                      ) : (
                        <PenTool size={20} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-gray-900">{assignment.title}</h3>
                      <p className="text-sm text-gray-600">{assignment.subject} • {assignment.teacherName}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700">{assignment.description}</p>
                  
                  {assignment.attachments.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <FileText size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {assignment.attachments.length} {assignment.attachments.length === 1 ? 'материал' : 'материалов'}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Right: Status and actions */}
                <div className="md:col-span-2 flex flex-col justify-between space-y-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      {getStatusTag(assignment.status, assignment.deadline)}
                      
                      {assignment.grade !== null && (
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700">
                          Оценка: {assignment.grade}/100
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar size={16} className="mr-1" />
                      <span>Срок сдачи: {new Date(assignment.deadline).toLocaleString('ru-RU', { 
                        day: 'numeric', 
                        month: 'long', 
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </div>
                    
                    {assignment.feedback && (
                      <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm text-gray-700">
                        <div className="flex items-center text-gray-900 font-medium mb-1">
                          <MessageSquare size={16} className="mr-1" />
                          <span>Комментарий преподавателя:</span>
                        </div>
                        <p>{assignment.feedback}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    {assignment.status === 'pending' && (
                      <Button
                        variant="primary"
                        onClick={() => handleOpenSubmission(assignment)}
                        rightIcon={<ChevronRight size={16} />}
                      >
                        Прикрепить ответ
                      </Button>
                    )}
                    
                    {assignment.status === 'submitted' && (
                      <Button
                        variant="outline"
                        onClick={() => handleOpenSubmission(assignment)}
                      >
                        Редактировать ответ
                      </Button>
                    )}
                    
                    {assignment.status === 'reviewed' && (
                      <Button
                        variant="outline"
                      >
                        Просмотреть ответ
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {getFilteredAssignments().length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Нет заданий</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm 
                ? 'Заданий, соответствующих вашему поиску, не найдено. Попробуйте изменить параметры поиска.' 
                : activeFilter !== 'all' 
                  ? `У вас нет заданий со статусом "${
                      activeFilter === 'pending' ? 'К выполнению' : 
                      activeFilter === 'submitted' ? 'Отправленные' : 
                      'Проверенные'
                    }".` 
                  : 'У вас пока нет заданий. Они появятся, когда преподаватели добавят их.'}
            </p>
          </div>
        )}
      </div>
      
      {/* Submission modal */}
      {showSubmissionModal && selectedAssignment && (
        <SubmissionModal 
          assignment={selectedAssignment}
          onClose={() => setShowSubmissionModal(false)}
          onSubmit={handleSubmitAssignment}
        />
      )}
    </div>
  );
};

export default MyAssignmentsPage;