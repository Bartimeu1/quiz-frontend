export enum QuizStatus {
  WAITING = 'WAITING',
  PROGRESS = 'PROGRESS',
  SUBMITTING = 'SUBMITTING',
  FINISHED = 'FINISHED',
}

export interface AnswerType {
  questionId: number;
  answer: string[];
}
