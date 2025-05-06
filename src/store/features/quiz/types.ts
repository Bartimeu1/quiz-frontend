import { QuizStatus } from '@root/types/quiz';

export interface QuizRoomState {
  quizStatus: QuizStatus;
  targetQuestionId: number | null;
  answers: { questionId: number; answer: string[] }[];
}

export type TestsSliceState = Record<string, QuizRoomState>;
