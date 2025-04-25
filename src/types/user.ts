export interface UserType {
  id: number;
  email: string;
  name: string;
  stars: number;
  avatarId: number;
  role: UserRole;
}

export interface RoomUserType {
  id: number;
  avatarId: number;
  name: string;
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
  user: UserType;
}

export interface ChangePasswordRequest {
  userId: number;
  oldPassword: string;
  newPassword: string;
}
