import { useForm, Controller } from 'react-hook-form';

import { InputField } from '@components/input-field';
import { RegisterFormValues } from './types';
import { inputControllers, validationSchema } from './config';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { routes } from '@constants/routes';

import { errorText, successfulRegisterText } from '@constants/text';
import { useRegisterMutation } from '@store/api/auth-api';

import styles from './registration-page.module.scss';

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const handleFormSubmit = async (data: RegisterFormValues) => {
    const { userName, email, password } = data;

    register({ email, password, name: userName })
      .unwrap()
      .then(() => {
        toast.success(successfulRegisterText);
        navigate(routes.base);
      })
      .catch((error) => {
        const errorMessage = error?.data?.message || errorText;

        toast.error(errorMessage);
      });
  };

  return (
    <main className={styles.registerPage}>
      <h1 className={styles.title}>Create an account</h1>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={styles.registerForm}
      >
        {inputControllers.map(
          ({ name, type, placeholder, isPasswordField }) => (
            <Controller
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
        <button className={styles.submitButton}>Submit</button>
      </form>
    </main>
  );
};
