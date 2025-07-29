export interface QuestionType {
  id: number;
  title: string;
  multiSelect: boolean;
  options: string[];
  correctAnswers: string[];
}

export type PublicQuestionType = Omit<QuestionType, 'correctAnswers'>;

export interface DeleteQuestionRequest {
  id: number;
}

export interface GetTestQuestionsRequest {
  testId: number;
}

export interface GetTestQuestionsResponse {
  questions: QuestionType[];
}

export type GetPublicQuestionsResponse = PublicQuestionType[];
