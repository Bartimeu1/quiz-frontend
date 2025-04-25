import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useTestRoom } from '@hooks/use-test-room';

import { userIdSelector } from '@store/selectors/auth-selector';
import { useGetTestDetailsQuery } from '@store/api/tests-api';
import { UserAvatar } from '@components/user';

import styles from './tests-room.module.scss';

export const TestsRoom = () => {
  const { id: testId } = useParams();

  const userId = useSelector(userIdSelector);
  const { data: testDetailsData } =
    useGetTestDetailsQuery({ id: Number(testId) });

  const { users, setReady } = useTestRoom(testId as string, userId);

  return (
    <main className={styles.testsRoomPage}>
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
