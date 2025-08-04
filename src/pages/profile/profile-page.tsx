import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '@store/api/auth-api';
import { clearCredentials } from '@store/features/auth/auth-slice';
import { useAppDispatch } from '@hooks/use-app-dispatch';

import { userSelector } from '@store/selectors/auth-selector';
import { routes } from '@constants/routes';

import { UserAvatar, UserRating } from '@components/user';

import styles from './profile-page.module.scss';

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { name, email, avatarId, stars } = useSelector(userSelector);

  const [logout] = useLogoutMutation();

  const handleLogoutButtonClick = () => {
    logout();
    dispatch(clearCredentials());
  };

  return (
    <main className={styles.profilePage}>
      <div className={styles.content}>
        <h1 className={styles.title}>Profile</h1>
        <div className={styles.profileInfo}>
          <div className={styles.profileItem}>
            <h2>Avatar</h2>
            <UserAvatar width="100px" height="100px" avatarId={avatarId} />
          </div>
          <div className={styles.profileItem}>
            <h2>Rating</h2>
            <UserRating rating={stars} className={styles.starRating} />
          </div>
          <div className={styles.profileItem}>
            <h2>User Name</h2>
            <p>{name}</p>
          </div>
          <div className={styles.profileItem}>
            <h2>User Email</h2>
            <p>{email}</p>
          </div>
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            onClick={handleLogoutButtonClick}
            className={styles.logOutButton}
          >
            Logout
          </button>
          <Link to={routes.settings} className={styles.settingsLink}>
            Settings
          </Link>
        </div>
      </div>
    </main>
  );
};
