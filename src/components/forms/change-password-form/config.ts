import { InputController } from './types';
import { validationText, validationRegex } from '@constants/validation';
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(6)
    .max(20)
    .matches(validationRegex.password, validationText.password)
    .required(validationText.required),
  newPassword: yup
    .string()
    .min(6)
    .max(20)
    .matches(validationRegex.password, validationText.password)
    .required(validationText.required),
});

export const inputControllers: InputController[] = [
  {
    name: 'oldPassword',
    type: 'password',
    placeholder: 'Enter current password',
    isPasswordField: true,
  },
  {
    name: 'newPassword',
    type: 'password',
    placeholder: 'Enter new password',
    isPasswordField: true,
  },
];
