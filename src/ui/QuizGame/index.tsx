'use client';

import { useState, useEffect } from 'react';
import { ArrowLeftIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { IWord } from '@/types';
import { useGetWordsByGroupId } from '@/lib/hooks/useGetWordGroupById';
import { Loading } from '@/ui/Loading';
import { QuizResult } from '@/ui/QuizGame/QuizeResult';
import { QuizQuestion } from '@/ui/QuizGame/QuizQuestion';
import { Lang } from '@/lib/constants';
import styles from './QuizGame.module.scss';

export interface IQuizQuestion {
  id: string;
  questionWord: string;
  questionLanguage: Lang;
  correctAnswer: string;
  options: string[];
  correctWordId: string;
}

export interface IQuizStats {
  correct: number;
  incorrect: number;
  totalQuestions: number;
}

export interface IAnswerFeedback {
  show: boolean;
  isCorrect: boolean;
  correctAnswer: string;
  selectedAnswer: string;
}

const QuizGame = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState<IQuizQuestion | null>(
    null
  );
  const [quizStats, setQuizStats] = useState<IQuizStats>({
    correct: 0,
    incorrect: 0,
    totalQuestions: 0,
  });
  const [gameFinished, setGameFinished] = useState(false);
  const [feedback, setFeedback] = useState<IAnswerFeedback>({
    show: false,
    isCorrect: false,
    correctAnswer: '',
    selectedAnswer: '',
  });
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const { wordsByGroups, loading } = useGetWordsByGroupId();

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

    const questionWord =
      gameWords[Math.floor(Math.random() * gameWords.length)];

    const questionLanguage: Lang = Math.random() < 0.5 ? Lang.EN : Lang.UA;

    const questionText =
      questionLanguage === Lang.EN ? questionWord.en : questionWord.ua;
    const correctAnswer =
      questionLanguage === Lang.EN ? questionWord.ua : questionWord.en;

    const incorrectOptions = generateIncorrectOptions(
      gameWords,
      questionWord,
      questionLanguage
    );

    const allOptions = [correctAnswer, ...incorrectOptions].sort(
      () => Math.random() - 0.5
    );

    const newQuestion: IQuizQuestion = {
      id: Date.now().toLocaleString(),
      questionWord: questionText,
      questionLanguage,
      correctAnswer,
      options: allOptions,
      correctWordId: questionWord.id,
    };

    setCurrentQuestion(newQuestion);
    setSelectedOption('');
    setFeedback({
      show: false,
      isCorrect: false,
      correctAnswer: '',
      selectedAnswer: '',
    });
    setTimeLeft(TIME_PER_QUESTION);
    setTimerActive(true);
  };

  const generateIncorrectOptions = (
    gameWords: IWord[],
    correctWord: IWord,
    questionLanguage: Lang
  ): string[] => {
    const incorrectWords = gameWords.filter(word => word.id !== correctWord.id);
    const targetLanguage = questionLanguage === Lang.EN ? Lang.UA : Lang.EN;

    const shuffled = incorrectWords.sort(() => Math.random() - 0.5);

    return shuffled.slice(0, 3).map(word => word[targetLanguage]);
  };

  const handleAnswerSelect = (option: string) => () => {
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
      totalQuestions: prev.totalQuestions + 1,
    }));

    setFeedback({
      show: true,
      isCorrect,
      correctAnswer: currentQuestion.correctAnswer,
      selectedAnswer: option,
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
      totalQuestions: prev.totalQuestions + 1,
    }));

    setFeedback({
      show: true,
      isCorrect: false,
      correctAnswer: currentQuestion.correctAnswer,
      selectedAnswer: 'Час вийшов',
    });

    setTimeout(() => {
      generateNextQuestion();
    }, 3000);
  };

  const restartQuiz = () => {
    setQuizStats({ correct: 0, incorrect: 0, totalQuestions: 0 });
    setGameFinished(false);
    setFeedback({
      show: false,
      isCorrect: false,
      correctAnswer: '',
      selectedAnswer: '',
    });
    setSelectedOption('');
    setTimerActive(false);
    initializeQuiz(wordsByGroups);
  };

  const handleBackToHomePage = () => {
    router.push('/');
  };

  if (loading) {
    return <Loading />;
  }

  if (gameFinished) {
    return (
      <QuizResult
        quizStats={quizStats}
        restartQuiz={restartQuiz}
        handleBackToHomePage={handleBackToHomePage}
      />
    );
  }

  const getTimerColorClass = () => {
    if (timeLeft > 10) return styles.green;
    if (timeLeft > 5) return styles.yellow;
    return styles.red;
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <button onClick={handleBackToHomePage} className={styles.backButton}>
            <ArrowLeftIcon />
            Назад
          </button>

          <div className={styles.headerCenter}>
            <h1>Тестування</h1>
            <p>
              Питання {quizStats.totalQuestions + 1} з {MAX_QUESTIONS}
            </p>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.timer}>
              <ClockIcon />
              {timeLeft}с
            </div>
          </div>
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${(quizStats.totalQuestions / MAX_QUESTIONS) * 100}%`,
            }}
          />
        </div>

        <div className={styles.timerBar}>
          <div
            className={`${styles.timerFill} ${getTimerColorClass()}`}
            style={{ width: `${(timeLeft / TIME_PER_QUESTION) * 100}%` }}
          />
        </div>

        {currentQuestion && (
          <QuizQuestion
            feedback={feedback}
            currentQuestion={currentQuestion}
            selectedOption={selectedOption}
            handleAnswerSelect={handleAnswerSelect}
          />
        )}
      </div>
    </div>
  );
};

export default QuizGame;
