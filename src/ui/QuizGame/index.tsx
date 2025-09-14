'use client';

import {useState, useEffect} from 'react';
import {
    ArrowLeftIcon,
    CheckIcon,
    XMarkIcon,
    ArrowPathIcon,
    HomeIcon,
    ClockIcon
} from '@heroicons/react/24/outline';
import {useRouter} from 'next/navigation';
import {IWord} from '@/types';
import {useGetWordsByGroupId} from '@/lib/hooks/useGetWordGroupById';

interface QuizQuestion {
    id: string
    questionWord: string
    questionLanguage: 'en' | 'ua'
    correctAnswer: string
    options: string[]
    correctWordId: string
}

interface QuizStats {
    correct: number
    incorrect: number
    totalQuestions: number
}

interface AnswerFeedback {
    show: boolean
    isCorrect: boolean
    correctAnswer: string
    selectedAnswer: string
}

// eslint-disable-next-line complexity
const QuizGame = ()=>  {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
    const [quizStats, setQuizStats] = useState<QuizStats>({correct: 0, incorrect: 0, totalQuestions: 0});
    const [gameFinished, setGameFinished] = useState(false);
    const [feedback, setFeedback] = useState<AnswerFeedback>({
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

        const newQuestion: QuizQuestion = {
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

    const handleAnswerSelect = (option: string) => {
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

    if (loading) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center'>
                <div className='text-center'>
                    <p className='text-gray-600 mb-4'>Завантаження слів...</p>
                </div>
            </div>
        );
    }

    if (gameFinished) {
        const accuracy = quizStats.totalQuestions > 0 ? (quizStats.correct / quizStats.totalQuestions) * 100 : 0;
        let gradeText = '';
        let gradeColor = '';

        if (accuracy >= 90) {
            gradeText = 'Відмінно! 🏆';
            gradeColor = 'text-yellow-600';
        } else if (accuracy >= 75) {
            gradeText = 'Добре! 🎯';
            gradeColor = 'text-green-600';
        } else if (accuracy >= 60) {
            gradeText = 'Задовільно 📚';
            gradeColor = 'text-blue-600';
        } else {
            gradeText = 'Потрібно практика 💪';
            gradeColor = 'text-orange-600';
        }

        return (
            <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4'>
                <div className='bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-2'>Тестування завершено!</h1>
                    <p className={`text-xl font-semibold mb-6 ${gradeColor}`}>{gradeText}</p>

                    <div className='space-y-4 mb-8'>
                        <div className='bg-green-50 p-4 rounded-lg'>
                            <p className='text-green-800 font-semibold'>Правильних відповідей</p>
                            <p className='text-3xl font-bold text-green-600'>{quizStats.correct}</p>
                        </div>

                        <div className='bg-red-50 p-4 rounded-lg'>
                            <p className='text-red-800 font-semibold'>Неправильних відповідей</p>
                            <p className='text-3xl font-bold text-red-600'>{quizStats.incorrect}</p>
                        </div>

                        <div className='bg-blue-50 p-4 rounded-lg'>
                            <p className='text-blue-800 font-semibold'>Результат</p>
                            <p className='text-3xl font-bold text-blue-600'>{accuracy.toFixed(1)}%</p>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <button
                            onClick={restartQuiz}
                            className='flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center'
                        >
                            <ArrowPathIcon className='w-5 h-5 mr-2' />
                            Пройти знову
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
        <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4'>
            <div className='max-w-3xl mx-auto'>
                <div className='flex items-center justify-between mb-8'>
                    <button
                        onClick={() => router.push('/')}
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
                    ></div>
                </div>

                <div className='w-full bg-gray-200 rounded-full h-2 mb-8'>
                    <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                            timeLeft > 10 ? 'bg-green-400' : timeLeft > 5 ? 'bg-yellow-400' : 'bg-red-400'
                        }`}
                        style={{width: `${(timeLeft / TIME_PER_QUESTION) * 100}%`}}
                    ></div>
                </div>

                {currentQuestion && (
                    <div className='bg-white rounded-lg shadow-lg p-8'>
                        <div className='text-center mb-4'>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentQuestion.questionLanguage === 'en'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
              }`}>
                {currentQuestion.questionLanguage === 'en' ? '🇬🇧 English' : '🇺🇦 Українська'}
              </span>
                        </div>

                        <div className='text-center mb-8'>
                            <p className='text-gray-600 mb-2'>
                                {currentQuestion.questionLanguage === 'en'
                                    ? 'Оберіть переклад слова:'
                                    : 'Оберіть англійський переклад:'}
                            </p>
                            <p className='text-4xl font-bold text-gray-800 mb-4'>
                                {currentQuestion.questionWord}
                            </p>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                            {currentQuestion.options.map((option, index) => {
                                let buttonClass = 'w-full p-4 text-left border-2 rounded-lg transition-all duration-200 font-medium';

                                if (feedback.show) {
                                    if (option === currentQuestion.correctAnswer) {
                                        buttonClass += ' bg-green-100 border-green-500 text-green-800';
                                    } else if (option === selectedOption && option !== currentQuestion.correctAnswer) {
                                        buttonClass += ' bg-red-100 border-red-500 text-red-800';
                                    } else {
                                        buttonClass += ' bg-gray-50 border-gray-300 text-gray-500';
                                    }
                                } else {
                                    if (selectedOption === option) {
                                        buttonClass += ' bg-blue-100 border-blue-500 text-blue-800';
                                    } else {
                                        buttonClass += ' bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400';
                                    }
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerSelect(option)}
                                        disabled={feedback.show}
                                        className={buttonClass}
                                    >
                    <span className='text-sm text-gray-500 block mb-1'>
                      {String.fromCharCode(65 + index)}
                    </span>
                                        {option}
                                    </button>
                                );
                            })}
                        </div>

                        {feedback.show && (
                            <div className={`p-4 rounded-lg text-center ${
                                feedback.isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                            }`}>
                                <div className='flex items-center justify-center mb-2'>
                                    {feedback.isCorrect ? (
                                        <CheckIcon className='w-6 h-6 mr-2' />
                                    ) : (
                                        <XMarkIcon className='w-6 h-6 mr-2' />
                                    )}
                                    <span className='font-semibold'>
                    {feedback.isCorrect ? 'Правильно!' : 'Неправильно'}
                  </span>
                                </div>
                                {!feedback.isCorrect && (
                                    <p className='text-sm'>
                                        {feedback.selectedAnswer === 'Час вийшов'
                                            ? `Час вийшов! Правильна відповідь: ${feedback.correctAnswer}`
                                            : `Правильна відповідь: ${feedback.correctAnswer}`
                                        }
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizGame;
