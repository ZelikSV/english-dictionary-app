'use client';
import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import { IWordGroupItem, NewWordInput } from '@/types';
import styles from './WordsList.module.scss';

interface WordsListProps {
  words: IWordGroupItem[];
  onDeleteWord: (id: string) => void;
  onUpdateWord: (id: string, updatedWord: Partial<NewWordInput>) => void;
}

const WordsList = ({ words, onDeleteWord, onUpdateWord }: WordsListProps) => {
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [editingWord, setEditingWord] = useState<NewWordInput>({
    en: '',
    ua: '',
  });

  const startEdit = (index: number, word: IWordGroupItem) => () => {
    setEditingIndex(index);
    setEditingWord({ en: word.en, ua: word.ua });
  };

  const handleDeleteWord = (id: string) => () => {
    onDeleteWord(id);
  };

  const saveEdit = () => {
    if (editingWord.en.trim() && editingWord.ua.trim()) {
      onUpdateWord(words[editingIndex].id, editingWord);
      setEditingIndex(-1);
      setEditingWord({ en: '', ua: '' });
    }
  };

  const cancelEdit = () => {
    setEditingIndex(-1);
    setEditingWord({ en: '', ua: '' });
  };

  if (words.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h3>Додані слова ({words.length})</h3>
      <div className={styles.list}>
        {words.map((word, index) => (
          <div key={word.id} className={styles.item}>
            {editingIndex === index ? (
              <div className={styles.editMode}>
                <input
                  key={`${word.id}-en`}
                  type="text"
                  value={editingWord.en}
                  onChange={e =>
                    setEditingWord({ ...editingWord, en: e.target.value })
                  }
                />
                <input
                  key={`${word.id}-ua`}
                  type="text"
                  value={editingWord.ua}
                  onChange={e =>
                    setEditingWord({ ...editingWord, ua: e.target.value })
                  }
                />
                <button
                  onClick={saveEdit}
                  className={`${styles.button} ${styles.save}`}
                >
                  ✓
                </button>
                <button
                  onClick={cancelEdit}
                  className={`${styles.button} ${styles.cancel}`}
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className={styles.viewMode}>
                <div className={styles.content}>
                  <span className={styles.en}>{word.en}</span>
                  <span className={styles.separator}>-</span>
                  <span className={styles.ua}>{word.ua}</span>
                </div>
                <div className={styles.actions}>
                  <button
                    onClick={startEdit(index, word)}
                    className={`${styles.button} ${styles.edit}`}
                  >
                    <PencilIcon />
                  </button>
                  <button
                    onClick={handleDeleteWord(word.id)}
                    className={`${styles.button} ${styles.delete}`}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordsList;
