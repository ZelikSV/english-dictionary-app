import React from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Lang } from '@/lib/constants';

import { Card } from '../hooks/useCardsGame';

interface GameCardProps {
  card: Card;
  onFlip: (cardId: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ card, onFlip }) => {
  const labelMap = {
    front: {
      [Lang.EN]: '🇬🇧 English',
      [Lang.UA]: '🇺🇦 Українська',
    },
    back: {
      [Lang.EN]: '🇺🇦 Переклад',
      [Lang.UA]: '🇬🇧 Translation',
    },
  };

  return (
    <div className="relative group" style={{ perspective: '1000px' }}>
      <div
        className={`relative w-full h-64 cursor-pointer transition-transform duration-700 ${
          card.isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => onFlip(card.id)}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front side */}
        <div
          className="absolute inset-0 w-full h-full bg-white rounded-xl shadow-lg border-2 border-gray-300 flex items-center justify-center group-hover:shadow-xl transition-shadow"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-center p-6">
            <div className="text-xs text-gray-500 mb-3">
              {labelMap.front[card.frontLanguage]}
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              {card.frontText}
            </h3>
            <p className="text-gray-500 text-sm">Клікніть для перевороту</p>
          </div>
        </div>

        {/* Back side */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg flex items-center justify-center rotate-y-180"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-center p-6">
            <div className="text-xs text-white opacity-90 mb-3">
              {labelMap.back[card.frontLanguage]}
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              {card.backText}
            </h3>
            <div className="absolute top-3 right-3">
              <EyeIcon className="w-5 h-5 text-white opacity-75" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
