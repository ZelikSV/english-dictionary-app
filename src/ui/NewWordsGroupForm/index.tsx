'use client';
import React from 'react';
import {PlusIcon} from '@heroicons/react/24/outline';
import {v4 as uuidv4} from 'uuid';
import {useForm, useFieldArray} from 'react-hook-form';
import {useRouter} from 'next/navigation';

import {useAddNewGroup} from '@/stores/useWordsGroupsStore';
import {IWord, IWordGroupItem, NewWordInput} from '@/types';
import WordsList from '@/ui/WordsList';

const NewWordsGroupForm = () => {
    const createNewGroup = useAddNewGroup();
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}, reset, control, setValue, watch} = useForm({
        defaultValues: {
            groupName: '',
            words: [] as IWordGroupItem[],
            newWord: {en: '', ua: ''},
            bulkText: ''
        }
    });

    const {fields, append, remove, update} = useFieldArray({
        control,
        name: 'words'
    });

    const watchedNewWord = watch('newWord');
    const watchedBulkText = watch('bulkText');

    const handleDeleteWord = (id: string) => {
        const wordIndex = fields.findIndex(word => word.id === id);
        if (wordIndex !== -1) {
            remove(wordIndex);
        }
    };

    const handleUpdateWord = (id: string, updatedWord: Partial<NewWordInput>) => {
        const wordIndex = fields.findIndex(word => word.id === id);
        if (wordIndex !== -1) {
            update(wordIndex, {...fields[wordIndex], ...updatedWord});
        }
    };

    const handleAddSingleWord = () => {
        if (watchedNewWord.en?.trim() && watchedNewWord.ua?.trim()) {
            const wordWithId = {
                id: uuidv4(),
                en: watchedNewWord.en.trim(),
                ua: watchedNewWord.ua.trim()
            };

            append(wordWithId);
            setValue('newWord', {en: '', ua: ''});
        }
    };

    const handleAddBulkWords = () => {
        const lines = watchedBulkText.trim().split('\n');
        const newWords = lines
            .map(line => {
                const parts = line.split(' - ');
                if (parts.length === 2 && parts[0].trim() && parts[1].trim()) {
                    return {
                        id: uuidv4(),
                        en: parts[0].trim(),
                        ua: parts[1].trim()
                    };
                }

                return null;
            })
            .filter((word): word is IWordGroupItem => word !== null);

        if (newWords.length > 0) {
            newWords.forEach(word => append(word));
            setValue('bulkText', '');
        }
    };

    const onSubmit = (data: {groupName: string, words: IWord[]}) => {
        createNewGroup({
            name: data.groupName,
            words: data.words
        }).then(() => {
            reset();

            router.push('/');
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div>
                <input
                    {...register('groupName', {
                        required: "Назва групи обов'язкова",
                        maxLength: {value: 50, message: 'Максимум 50 символів'}
                    })}
                    type='text'
                    placeholder='Назва групи'
                    className='w-full px-4 py-2 border border-black-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                {errors.groupName && (
                    <p className='mt-1 text-sm text-red-600'>{errors.groupName.message}</p>
                )}
            </div>

            <div>
                <h3 className='text-lg font-medium text-black-700 mb-3'>
                    Додати одне слово
                </h3>
                <div className='flex gap-3 mb-3'>
                    <input
                        {...register('newWord.en')}
                        type='text'
                        placeholder='Англійське слово'
                        className='flex-1 px-4 py-2 border border-black-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        {...register('newWord.ua')}
                        type='text'
                        placeholder='Український переклад'
                        className='flex-1 px-4 py-2 border border-black-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <button
                        type='button'
                        onClick={handleAddSingleWord}
                        disabled={!watchedNewWord.en?.trim() || !watchedNewWord.ua?.trim()}
                        className='px-6 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600 disabled:bg-black-300 disabled:cursor-not-allowed transition-colors flex items-center'
                    >
                        <PlusIcon className='w-4 h-4 mr-1' />
                        Додати
                    </button>
                </div>
            </div>

            <div>
                <h3 className='text-lg font-medium text-black-700 mb-3'>
                    Додати кілька слів
                </h3>
                <div>
                    <textarea
                        {...register('bulkText')}
                        placeholder='Введіть слова в форматі: english_word - український_переклад&#10;Кожне слово на новому рядку'
                        className='w-full px-4 py-2 border border-black-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none'
                    />
                    <button
                        type='button'
                        onClick={handleAddBulkWords}
                        disabled={!watchedBulkText?.trim()}
                        className='mt-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-black-300 disabled:cursor-not-allowed transition-colors'
                    >
                        Додати всі слова
                    </button>
                </div>
            </div>

            {fields.length > 0 && (
                    <WordsList
                        words={fields}
                        onDeleteWord={handleDeleteWord}
                        onUpdateWord={handleUpdateWord}
                    />
            )}

            <button
                type='submit'
                disabled={fields.length === 0}
                className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-black-300 disabled:cursor-not-allowed transition-colors flex items-center'
            >
                Створити групу ({fields.length} слів)
            </button>
        </form>
    );
};

export default NewWordsGroupForm;
