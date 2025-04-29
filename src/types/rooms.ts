export interface CreateRoomRequest {
  usersIds: number[];
  testId: number;
}

export interface CreateRoomResponse {
  roomId: string;
}
