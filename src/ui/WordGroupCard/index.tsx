'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { IWordGroup } from '@/types';
import { WORDS_GROUPS_API_URL } from '@/lib/api';
import { log } from '@/lib/logger';
import Spinner from '@/ui/Spinner';
import { useSelectGroup } from '@/lib/hooks/useSelectGroup';

export const WordGroupCard = ({ group }: { group: IWordGroup }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isSelectingGroup, handleSelectGroup, isSelected } = useSelectGroup(
    group.id
  );
  const wordsCount = group.words.length;

  const handleDeleteGroup = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${WORDS_GROUPS_API_URL}/${group.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        log.error('Failed to delete group');
      }

      router.refresh();
    } catch (error) {
      log.error('Error deleting group:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-80 ${
        isSelected
          ? 'bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-400 ring-2 ring-green-200'
          : 'bg-white/80 border border-gray-100/50'
      }`}
    >
      <div className="flex items-center justify-between mb-4 min-h-[2rem]">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div
            className={`w-3 h-3 rounded-full flex-shrink-0 ${
              isSelected
                ? 'bg-gradient-to-r from-green-400 to-green-500'
                : 'bg-gradient-to-r from-purple-400 to-purple-500'
            }`}
          ></div>
          <h3 className="font-semibold text-gray-800 text-lg truncate">
            {group.name}
          </h3>
          {isSelected && (
            <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Обрано</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
          <Link
            href={`/groups/${group.id}/edit`}
            className="w-8 h-8 bg-gray-100 hover:bg-blue-50 rounded-lg flex items-center justify-center transition-colors group"
          >
            <svg
              className="w-4 h-4 text-gray-600 group-hover:text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </Link>
          {isLoading ? (
            <Spinner />
          ) : (
            <button
              className="w-8 h-8 bg-gray-100 hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors group"
              onClick={handleDeleteGroup}
            >
              <svg
                className="w-4 h-4 text-gray-600 group-hover:text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 mb-4">
        <span className="text-2xl font-bold text-gray-800">{wordsCount}</span>
        <span className="text-gray-600 ml-2">слів</span>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-4 h-20 overflow-hidden">
          {group.words.slice(0, 6).map((word, index) => (
            <span
              key={index}
              className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-medium h-fit"
            >
              {word.en}
            </span>
          ))}
          {wordsCount > 6 && (
            <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-medium h-fit">
              +{wordsCount - 6} ще
            </span>
          )}
        </div>
      </div>

      <button
        className={`w-full py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 mt-auto ${
          isSelected
            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white cursor-default'
            : 'bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600'
        }`}
        disabled={isSelectingGroup || isSelected}
        onClick={handleSelectGroup}
      >
        {isSelectingGroup ? (
          <Spinner />
        ) : isSelected ? (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Група обрана</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span>Вибрати групу</span>
          </>
        )}
      </button>
    </div>
  );
};
