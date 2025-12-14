'use client';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { IWord, IWordGroupItem, NewWordInput } from '@/types';
import WordsList from '@/ui/WordsList';
import { WORDS_GROUPS_API_URL } from '@/lib/api';
import Spinner from '@/ui/Spinner';
import styles from './NewWordsGroupForm.module.scss';

const NewWordsGroupForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        setValue,
    } = useForm({
        defaultValues: {
            groupName: '',
            words: [] as IWordGroupItem[],
            newWord: { en: '', ua: '' },
            bulkText: '',
        },
    });

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'words',
    });

    const watchedBulkText = useWatch({
        control,
        name: 'bulkText',
    });

    const handleDeleteWord = (id: string) => {
        const wordIndex = fields.findIndex(word => word.id === id);
        if (wordIndex !== -1) {
            remove(wordIndex);
        }
    };

    const handleUpdateWord = (id: string, updatedWord: Partial<NewWordInput>) => {
        const wordIndex = fields.findIndex(word => word.id === id);
        if (wordIndex !== -1) {
            update(wordIndex, { ...fields[wordIndex], ...updatedWord });
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
                        ua: parts[1].trim(),
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

    const onSubmit = async (data: { groupName: string; words: IWord[] }) => {
        setIsLoading(true);

        await fetch(`${WORDS_GROUPS_API_URL}/new`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                words: data.words.map(word => ({
                    id: word.id,
                    en: word.en,
                    ua: word.ua,
                })),
                id: uuidv4(),
                name: data.groupName,
            }),
        });

        reset();

        setIsLoading(false);

        router.push('/');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.section}>
                <h3>Імʼя групи</h3>
                <input
                    {...register('groupName', {
                        required: "Назва групи обов'язкова",
                        maxLength: { value: 50, message: 'Максимум 50 символів' },
                    })}
                    type="text"
                    placeholder="Назва групи"
                />
                {errors.groupName && (
                    <p className={styles.error}>{errors.groupName.message}</p>
                )}
            </div>

            <div className={styles.section}>
                <h3>Додати слова</h3>
                <div>
                    <textarea
                        {...register('bulkText')}
                        placeholder="Введіть слова в форматі: english_word - український_переклад&#10;Кожне слово на новому рядку"
                    />
                    <button
                        type="button"
                        onClick={handleAddBulkWords}
                        disabled={!watchedBulkText?.trim()}
                        className={styles.addButton}
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
                type="submit"
                disabled={fields.length === 0 || isLoading}
                className={styles.submitButton}
            >
                {isLoading ? <Spinner /> : `Створити групу (${fields.length}) слів)`}
            </button>
        </form>
    );
};

export default NewWordsGroupForm;
