import { useSelector } from 'react-redux';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';
import { routes } from '@constants/routes';
import { userSelector } from '@store/selectors/auth-selector';
import { UserAvatar, UserRating } from '@components/user';

export const Header = () => {
  const { name, avatarId, stars } = useSelector(userSelector);

  return (
    <header className={styles.header}>
      <div className={styles.userPanel}>
        <div className={styles.userInfo}>
          <UserAvatar height="52px" width="52px" avatarId={avatarId} />
          <div className={styles.userData}>
            <p className={styles.userName}>{name}</p>
            <UserRating rating={stars} />
          </div>
        </div>
      </div>
      <Link to={routes.home} className={styles.logo}>
        <p>Quiz App</p>
      </Link>
      <Link to={routes.profile} className={styles.profileLink}>
        Profile
      </Link>
    </header>
  );
};
