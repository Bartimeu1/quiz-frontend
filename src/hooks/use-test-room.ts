import { useRef, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import { useDispatch, useSelector } from 'react-redux';
import { initializeRoom, setQuizStatus } from '@store/features/quiz/quiz-slice';

import { quizAnswersSelector } from '@store/selectors/quiz-selector';

import { RoomUserType } from '@root/types/user';
import { RoomResultType } from '@root/types/rooms';
import { QuizStatus } from '@root/types/quiz';

export const useTestRoom = (roomId: string, userId: number) => {
  const dispatch = useDispatch();

  const socketRef = useRef<Socket>(null);

  const answers = useSelector(quizAnswersSelector(roomId));

  const [users, setUsers] = useState<RoomUserType[]>([]);
  const [results, setResults] = useState<RoomResultType[]>([]);
  const [testId, setTestId] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socketRef.current = socket;

    dispatch(initializeRoom({ roomId }));
    socket.emit('room-join', { roomId, userId });

    socket.on('room-join-error', (error) => {
      setError(error.message);
    });

    socket.on('room-data', ({ testId, users, results }) => {
      setUsers(users);
      setTestId(testId);
      setResults(results);
    });

    socket.on('room-users', (users) => {
      setUsers(users);
    });

    socket.on('room-results', (results) => {
      setResults(results);
    });

    socket.on('start-quiz', () => {
      dispatch(setQuizStatus({ roomId, status: QuizStatus.PROGRESS }));
    });

    return () => {
      socket.emit('room-leave', { roomId, userId });
      socket.disconnect();
    };
  }, []);

  const setReady = () => {
    socketRef.current?.emit('set-ready', { roomId, userId });
  };

  const submitAnswers = () => {
    socketRef.current?.emit('submit-answers', { roomId, userId, answers });
  };

  return { testId, users, results, error, setReady, submitAnswers };
};
