import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useGetPublicTestQuestionsQuery } from '@store/api/questions-api';
import {
  setTargetQuestionId,
  setAnswer,
  setQuizStatus,
} from '@store/features/quiz/quiz-slice';
import { quizTargetQuestionIdSelector } from '@store/selectors/quiz-selector';
import { Loader } from '@components/loader';
import { noOptionSelectedError, emptyFieldText } from '@constants/text';
import { INITIAL_QUESTION_INDEX } from '@constants/quiz';
import { getNextQuestion } from '@utils/get-next-question';
import { getTargetQuestion } from '@utils/get-target-question';

import styles from './quiz-session.module.scss';
import { QuizStatus } from '@root/types/quiz';
import classNames from 'classnames';

interface QuizSessionProps {
  roomId: string;
  testId: number;
}

export const QuizSession = ({ roomId, testId }: QuizSessionProps) => {
  const dispatch = useDispatch();

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const targetQuestionId = useSelector(quizTargetQuestionIdSelector(roomId));

  const { data: questionsData } = useGetPublicTestQuestionsQuery({ testId });
  const testQuestions = questionsData?.questions;

  useEffect(() => {
    const firstQuestion = testQuestions?.[INITIAL_QUESTION_INDEX];

    if (firstQuestion && targetQuestionId == null) {
      dispatch(setTargetQuestionId({ roomId, questionId: firstQuestion.id }));
    }
  }, [questionsData]);

  const { targetQuestionNumber, targetQuestion } = getTargetQuestion(
    targetQuestionId,
    testQuestions,
  );

  const handleAnswerChange = (option: string) => () => {
    const isSelected = selectedAnswers.includes(option);

    if (targetQuestion?.multiSelect) {
      setSelectedAnswers((prevState) =>
        isSelected
          ? prevState.filter((answer) => answer !== option)
          : [...prevState, option],
      );
      return;
    }

    setSelectedAnswers(isSelected ? [] : [option]);
  };

  const handleSubmitButton = (questionId: number) => () => {
    if (!selectedAnswers.length) {
      setValidationError(noOptionSelectedError);

      return;
    }

    dispatch(setAnswer({ roomId, questionId, answer: selectedAnswers }));
    setValidationError(null);
    setSelectedAnswers([]);

    const { nextQuestionId, nextQuestion } = getNextQuestion(
      questionId,
      questionsData?.questions,
    );

    if (!nextQuestion) {
      dispatch(setTargetQuestionId({ roomId, questionId: null }));
      dispatch(setQuizStatus({ roomId, status: QuizStatus.SUBMITTING }));

      return;
    }

    dispatch(setTargetQuestionId({ roomId, questionId: nextQuestionId }));
  };

  if (!targetQuestion) {
    return <Loader />;
  }

  return (
    <div className={styles.quizSession}>
      <div className={styles.sessionTopper}>
        <h2 className={styles.title}>{targetQuestion.title}</h2>
        <p className={styles.questionTracker}>
          {targetQuestionNumber}/{testQuestions?.length ?? emptyFieldText}
        </p>
      </div>
      <ul className={styles.optionsList}>
        {targetQuestion.options.map((option) => {
          const isMultiselect = targetQuestion.multiSelect;

          return (
            <li key={option} className={styles.testOption}>
              <p>{option}</p>
              <input
                checked={selectedAnswers.includes(option)}
                onChange={handleAnswerChange(option)}
                type={isMultiselect ? 'checkbox' : 'radio'}
                className={classNames(
                  isMultiselect ? styles.checkbox : styles.radio,
                )}
              />
            </li>
          );
        })}
      </ul>
      {validationError && <p className={styles.errorText}>{validationError}</p>}
      <button
        onClick={handleSubmitButton(targetQuestion.id)}
        className={styles.answerButton}
      >
        Answer
      </button>
    </div>
  );
};
