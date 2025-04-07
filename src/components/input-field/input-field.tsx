import { ChangeEvent, useState } from 'react';

import { PassClosed, PassOpened } from '@constants/icons';

import styles from './input-field.module.scss';
import classNames from 'classnames';

export interface InputFieldProps {
  type: string;
  placeholder: string;
  onChange: (value: string) => void;
  validationText?: string;
  baseValue?: string;
  isPasswordField?: boolean;
  className?: string;
  inputClassName?: string;
}

export const InputField = (props: InputFieldProps) => {
  const {
    type,
    onChange,
    placeholder,
    validationText,
    isPasswordField,
    className,
    inputClassName,
  } = props;

  const [inputValue, setInputValue] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    onChange(value);
    setInputValue(value);
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const getInputType = () => {
    if (isPasswordField) {
      return isPasswordVisible ? 'text' : 'password';
    }

    return type;
  };

  return (
    <div className={classNames(styles.inputField, className)}>
      <input
        type={getInputType()}
        className={classNames(inputClassName, styles.inputElement, {
          [styles.withError]: validationText,
        })}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {isPasswordField && (
        <button
          type="button"
          className={styles.passwordButton}
          onClick={handlePasswordVisibility}
        >
          {isPasswordVisible ? <PassOpened /> : <PassClosed />}
        </button>
      )}
      {validationText && (
        <p className={styles.validationText}>{validationText}</p>
      )}
    </div>
  );
};
