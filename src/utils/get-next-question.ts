import { QUESTION_STEP } from '@constants/quiz';
import { PublicQuestionType } from '@root/types/questions';

const NOT_FOUND_INDEX = -1;

export const getNextQuestion = (
  questionId: string,
  questions: PublicQuestionType[],
) => {
  const targetQuestionIndex = questions?.findIndex(
    ({ id }) => id === questionId,
  );

  if (targetQuestionIndex === NOT_FOUND_INDEX) {
    return { nextQuestionId: undefined, nextQuestion: undefined };
  }

  const nextIndex = targetQuestionIndex + QUESTION_STEP;
  const nextQuestion = questions[nextIndex];
  const nextQuestionId = nextQuestion?.id;

  return { nextQuestionId, nextQuestion };
};
