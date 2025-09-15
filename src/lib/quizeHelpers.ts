export const getGradeInfo = (accuracy: number) => {
    let gradeText;
    let gradeColor;

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

    return {
        gradeText,
        gradeColor
    };
};
