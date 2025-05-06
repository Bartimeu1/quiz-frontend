import classNames from 'classnames';

import { UserAvatar } from '@components/user';

import { RoomUserType } from '@root/types/user';

import styles from './quiz-lobby.module.scss';

interface QuizLobbyProps {
  testTitle?: string;
  participants: RoomUserType[];
  onReadyToggle: () => void;
}

export const QuizLobby = ({
  testTitle,
  participants,
  onReadyToggle,
}: QuizLobbyProps) => {
  return (
    <div className={styles.quizLobby}>
      <h1 className={styles.title}>{testTitle}</h1>
      <div className={styles.usersList}>
        {participants.map(({ id, name, avatarId, ready }) => (
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
      <button onClick={onReadyToggle} className={styles.readyButton}>
        Ready Up
      </button>
    </div>
  );
};
