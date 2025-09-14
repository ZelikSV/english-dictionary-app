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
    userId: number;
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

export interface IUserCredentials {
    email: { label: string, type: string },
    password: { label: string, type: string }
}

export interface UpdateOperations {
    create: {en: string, ua: string}[];
    update: {id: string, en: string, ua: string}[];
    removeFromGroup: string[];
}

export interface UpdateWordsGroupPayload {
    id: string;
    name: string;
    operations: UpdateOperations;
}
