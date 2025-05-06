import { orderBy } from 'lodash';
import { useDispatch } from 'react-redux';

import { RoomUserType } from '@root/types/user';
import { RoomResultType } from '@root/types/rooms';
import { clearRoom, setQuizStatus } from '@store/features/quiz/quiz-slice';

import { UserAvatar } from '@components/user';
import { useNavigate } from 'react-router-dom';
import { routes } from '@constants/routes';

import styles from './quiz-results.module.scss';
import { QuizStatus } from '@root/types/quiz';

interface QuizResultsProps {
  roomId: string;
  participants: RoomUserType[];
  results: RoomResultType[];
}

export const QuizResults = ({
  roomId,
  participants,
  results,
}: QuizResultsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sortedResults = orderBy(results, ['correctAnswers'], 'desc');

  const handleRestartButtonClick = () => {
    dispatch(setQuizStatus({ roomId, status: QuizStatus.PROGRESS }));
  };

  const handleEndButtonClick = () => {
    dispatch(clearRoom({ roomId }));
    navigate(routes.home);
  };

  if (!results.length) {
    return <p>No data</p>;
  }

  return (
    <div className={styles.quizResults}>
      <h2 className={styles.title}>Quiz Results</h2>
      <div className={styles.leaderboard}>
        <div className={styles.topper}>
          <p>Participant</p>
          <p>Correct Answers</p>
        </div>
        {sortedResults.map(({ userId, correctAnswers }) => {
          const { avatarId, name } = participants.find(
            ({ id }) => id === Number(userId),
          ) as RoomUserType;

          return (
            <article className={styles.resultItem} key={userId}>
              <div className={styles.userInfo}>
                <UserAvatar avatarId={avatarId} width="60px" />
                <p>{name}</p>
              </div>
              <p className={styles.answersAmount}>{correctAnswers}</p>
            </article>
          );
        })}
      </div>
      <div className={styles.controls}>
        <button onClick={handleRestartButtonClick}>Restart</button>
        <button onClick={handleEndButtonClick}>End</button>
      </div>
    </div>
  );
};
