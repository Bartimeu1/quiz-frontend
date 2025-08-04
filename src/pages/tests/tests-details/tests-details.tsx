import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetTestDetailsQuery,
  useDeleteTestMutation,
} from '@store/api/tests-api';
import {
  useGetTestQuestionsQuery,
  useDeleteQuestionMutation,
} from '@store/api/questions-api';
import { TestsDetailItem } from '@components/tests/tests-detail-item';
import { Loader } from '@components/loader';
import { QuestionsCreationForm } from '@components/forms';
import { routes } from '@constants/routes';
import { TabItem } from '@components/tab-item';

import { successDeleteTestText, errorText } from '@constants/text';

import { PlusIcon } from '@constants/icons';

import styles from './tests-details.module.scss';
import classNames from 'classnames';
import { toast } from 'react-toastify';

export const TestsDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const testId = id || '';

  const [isQuestionAddFormVisible, setIsQuestionAddFormVisible] =
    useState(false);

  const { data: testDetailsData, isLoading: isTestDetailsLoading } =
    useGetTestDetailsQuery({ id: testId });
  const { data: questionsData, isLoading: isQuestionLoading } =
    useGetTestQuestionsQuery({ testId });

  const [deleteQuestion] = useDeleteQuestionMutation();
  const [deleteTest] = useDeleteTestMutation();

  const handleCreationButtonClick = () => {
    setIsQuestionAddFormVisible((prevState) => !prevState);
  };

  const deleteQuestionButtonClick = (id: string) => () => {
    deleteQuestion({ id });
  };

  const deleteTestButtonClick = (id: string) => () => {
    deleteTest({ id })
      .unwrap()
      .then(() => {
        toast.success(successDeleteTestText);
        navigate(routes.home);
      })
      .catch((error) => {
        const errorMessage = error?.data?.message || errorText;

        toast.error(errorMessage);
      });
  };

  if (isTestDetailsLoading || isQuestionLoading) {
    return <Loader />;
  }

  return (
    <main className={styles.testsDetailsPage}>
      <div className={styles.content}>
        <h1 className={styles.title}>Test Details</h1>
        <TestsDetailItem
          onChange={() => {}}
          title="Title"
          defautlValue={testDetailsData?.test.title}
        />
        <TestsDetailItem
          onChange={() => {}}
          title="Description"
          defautlValue={testDetailsData?.test.description}
        />
        <div className={styles.questionsDetails}>
          <div className={styles.questionsTopper}>
            <h2>Questions</h2>
            <button
              className={styles.creationButton}
              onClick={handleCreationButtonClick}
            >
              <PlusIcon />
            </button>
          </div>

          <div className={styles.questionsList}>
            {questionsData?.questions.map(
              ({ id, title, multiSelect, options, correctAnswers }) => (
                <TabItem key={id} title={title} className={styles.questionItem}>
                  <div className={styles.optionField}>
                    <h4>Title:</h4>
                    <p>{title}</p>
                  </div>
                  <div className={styles.optionField}>
                    <h4>Several answers:</h4>
                    <p>{multiSelect ? 'Yes' : 'No'}</p>
                  </div>
                  <div className={styles.optionField}>
                    <h4>Options:</h4>
                  </div>
                  <div className={styles.optionsList}>
                    {options.map((option) => {
                      const isCorrect = correctAnswers.includes(option);

                      return (
                        <p
                          key={option}
                          className={classNames(
                            styles.optionItem,
                            isCorrect ? styles.correct : styles.incorrect,
                          )}
                        >
                          {option}
                        </p>
                      );
                    })}
                  </div>
                  <button
                    onClick={deleteQuestionButtonClick(id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </TabItem>
              ),
            )}
          </div>
        </div>
        <button
          onClick={deleteTestButtonClick(testId)}
          className={styles.deleteButton}
        >
          Delete Test
        </button>
        {isQuestionAddFormVisible && (
          <QuestionsCreationForm onClose={handleCreationButtonClick} />
        )}
      </div>
    </main>
  );
};
