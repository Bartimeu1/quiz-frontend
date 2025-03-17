import { InputController } from './types';
import { validationText, validationRegex } from '@constants/validation';
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  identifier: yup.string().required(validationText.required),
  password: yup
    .string()
    .min(6)
    .max(20)
    .matches(validationRegex.password, validationText.password)
    .required(validationText.required),
});

export const inputControllers: InputController[] = [
  {
    name: 'identifier',
    type: 'text',
    placeholder: 'Email or User Name',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    isPasswordField: true,
  },
];
