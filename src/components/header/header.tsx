import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';
import { routes } from '@constants/routes';
import { userSelector, isAdminSelector } from '@store/selectors/auth-selector';
import { UserAvatar, UserRating } from '@components/user';
import { navLinks } from './config';
import classNames from 'classnames';

export const Header = () => {
  const location = useLocation();

  const { name, avatarId, stars } = useSelector(userSelector);
  const isAdmin = useSelector(isAdminSelector);

  return (
    <header className={styles.header}>
      <div className={styles.userPanel}>
        <div className={styles.userInfo}>
          <UserAvatar
            className={classNames({
              [styles.adminAvatar]: isAdmin,
            })}
            height="52px"
            width="52px"
            avatarId={avatarId}
          />
          <div className={styles.userData}>
            <div className={styles.dataTooper}>
              <p className={styles.userName}>{name}</p>
              {isAdmin && <p className={styles.adminRole}>[admin]</p>}
            </div>
            <UserRating rating={stars} />
          </div>
        </div>
      </div>
      <nav className={styles.navigation}>
        {navLinks.map(({ title, path }) => (
          <Link
            key={title}
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
