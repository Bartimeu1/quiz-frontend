import { QUESTION_STEP } from '@constants/quiz';
import { PublicQuestionType } from '@root/types/questions';

export const getNextQuestion = (
  questionId: number,
  questions?: PublicQuestionType[],
) => {
  const nextQuestionId = questionId + QUESTION_STEP;
  const nextQuestion = questions?.find(({ id }) => id === nextQuestionId);

  return { nextQuestionId, nextQuestion };
};
