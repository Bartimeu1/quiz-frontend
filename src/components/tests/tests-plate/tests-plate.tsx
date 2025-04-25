import { useState } from 'react';
import { useGetAllTestsQuery } from '@store/api/tests-api';
import { Loader } from '@components/loader';
import { TestsCreationForm } from '../tests-creation-form';
import { emptyFieldText } from '@constants/text';
import { routes } from '@constants/routes';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@hooks/use-app-dispatch';
import { setEditingTest } from '@store/features/tests/tests-slice';

import styles from './tests-plate.module.scss';

export const TestsPlate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isCreationModalVisible, setIsCreationModalVisible] = useState(false);
  const { data, isLoading } = useGetAllTestsQuery();

  const handleCreationFormToggle = () => {
    setIsCreationModalVisible((prevState) => !prevState);
  };

  const handleExploreButtonClick = (testId: number) => () => {
    navigate(routes.testDetails.replace(':id', String(testId)));

    dispatch(setEditingTest(testId));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.testsPlate}>
      <h2 className={styles.title}>All tests</h2>
      <button className={styles.createTest} onClick={handleCreationFormToggle}>
        Create new
      </button>
      {data?.tests.length ? (
        <div className={styles.testsList}>
          {data.tests.map(({ id, title, description }) => (
            <article key={id} className={styles.testItem}>
              <h3>{title}</h3>
              <p>{description || emptyFieldText}</p>
              <button onClick={handleExploreButtonClick(id)}>Explore</button>
            </article>
          ))}
        </div>
      ) : (
        <p className={styles.emptyText}>There are no tests yet</p>
      )}
      {isCreationModalVisible && (
        <TestsCreationForm onClose={handleCreationFormToggle} />
      )}
    </div>
  );
};
