'use client';
import {useState} from 'react';
import {
    PencilIcon,
    TrashIcon
} from '@heroicons/react/24/outline';

import {IWordGroupItem, NewWordInput} from '@/types';

interface WordsListProps {
    words: IWordGroupItem[]
    onDeleteWord: (id: string) => void
    onUpdateWord: (id: string, updatedWord: Partial<NewWordInput>) => void
}

const WordsList = ({words, onDeleteWord, onUpdateWord}: WordsListProps) => {
    const [editingIndex, setEditingIndex] = useState<number>(-1);
    const [editingWord, setEditingWord] = useState<NewWordInput>({en: '', ua: ''});

    const startEdit = (index: number, word: IWordGroupItem) => {
        setEditingIndex(index);
        setEditingWord({en: word.en, ua: word.ua});
    };

    const saveEdit = () => {
        if (editingWord.en.trim() && editingWord.ua.trim()) {
            onUpdateWord(words[editingIndex].id, editingWord);
            setEditingIndex(-1);
            setEditingWord({en: '', ua: ''});
        }
    };

    const cancelEdit = () => {
        setEditingIndex(-1);
        setEditingWord({en: '', ua: ''});
    };

    if (words.length === 0) {
        return null;
    }

    return (
        <div>
            <h3 className='text-lg font-medium text-gray-700 mb-3'>
                Додані слова ({words.length})
            </h3>
            <div className='max-h-64 overflow-y-auto border border-gray-200 rounded-lg'>
                {words.map((word, index) => (
                    <div key={word.id} className='flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0'>
                        {editingIndex === index ? (
                            <div className='flex gap-2 flex-1'>
                                <input
                                    type='text'
                                    value={editingWord.en}
                                    onChange={e => setEditingWord({...editingWord, en: e.target.value})}
                                    className='flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-black'
                                />
                                <input
                                    type='text'
                                    value={editingWord.ua}
                                    onChange={e => setEditingWord({...editingWord, ua: e.target.value})}
                                    className='flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-black'
                                />
                                <button
                                    onClick={saveEdit}
                                    className='px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600'
                                >
                                    ✓
                                </button>
                                <button
                                    onClick={cancelEdit}
                                    className='px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600'
                                >
                                    ✕
                                </button>
                            </div>
                        ) : (
                            <div className='flex items-center justify-between w-full'>
                                <div className='flex-1'>
                                    <span className='font-medium text-gray-800'>{word.en}</span>
                                    <span className='text-gray-500 mx-2'>-</span>
                                    <span className='text-gray-700'>{word.ua}</span>
                                </div>
                                <div className='flex gap-2'>
                                    <button
                                        onClick={() => startEdit(index, word)}
                                        className='text-blue-500 hover:text-blue-700 transition-colors'
                                    >
                                        <PencilIcon className='w-4 h-4' />
                                    </button>
                                    <button
                                        onClick={() => onDeleteWord(word.id)}
                                        className='text-red-500 hover:text-red-700 transition-colors'
                                    >
                                        <TrashIcon className='w-4 h-4' />
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
