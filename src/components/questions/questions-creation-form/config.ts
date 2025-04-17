import { v4 as uuid } from 'uuid';
import * as yup from 'yup';

import { validationText } from '@constants/validation';

export const defaultFormValues = {
  title: '',
  multiSelect: false,
  options: [
    { id: uuid(), value: '' },
    { id: uuid(), value: '' },
  ],
  correctAnswers: [],
};

export const validationSchema = yup.object().shape({
  title: yup.string().min(3).max(30).required(validationText.required),
  multiSelect: yup.boolean().required(),
  options: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        value: yup.string().trim().required(validationText.emptyOptions),
      }),
    )
    .min(2, validationText.minOptions)
    .required(),
  correctAnswers: yup
    .array()
    .of(yup.string().required())
    .min(1, validationText.emptyCorrectAnswers)
    .required(),
});
