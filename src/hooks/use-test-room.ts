import { useRef, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import { useDispatch, useSelector } from 'react-redux';
import {
  initializeRoom,
  setQuizStatus,
  setTestId,
} from '@store/features/quiz/quiz-slice';

import {
  quizAnswersSelector,
  quizStatusSelector,
} from '@store/selectors/quiz-selector';

import { RoomUserType } from '@root/types/user';
import {
  RoomResultType,
  RoomSocketEvents,
  RoomJoinError,
  RoomData,
} from '@root/types/rooms';
import { QuizStatus } from '@root/types/quiz';

export const useTestRoom = (roomId: string, userId: number) => {
  const dispatch = useDispatch();
  const socketRef = useRef<Socket>(null);

  const answers = useSelector(quizAnswersSelector(roomId));
  const quizStatus = useSelector(quizStatusSelector(roomId));

  const [users, setUsers] = useState<RoomUserType[]>([]);
  const [results, setResults] = useState<RoomResultType[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (quizStatus === QuizStatus.SUBMITTING) {
      submitAnswers();
      dispatch(setQuizStatus({ roomId, status: QuizStatus.FINISHED }));
    }
  }, [quizStatus]);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socketRef.current = socket;

    dispatch(initializeRoom({ roomId }));
    socket.emit(RoomSocketEvents.ROOM_JOIN, { roomId, userId });

    socket.on(RoomSocketEvents.ROOM_JOIN_ERROR, handleRoomJoinError);
    socket.on(RoomSocketEvents.ROOM_DATA, handleRoomData);
    socket.on(RoomSocketEvents.ROOM_USERS, handleRoomUsers);
    socket.on(RoomSocketEvents.ROOM_RESULTS, handleRoomResults);
    socket.on(RoomSocketEvents.START_QUIZ, handleStartQuiz);

    return () => {
      socket.emit(RoomSocketEvents.ROOM_LEAVE, { roomId, userId });
      socket.disconnect();
    };
  }, []);

  const setReady = () => {
    socketRef.current?.emit(RoomSocketEvents.SET_READY, { roomId, userId });
  };

  const submitAnswers = () => {
    socketRef.current?.emit(RoomSocketEvents.SUBMIT_ANSWERS, {
      roomId,
      userId,
      answers,
    });
  };

  const handleRoomJoinError = ({ message }: RoomJoinError) => setError(message);

  const handleRoomData = ({ testId, users, results }: RoomData) => {
    console.log(testId);
    dispatch(setTestId({ roomId, testId }));
    setUsers(users);
    setResults(results);
  };

  const handleRoomUsers = (users: RoomUserType[]) => {
    setUsers(users);
  };

  const handleRoomResults = (results: RoomResultType[]) => {
    setResults(results);
  };

  const handleStartQuiz = () => {
    dispatch(setQuizStatus({ roomId, status: QuizStatus.PROGRESS }));
  };

  return { users, results, error, setReady };
};
