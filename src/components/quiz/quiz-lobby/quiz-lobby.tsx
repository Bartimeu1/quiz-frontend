import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { UserAvatar } from '@components/user';
import { BASE_AVATAR_ID } from '@constants/quiz';

import { RoomUserType } from '@root/types/user';
import { quizParticipantsSelector } from '@store/selectors/quiz-selector';

import styles from './quiz-lobby.module.scss';

interface QuizLobbyProps {
  roomId: string;
  activeUsers: RoomUserType[];
  onReadyToggle: () => void;
  testTitle?: string;
}

export const QuizLobby = ({
  roomId,
  testTitle,
  activeUsers,
  onReadyToggle,
}: QuizLobbyProps) => {
  const participants = useSelector(quizParticipantsSelector(roomId));

  return (
    <div className={styles.quizLobby}>
      <h1 className={styles.title}>{testTitle}</h1>
      <div className={styles.usersList}>
        {activeUsers.map(({ id, ready }) => {
          const userData = participants.find(
            ({ id: participantId }) => id === participantId,
          );

          return (
            <article key={id} className={styles.userInfo}>
              <UserAvatar
                className={classNames(
                  styles.userAvatar,
                  ready ? styles.ready : styles.notReady,
                )}
                width="70px"
                avatarId={userData?.avatarId || BASE_AVATAR_ID}
              />
              <p className={styles.userName}>{userData?.name}</p>
            </article>
          );
        })}
      </div>
      <button onClick={onReadyToggle} className={styles.readyButton}>
        Ready Up
      </button>
    </div>
  );
};
