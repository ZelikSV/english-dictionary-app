import React from 'react';

interface Card {
  id: string;
  isFlipped: boolean;
}

interface GameProgressProps {
  cards: Card[];
  cardsPerRound: number;
  allCardsFlipped: boolean;
}

export const GameProgress: React.FC<GameProgressProps> = ({
  cards,
  cardsPerRound,
  allCardsFlipped,
}) => {
  const flippedCount = cards.filter(card => card.isFlipped).length;

  return (
    <div className="text-center mb-8">
      <p className="text-lg text-gray-700 mb-2">
        Подумайте над перекладом, потім клікніть на картку для перевірки
      </p>
      <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
        <span>
          Перевернуто: {flippedCount}/{cardsPerRound}
        </span>
        {allCardsFlipped && (
          <span className="text-green-600 font-medium">
            ✅ Всі картки відкриті!
          </span>
        )}
      </div>
    </div>
  );
};
