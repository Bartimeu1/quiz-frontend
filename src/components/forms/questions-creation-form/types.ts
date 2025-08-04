export interface QuestionFormValues {
  title: string;
  multiSelect: boolean;
  options: { id: string; value: string }[];
  correctAnswers: string[];
}
