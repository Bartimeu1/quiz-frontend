import { useState, ReactNode } from 'react';

import { MotionDiv } from '@components/motion';

import { ChevronIcon } from '@constants/icons';
import classNames from 'classnames';

import styles from './tab-item.module.scss';

interface TabItemProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const TabItem = ({ title, className, children }: TabItemProps) => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleToggleButtonClick = () => {
    setIsContentVisible((prevState) => !prevState);
  };

  return (
    <div className={styles.tabItem}>
      <button
        className={classNames(styles.toggleButton, {
          [styles.isOpen]: isContentVisible,
        })}
        onClick={handleToggleButtonClick}
      >
        <h3 className={styles.title}>{title}</h3>
        <ChevronIcon />
      </button>
      {isContentVisible && (
        <MotionDiv
          className={classNames(className)}
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {children}
        </MotionDiv>
      )}
    </div>
  );
};
