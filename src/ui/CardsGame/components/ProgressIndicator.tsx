import React from 'react';

interface Card {
  id: string;
  isFlipped: boolean;
}

interface ProgressIndicatorProps {
  cards: Card[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  cards,
}) => {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2">
        {cards.map(card => (
          <div
            key={card.id}
            className={`w-3 h-3 rounded-full transition-colors ${
              card.isFlipped ? 'bg-green-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
