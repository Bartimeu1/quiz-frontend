import classNames from 'classnames';

import { getAvatarById } from '@utils/get-avatar-by-id';

interface UserAvatarProps {
  avatarId: number;
  height?: string;
  width?: string;
  className?: string;
}

export const UserAvatar = ({
  avatarId,
  height,
  width,
  className,
}: UserAvatarProps) => {
  const { icon: AvatarIcon } = getAvatarById(avatarId);

  return (
    <AvatarIcon
      className={classNames(className)}
      height={height}
      width={width}
    />
  );
};
