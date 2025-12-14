'use client';
import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { IWord, IWordGroupItem, NewWordInput, IWordGroup } from '@/types';
import WordsList from '@/ui/WordsList';
import { WORDS_GROUPS_API_URL } from '@/lib/api';
import styles from './EditWordsGroupForm.module.scss';

interface EditWordsGroupFormProps {
  group: IWordGroup;
}

const EditWordsGroupForm = ({ group }: EditWordsGroupFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      id: group.id,
      groupName: group.name,
      words: group.words,
      bulkText: '',
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'words',
    keyName: 'id',
  });

  const watchedBulkText = watch('bulkText');

  useEffect(() => {
    reset({
      groupName: group.name,
      words: group.words,
      bulkText: '',
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

  const onSubmit = async (formData: { groupName: string; words: IWord[] }) => {
    const payload = {
      id: group.id,
      name: formData.groupName,
      words: formData.words,
    };

    await fetch(`${WORDS_GROUPS_API_URL}/${group.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    router.push('/');
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Редагувати групу</h1>

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
              <h3>Додати нові слова</h3>
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

            <div className={styles.actions}>
              <button
                type="button"
                onClick={() => router.push('/')}
                className={styles.cancelButton}
              >
                Скасувати
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                className={styles.submitButton}
              >
                Зберегти зміни ({fields.length} слів)
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditWordsGroupForm;
