import { UserType } from '@root/types/user';

export interface AuthSliceState {
  user: UserType | null;
  accessToken: string | null;
}
