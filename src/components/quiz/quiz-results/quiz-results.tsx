import { orderBy } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { RoomResultType } from '@root/types/rooms';
import { clearRoom, setQuizStatus } from '@store/features/quiz/quiz-slice';
import { quizParticipantsSelector } from '@store/selectors/quiz-selector';

import { BASE_AVATAR_ID } from '@root/constants/quiz';

import { UserAvatar } from '@components/user';
import { useNavigate } from 'react-router-dom';
import { routes } from '@constants/routes';

import styles from './quiz-results.module.scss';
import { QuizStatus } from '@root/types/quiz';

interface QuizResultsProps {
  roomId: string;
  results: RoomResultType[];
}

export const QuizResults = ({ roomId, results }: QuizResultsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const participants = useSelector(quizParticipantsSelector(roomId));
  const sortedResults = orderBy(results, ['correctAnswers'], 'desc');

  const handleRestartButtonClick = () => {
    dispatch(setQuizStatus({ roomId, status: QuizStatus.PROGRESS }));
  };

  const handleEndButtonClick = () => {
    dispatch(clearRoom({ roomId }));
    navigate(routes.home);
  };
  console.log(results);
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
          const userData = participants.find(({ id }) => id === Number(userId));

          return (
            <article className={styles.resultItem} key={userId}>
              <div className={styles.userInfo}>
                <UserAvatar
                  avatarId={userData?.avatarId || BASE_AVATAR_ID}
                  width="60px"
                />
                <p>{userData?.name}</p>
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
