import { getAvatarById } from '@utils/get-avatar-by-id';

interface UserAvatarProps {
  avatarId: number | null;
  height?: string;
  width?: string;
}

export const UserAvatar = ({ avatarId, height, width }: UserAvatarProps) => {
  const { icon: AvatarIcon } = getAvatarById(avatarId);

  return <AvatarIcon height={height} width={width} />;
};
