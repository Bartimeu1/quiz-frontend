import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';
import { routes } from '@constants/routes';
import { userSelector } from '@store/selectors/auth-selector';
import { UserAvatar, UserRating } from '@components/user';
import { navLinks } from './config';
import classNames from 'classnames';

export const Header = () => {
  const location = useLocation();

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
      <nav>
        {navLinks.map(({ title, path }) => (
          <Link
            to={path}
            className={classNames(styles.navLink, {
              [styles.isTarget]: location.pathname === path,
            })}
          >
            {title}
          </Link>
        ))}
      </nav>
      <Link to={routes.home} className={styles.logo}>
        <p>Quiz App</p>
      </Link>
    </header>
  );
};
