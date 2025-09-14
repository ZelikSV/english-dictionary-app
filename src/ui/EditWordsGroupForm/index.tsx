'use client';
import React, {useEffect} from 'react';
import {useForm, useFieldArray} from 'react-hook-form';
import {useRouter} from 'next/navigation';

import {IWord, IWordGroupItem, NewWordInput, IWordGroup} from '@/types';
import WordsList from '@/ui/WordsList';
import {GET_WORDS_GROUPS_URL} from '@/lib/api';

interface EditWordsGroupFormProps {
    group: IWordGroup;
}

const EditWordsGroupForm = ({group}: EditWordsGroupFormProps) => {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}, reset, control, setValue, watch} = useForm({
        defaultValues: {
            id: group.id,
            groupName: group.name,
            words: group.words,
            bulkText: ''
        }
    });

    const {fields, append, remove, update} = useFieldArray({
        control,
        name: 'words',
        keyName: 'id'
    });

    const watchedBulkText = watch('bulkText');

    useEffect(() => {
        reset({
            groupName: group.name,
            words: group.words,
            bulkText: ''
        });
    }, [group, reset]);

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

    const handleAddBulkWords = () => {
        const lines = watchedBulkText.trim().split('\n');
        const newWords = lines
            .map(line => {
                const parts = line.split(' - ');
                if (parts.length === 2 && parts[0].trim() && parts[1].trim()) {
                    return {
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

    const onSubmit = async (formData: {groupName: string, words: IWord[]}) => {
        const originalWords = group.words || [];
        const newWords = formData.words.filter(word => !word.id);
        const updatedWords = formData.words.filter(word => {
            if (!word.id) {
                return false;
            }

            const originalWord = originalWords.find(orig => orig.id === word.id);

            return originalWord && (
                originalWord.en !== word.en ||
                originalWord.ua !== word.ua
            );
        });

        const removedFromGroupIds = originalWords
            .filter(originalWord =>
                !formData.words.find(word => word.id === originalWord.id)
            )
            .map(word => word.id);

        const payload = {
            id: group.id,
            name: formData.groupName,
            operations: {
                create: newWords.map(word => ({en: word.en, ua: word.ua})),
                update: updatedWords.map(word => ({id: word.id, en: word.en, ua: word.ua})),
                removeFromGroup: removedFromGroupIds
            }
        };

        await fetch(`${GET_WORDS_GROUPS_URL}/${group.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });

        router.push('/');
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6'>
            <div className='max-w-4xl mx-auto'>
                <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50'>
                    <h1 className='text-2xl font-bold text-gray-800 mb-6'>Редагувати групу</h1>

                    <div onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                        <div>
                            <h3 className='text-lg font-medium text-gray-700 mb-3'>
                                Імʼя групи
                            </h3>
                            <input
                                {...register('groupName', {
                                    required: "Назва групи обов'язкова",
                                    maxLength: {value: 50, message: 'Максимум 50 символів'}
                                })}
                                type='text'
                                placeholder='Назва групи'
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black'
                            />
                            {errors.groupName && (
                                <p className='mt-1 text-sm text-red-600'>{errors.groupName.message}</p>
                            )}
                        </div>

                        <div>
                            <h3 className='text-lg font-medium text-gray-700 mb-3'>
                                Додати нові слова
                            </h3>
                            <div>
                                <textarea
                                    {...register('bulkText')}
                                    placeholder='Введіть слова в форматі: english_word - український_переклад&#10;Кожне слово на новому рядку'
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-32 resize-none text-black'
                                />
                                <button
                                    type='button'
                                    onClick={handleAddBulkWords}
                                    disabled={!watchedBulkText?.trim()}
                                    className='mt-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'
                                >
                                    Додати нові слова
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

                        <div className='flex gap-4 pt-6'>
                            <button
                                type='button'
                                onClick={() => router.push('/')}
                                className='px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'
                            >
                                Скасувати
                            </button>
                            <button
                                onClick={handleSubmit(onSubmit)}
                                className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center'
                            >
                                Зберегти зміни ({fields.length} слів)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditWordsGroupForm;
