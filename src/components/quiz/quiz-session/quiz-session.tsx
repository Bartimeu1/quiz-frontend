import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useGetTestQuestionsQuery } from '@store/api/questions-api';
import {
  setTargetQuestionId,
  setAnswer,
  setQuizStatus,
} from '@store/features/quiz/quiz-slice';
import { quizTargetQuestionIdSelector } from '@store/selectors/quiz-selector';
import { Loader } from '@components/loader';
import { noOptionSelectedError } from '@constants/text';
import { INITIAL_QUESTION_INDEX, QUESTION_STEP } from '@constants/quiz';

import styles from './quiz-session.module.scss';
import { QuizStatus } from '@root/types/quiz';
import classNames from 'classnames';

interface QuizSessionProps {
  roomId: string;
  testId: number;
  onSubmit: () => void;
}

export const QuizSession = ({ roomId, testId, onSubmit }: QuizSessionProps) => {
  const dispatch = useDispatch();

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  const targetQuestionId = useSelector(quizTargetQuestionIdSelector(roomId));
  const { data: questionsData } = useGetTestQuestionsQuery({ testId });

  useEffect(() => {
    if (questionsData?.questions && targetQuestionId == null) {
      const firstQuestionId =
        questionsData.questions[INITIAL_QUESTION_INDEX]?.id;
      dispatch(setTargetQuestionId({ roomId, questionId: firstQuestionId }));
    }
  }, [questionsData]);

  const targetQuestion = questionsData?.questions.find(
    (question) => question.id === targetQuestionId,
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

    const nextQuestionId = questionId + QUESTION_STEP;
    const nextQuestion = questionsData?.questions.find(
      ({ id }) => id === nextQuestionId,
    );

    if (nextQuestion) {
      dispatch(setTargetQuestionId({ roomId, questionId: nextQuestionId }));
    } else {
      dispatch(setQuizStatus({ roomId, status: QuizStatus.FINISHED }));
      dispatch(setTargetQuestionId({ roomId, questionId: null }));

      onSubmit();
    }
  };

  if (!targetQuestion) {
    return <Loader />;
  }

  return (
    <div className={styles.quizSession}>
      <h2 className={styles.title}>{targetQuestion.title}</h2>
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
