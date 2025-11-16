import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

import { Lang } from '@/lib/constants';

interface GameHeaderProps {
  currentRound: number;
  gameLanguage: Lang;
  totalFlipped: number;
  onLanguageChange: (language: Lang) => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  currentRound,
  gameLanguage,
  totalFlipped,
  onLanguageChange,
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-8">
      <button
        onClick={() => router.push('/')}
        className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        На головну
      </button>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Навчальні картки</h1>
        <p className="text-gray-600">Раунд #{currentRound}</p>
        <p
          className={`text-sm font-medium ${
            gameLanguage === Lang.EN ? 'text-blue-600' : 'text-yellow-600'
          }`}
        >
          {gameLanguage === Lang.EN
            ? '🇬🇧 English → Українська'
            : '🇺🇦 Українська → English'}
        </p>
      </div>

      <div className="text-right">
        <p className="text-sm text-gray-600 mb-2">
          Всього перевернуто: {totalFlipped}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onLanguageChange(Lang.EN)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              gameLanguage === Lang.EN
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            🇬🇧 EN
          </button>
          <button
            onClick={() => onLanguageChange(Lang.UA)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              gameLanguage === Lang.EN
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            🇺🇦 UA
          </button>
        </div>
      </div>
    </div>
  );
};
