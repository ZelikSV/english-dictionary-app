import {Activity, IWordGroup} from '@/types';
import {CheckCircleIcon, DocumentTextIcon, PencilIcon} from '@heroicons/react/24/outline';

export const wordGroups: IWordGroup[] = [
    {
        id: '1',
        name: 'Слова c threads',
        userId: 2,
        words: [
            {id: '1', en: 'Reliable', ua: 'надійний'},
            {id: '2', en: 'Efficient', ua: 'ефективний'}
        ]
    },
    {
        id: '2',
        name: 'IT слова за 2 серпня',
        userId: 2,
        words: [
            {id: '1', en: 'discuss', ua: 'обговорювати'},
            {id: '2', en: 'organize', ua: 'організовувати'}
        ]
    },
    {
        id: '3',
        name: 'Просто слова для 3ї групи',
        userId: 2,
        words: [
            {id: '1', en: 'plan', ua: 'планувати'},
            {id: '2', en: 'intend', ua: 'мати намір'}
        ]
    }
];

export const activities: Activity[] = [
    {
        title: 'Перевірка з правописом',
        description: 'Перевірте своє знання правопису англійських слів',
        icon: PencilIcon,
        color: 'bg-blue-500',
        link: '/spelling'
    },
    {
        title: 'Тестування',
        description: 'Пройдіть тест на знання слів з варіантами відповідей',
        icon: CheckCircleIcon,
        color: 'bg-green-500',
        link: '/quiz'
    },
    {
        title: 'Картки',
        description: 'Вивчайте слова за допомогою карток',
        icon: DocumentTextIcon,
        color: 'bg-purple-500',
        link: '/cards'
    }
];
