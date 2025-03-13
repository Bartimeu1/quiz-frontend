import { UserType } from './user';

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface RegisterResponse {
  accessToken: string;
  user: UserType;
}

export interface LoginRequest {
  userNameOrEmail: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: UserType;
}
