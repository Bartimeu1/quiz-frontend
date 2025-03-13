import { InputController } from './types';
import { validationText, validationRegex } from '@constants/validation';
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(validationText.email)
    .required(validationText.required),
  userName: yup
    .string()
    .min(4)
    .max(20)
    .matches(validationRegex.userName, validationText.userName)
    .required(validationText.required),
  password: yup
    .string()
    .min(6)
    .max(20)
    .matches(validationRegex.password, validationText.password)
    .required(validationText.required),
});

export const inputControllers: InputController[] = [
  {
    name: 'email',
    type: 'text',
    placeholder: 'Email address',
  },
  {
    name: 'userName',
    type: 'text',
    placeholder: 'User name',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    isPasswordField: true,
  },
];
