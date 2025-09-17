'use client';

import {useState, useEffect} from 'react';
import {ArrowLeftIcon} from '@heroicons/react/24/outline';
import {useRouter} from 'next/navigation';
import {IWord} from '@/types';
import {useGetWordsByGroupId} from '@/lib/hooks/useGetWordGroupById';
import {Loading} from '@/ui/Loading';
import {GameResults} from '@/ui/SpellingGame/GameResults';
import {GameQuestion} from '@/ui/SpellingGame/GameQuestion';

export interface QuestionData {
    word: IWord;
    maskedWord: string;
    attempts: number;
    isCorrect: boolean;
}

export interface GameStats {
    correct: number;
    incorrect: number;
    totalQuestions: number;
}

export interface IFeedback {
    show: boolean;
    isCorrect: boolean;
    message: string;
}

const SpellingGame = () => {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState<QuestionData | null>(null);
    const [userInput, setUserInput] = useState('');
    const [gameStats, setGameStats] = useState<GameStats>({correct: 0, incorrect: 0, totalQuestions: 0});
    const [gameFinished, setGameFinished] = useState(false);
    const [feedback, setFeedback] = useState<IFeedback>({
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

    const restartGame = () => {
        setGameStats({correct: 0, incorrect: 0, totalQuestions: 0});
        setGameFinished(false);
        setMistakeWords(new Map());
        setFeedback({show: false, isCorrect: false, message: ''});
        initializeGame(wordsByGroups);
    };

    const handleBackToHomePage = () => {
        router.push('/');
    };

    if (loading) {
        return (<Loading />);
    }

    if (gameFinished) {
        return (
            <GameResults gameStats={gameStats} restartGame={restartGame} handleBackToHomePage={handleBackToHomePage}/>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>
            <div className='max-w-2xl mx-auto'>
                <div className='flex items-center justify-between mb-8'>
                    <button
                        onClick={handleBackToHomePage}
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
                    />
                </div>

                {currentQuestion && <GameQuestion
                    currentQuestion={currentQuestion}
                    feedback={feedback}
                    checkAnswer={checkAnswer}
                    userInput={userInput}
                    setUserInput={setUserInput}
                />}
            </div>
        </div>
    );
};

export default SpellingGame;
