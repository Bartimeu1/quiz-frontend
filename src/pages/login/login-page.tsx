import { useForm, Controller } from 'react-hook-form';
import { InputField } from '@components/input-field';
import { LoginFormValues } from './types';
import { inputControllers, validationSchema } from './config';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { routes } from '@constants/routes';
import { useAppDispatch } from '@hooks/use-app-dispatch';
import { setCredentials } from '@root/store/features/auth/auth-slice';

import { errorText, successfulLoginText } from '@constants/text';
import { useLoginMutation } from '@store/api/auth-api';

import styles from './login-page.module.scss';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const handleFormSubmit = async (data: LoginFormValues) => {
    const { identifier, password } = data;

    login({ userNameOrEmail: identifier, password })
      .unwrap()
      .then((credentials) => {
        dispatch(setCredentials(credentials));
        toast.success(successfulLoginText);
        navigate(routes.home);
      })
      .catch((error) => {
        const errorMessage = error?.data?.message || errorText;

        toast.error(errorMessage);
      });
  };

  return (
    <main className={styles.loginPage}>
      <h1 className={styles.title}>Log In</h1>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={styles.loginForm}
      >
        {inputControllers.map(
          ({ name, type, placeholder, isPasswordField }) => (
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
          ),
        )}
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </main>
  );
};
