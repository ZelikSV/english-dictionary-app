'use client';

import {useState, useEffect} from 'react';
import {
    ArrowLeftIcon,
    ClockIcon
} from '@heroicons/react/24/outline';
import {useRouter} from 'next/navigation';
import {IWord} from '@/types';
import {useGetWordsByGroupId} from '@/lib/hooks/useGetWordGroupById';
import {Loading} from '@/ui/Loading';
import {QuizResult} from '@/ui/QuizGame/QuizeResult';
import {QuizQuestion} from '@/ui/QuizGame/QuizQuestion';

export interface IQuizQuestion {
    id: string
    questionWord: string
    questionLanguage: 'en' | 'ua'
    correctAnswer: string
    options: string[]
    correctWordId: string
}

export interface IQuizStats {
    correct: number
    incorrect: number
    totalQuestions: number
}

export interface IAnswerFeedback {
    show: boolean
    isCorrect: boolean
    correctAnswer: string
    selectedAnswer: string
}

const QuizGame = ()=>  {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState<IQuizQuestion | null>(null);
    const [quizStats, setQuizStats] = useState<IQuizStats>({correct: 0, incorrect: 0, totalQuestions: 0});
    const [gameFinished, setGameFinished] = useState(false);
    const [feedback, setFeedback] = useState<IAnswerFeedback>({
        show: false,
        isCorrect: false,
        correctAnswer: '',
        selectedAnswer: ''
    });
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [timeLeft, setTimeLeft] = useState(30);
    const [timerActive, setTimerActive] = useState(false);
    const {wordsByGroups, loading} = useGetWordsByGroupId();

    const MAX_QUESTIONS = 25;
    const TIME_PER_QUESTION = 30;

    useEffect(() => {
        if (!loading && wordsByGroups.length) {
            if (wordsByGroups.length < 4) {
                alert('Потрібно мінімум 4 слова для проведення тестування!');
                router.push('/');

                return;
            }

            initializeQuiz(wordsByGroups);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wordsByGroups, loading]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        handleTimeUp();

                        return 0;
                    }

                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timerActive, timeLeft]);

    const initializeQuiz = (gameWords: IWord[]) => {
        generateNextQuestion(gameWords);
    };

    const generateNextQuestion = (gameWords: IWord[] = wordsByGroups) => {
        if (quizStats.totalQuestions >= MAX_QUESTIONS) {
            setGameFinished(true);
            setTimerActive(false);

            return;
        }

        const questionWord = gameWords[Math.floor(Math.random() * gameWords.length)];

        const questionLanguage: 'en' | 'ua' = Math.random() < 0.5 ? 'en' : 'ua';

        const questionText = questionLanguage === 'en' ? questionWord.en : questionWord.ua;
        const correctAnswer = questionLanguage === 'en' ? questionWord.ua : questionWord.en;

        const incorrectOptions = generateIncorrectOptions(gameWords, questionWord, questionLanguage);

        const allOptions = [correctAnswer, ...incorrectOptions].sort(() => Math.random() - 0.5);

        const newQuestion: IQuizQuestion = {
            id: Date.now().toLocaleString(),
            questionWord: questionText,
            questionLanguage,
            correctAnswer,
            options: allOptions,
            correctWordId: questionWord.id
        };

        setCurrentQuestion(newQuestion);
        setSelectedOption('');
        setFeedback({show: false, isCorrect: false, correctAnswer: '', selectedAnswer: ''});
        setTimeLeft(TIME_PER_QUESTION);
        setTimerActive(true);
    };

    const generateIncorrectOptions = (gameWords: IWord[], correctWord: IWord, questionLanguage: 'en' | 'ua'): string[] => {
        const incorrectWords = gameWords.filter(word => word.id !== correctWord.id);
        const targetLanguage = questionLanguage === 'en' ? 'ua' : 'en';

        const shuffled = incorrectWords.sort(() => Math.random() - 0.5);

        return shuffled.slice(0, 3).map(word => word[targetLanguage]);
    };

    const handleAnswerSelect = (option: string) => ()  => {
        if (feedback.show || !currentQuestion) {
            return;
        }

        setSelectedOption(option);
        setTimerActive(false);

        const isCorrect = option === currentQuestion.correctAnswer;

        setQuizStats(prev => ({
            ...prev,
            correct: prev.correct + (isCorrect ? 1 : 0),
            incorrect: prev.incorrect + (isCorrect ? 0 : 1),
            totalQuestions: prev.totalQuestions + 1
        }));

        setFeedback({
            show: true,
            isCorrect,
            correctAnswer: currentQuestion.correctAnswer,
            selectedAnswer: option
        });

        setTimeout(() => {
            generateNextQuestion();
        }, 3000);
    };

    const handleTimeUp = () => {
        if (!currentQuestion || feedback.show) {
            return;
        }

        setTimerActive(false);
        setQuizStats(prev => ({
            ...prev,
            incorrect: prev.incorrect + 1,
            totalQuestions: prev.totalQuestions + 1
        }));

        setFeedback({
            show: true,
            isCorrect: false,
            correctAnswer: currentQuestion.correctAnswer,
            selectedAnswer: 'Час вийшов'
        });

        setTimeout(() => {
            generateNextQuestion();
        }, 3000);
    };

    const restartQuiz = () => {
        setQuizStats({correct: 0, incorrect: 0, totalQuestions: 0});
        setGameFinished(false);
        setFeedback({show: false, isCorrect: false, correctAnswer: '', selectedAnswer: ''});
        setSelectedOption('');
        setTimerActive(false);
        initializeQuiz(wordsByGroups);
    };

    const handleBackToHomePage = () => {
        router.push('/');
    };

    if (loading) {
        return (<Loading />);
    }

    if (gameFinished) {
        return (<QuizResult quizStats={quizStats} restartQuiz={restartQuiz} handleBackToHomePage={handleBackToHomePage}/>);
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4'>
            <div className='max-w-3xl mx-auto'>
                <div className='flex items-center justify-between mb-8'>
                    <button
                        onClick={handleBackToHomePage}
                        className='flex items-center text-gray-600 hover:text-gray-800 transition-colors'
                    >
                        <ArrowLeftIcon className='w-5 h-5 mr-2' />
                        Назад
                    </button>

                    <div className='text-center'>
                        <h1 className='text-2xl font-bold text-gray-800'>Тестування</h1>
                        <p className='text-gray-600'>Питання {quizStats.totalQuestions + 1} з {MAX_QUESTIONS}</p>
                    </div>

                    <div className='text-right'>
                        <div className='flex items-center text-sm text-gray-600 mb-1'>
                            <ClockIcon className='w-4 h-4 mr-1' />
                            {timeLeft}с
                        </div>
                        <p className='text-sm text-gray-600'>✅ {quizStats.correct} | ❌ {quizStats.incorrect}</p>
                    </div>
                </div>

                <div className='w-full bg-gray-200 rounded-full h-3 mb-8'>
                    <div
                        className='bg-green-500 h-3 rounded-full transition-all duration-300'
                        style={{width: `${(quizStats.totalQuestions / MAX_QUESTIONS) * 100}%`}}
                    />
                </div>

                <div className='w-full bg-gray-200 rounded-full h-2 mb-8'>
                    <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                            timeLeft > 10 ? 'bg-green-400' : timeLeft > 5 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        style={{width: `${(timeLeft / TIME_PER_QUESTION) * 100}%`}}
                    ></div>
                </div>

                {currentQuestion && <QuizQuestion feedback={feedback} currentQuestion={currentQuestion} selectedOption={selectedOption} handleAnswerSelect={handleAnswerSelect}/>}
            </div>
        </div>
    );
};

export default QuizGame;
