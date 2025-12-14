import { Activity } from '@/types';
import {
  CheckCircleIcon,
  DocumentTextIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';

export const activities: Activity[] = [
  {
    title: 'Перевірка з правописом',
    description: 'Перевірте своє знання правопису англійських слів',
    icon: PencilIcon,
    color: 'blue',
    link: '/spelling',
  },
  {
    title: 'Тестування',
    description: 'Пройдіть тест на знання слів з варіантами відповідей',
    icon: CheckCircleIcon,
    color: 'green',
    link: '/quiz',
  },
  {
    title: 'Картки',
    description: 'Вивчайте слова за допомогою карток',
    icon: DocumentTextIcon,
    color: 'purple',
    link: '/cards',
  },
];

export enum Lang {
  EN = 'en',
  UA = 'ua',
}
