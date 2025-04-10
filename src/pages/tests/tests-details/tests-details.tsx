import { useParams } from 'react-router-dom';
import { useGetTestDetailsQuery } from '@store/api/tests-api';
import { TestsDetailItem } from '@components/tests/tests-detail-item';
import { Loader } from '@components/loader';

import styles from './tests-details.module.scss';

export const TestsDetailsPage = () => {
  const { id: testId } = useParams();
  const { data, isLoading } = useGetTestDetailsQuery({ id: Number(testId) });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className={styles.testsDetailsPage}>
      <div className={styles.content}>
        <h1 className={styles.title}>Test Details</h1>
        {/* <TestsDetailItem title="Title" defautlValue={data?.title} /> */}
        {/* <TestsDetailItem title="Description" defautlValue={data?.description} /> */}
      </div>
    </main>
  );
};

