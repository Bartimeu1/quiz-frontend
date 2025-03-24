import { LogoIcon } from '@constants/icons';

import { useSelector } from 'react-redux';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';
import { routes } from '@constants/routes';
import { userSelector } from '@store/selectors/auth-selector';

export const Header = () => {
  const user = useSelector(userSelector);

  return (
    <header className={styles.header}>
      <div className={styles.userPanel}>
        <Link to={routes.home} className={styles.logo}>
          <LogoIcon />
        </Link>
        <div className={styles.userInfo}>
          <p className={styles.userName}>{user?.name}</p>
          <p className={styles.userEmail}>{user?.email}</p>
        </div>
      </div>
      <Link to={routes.profile} className={styles.profileLink}>
        Profile
      </Link>
    </header>
  );
};
