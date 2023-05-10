import { Profile } from '@/entities/Profile';

import { ValidateProfileError } from '../../const/const';

export const validateProfileData = (profile?: Profile | null) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA];
  }
  const { username, first, lastname, age } = profile;
  const errors: ValidateProfileError[] = [];

  if (!username || !first || !lastname) {
    errors.push(ValidateProfileError.INCORRECT_USER_DATA);
  }
  if (!age || !Number.isInteger(age)) {
    errors.push(ValidateProfileError.INCORRECT_AGE);
  }

  return errors;
};
