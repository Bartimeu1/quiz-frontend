export interface RegisterFormValues {
  email: string;
  userName: string;
  password: string;
}

export interface InputController {
  name: RegisterInputNames;
  placeholder: string;
  type: string;
  isPasswordField?: boolean;
}

export type RegisterInputNames = 'email' | 'password' | 'userName';
