import { ChangeEvent, useState, useEffect, useRef } from 'react';

import { emptyFieldText } from '@constants/text';
import { EditIcon, ApproveIcon, CloseIcon } from '@constants/icons';

import styles from './tests-detail-item.module.scss';

interface TestsDetailItemProps {
  title: string;
  onChange: () => void;
  defautlValue?: string;
}

export const TestsDetailItem = ({
  title,
  defautlValue,
  onChange,
}: TestsDetailItemProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState(defautlValue);
  const [isModifyModeEnabled, setIsModifyModeEnabled] = useState(false);

  useEffect(() => {
    if (isModifyModeEnabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModifyModeEnabled]);

  const modifyModeStart = () => {
    setIsModifyModeEnabled(true);
  };

  const modifyModeClose = () => {
    setInputValue(defautlValue);
    setIsModifyModeEnabled(false);
  };

  const handleSubmitButtonClick = () => {
    onChange();
    modifyModeClose();
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.detailsItem}>
      <h2>{title}</h2>
      {!isModifyModeEnabled ? (
        <button onClick={modifyModeStart} className={styles.modifyButton}>
          <EditIcon />
        </button>
      ) : (
        <div className={styles.controlls}>
          <button className={styles.closeButton} onClick={modifyModeClose}>
            <CloseIcon width="18px" />
          </button>
          <button onClick={handleSubmitButtonClick}>
            <ApproveIcon width="20px" />
          </button>
        </div>
      )}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        defaultValue={inputValue || emptyFieldText}
        className={styles.detailsInput}
        onChange={handleValueChange}
        disabled={!isModifyModeEnabled}
      />
    </div>
  );
};

