import { RoomUserType } from './user';
import { ParticipantType } from './quiz';

export interface CreateRoomRequest {
  usersIds: number[];
  testId: number;
}

export interface CreateRoomResponse {
  roomId: string;
}

export interface RoomResultType {
  userId: string;
  correctAnswers: number;
}

export enum RoomSocketEvents {
  ROOM_JOIN = 'ROOM_JOIN',
  ROOM_JOIN_ERROR = 'ROOM_JOIN_ERROR',
  ROOM_DATA = 'ROOM_DATA',
  ROOM_USERS = 'ROOM_USERS',
  ROOM_RESULTS = 'ROOM_RESULTS',
  START_QUIZ = 'START_QUIZ',
  SET_READY = 'SET_READY',
  SUBMIT_ANSWERS = 'SUBMIT_ANSWERS',
  ROOM_LEAVE = 'ROOM_LEAVE',
}

export interface RoomJoinError {
  message: string;
}

export interface RoomData {
  testId: number;
  users: RoomUserType[];
  results: RoomResultType[];
  participants: ParticipantType[];
}
