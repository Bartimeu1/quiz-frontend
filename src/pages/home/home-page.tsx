import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { isAdminSelector } from '@store/selectors/auth-selector';
import { TestsPlate } from '@components/tests';
import { Leaderboard } from '@components/leaderboard';

import styles from './home-page.module.scss';

export const HomePage = () => {
  const isAdmin = useSelector(isAdminSelector);

  return (
    <main className={styles.homePage}>
      <div
        className={classNames(styles.content, {
          [styles.adminPanel]: isAdmin,
        })}
      >
        {isAdmin ? <TestsPlate /> : <Leaderboard />}
      </div>
    </main>
  );
};
