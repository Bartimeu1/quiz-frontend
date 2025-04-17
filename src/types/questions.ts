export interface QuestionType {
  title: string;
  multiSelect: boolean;
  testId: number;
  options: string[];
  correctAnswers: string[];
}

export interface GetTestQuestionsRequest {
  testId: number;
}

export interface GetTestQuestionsResponse {
  questions: QuestionType[];
}
