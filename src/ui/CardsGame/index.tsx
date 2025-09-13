'use client';

import {useState, useEffect} from 'react';
import {
    ArrowLeftIcon,
    ArrowPathIcon,
    ArrowsUpDownIcon,
    EyeIcon
} from '@heroicons/react/24/outline';
import {useRouter} from 'next/navigation';
import {IWord} from '@/types';

interface Card {
    id: string
    word: IWord
    frontText: string
    backText: string
    frontLanguage: 'english' | 'ukrainian'
    isFlipped: boolean
}

interface RoundStats {
    currentRound: number
    totalFlipped: number
    cardsPerRound: number
}

const CardsGame = () => {
    const router = useRouter();
    const [words, setWords] = useState<IWord[]>([]);
    const [currentCards, setCurrentCards] = useState<Card[]>([]);
    const [roundStats, setRoundStats] = useState<RoundStats>({
        currentRound: 1,
        totalFlipped: 0,
        cardsPerRound: 4
    });
    const [gameLanguage, setGameLanguage] = useState<'english' | 'ukrainian'>('english');
    const [gameStarted, setGameStarted] = useState(false);
    const [allCardsFlipped, setAllCardsFlipped] = useState(false);
    const wordsList:IWord[] = [];

    const CARDS_PER_ROUND = 4;

    useEffect(() => {
        if (wordsList.length) {
            if (wordsList.length < CARDS_PER_ROUND) {
                alert(`Потрібно мінімум ${CARDS_PER_ROUND} слів для вивчення карток!`);
                router.push('/');

                return;
            }

            setWords(wordsList);
            initializeGame('english', wordsList);
        } else {
            alert('Спочатку додайте слова на головній сторінці!');
            router.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wordsList.length]);

    const initializeGame = (selectedLanguage: 'english' | 'ukrainian', gameWords: IWord[] = words) => {
        setGameLanguage(selectedLanguage);
        setGameStarted(true);
        startNewRound(selectedLanguage, gameWords);
    };

    const startNewRound = (language: 'english' | 'ukrainian' = gameLanguage, gameWords: IWord[] = words) => {
        const shuffledWords = [...gameWords].sort(() => Math.random() - 0.5);
        const selectedWords = shuffledWords.slice(0, CARDS_PER_ROUND);

        const newCards: Card[] = selectedWords.map(word => ({
            id: word.id,
            word,
            frontText: language === 'english' ? word.en : word.ua,
            backText: language === 'english' ? word.ua : word.en,
            frontLanguage: language,
            isFlipped: false
        }));

        setCurrentCards(newCards);
        setAllCardsFlipped(false);
    };

    const flipCard = (cardId: string) => {
        const updatedCards = currentCards.map(card => {
            if (card.id === cardId && !card.isFlipped) {
                setRoundStats(prev => ({...prev, totalFlipped: prev.totalFlipped + 1}));

                return {...card, isFlipped: true};
            }

            return card;
        });

        setCurrentCards(updatedCards);

        const allFlipped = updatedCards.every(card => card.isFlipped);
        if (allFlipped) {
            setAllCardsFlipped(true);
        }
    };

    const nextRound = () => {
        setRoundStats(prev => ({...prev, currentRound: prev.currentRound + 1}));
        startNewRound();
    };

    const changeLanguage = (newLanguage: 'english' | 'ukrainian') => {
        setGameLanguage(newLanguage);
        const updatedCards = currentCards.map(card => ({
            ...card,
            frontText: newLanguage === 'english' ? card.word.en : card.word.ua,
            backText: newLanguage === 'english' ? card.word.ua : card.word.en,
            frontLanguage: newLanguage,
            isFlipped: false // Перевертаємо всі картки назад
        }));
        setCurrentCards(updatedCards);
        setAllCardsFlipped(false);
    };

    // Видаляємо стартовий екран, одразу показуємо картки
    if (words.length === 0 || !gameStarted) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center'>
                <div className='text-center'>
                    <p className='text-gray-600 mb-4'>Завантаження карток...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4'>
            <div className='max-w-6xl mx-auto'>
                {/* Header */}
                <div className='flex items-center justify-between mb-8'>
                    <button
                        onClick={() => router.push('/')}
                        className='flex items-center text-gray-600 hover:text-gray-800 transition-colors'
                    >
                        <ArrowLeftIcon className='w-5 h-5 mr-2' />
                        На головну
                    </button>

                    <div className='text-center'>
                        <h1 className='text-3xl font-bold text-gray-800'>Навчальні картки</h1>
                        <p className='text-gray-600'>
                            Раунд #{roundStats.currentRound}
                        </p>
                        <p className={`text-sm font-medium ${
                            gameLanguage === 'english' ? 'text-blue-600' : 'text-yellow-600'
                        }`}>
                            {gameLanguage === 'english' ? '🇬🇧 English → Українська' : '🇺🇦 Українська → English'}
                        </p>
                    </div>

                    <div className='text-right'>
                        <p className='text-sm text-gray-600 mb-2'>Всього перевернуто: {roundStats.totalFlipped}</p>
                        <div className='flex gap-2'>
                            <button
                                onClick={() => changeLanguage('english')}
                                className={`px-3 py-1 rounded text-sm transition-colors ${
                                    gameLanguage === 'english'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                            >
                                🇬🇧 EN
                            </button>
                            <button
                                onClick={() => changeLanguage('ukrainian')}
                                className={`px-3 py-1 rounded text-sm transition-colors ${
                                    gameLanguage === 'ukrainian'
                                        ? 'bg-yellow-500 text-white'
                                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                            >
                                🇺🇦 UA
                            </button>
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className='text-center mb-8'>
                    <p className='text-lg text-gray-700 mb-2'>
                        Подумайте над перекладом, потім клікніть на картку для перевірки
                    </p>
                    <div className='flex justify-center items-center gap-4 text-sm text-gray-600'>
                        <span>Перевернуто: {currentCards.filter(card => card.isFlipped).length}/{CARDS_PER_ROUND}</span>
                        {allCardsFlipped && (
                            <span className='text-green-600 font-medium'>✅ Всі картки відкриті!</span>
                        )}
                    </div>
                </div>

                {/* Cards Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                    {currentCards.map(card => (
                        <div
                            key={card.id}
                            className='relative group'
                            style={{perspective: '1000px'}}
                        >
                            <div
                                className={`relative w-full h-64 cursor-pointer transition-transform duration-700 ${
                                    card.isFlipped ? 'rotate-y-180' : ''
                                }`}
                                onClick={() => flipCard(card.id)}
                                style={{transformStyle: 'preserve-3d'}}
                            >
                                {/* Front of card */}
                                <div
                                    className='absolute inset-0 w-full h-full bg-white rounded-xl shadow-lg border-2 border-gray-300 flex items-center justify-center group-hover:shadow-xl transition-shadow'
                                    style={{backfaceVisibility: 'hidden'}}
                                >
                                    <div className='text-center p-6'>
                                        <div className='text-xs text-gray-500 mb-3'>
                                            {gameLanguage === 'english' ? '🇬🇧 English' : '🇺🇦 Українська'}
                                        </div>
                                        <h3 className='text-2xl lg:text-3xl font-bold text-gray-800 mb-4'>
                                            {card.frontText}
                                        </h3>
                                        <p className='text-gray-500 text-sm'>
                                            Клікніть для перевороту
                                        </p>
                                    </div>
                                </div>

                                {/* Back of card */}
                                <div
                                    className='absolute inset-0 w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg flex items-center justify-center rotate-y-180'
                                    style={{backfaceVisibility: 'hidden'}}
                                >
                                    <div className='text-center p-6'>
                                        <div className='text-xs text-white opacity-90 mb-3'>
                                            {gameLanguage === 'english' ? '🇺🇦 Переклад' : '🇬🇧 Translation'}
                                        </div>
                                        <h3 className='text-2xl lg:text-3xl font-bold text-white mb-4'>
                                            {card.backText}
                                        </h3>
                                        <div className='absolute top-3 right-3'>
                                            <EyeIcon className='w-5 h-5 text-white opacity-75' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Round completion */}
                {allCardsFlipped && (
                    <div className='text-center'>
                        <div className='bg-white rounded-lg shadow-lg p-6 mb-6 max-w-md mx-auto'>
                            <h3 className='text-xl font-bold text-gray-800 mb-4'>
                                🎉 Раунд завершено!
                            </h3>
                            <p className='text-gray-600 mb-6'>
                                Всі картки відкриті. Готові до наступного раунду?
                            </p>

                            <div className='flex gap-4'>
                                <button
                                    onClick={nextRound}
                                    className='flex-1 bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center'
                                >
                                    <ArrowPathIcon className='w-5 h-5 mr-2' />
                                    Новий раунд
                                </button>

                                <button
                                    onClick={() => startNewRound()}
                                    className='flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center'
                                >
                                    <ArrowsUpDownIcon className='w-5 h-5 mr-2' />
                                    Перемішати
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className='text-center'>
                    <div className='inline-flex items-center gap-2'>
                        {currentCards.map(card => (
                            <div
                                key={card.id}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    card.isFlipped ? 'bg-green-500' : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardsGame;
