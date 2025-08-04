import { UserType, ParticipantsSelectOption } from '@root/types/user';

export const formatSelectOptions = (
  users: UserType[],
): ParticipantsSelectOption[] => {
  return users.map((user) => ({
    value: user.id,
    label: `${user.name} (${user.email})`,
  }));
};
