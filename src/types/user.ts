export interface UserType {
  id: number;
  email: string;
  name: string;
  stars: number;
  avatarId: number;
}

export interface ChangeAvatarRequest {
  userId: number;
  avatarId: number;
}

export interface ChangeAvatarResponse {
  user: UserType;
}
