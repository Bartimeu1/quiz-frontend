export interface UserType {
  id: number;
  email: string;
  name: string;
  stars: number;
  avatarId: number;
  role: UserRole;
}
export interface ParticipantsSelectOption {
  value: number;
  label: string;
}

export interface GetUsersRequest {
  nameOrEmail?: string;
}

export interface RoomUserType {
  id: number;
  ready: boolean;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface ChangeAvatarRequest {
  userId: number;
  avatarId: number;
}

export interface ChangeAvatarResponse {
  data: UserType;
}

export interface ChangePasswordRequest {
  userId: number;
  oldPassword: string;
  newPassword: string;
}
