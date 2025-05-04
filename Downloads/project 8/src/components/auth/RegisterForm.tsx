// src/components/auth/RegisterForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, BookOpen } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import useUserStore from '../../store/userStore';
import { setPageTitle } from '../../lib/utils';
import useTranslation from '../../hooks/useTranslation';

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
  const { t } = useTranslation();
  
  useEffect(() => {
    setPageTitle(t('Registration'));
  }, [t]);
  
  const validateForm = (): boolean => {
    let valid = true;
    const newErrors = {
      name: '',
      grade: '',
      language: '',
    };
    
    if (!name.trim()) {
      newErrors.name = t('Name is required');
      valid = false;
    } else if (name.trim().length < 2) {
      newErrors.name = t('Name is too short');
      valid = false;
    }
    
    if (!grade) {
      newErrors.grade = t('Grade is required');
      valid = false;
    }
    
    if (!language) {
      newErrors.language = t('Language is required');
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
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      registerUser(name, Number(grade), language as any);
      navigate('/onboarding');
    } catch (error) {
      console.error(t('Registration error:'), error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const gradeOptions = [
    { value: '1', label: t('Grade') + ' 1' },
    { value: '2', label: t('Grade') + ' 2' },
    { value: '3', label: t('Grade') + ' 3' },
    { value: '4', label: t('Grade') + ' 4' },
    { value: '5', label: t('Grade') + ' 5' },
    { value: '6', label: t('Grade') + ' 6' },
    { value: '7', label: t('Grade') + ' 7' },
    { value: '8', label: t('Grade') + ' 8' },
    { value: '9', label: t('Grade') + ' 9' },
    { value: '10', label: t('Grade') + ' 10' },
    { value: '11', label: t('Grade') + ' 11' },
    { value: '12', label: t('Grade') + ' 12' },
  ];
  
  const languageOptions = [
    { value: 'kazakh', label: t('Kazakh') },
    { value: 'russian', label: t('Russian') },
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
          {t('Welcome to BilimApp')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('Let\'s set up your profile to get started')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label={t('Full Name')}
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
              label={t('Grade')}
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
              label={t('Language of instruction')}
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
                {t('Continue')}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;