import { useRef, useState, useEffect } from 'react';
import Select from 'react-select';

import { useOnClickOutside } from '@hooks/use-on-click-outside';

import { RoomsCreationFormProps } from './types';

import { useLazyGetUsersQuery } from '@store/api/user-api';
import { useCreateRoomMutation } from '@store/api/rooms-api';
import { useGetTestQuestionsQuery } from '@store/api/questions-api';
import {
  successCreateRoomText,
  notEnoughParticipantsText,
  notEnoughQuestionsText,
  errorText,
} from '@constants/text';

import { toast } from 'react-toastify';

import { formatSelectOptions } from '@utils/format-select-option';
import { useThrottle } from '@hooks/use-throttle';

import styles from './rooms-creation-form.module.scss';
import { ModalWrapper } from '@components/modal-wrapper';
import { ParticipantsSelectOption } from '@root/types/user';
import { Loader } from '@components/loader';
import { SuccessRoomCreationModal } from '@components/modals';

const MIN_PARTICIPANTS = 1;
const MIN_TEST_QUESTIONS = 2;
const SEARCH_THROTTLE_TIME = 1000;

export const RoomsCreationForm = ({
  selectedTest,
  onClose,
}: RoomsCreationFormProps) => {
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, onClose);

  const [inputValue, setInputValue] = useState('');
  const [validationText, setValidationText] = useState('');
  const [createdRoomId, setCreatedRoomId] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<
    ParticipantsSelectOption[]
  >([]);
  const throttledInput = useThrottle(inputValue, SEARCH_THROTTLE_TIME);

  const [createRoomMutation, { isLoading: isRoomCreationLoading }] =
    useCreateRoomMutation();
  const [getUsers, { data: usersData }] = useLazyGetUsersQuery();
  const { data: questionsData } = useGetTestQuestionsQuery({
    testId: selectedTest.id,
  });

  const selectOptions = formatSelectOptions(usersData || []);

  useEffect(() => {
    getUsers({ nameOrEmail: throttledInput });
  }, [throttledInput]);

  const handleClearRoomId = () => {
    setCreatedRoomId('');
    onClose();
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleParticipantsSelect = (
    newValue: readonly ParticipantsSelectOption[],
  ) => {
    setSelectedParticipants(newValue as ParticipantsSelectOption[]);
  };

  const handleCreateButtonClick = async () => {
    if (selectedParticipants.length < MIN_PARTICIPANTS) {
      setValidationText(notEnoughParticipantsText);

      return;
    }

    if (questionsData && questionsData?.questions.length < MIN_TEST_QUESTIONS) {
      setValidationText(notEnoughQuestionsText);

      return;
    }

    setValidationText('');
    createRoomMutation({
      testId: selectedTest.id,
      usersIds: selectedParticipants.map((participant) => participant.value),
    })
      .unwrap()
      .then((response) => {
        const { roomId } = response;

        setCreatedRoomId(roomId);
        toast.success(successCreateRoomText);
      })
      .catch((error) => {
        const errorMessage = error?.data?.message || errorText;
        toast.error(errorMessage);
      });
  };

  if (createdRoomId) {
    return (
      <SuccessRoomCreationModal
        newRoomId={createdRoomId}
        onClose={handleClearRoomId}
      />
    );
  }

  return (
    <ModalWrapper>
      <div className={styles.creationModal}>
        {isRoomCreationLoading ? (
          <Loader />
        ) : (
          <div ref={modalRef} className={styles.creationForm}>
            <h2 className={styles.title}>Create Room</h2>
            <div className={styles.titleWrapper}>
              <h3>Test name:</h3>
              <p className={styles.testTitle}>{selectedTest.title}</p>
            </div>
            <div className={styles.usersSearch}>
              <h3>Selected participants:</h3>
              <div className={styles.selectWrapper}>
                <Select
                  className={styles.usersSelect}
                  onChange={handleParticipantsSelect}
                  onInputChange={handleInputChange}
                  value={selectedParticipants}
                  options={selectOptions}
                  isMulti={true}
                  isClearable={false}
                  placeholder="Search users by name or email..."
                />
                {validationText && (
                  <p className={styles.validationText}>{validationText}</p>
                )}
              </div>
            </div>
            <button
              onClick={handleCreateButtonClick}
              className={styles.createButton}
            >
              Create
            </button>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
