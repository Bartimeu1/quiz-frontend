export interface LoginFormValues {
  identifier: string;
  password: string;
}

export interface InputController {
  name: LoginInputNames;
  placeholder: string;
  type: string;
  isPasswordField?: boolean;
}

export type LoginInputNames = 'identifier' | 'password';
