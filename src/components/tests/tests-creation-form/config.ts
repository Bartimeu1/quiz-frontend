import { validationText } from '@constants/validation';
import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  title: yup.string().min(3).max(30).required(validationText.required),
  description: yup.string().min(5).max(30),
});
