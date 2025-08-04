export interface ChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
}

export interface InputController {
  name: ChangePasswordInputNames;
  placeholder: string;
  type: string;
  isPasswordField?: boolean;
}

export type ChangePasswordInputNames = 'oldPassword' | 'newPassword';
