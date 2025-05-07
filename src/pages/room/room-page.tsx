import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTestRoom } from '@hooks/use-test-room';

import { userIdSelector } from '@store/selectors/auth-selector';
import { useGetTestDetailsQuery } from '@store/api/tests-api';

import { QuizLobby, QuizSession, QuizResults } from '@components/quiz';

import {
  quizStatusSelector,
  quizTestIdSelector,
} from '@store/selectors/quiz-selector';
import { errorText } from '@constants/text';

import styles from './room-page.module.scss';
import { QuizStatus } from '@root/types/quiz';
import { Loader } from '@root/components/loader';

export const RoomPage = () => {
  const { id } = useParams();
  const roomId = id as string;

  const userId = useSelector(userIdSelector);
  const testId = useSelector(quizTestIdSelector(roomId)) as number;
  const quizStatus = useSelector(quizStatusSelector(roomId));

  const { users, results, error, setReady } = useTestRoom(roomId, userId);
  const { data: testDetailsData, isLoading } = useGetTestDetailsQuery({
    id: testId,
  });

  if (isLoading) {
    return <Loader className={styles.loader} />;
  }

  if (error.length || !testDetailsData) {
    return (
      <div className={styles.errorPlate}>
        <h2>{error || errorText}</h2>
      </div>
    );
  }

  const renderQuizContent = () => {
    switch (quizStatus) {
      case QuizStatus.WAITING:
        return (
          <QuizLobby
            testTitle={testDetailsData.title}
            participants={users}
            onReadyToggle={setReady}
          />
        );
      case QuizStatus.PROGRESS:
        return <QuizSession roomId={roomId} testId={testId} />;
      case QuizStatus.FINISHED:
        return (
          <QuizResults roomId={roomId} participants={users} results={results} />
        );
      default:
        return null;
    }
  };

  return (
    <main className={styles.roomPage}>
      <div className={styles.content}>{renderQuizContent()}</div>
    </main>
  );
};
