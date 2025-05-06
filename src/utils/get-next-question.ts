import { QUESTION_STEP } from '@constants/quiz';
import { QuestionType } from '@root/types/questions';

export const getNextQuestion = (
  questionId: number,
  questions?: QuestionType[],
) => {
  const nextQuestionId = questionId + QUESTION_STEP;
  const nextQuestion = questions?.find(({ id }) => id === nextQuestionId);

  return { nextQuestionId, nextQuestion };
};
