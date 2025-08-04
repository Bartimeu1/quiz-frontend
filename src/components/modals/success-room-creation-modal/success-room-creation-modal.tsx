import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { ModalWrapper } from '@components/modal-wrapper';
import { useOnClickOutside } from '@hooks/use-on-click-outside';
import { SuccessIcon } from '@constants/icons';

import styles from './success-room-creation-modal.module.scss';

export interface SuccessRoomCreationModalProps {
  newRoomId: string;
  onClose: () => void;
}

export const SuccessRoomCreationModal = ({
  newRoomId,
  onClose,
}: SuccessRoomCreationModalProps) => {
  const navigate = useNavigate();
  const contentRef = useRef(null);

  useOnClickOutside(contentRef, onClose);

  const handleBackButtonClick = () => {
    onClose();
  };

  const handleVisitRoomButtonClick = () => {
    navigate(`room/${newRoomId}`);
  };

  return (
    <ModalWrapper>
      <div className={styles.modal}>
        <div className={styles.content} ref={contentRef}>
          <SuccessIcon />
          <h2 className={styles.title}>Room successfully created</h2>
          <p className={styles.subtitle}>
            All participants will receive an email with the link
          </p>
          <div className={styles.controls}>
            <button onClick={handleBackButtonClick}>Close</button>
            <button onClick={handleVisitRoomButtonClick}>Visit Room</button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
