import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

import { Lang } from '@/lib/constants';

interface GameHeaderProps {
  currentRound: number;
  gameLanguage: Lang;
  totalFlipped: number;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  currentRound,
  gameLanguage,
  totalFlipped,
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
      </div>
    </div>
  );
};
