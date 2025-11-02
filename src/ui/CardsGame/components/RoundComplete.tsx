import React from 'react';
import { ArrowPathIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';

interface RoundCompleteProps {
  onNextRound: () => void;
  onShuffle: () => void;
}

export const RoundComplete: React.FC<RoundCompleteProps> = ({
  onNextRound,
  onShuffle,
}) => {
  return (
    <div className="text-center">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 max-w-md mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          🎉 Раунд завершено!
        </h3>
        <p className="text-gray-600 mb-6">
          Всі картки відкриті. Готові до наступного раунду?
        </p>

        <div className="flex gap-4">
          <button
            onClick={onNextRound}
            className="flex-1 bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center"
          >
            <ArrowPathIcon className="w-5 h-5 mr-2" />
            Новий раунд
          </button>

          <button
            onClick={onShuffle}
            className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
          >
            <ArrowsUpDownIcon className="w-5 h-5 mr-2" />
            Перемішати
          </button>
        </div>
      </div>
    </div>
  );
};
