import { avatarsItems } from '@constants/avatars';

export const getAvatarById = (id: number | null) => {
  return (
    avatarsItems.find(({ id: avatarId }) => avatarId === id) || avatarsItems[0]
  );
};
