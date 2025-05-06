import { QuestionType } from '@root/types/questions';

const SAFE_INDEX = 0;
const QUESTION_NUMBER_OFFSET = 1;

export const getTargetQuestion = (
  targetId: number | null,
  questions?: QuestionType[],
) => {
  const targetQuestionIndex =
    questions?.findIndex((q) => q.id === targetId) || SAFE_INDEX;

  return {
    targetQuestionNumber: targetQuestionIndex + QUESTION_NUMBER_OFFSET,
    targetQuestion: questions?.[targetQuestionIndex],
  };
};
