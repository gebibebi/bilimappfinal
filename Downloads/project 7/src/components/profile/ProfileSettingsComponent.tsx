import React, { useState, useEffect } from 'react';
import { User, Shield, GraduationCap, Briefcase, School, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import useUserStore from '../../store/userStore';

const ProfileSettingsComponent: React.FC = () => {
  const { user, language, setLanguage, logout, updateUser } = useUserStore();
  const [name, setName] = useState(user?.name || '');
  const [grade, setGrade] = useState(user?.grade.toString() || '');
  const [isEditing, setIsEditing] = useState(false);
  const [profession, setProfession] = useState(user?.profession || '');
  const [university, setUniversity] = useState(user?.university || '');
  const [speciality, setSpeciality] = useState(user?.speciality || '');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setGrade(user.grade.toString());
      setProfession(user.profession || '');
      setUniversity(user.university || '');
      setSpeciality(user.speciality || '');
    }
  }, [user]);

  const handleSaveProfile = () => {
    updateUser({
      name,
      grade: Number(grade),
      profession,
      university,
      speciality
    });
    setIsEditing(false);
  };

  const professionOptions = [
    { value: 'software_engineer', label: 'Программист/Разработчик ПО' },
    { value: 'data_scientist', label: 'Дата-сайентист' },
    { value: 'web_developer', label: 'Веб-разработчик' },
    { value: 'cybersecurity', label: 'Специалист по кибербезопасности' },
    { value: 'doctor', label: 'Врач' },
    { value: 'teacher', label: 'Учитель' },
    { value: 'lawyer', label: 'Юрист' },
    { value: 'economist', label: 'Экономист' },
    { value: 'journalist', label: 'Журналист' },
    { value: 'engineer', label: 'Инженер' },
    { value: 'architect', label: 'Архитектор' },
    { value: 'designer', label: 'Дизайнер' },
    { value: 'translator', label: 'Переводчик' },
    { value: 'marketing_specialist', label: 'Маркетолог' }
  ];

  const universityOptions = [
    { value: 'nu', label: 'Nazarbayev University' },
    { value: 'kbtu', label: 'Казахстанско-Британский технический университет' },
    { value: 'kaznu', label: 'Казахский национальный университет имени аль-Фараби' },
    { value: 'aitu', label: 'Astana IT University' },
    { value: 'kimep', label: 'KIMEP University' },
    { value: 'satbayev', label: 'Казахский национальный исследовательский технический университет имени К. И. Сатпаева' },
    { value: 'sdu', label: 'Сулейман Демирель Университет' },
    { value: 'kaz_med', label: 'Казахский национальный медицинский университет имени С. Д. Асфендиярова' },
    { value: 'enu', label: 'Евразийский национальный университет имени Л. Н. Гумилева' },
    { value: 'karaganda_tech', label: 'Карагандинский технический университет' },
    { value: 'kokshe', label: 'Кокшетауский университет имени Ш. Уалиханова' }
  ];

  const specialityOptions = [
    { value: 'computer_science', label: 'Компьютерные науки' },
    { value: 'information_systems', label: 'Информационные системы' },
    { value: 'software_engineering', label: 'Программная инженерия' },
    { value: 'cybersecurity', label: 'Кибербезопасность' },
    { value: 'data_science', label: 'Наука о данных' },
    { value: 'artificial_intelligence', label: 'Искусственный интеллект' },
    { value: 'medicine', label: 'Общая медицина' },
    { value: 'dentistry', label: 'Стоматология' },
    { value: 'mechanical_engineering', label: 'Машиностроение' },
    { value: 'civil_engineering', label: 'Гражданское строительство' },
    { value: 'electrical_engineering', label: 'Электротехника' },
    { value: 'physics', label: 'Физика' },
    { value: 'mathematics', label: 'Математика' },
    { value: 'chemistry', label: 'Химия' },
    { value: 'biology', label: 'Биология' },
    { value: 'economics', label: 'Экономика' },
    { value: 'finance', label: 'Финансы' },
    { value: 'accounting', label: 'Бухгалтерский учет' },
    { value: 'law', label: 'Юриспруденция' },
    { value: 'international_relations', label: 'Международные отношения' },
    { value: 'journalism', label: 'Журналистика' },
    { value: 'psychology', label: 'Психология' },
    { value: 'languages', label: 'Иностранные языки' }
  ];

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
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <div className="space-y-6">
      {/* Профиль */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User size={20} className="text-purple-600" />
            <span>Профиль</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                {user?.name.substring(0, 2).toUpperCase()}
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">{user?.name}</h3>
              <p className="text-gray-500">{user?.grade} класс</p>
              <p className="text-sm text-gray-500 mt-1">
                Язык: {language === 'russian' ? 'Русский' : 'Казахский'}
              </p>
              
              {(user?.profession || user?.university || user?.speciality) && (
                <div className="mt-4 w-full p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-900 mb-2">Цели поступления</h4>
                  {user?.profession && (
                    <div className="flex items-center mt-2">
                      <Briefcase size={16} className="text-blue-600 mr-2" />
                      <p className="text-sm text-blue-800">Желаемая профессия: {user?.profession}</p>
                    </div>
                  )}
                  {user?.university && (
                    <div className="flex items-center mt-2">
                      <School size={16} className="text-blue-600 mr-2" />
                      <p className="text-sm text-blue-800">Желаемый университет: {user?.university}</p>
                    </div>
                  )}
                  {user?.speciality && (
                    <div className="flex items-center mt-2">
                      <GraduationCap size={16} className="text-blue-600 mr-2" />
                      <p className="text-sm text-blue-800">Специальность: {user?.speciality}</p>
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-6 w-full">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setIsEditing(true)}
                >
                  Редактировать профиль
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                label="Полное имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              
              <Select
                label="Класс"
                options={gradeOptions}
                value={grade}
                onChange={setGrade}
                fullWidth
              />
              
              <div className="pt-4 border-t border-gray-200 mt-4">
                <h4 className="font-medium text-gray-900 mb-4">Цели поступления</h4>
                
                <Select
                  label="Желаемая профессия"
                  options={[{ value: '', label: 'Выберите профессию' }, ...professionOptions]}
                  value={profession}
                  onChange={setProfession}
                  fullWidth
                />
                
                <div className="mt-4">
                  <Select
                    label="Желаемый университет"
                    options={[{ value: '', label: 'Выберите университет' }, ...universityOptions]}
                    value={university}
                    onChange={setUniversity}
                    fullWidth
                  />
                </div>
                
                <div className="mt-4">
                  <Select
                    label="Специальность"
                    options={[{ value: '', label: 'Выберите специальность' }, ...specialityOptions]}
                    value={speciality}
                    onChange={setSpeciality}
                    fullWidth
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Отмена
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSaveProfile}
                >
                  Сохранить
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Безопасность */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield size={20} className="text-emerald-600" />
            <span>Безопасность</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email аутентификация</p>
                <p className="text-sm text-gray-500">Требовать подтверждение email для входа</p>
              </div>
              <div className="relative inline-block w-12 h-6 cursor-pointer">
                <input
                  type="checkbox"
                  id="toggle-email-auth"
                  className="sr-only"
                  checked={true}
                  onChange={() => {}}
                />
                <div className="block w-12 h-6 rounded-full transition-colors bg-blue-500" />
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-6" />
              </div>
            </div>
            
            <div className="pt-4">
              <Button
                variant="outline"
                className="text-gray-700 border-gray-300"
              >
                Изменить пароль
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Выход */}
      <Card>
        <CardContent className="p-6">
          <Button
            variant="outline"
            className="w-full text-red-600 border-red-200 hover:bg-red-50"
            leftIcon={<LogOut size={18} />}
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettingsComponent;