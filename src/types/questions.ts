export interface QuestionType {
  id: string;
  title: string;
  multiSelect: boolean;
  options: string[];
  correctAnswers: string[];
}

export type PublicQuestionType = Omit<QuestionType, 'correctAnswers'>;

export interface DeleteQuestionRequest {
  id: string;
}

export interface GetTestQuestionsRequest {
  testId: string;
}

export interface GetTestQuestionsResponse {
  questions: QuestionType[];
}

export type GetPublicQuestionsResponse = PublicQuestionType[];
