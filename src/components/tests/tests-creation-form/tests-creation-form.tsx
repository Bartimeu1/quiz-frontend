import { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useOnClickOutside } from '@hooks/use-on-click-outside';

import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { errorText, successCreateTextText } from '@constants/text';

import { ModalWrapper } from '@components/modal-wrapper';
import { InputField } from '@components/input-field';
import { TestCreationFormValues } from './types';
import { validationSchema } from './config';
import { useCreateTestMutation } from '@store/api/tests-api';

import styles from './tests-creation-form.module.scss';

interface TestsCreationFormProps {
  onClose: () => void;
}

export const TestsCreationForm = ({ onClose }: TestsCreationFormProps) => {
  const modalRef = useRef(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TestCreationFormValues>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const [createTestMutation] = useCreateTestMutation();
  useOnClickOutside(modalRef, onClose);

  const handleFormSubmit = (data: TestCreationFormValues) => {
    createTestMutation(data)
      .unwrap()
      .then(() => {
        toast.success(successCreateTextText);
        onClose();
      })
      .catch((error) => {
        const errorMessage = error?.data?.message || errorText;

        toast.error(errorMessage);
      });
  };

  const { title: titleError, description: descriptionError } = errors;

  return (
    <ModalWrapper>
      <div className={styles.creationModal}>
        <form
          ref={modalRef}
          onSubmit={handleSubmit(handleFormSubmit)}
          className={styles.creationForm}
        >
          <h2 className={styles.title}>Create Test</h2>
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange } }) => (
              <InputField
                type="text"
                inputClassName={styles.titleInput}
                className={styles.titleField}
                placeholder="Test title"
                onChange={onChange}
                validationText={titleError?.message}
              />
            )}
          />
          <div className={styles.formField}>
            <Controller
              name="description"
              control={control}
              render={({ field: { onChange } }) => (
                <textarea
                  rows={4}
                  className={styles.desriptionField}
                  placeholder="Test desription"
                  onChange={onChange}
                />
              )}
            />
            {descriptionError && (
              <p className={styles.validationText}>
                {descriptionError?.message}
              </p>
            )}
          </div>
          <button type="submit" className={styles.submitButton}>
            Create
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
};
