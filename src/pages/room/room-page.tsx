import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useTestRoom } from '@hooks/use-test-room';

import { userIdSelector } from '@store/selectors/auth-selector';
import { useGetTestDetailsQuery } from '@store/api/tests-api';
import { UserAvatar } from '@components/user';

import styles from './room-page.module.scss';

export const RoomPage = () => {
  const { id: roomId } = useParams();

  const userId = useSelector(userIdSelector);

  const { isQuizStarted, testId, users, error, setReady } = useTestRoom(
    roomId as string,
    userId,
  );

  const { data: testDetailsData } = useGetTestDetailsQuery({
    id: Number(testId),
  });

  if (isQuizStarted) {
    return <p>Quiz started</p>;
  }

  if (error.length) {
    return (
      <div className={styles.errorPlate}>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <main className={styles.roomPage}>
      <div className={styles.content}>
        <h1 className={styles.title}>{testDetailsData?.title}</h1>
        <div className={styles.readyPanel}>
          <div className={styles.usersList}>
            {users.map(({ id, name, avatarId, ready }) => (
              <article key={id} className={styles.userInfo}>
                <UserAvatar
                  className={classNames(
                    styles.userAvatar,
                    ready ? styles.ready : styles.notReady,
                  )}
                  width="70px"
                  avatarId={avatarId}
                />
                <p className={styles.userName}>{name}</p>
              </article>
            ))}
          </div>
          <button onClick={setReady} className={styles.readyButton}>
            Ready Up
          </button>
        </div>
      </div>
    </main>
  );
};
