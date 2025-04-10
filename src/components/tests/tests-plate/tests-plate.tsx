import { useState } from 'react';
import { useGetAllTestsQuery } from '@store/api/tests-api';
import { Loader } from '@components/loader';
import { TestsCreationForm } from '../tests-creation-form';
import { emptyFieldText } from '@constants/text';
import { Link } from 'react-router-dom';
import { routes } from '@constants/routes';

import styles from './tests-plate.module.scss';

export const TestsPlate = () => {
  const [isCreationModalVisible, setIsCreationModalVisible] = useState(false);
  const { data, isLoading } = useGetAllTestsQuery();

  const handleCreationFormToggle = () => {
    setIsCreationModalVisible((prevState) => !prevState);
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
      <div className={styles.testsList}>
        {data &&
          data.tests.map(({ id, title, description }) => (
            <article key={id} className={styles.testItem}>
              <h3>{title}</h3>
              <p>{description || emptyFieldText}</p>
              <Link to={`${routes.tests}/${id}`}>Explore</Link>
            </article>
          ))}
      </div>
      {isCreationModalVisible && (
        <TestsCreationForm onClose={handleCreationFormToggle} />
      )}
    </div>
  );
};
