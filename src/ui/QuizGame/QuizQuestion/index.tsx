import React from 'react';
import { Feedback } from '@/ui/QuizGame/Feedback';
import { IAnswerFeedback, IQuizQuestion } from '@/ui/QuizGame';

interface QuizQuestionProps {
  currentQuestion: IQuizQuestion;
  feedback: IAnswerFeedback;
  selectedOption: string;
  handleAnswerSelect: (option: string) => () => void;
}

interface LanguageBadgeProps {
  language: string;
}

const LanguageBadge: React.FC<LanguageBadgeProps> = ({ language }) => {
  const isEnglish = language === 'en';
  const badgeStyles = isEnglish
    ? 'bg-blue-100 text-blue-800'
    : 'bg-yellow-100 text-yellow-800';
  const badgeText = isEnglish ? '🇬🇧 English' : '🇺🇦 Українська';

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${badgeStyles}`}
    >
      {badgeText}
    </span>
  );
};

const getOptionButtonStyles = (
  option: string,
  selectedOption: string,
  correctAnswer: string,
  showFeedback: boolean
): string => {
  const baseStyles =
    'w-full p-4 text-left border-2 rounded-lg transition-all duration-200 font-medium';

  if (showFeedback) {
    if (option === correctAnswer) {
      return `${baseStyles} bg-green-100 border-green-500 text-green-800`;
    }

    if (option === selectedOption && option !== correctAnswer) {
      return `${baseStyles} bg-red-100 border-red-500 text-red-800`;
    }

    return `${baseStyles} bg-gray-50 border-gray-300 text-gray-500`;
  }

  if (selectedOption === option) {
    return `${baseStyles} bg-blue-100 border-blue-500 text-blue-800`;
  }

  return `${baseStyles} bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400`;
};

const getQuestionPrompt = (language: string): string => {
  return language === 'en'
    ? 'Оберіть переклад слова:'
    : 'Оберіть англійський переклад:';
};

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  currentQuestion,
  feedback,
  selectedOption,
  handleAnswerSelect,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-4">
        <LanguageBadge language={currentQuestion.questionLanguage} />
      </div>

      <div className="text-center mb-8">
        <p className="text-gray-600 mb-2">
          {getQuestionPrompt(currentQuestion.questionLanguage)}
        </p>
        <p className="text-4xl font-bold text-gray-800 mb-4">
          {currentQuestion.questionWord}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {currentQuestion.options.map((option, index) => {
          const buttonStyles = getOptionButtonStyles(
            option,
            selectedOption,
            currentQuestion.correctAnswer,
            feedback.show
          );

          return (
            <button
              key={index}
              onClick={handleAnswerSelect(option)}
              disabled={feedback.show}
              className={buttonStyles}
            >
              <span className="text-sm text-gray-500 block mb-1">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {feedback.show && <Feedback feedback={feedback} />}
    </div>
  );
};
