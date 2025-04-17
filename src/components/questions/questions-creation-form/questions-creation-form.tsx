import { useRef, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { compact } from 'lodash';
import { editingTestSelector } from '@store/selectors/tests-selector';

import { useOnClickOutside } from '@hooks/use-on-click-outside';

import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { QuestionFormValues } from './types';
import { defaultFormValues, validationSchema } from './config';
import { CloseIcon } from '@root/constants/icons';

import { ModalWrapper } from '@components/modal-wrapper';
import { InputField } from '@components/input-field';

import styles from './questions-creation-form.module.scss';
import { useSelector } from 'react-redux';

import { useCreateQuestionMutation } from '@store/api/questions-api';
import { QuestionType } from '@root/types/questions';
import { toast } from 'react-toastify';
import { successCreateQuestionText, errorText } from '@root/constants/text';

interface TestsCreationFormProps {
  onClose: () => void;
}

export const QuestionsCreationForm = ({ onClose }: TestsCreationFormProps) => {
  const targetEditingTest = useSelector(editingTestSelector);
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, onClose);
  const [createQuestionMutation] = useCreateQuestionMutation();

  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors: validationErrors },
  } = useForm<QuestionFormValues>({
    mode: 'onChange',
    defaultValues: defaultFormValues,
    resolver: yupResolver(validationSchema),
  });

  const multiSelect = watch('multiSelect');
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
    keyName: 'key',
  });

  useEffect(() => {
    setValue('correctAnswers', []);
  }, [multiSelect]);

  const handleAddOptionClick = () => {
    append({ id: uuid(), value: '' });
    trigger('options');
  };

  const handleRemoveOptionClick = (index: number) => () => {
    remove(index);
    trigger('options');
  };

  const handleCorrectAnswerToggle = (value: string, current: string[] = []) => {
    if (multiSelect) {
      return current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
    } else {
      return current.includes(value) ? [] : [value];
    }
  };

  const handleFormSubmit = (data: QuestionFormValues) => {
    const { title, multiSelect, options, correctAnswers } = data;
    const requestData = {
      title,
      multiSelect,
      options: options.map(({ value }) => value),
      correctAnswers: correctAnswers.map(
        (id) => options.find(({ id: optionId }) => id === optionId)?.value,
      ),
      testId: targetEditingTest,
    };

    createQuestionMutation(requestData as QuestionType)
      .unwrap()
      .then(() => {
        toast.success(successCreateQuestionText);
        onClose();
      })
      .catch((error) => {
        const errorMessage = error?.data?.message || errorText;

        toast.error(errorMessage);
      });
  };

  const { title, correctAnswers, options } = validationErrors;
  const generalErrors = [correctAnswers?.message, options?.root?.message];

  return (
    <ModalWrapper>
      <div className={styles.creationModal}>
        <form
          ref={modalRef}
          onSubmit={handleSubmit(handleFormSubmit)}
          className={styles.creationForm}
        >
          <h2 className={styles.title}>Create Question</h2>
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange } }) => (
              <InputField
                type="text"
                className={styles.titleField}
                placeholder="Title"
                onChange={onChange}
                validationText={title?.message}
              />
            )}
          />
          <div className={styles.optionsControls}>
            <div className={styles.multiAnswers}>
              <input
                type="checkbox"
                className={styles.checkbox}
                {...register('multiSelect')}
              />
              <p>Several correct</p>
            </div>
            <button
              type="button"
              className={styles.addOptionButton}
              onClick={handleAddOptionClick}
            >
              Add option
            </button>
            <div className={styles.generalErrors}>
              {compact(generalErrors).map((message) => (
                <p key={message} className={styles.generalErrorText}>
                  {message}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.optionList}>
            {fields.map((field, index) => {
              const optionId = field.id;
              const optionNumber = index + 1;
              const optionError = options?.[index]?.value;

              return (
                <article key={optionId} className={styles.answerOption}>
                  <div className={styles.optionField}>
                    <input
                      className={styles.optionText}
                      placeholder={`Option ${optionNumber}`}
                      {...register(`options.${index}.value`, {
                        required: true,
                      })}
                    />
                    {optionError && (
                      <p className={styles.validationText}>
                        {optionError.message}
                      </p>
                    )}
                  </div>
                  <Controller
                    control={control}
                    name="correctAnswers"
                    render={({ field: answersField }) => (
                      <input
                        type="checkbox"
                        className={classNames(
                          styles.checkbox,
                          styles.correctAnswerInput,
                        )}
                        checked={answersField.value?.includes(optionId)}
                        onChange={() =>
                          answersField.onChange(
                            handleCorrectAnswerToggle(
                              optionId,
                              answersField.value,
                            ),
                          )
                        }
                      />
                    )}
                  />
                  <button
                    type="button"
                    onClick={handleRemoveOptionClick(index)}
                  >
                    <CloseIcon width="16px" height="16px" />
                  </button>
                </article>
              );
            })}
          </div>
          <button type="submit" className={styles.submitButton}>
            Create
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
};
