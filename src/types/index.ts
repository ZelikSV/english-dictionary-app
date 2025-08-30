import React from 'react';

type HeroIcon = React.ComponentType<React.ComponentProps<'svg'>>;

export interface IWord {
    en: string;
    ua: string;
    id: string;
}

export interface IWordGroup {
    name: string;
    id: string;
    words: IWord[];
}

export interface IDBWord {
    en: string;
    ua: string;
    _id: string;
}

export interface Activity {
    title: string
    description: string
    icon: HeroIcon
    color: string
    link: string
}

export interface NewWordInput {
    en: string
    ua: string
}

export interface IWordGroupItem {
    en: string;
    ua: string;
    id: string;
}
