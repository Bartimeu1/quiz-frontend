import styles from './home-page.module.scss';
import { useSelector } from 'react-redux';

import { isAdminSelector } from '@store/selectors/auth-selector';
import { TestsPlate } from '@components/tests';

export const HomePage = () => {
  const isAdmin = useSelector(isAdminSelector);

  return (
    <main className={styles.homePage}>
      <div className={styles.content}>{isAdmin && <TestsPlate />}</div>
    </main>
  );
};
