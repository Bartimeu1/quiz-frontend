import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTestRoom } from '@hooks/use-test-room';

import { userIdSelector } from '@store/selectors/auth-selector';
import { useGetTestDetailsQuery } from '@store/api/tests-api';

import { QuizLobby, QuizSession, QuizResults } from '@components/quiz';

import { quizStatusSelector } from '@store/selectors/quiz-selector';
import { errorText } from '@constants/text';

import styles from './room-page.module.scss';
import { QuizStatus } from '@root/types/quiz';
import { Loader } from '@root/components/loader';

export const RoomPage = () => {
  const { id } = useParams();
  const roomId = id as string;

  const userId = useSelector(userIdSelector);
  const quizStatus = useSelector(quizStatusSelector(roomId));

  const { testId, users, results, error, setReady } = useTestRoom(
    roomId,
    userId,
  );

  const { data: testDetailsData, isLoading: isTestDetailsLoading } =
    useGetTestDetailsQuery({
      id: Number(testId),
    });

  if (isTestDetailsLoading) {
    return <Loader className={styles.loader} />;
  }

  if (error.length || !testDetailsData) {
    return (
      <div className={styles.errorPlate}>
        <h2>{error || errorText}</h2>
      </div>
    );
  }
  return (
    <main className={styles.roomPage}>
      <div className={styles.content}>
        {quizStatus === QuizStatus.WAITING ? (
          <QuizLobby
            testTitle={testDetailsData.title}
            participants={users}
            onReadyToggle={setReady}
          />
        ) : quizStatus === QuizStatus.PROGRESS ? (
          <QuizSession roomId={roomId} testId={Number(testId)} />
        ) : quizStatus === QuizStatus.FINISHED ? (
          <QuizResults roomId={roomId} participants={users} results={results} />
        ) : null}
      </div>
    </main>
  );
};
