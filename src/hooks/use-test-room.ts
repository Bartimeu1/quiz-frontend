import { useRef, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import { RoomUserType } from '@root/types/user';

export const useTestRoom = (roomId: string, userId: number) => {
  const socketRef = useRef<Socket>(null);

  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [users, setUsers] = useState<RoomUserType[]>([]);
  const [testId, setTestId] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socketRef.current = socket;

    socket.emit('room-join', { roomId, userId });

    socket.on('room-join-error', (error) => {
      setError(error.message);
    });

    socket.on('room-data', ({ testId, users }) => {
      setUsers(users);
      setTestId(testId);
    });

    socket.on('room-users', (users) => {
      setUsers(users);
    });

    socket.on('start-quiz', () => {
      setIsQuizStarted(true);
    });

    return () => {
      socket.emit('room-leave', { roomId, userId });
      socket.disconnect();
    };
  }, []);

  const setReady = () => {
    socketRef.current?.emit('set-ready', { roomId, userId });
  };

  return { isQuizStarted, testId, users, error, setReady };
};
