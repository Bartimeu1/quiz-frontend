import { useRef, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import { RoomUserType } from '@root/types/user';

export const useTestRoom = (roomId: string, userId: number) => {
  const socketRef = useRef<Socket>(null);

  const [users, setUsers] = useState<RoomUserType[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socketRef.current = socket;

    socket.emit('join-room', { roomId, userId });

    socket.on('room-users', (users) => {
      setUsers(users);
    });

    return () => {
      socket.emit('leave-room', { roomId, userId });
      socket.disconnect();
    };
  }, []);

  const setReady = () => {
    socketRef.current?.emit('set-ready', { roomId, userId });
  };

  return { users, setReady };
};
