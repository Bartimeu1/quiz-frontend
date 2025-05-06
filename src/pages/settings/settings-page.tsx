import { useState } from 'react';
import { useSelector } from 'react-redux';

import { userSelector } from '@store/selectors/auth-selector';
import { useChangeAvatarMutation } from '@store/api/user-api';
import { setUser } from '@store/features/auth/auth-slice';
import { useAppDispatch } from '@hooks/use-app-dispatch';
import { toast } from 'react-toastify';
import { ApproveIcon } from '@constants/icons';
import { TabItem } from '@components/tab-item';
import { UserAvatar } from '@components/user';
import { ChangePasswordForm } from '@components/forms';
import { successChangeAvatarText, errorText } from '@constants/text';

import { avatarsItems } from '@constants/avatars';

import styles from './settings-page.module.scss';
import classNames from 'classnames';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const { id, avatarId } = useSelector(userSelector);

  const [selectedAvatarId, setSelectedAvatarId] = useState(avatarId);

  const [changeAvatarMutation] = useChangeAvatarMutation();

  const handleAvatarChange = (id: number) => () => {
    setSelectedAvatarId(id);
  };

  const handleAvatarSubmit = () => {
    changeAvatarMutation({
      userId: id,
      avatarId: selectedAvatarId,
    })
      .unwrap()
      .then((data) => {
        dispatch(setUser(data));
        toast.success(successChangeAvatarText);
      })
      .catch((error) => {
        const errorMessage = error?.data?.message || errorText;

        toast.error(errorMessage);
      });
  };

  return (
    <main className={styles.settingsPage}>
      <div className={styles.content}>
        <h1 className={styles.title}>Settings</h1>
        <TabItem title="Change Avatar" className={styles.avatarsTab}>
          <div className={styles.avatarsTopper}>
            <UserAvatar
              className={styles.targetAvatar}
              avatarId={selectedAvatarId}
              width="70px"
              height="70px"
            />
            <button
              className={styles.submitAvatar}
              onClick={handleAvatarSubmit}
            >
              <ApproveIcon />
            </button>
          </div>
          <div className={styles.avatarsPlate}>
            {avatarsItems.map(({ id }) => (
              <button
                key={id}
                onClick={handleAvatarChange(id)}
                className={classNames(styles.avatarButton, {
                  [styles.selected]: id === selectedAvatarId,
                })}
              >
                <UserAvatar avatarId={id} width="45px" height="45px" />
              </button>
            ))}
          </div>
        </TabItem>
        <TabItem title="Change password">
          <ChangePasswordForm />
        </TabItem>
      </div>
    </main>
  );
};
