import { QuizStatus, AnswerType, ParticipantType } from '@root/types/quiz';

export interface QuizRoomState {
  quizStatus: QuizStatus;
  testId: number | null;
  targetQuestionId: number | null;
  participants: ParticipantType[];
  answers: AnswerType[];
}

export type TestsSliceState = Record<string, QuizRoomState>;
