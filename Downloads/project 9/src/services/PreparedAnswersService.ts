// src/services/PreparedAnswersService.ts
import { generateId } from '../lib/utils';

export interface HandwrittenSolution {
  id: string;
  subject: string;
  topic: string;
  title: string;
  imageSrc: string;
  keywords: string[];
}

export interface PreparedAnswer {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  subject?: string;
  topic?: string;
  handwrittenSolution?: HandwrittenSolution;
}

// Collection of pre-prepared handwritten solutions
const handwrittenSolutions: HandwrittenSolution[] = [
  {
    id: 'math-quadratic-1',
    subject: 'Математика',
    topic: 'Квадратные уравнения',
    title: 'Решение квадратного уравнения через дискриминант',
    imageSrc: '/assets/solutions/math-quadratic-1.jpg',
    keywords: ['квадратное', 'уравнение', 'дискриминант', 'корни']
  },
  {
    id: 'math-derivative-1',
    subject: 'Математика',
    topic: 'Производная',
    title: 'Нахождение производной сложной функции',
    imageSrc: '/assets/solutions/math-derivative-1.jpg',
    keywords: ['производная', 'функция', 'сложная функция', 'дифференцирование']
  },
  {
    id: 'physics-mechanics-1',
    subject: 'Физика',
    topic: 'Механика',
    title: 'Решение задачи на движение тела',
    imageSrc: '/assets/solutions/physics-mechanics-1.jpg',
    keywords: ['физика', 'механика', 'движение', 'скорость', 'ускорение']
  },
  {
    id: 'chemistry-equation-1',
    subject: 'Химия',
    topic: 'Химические уравнения',
    title: 'Уравнивание окислительно-восстановительной реакции',
    imageSrc: '/assets/solutions/chemistry-equation-1.jpg',
    keywords: ['химия', 'реакция', 'окисление', 'восстановление']
  }
];

// Collection of pre-prepared answers
const preparedAnswers: PreparedAnswer[] = [
  {
    id: 'math-quadratic',
    question: 'Как решать квадратные уравнения?',
    answer: `Чтобы решить квадратное уравнение ax² + bx + c = 0, следуйте этим шагам:

1. Найдите дискриминант по формуле D = b² - 4ac
2. Если D > 0, уравнение имеет два различных корня:
   x₁ = (-b + √D) / 2a
   x₂ = (-b - √D) / 2a
3. Если D = 0, уравнение имеет один корень (два совпадающих):
   x = -b / 2a
4. Если D < 0, уравнение не имеет действительных корней

Хотите увидеть пример решения?`,
    keywords: ['квадратное', 'уравнение', 'дискриминант', 'корни', 'решить'],
    subject: 'Математика',
    topic: 'Квадратные уравнения',
    handwrittenSolution: handwrittenSolutions[0]
  },
  {
    id: 'math-derivative',
    question: 'Как найти производную функции?',
    answer: `Для нахождения производной функции используются следующие правила:

1. Производная константы равна нулю: (C)' = 0
2. Производная x^n равна n·x^(n-1): (x^n)' = n·x^(n-1)
3. Производная суммы/разности функций равна сумме/разности их производных:
   (f(x) ± g(x))' = f'(x) ± g'(x)
4. Производная произведения функций:
   (f(x)·g(x))' = f'(x)·g(x) + f(x)·g'(x)
5. Производная частного функций:
   (f(x)/g(x))' = (f'(x)·g(x) - f(x)·g'(x))/(g(x))²
6. Производная сложной функции:
   (f(g(x)))' = f'(g(x))·g'(x)

Хотите увидеть пример нахождения производной?`,
    keywords: ['производная', 'функция', 'дифференцирование'],
    subject: 'Математика',
    topic: 'Производная',
    handwrittenSolution: handwrittenSolutions[1]
  },
  {
    id: 'physics-mechanics',
    question: 'Как решать задачи на равноускоренное движение?',
    answer: `При решении задач на равноускоренное движение используются следующие формулы:

1. v = v₀ + at — скорость через время t
2. s = v₀t + (at²)/2 — перемещение за время t
3. v² = v₀² + 2as — связь между скоростью и перемещением
4. s = ((v₀ + v)/2)·t — перемещение через среднюю скорость

Где v₀ — начальная скорость, v — конечная скорость, a — ускорение, s — перемещение, t — время движения.

Алгоритм решения:
1. Внимательно прочитайте условие и выпишите все данные
2. Выберите направление осей координат
3. Запишите формулы, связывающие известные и неизвестные величины
4. Решите полученную систему уравнений

Хотите увидеть пример решения задачи на движение?`,
    keywords: ['физика', 'механика', 'движение', 'равноускоренное', 'скорость', 'ускорение'],
    subject: 'Физика',
    topic: 'Механика',
    handwrittenSolution: handwrittenSolutions[2]
  },
  {
    id: 'chemistry-equations',
    question: 'Как уравнивать окислительно-восстановительные реакции?',
    answer: `Для уравнивания окислительно-восстановительных реакций используется метод электронного баланса:

1. Определите степени окисления всех элементов
2. Выделите элементы, изменившие степени окисления
3. Составьте электронные уравнения полуреакций окисления и восстановления
4. Найдите наименьшее общее кратное количества отданных и принятых электронов
5. Подберите коэффициенты перед окислителем и восстановителем
6. Уравняйте остальные элементы

Хотите увидеть пример уравнивания ОВР?`,
    keywords: ['химия', 'реакция', 'окисление', 'восстановление', 'уравнивание'],
    subject: 'Химия',
    topic: 'Химические уравнения',
    handwrittenSolution: handwrittenSolutions[3]
  },
  {
    id: 'geometry-triangles',
    question: 'Какие бывают виды треугольников?',
    answer: `Треугольники классифицируются по двум основным признакам:

По соотношению сторон:
1. Равносторонний треугольник — все стороны равны
2. Равнобедренный треугольник — две стороны равны
3. Разносторонний треугольник — все стороны имеют разную длину

По величине углов:
1. Остроугольный треугольник — все углы острые (меньше 90°)
2. Прямоугольный треугольник — один угол прямой (90°)
3. Тупоугольный треугольник — один угол тупой (больше 90°)

Также важно помнить, что:
- Сумма углов в треугольнике всегда равна 180°
- Длина любой стороны треугольника меньше суммы длин двух других сторон`,
    keywords: ['геометрия', 'треугольник', 'классификация', 'виды треугольников'],
    subject: 'Математика',
    topic: 'Геометрия'
  },
  {
    id: 'biology-photosynthesis',
    question: 'Что такое фотосинтез?',
    answer: `Фотосинтез — это процесс, при котором зеленые растения, водоросли и некоторые бактерии превращают энергию света в химическую энергию.

Общее уравнение фотосинтеза:
6CO₂ + 6H₂O + энергия света → C₆H₁₂O₆ + 6O₂

Фотосинтез происходит в два основных этапа:
1. Световая фаза — происходит в тилакоидных мембранах хлоропластов, где энергия света преобразуется в химическую энергию (АТФ и НАДФН)
2. Темновая фаза (цикл Кальвина) — происходит в строме хлоропластов, где с помощью энергии АТФ и НАДФН из углекислого газа образуются углеводы

Значение фотосинтеза:
- Образование органических веществ
- Выделение кислорода в атмосферу
- Создание пищевых цепей
- Поглощение углекислого газа из атмосферы`,
    keywords: ['биология', 'фотосинтез', 'растения', 'хлоропласты'],
    subject: 'Биология',
    topic: 'Физиология растений'
  }
];

// More prepared answers can be added here...

class PreparedAnswersService {
  // Find the best matching prepared answer for a given query
  static findBestMatch(query: string): PreparedAnswer | null {
    // Normalize the query (lowercase, remove punctuation)
    const normalizedQuery = query.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    const queryWords = normalizedQuery.split(/\s+/);
    
    // Calculate match score for each prepared answer
    let bestMatch: PreparedAnswer | null = null;
    let highestScore = 0;
    
    for (const answer of preparedAnswers) {
      let score = 0;
      
      // Check if query directly matches the question
      if (normalizedQuery.includes(answer.question.toLowerCase())) {
        score += 10; // Direct question match gets high score
      }
      
      // Check keyword matches
      answer.keywords.forEach(keyword => {
        if (normalizedQuery.includes(keyword.toLowerCase())) {
          score += 2; // Each keyword match adds to the score
        }
      });
      
      // Check individual word matches with keywords
      queryWords.forEach(word => {
        if (word.length > 3) { // Skip very short words
          answer.keywords.forEach(keyword => {
            if (keyword.toLowerCase().includes(word)) {
              score += 1; // Partial matches add a smaller score
            }
          });
        }
      });
      
      // Subject or topic match
      if (answer.subject && normalizedQuery.includes(answer.subject.toLowerCase())) {
        score += 2;
      }
      if (answer.topic && normalizedQuery.includes(answer.topic.toLowerCase())) {
        score += 3;
      }
      
      // Update best match if current score is higher
      if (score > highestScore) {
        highestScore = score;
        bestMatch = answer;
      }
    }
    
    // Only return match if the score is above a minimum threshold
    return highestScore >= 5 ? bestMatch : null;
  }
  
  // Get a handwritten solution by ID
  static getHandwrittenSolution(id: string): HandwrittenSolution | null {
    return handwrittenSolutions.find(solution => solution.id === id) || null;
  }
  
  // Get all available handwritten solutions
  static getAllHandwrittenSolutions(): HandwrittenSolution[] {
    return [...handwrittenSolutions];
  }
  
  // Get all prepared answers
  static getAllPreparedAnswers(): PreparedAnswer[] {
    return [...preparedAnswers];
  }
  
  // Get a prepared answer by ID
  static getPreparedAnswer(id: string): PreparedAnswer | null {
    return preparedAnswers.find(answer => answer.id === id) || null;
  }
  
  // Add a new handwritten solution (for admin use)
  static addHandwrittenSolution(solution: Omit<HandwrittenSolution, 'id'>): HandwrittenSolution {
    const newSolution: HandwrittenSolution = {
      id: generateId(),
      ...solution
    };
    
    handwrittenSolutions.push(newSolution);
    return newSolution;
  }
  
  // Add a new prepared answer (for admin use)
  static addPreparedAnswer(answer: Omit<PreparedAnswer, 'id'>): PreparedAnswer {
    const newAnswer: PreparedAnswer = {
      id: generateId(),
      ...answer
    };
    
    preparedAnswers.push(newAnswer);
    return newAnswer;
  }
}

export default PreparedAnswersService;