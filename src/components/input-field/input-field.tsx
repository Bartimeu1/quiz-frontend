import { ChangeEvent, useState, useMemo } from 'react';

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
}

export const InputField = (props: InputFieldProps) => {
  const {
    type,
    onChange,
    placeholder,
    validationText,
    isPasswordField,
    className,
  } = props;

  const [inputValue, setInputValue] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType = useMemo(() => {
    if (isPasswordField) {
      return isPasswordVisible ? 'text' : 'password';
    }

    return type;
  }, [isPasswordVisible]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    onChange(value);
    setInputValue(value);
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className={classNames(styles.inputField, className)}>
      <input
        type={inputType}
        className={classNames(styles.inputElement, {
          [styles.withError]: validationText,
        })}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {isPasswordField && (
        <button
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
