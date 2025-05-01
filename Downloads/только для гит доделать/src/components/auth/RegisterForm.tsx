import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, BookOpen } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import useUserStore from '../../store/userStore';
import { setPageTitle } from '../../lib/utils';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('9');
  const [language, setLanguage] = useState('russian');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    grade: '',
    language: '',
  });
  
  const navigate = useNavigate();
  const registerUser = useUserStore(state => state.registerUser);
  
  React.useEffect(() => {
    setPageTitle('Регистрация');
  }, []);
  
  const validateForm = (): boolean => {
    let valid = true;
    const newErrors = {
      name: '',
      grade: '',
      language: '',
    };
    
    if (!name.trim()) {
      newErrors.name = 'Имя обязательно';
      valid = false;
    } else if (name.trim().length < 2) {
      newErrors.name = 'Имя слишком короткое';
      valid = false;
    }
    
    if (!grade) {
      newErrors.grade = 'Класс обязателен';
      valid = false;
    }
    
    if (!language) {
      newErrors.language = 'Язык обязателен';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      registerUser(name, Number(grade), language as any);
      navigate('/onboarding');
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const gradeOptions = [
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
  
  const languageOptions = [
    { value: 'kazakh', label: 'Казахский' },
    { value: 'russian', label: 'Русский' },
  ];
  
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600">
            <BookOpen size={24} />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Добро пожаловать в BilimApp
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Давайте настроим ваш профиль для начала работы
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Полное имя"
              id="name"
              name="name"
              type="text"
              leftIcon={<User size={18} />}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              fullWidth
              autoComplete="name"
              required
            />
            
            <Select
              label="Класс"
              id="grade"
              name="grade"
              options={gradeOptions}
              value={grade}
              onChange={setGrade}
              error={errors.grade}
              fullWidth
              required
            />
            
            <Select
              label="Язык обучения"
              id="language"
              name="language"
              options={languageOptions}
              value={language}
              onChange={setLanguage}
              error={errors.language}
              fullWidth
              required
            />
            
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                fullWidth
              >
                Продолжить
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;