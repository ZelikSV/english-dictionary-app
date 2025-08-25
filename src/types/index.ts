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
