import { QuizStatus, AnswerType } from '@root/types/quiz';

export interface QuizRoomState {
  quizStatus: QuizStatus;
  testId: number | null;
  targetQuestionId: number | null;
  answers: AnswerType[];
}

export type TestsSliceState = Record<string, QuizRoomState>;
