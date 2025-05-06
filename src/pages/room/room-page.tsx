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
  const { id: roomId } = useParams();

  const userId = useSelector(userIdSelector);
  const quizStatus = useSelector(quizStatusSelector(roomId as string));

  const { testId, users, results, error, setReady, submitAnswers } =
    useTestRoom(roomId as string, userId);

  const { data: testDetailsData, isLoading } = useGetTestDetailsQuery({
    id: Number(testId),
  });

  if (isLoading) {
    // TODO: styles
    return <Loader />;
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
          <QuizSession
            roomId={roomId as string}
            testId={Number(testId)}
            onSubmit={submitAnswers}
          />
        ) : quizStatus === QuizStatus.FINISHED ? (
          <QuizResults
            roomId={roomId as string}
            participants={users}
            results={results}
          />
        ) : null}
      </div>
    </main>
  );
};
