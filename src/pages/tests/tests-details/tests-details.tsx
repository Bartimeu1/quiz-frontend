import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTestDetailsQuery } from '@store/api/tests-api';
import { useGetTestQuestionsQuery } from '@store/api/questions-api';
import { TestsDetailItem } from '@components/tests/tests-detail-item';
import { Loader } from '@components/loader';
import { QuestionsCreationForm } from '@components/questions';

import { PlusIcon } from '@constants/icons';

import styles from './tests-details.module.scss';

export const TestsDetailsPage = () => {
  const { id } = useParams();
  const testId = Number(id);

  const [isQuestionAddFormVisible, setIsQuestionAddFormVisible] =
    useState(false);

  const { data: testDetailsData, isLoading: isTestDetailsLoading } =
    useGetTestDetailsQuery({ id: testId });
  const { data: questionsData, isLoading: isQuestionLoading } =
    useGetTestQuestionsQuery({ testId: testId });

  const handleCreationButtonClick = () => {
    setIsQuestionAddFormVisible((prevState) => !prevState);
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
          defautlValue={testDetailsData?.title}
        />
        <TestsDetailItem
          onChange={() => {}}
          title="Description"
          defautlValue={testDetailsData?.description}
        />
        <div className={styles.questionsDetails}>
          <h2>Questions</h2>
          <button
            className={styles.creationButton}
            onClick={handleCreationButtonClick}
          >
            <PlusIcon />
          </button>
          <div>
            {questionsData?.questions.map(({ title }) => <p>{title}</p>)}
          </div>
        </div>
        {isQuestionAddFormVisible && (
          <QuestionsCreationForm onClose={handleCreationButtonClick} />
        )}
      </div>
    </main>
  );
};
