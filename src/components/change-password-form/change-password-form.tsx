import { useForm, Controller } from 'react-hook-form';
import { InputField } from '@components/input-field';
import { ChangePasswordFormValues } from './types';
import { inputControllers, validationSchema } from './config';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { userSelector } from '@store/selectors/auth-selector';
import { toast } from 'react-toastify';
import { errorText, successChangePasswordText } from '@constants/text';
import { useAppDispatch } from '@hooks/use-app-dispatch';
import { clearCredentials } from '@store/features/auth/auth-slice';
import { useNavigate } from 'react-router-dom';
import { routes } from '@constants/routes';

import { useChangePasswordMutation } from '@store/api/user-api';

import styles from './change-password-form.module.scss';

export const ChangePasswordForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id: userId } = useSelector(userSelector);

  const [changePasswordMutation] = useChangePasswordMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const handleFormSubmit = async (data: ChangePasswordFormValues) => {
    const { oldPassword, newPassword } = data;

    changePasswordMutation({ userId, oldPassword, newPassword })
      .unwrap()
      .then(() => {
        toast.success(successChangePasswordText);
        dispatch(clearCredentials());
        navigate(routes.login);
      })
      .catch((error) => {
        const errorMessage = error?.data?.message || errorText;

        toast.error(errorMessage);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={styles.passwordForm}
    >
      {inputControllers.map(({ name, type, placeholder, isPasswordField }) => (
        <Controller
          key={name}
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
            <InputField
              type={type}
              className={styles.inputField}
              placeholder={placeholder}
              onChange={onChange}
              validationText={errors?.[name]?.message}
              isPasswordField={isPasswordField}
            />
          )}
        />
      ))}
      <button type="submit" className={styles.submitButton}>
        Change
      </button>
    </form>
  );
};
