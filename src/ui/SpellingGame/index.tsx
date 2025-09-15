'use client';

import {useState, useEffect} from 'react';
import {
    ArrowLeftIcon,
    CheckIcon,
    XMarkIcon,
    ArrowPathIcon,
    HomeIcon
} from '@heroicons/react/24/outline';
import {useRouter} from 'next/navigation';
import {IWord} from '@/types';
import {useGetWordsByGroupId} from '@/lib/hooks/useGetWordGroupById';
import {Loading} from '@/ui/Loading';

interface QuestionData {
    word: IWord
    maskedWord: string
    attempts: number
    isCorrect: boolean
}

interface GameStats {
    correct: number
    incorrect: number
    totalQuestions: number
}

const SpellingGame = () => {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
    const [userInput, setUserInput] = useState('');
    const [gameStats, setGameStats] = useState<GameStats>({correct: 0, incorrect: 0, totalQuestions: 0});
    const [gameFinished, setGameFinished] = useState(false);
    const [feedback, setFeedback] = useState<{ show: boolean; isCorrect: boolean; message: string }>({
        show: false,
        isCorrect: false,
        message: ''
    });
    const [questionQueue, setQuestionQueue] = useState<IWord[]>([]);
    const [mistakeWords, setMistakeWords] = useState<Map<string, number>>(new Map());

    const MAX_QUESTIONS = 15;
    const MISTAKE_REPEAT_COUNT = 3;
    const {wordsByGroups, loading} = useGetWordsByGroupId();

    useEffect(() => {
        if (!loading && wordsByGroups.length) {
            initializeGame(wordsByGroups);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wordsByGroups.length, loading]);

    const initializeGame = (gameWords: IWord[]) => {
        const shuffledWords = [...gameWords].sort(() => Math.random() - 0.5);
        setQuestionQueue(shuffledWords);
        generateNextQuestion(shuffledWords);
    };

    const generateNextQuestion = (currentQueue: IWord[] = questionQueue) => {
        if (gameStats.totalQuestions >= MAX_QUESTIONS) {
            setGameFinished(true);

            return;
        }

        let nextWord: IWord;

        const wordsToRepeat = Array.from(mistakeWords.entries())
            .filter(([_, count]) => count > 0)
            .map(([id, _]) => wordsByGroups.find(w => w.id === id))
            .filter(Boolean) as IWord[];

        if (wordsToRepeat.length > 0) {
            nextWord = wordsToRepeat[Math.floor(Math.random() * wordsToRepeat.length)];
        } else if (currentQueue.length > 0) {
            const randomIndex = Math.floor(Math.random() * currentQueue.length);
            nextWord = currentQueue[randomIndex];
        } else {
            const reshuffled = [...wordsByGroups].sort(() => Math.random() - 0.5);
            setQuestionQueue(reshuffled);
            nextWord = reshuffled[0];
        }

        const maskedWord = createMaskedWord(nextWord.en);
        setCurrentQuestion({
            word: nextWord,
            maskedWord,
            attempts: 0,
            isCorrect: false
        });
        setUserInput('');
        setFeedback({show: false, isCorrect: false, message: ''});
    };

    const createMaskedWord = (word: string): string => {
        if (word.length <= 3) {
            return word[0] + '_'.repeat(word.length - 1);
        }

        const chars = word.split('');
        const result = chars.map((char, index) => {
            if (index === 0 || index === chars.length - 1) {
                return char;
            }

            if (Math.random() < 0.3) {
                return char;
            }

            return '_';
        });

        return result.join('');
    };

    const checkAnswer = () => {
        if (!currentQuestion || !userInput.trim()) {
            return;
        }

        const isCorrect = userInput.toLowerCase().trim() === currentQuestion.word.en.toLowerCase();

        if (isCorrect) {
            setGameStats(prev => ({
                ...prev,
                correct: prev.correct + 1,
                totalQuestions: prev.totalQuestions + 1
            }));

            if (mistakeWords.has(currentQuestion.word.id)) {
                setMistakeWords(prev => {
                    const newMap = new Map(prev);
                    const currentCount = newMap.get(currentQuestion.word.id) || 0;
                    if (currentCount > 0) {
                        newMap.set(currentQuestion.word.id, currentCount - 1);
                    }

                    return newMap;
                });
            }

            setFeedback({
                show: true,
                isCorrect: true,
                message: 'Правильно! 🎉'
            });
        } else {
            setGameStats(prev => ({
                ...prev,
                incorrect: prev.incorrect + 1,
                totalQuestions: prev.totalQuestions + 1
            }));

            setMistakeWords(prev => {
                const newMap = new Map(prev);
                const currentCount = newMap.get(currentQuestion.word.id) || 0;
                newMap.set(currentQuestion.word.id, Math.min(currentCount + MISTAKE_REPEAT_COUNT, MISTAKE_REPEAT_COUNT));

                return newMap;
            });

            setFeedback({
                show: true,
                isCorrect: false,
                message: `Неправильно. Правильна відповідь: ${currentQuestion.word.en}`
            });
        }

        setTimeout(() => {
            generateNextQuestion();
        }, 2000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !feedback.show) {
            checkAnswer();
        }
    };

    const restartGame = () => {
        setGameStats({correct: 0, incorrect: 0, totalQuestions: 0});
        setGameFinished(false);
        setMistakeWords(new Map());
        setFeedback({show: false, isCorrect: false, message: ''});
        initializeGame(wordsByGroups);
    };

    if (loading) {
        return (<Loading />);
    }

    if (gameFinished) {
        const accuracy = gameStats.totalQuestions > 0 ? (gameStats.correct / gameStats.totalQuestions) * 100 : 0;

        return (
            <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
                <div className='bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-6'>Гра завершена! 🎯</h1>

                    <div className='space-y-4 mb-8'>
                        <div className='bg-green-50 p-4 rounded-lg'>
                            <p className='text-green-800 font-semibold'>Правильних відповідей</p>
                            <p className='text-3xl font-bold text-green-600'>{gameStats.correct}</p>
                        </div>

                        <div className='bg-red-50 p-4 rounded-lg'>
                            <p className='text-red-800 font-semibold'>Неправильних відповідей</p>
                            <p className='text-3xl font-bold text-red-600'>{gameStats.incorrect}</p>
                        </div>

                        <div className='bg-blue-50 p-4 rounded-lg'>
                            <p className='text-blue-800 font-semibold'>Точність</p>
                            <p className='text-3xl font-bold text-blue-600'>{accuracy.toFixed(1)}%</p>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <button
                            onClick={restartGame}
                            className='flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center'
                        >
                            <ArrowPathIcon className='w-5 h-5 mr-2' />
                            Грати знову
                        </button>

                        <button
                            onClick={() => router.push('/')}
                            className='flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center'
                        >
                            <HomeIcon className='w-5 h-5 mr-2' />
                            На головну
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>
            <div className='max-w-2xl mx-auto'>
                <div className='flex items-center justify-between mb-8'>
                    <button
                        onClick={() => router.push('/')}
                        className='flex items-center text-gray-600 hover:text-gray-800 transition-colors'
                    >
                        <ArrowLeftIcon className='w-5 h-5 mr-2' />
                        Назад
                    </button>

                    <div className='text-center'>
                        <h1 className='text-2xl font-bold text-gray-800'>Перевірка правопису</h1>
                        <p className='text-gray-600'>Питання {gameStats.totalQuestions + 1} з {MAX_QUESTIONS}</p>
                    </div>

                    <div className='text-right text-sm text-gray-600'>
                        <p>✅ {gameStats.correct} | ❌ {gameStats.incorrect}</p>
                    </div>
                </div>

                <div className='w-full bg-gray-200 rounded-full h-2 mb-8'>
                    <div
                        className='bg-blue-500 h-2 rounded-full transition-all duration-300'
                        style={{width: `${(gameStats.totalQuestions / MAX_QUESTIONS) * 100}%`}}
                    ></div>
                </div>

                {currentQuestion && (
                    <div className='bg-white rounded-lg shadow-lg p-8'>
                        <div className='text-center mb-8'>
                            <p className='text-gray-600 mb-2'>Переклад:</p>
                            <p className='text-3xl font-bold text-gray-800'>{currentQuestion.word.ua}</p>
                        </div>

                        <div className='text-center mb-8'>
                            <p className='text-gray-600 mb-2'>Введіть англійське слово:</p>
                            <p className='text-4xl font-mono font-bold text-blue-600 tracking-wider mb-4'>
                                {currentQuestion.maskedWord}
                            </p>
                            <p className='text-sm text-gray-500'>
                                Підказка: {currentQuestion.word.en.length} літер
                            </p>
                        </div>

                        <div className='space-y-4'>
                            <input
                                type='text'
                                value={userInput}
                                onChange={e => setUserInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder='Введіть слово...'
                                disabled={feedback.show}
                                className='w-full px-4 py-3 text-xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100'
                                autoFocus
                            />

                            <button
                                onClick={checkAnswer}
                                disabled={!userInput.trim() || feedback.show}
                                className='w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center'
                            >
                                <CheckIcon className='w-5 h-5 mr-2' />
                                Перевірити
                            </button>
                        </div>
                        {feedback.show && (
                            <div className={`mt-6 p-4 rounded-lg text-center ${
                                feedback.isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                            }`}>
                                <div className='flex items-center justify-center mb-2'>
                                    {feedback.isCorrect ? (
                                        <CheckIcon className='w-6 h-6 mr-2' />
                                    ) : (
                                        <XMarkIcon className='w-6 h-6 mr-2' />
                                    )}
                                    <span className='font-semibold'>{feedback.message}</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpellingGame;
