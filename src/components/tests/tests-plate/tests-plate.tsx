import { useState } from 'react';
import { useGetAllTestsQuery } from '@store/api/tests-api';
import { Loader } from '@components/loader';
import { TestsCreationForm } from '../tests-creation-form';
import { emptyFieldText } from '@constants/text';
import { routes } from '@constants/routes';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '@hooks/use-app-dispatch';
import { setEditingTest } from '@store/features/tests/tests-slice';
import { RoomsCreationForm } from '@components/rooms';

import { TestType } from '@root/types/tests';

import styles from './tests-plate.module.scss';

export const TestsPlate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isTestCreationModalVisible, setIsTestCreationModalVisible] =
    useState(false);
  const [selectedTest, setSelectedTest] = useState<TestType | null>(null);

  const { data, isLoading } = useGetAllTestsQuery();

  const handleTestCreationFormToggle = () => {
    setIsTestCreationModalVisible((prevState) => !prevState);
  };

  const handleAddRoomButtonClick = (test: TestType) => () => {
    setSelectedTest(test);
  };

  const handleCloseAddRoomModal = () => {
    setSelectedTest(null);
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
      <button
        className={styles.createTest}
        onClick={handleTestCreationFormToggle}
      >
        Create new
      </button>
      {data?.tests.length ? (
        <div className={styles.testsList}>
          {data.tests.map((test) => (
            <article key={test.id} className={styles.testItem}>
              <h3>{test.title}</h3>
              <p>{test.description || emptyFieldText}</p>
              <div className={styles.testControls}>
                <button onClick={handleExploreButtonClick(test.id)}>
                  Explore
                </button>
                <button onClick={handleAddRoomButtonClick(test)}>
                  Create room
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className={styles.emptyText}>There are no tests yet</p>
      )}
      {isTestCreationModalVisible && (
        <TestsCreationForm onClose={handleTestCreationFormToggle} />
      )}
      {selectedTest && (
        <RoomsCreationForm
          selectedTest={selectedTest}
          onClose={handleCloseAddRoomModal}
        />
      )}
    </div>
  );
};
