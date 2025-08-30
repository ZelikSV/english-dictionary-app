import {Activity, IWordGroup} from '@/types';
import {CheckCircleIcon, DocumentTextIcon, PencilIcon} from '@heroicons/react/24/outline';

export const wordGroups: IWordGroup[] = [
    {
        id: '1',
        name: 'Слова c threads',
        words: [
            {id: '1', en: 'Reliable', ua: 'надійний'},
            {id: '2', en: 'Efficient', ua: 'ефективний'},
            {id: '3', en: 'Ambitious', ua: 'амбітний'},
            {id: '4', en: 'Generous', ua: 'щедрий'},
            {id: '5', en: 'Suspicious', ua: 'підозрілий'},
            {id: '6', en: 'Cautious', ua: 'обережний'},
            {id: '7', en: 'Considerate', ua: 'турботливий'},
            {id: '8', en: 'Impressive', ua: 'вражаючий'}
        ]
    },
    {
        id: '2',
        name: 'IT слова за 2 серпня',
        words: [
            {id: '1', en: 'discuss', ua: 'обговорювати'},
            {id: '2', en: 'organize', ua: 'організовувати'},
            {id: '3', en: 'repair', ua: 'ремонтувати'},
            {id: '4', en: 'deliver', ua: 'доставляти'},
            {id: '5', en: 'install', ua: 'встановлювати'},
            {id: '6', en: 'practice', ua: 'практикувати'},
            {id: '7', en: 'debug', ua: 'налагоджувати'},
            {id: '8', en: 'monitor', ua: 'моніторити'}
        ]
    },
    {
        id: '3',
        name: 'Просто слова для 3ї групи',
        words: [
            {id: '1', en: 'plan', ua: 'планувати'},
            {id: '2', en: 'intend', ua: 'мати намір'},
            {id: '3', en: 'decide', ua: 'вирішувати'},
            {id: '4', en: 'promise', ua: 'обіцяти'},
            {id: '5', en: 'expect', ua: 'очікувати'},
            {id: '6', en: 'hope', ua: 'сподіватися'}
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
