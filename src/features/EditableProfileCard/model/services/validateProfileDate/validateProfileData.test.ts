import { validateProfileData } from './validateProfileData';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

import { ValidateProfileError } from '../../const/const';

const data = {
  first: 'name',
  lastname: 'surname',
  age: 23,
  currency: Currency.RUB,
  country: Country.Russia,
  city: 'Mos',
  username: '123',
};
describe('validateProfileData.test', () => {
  test('success', async () => {
    const result = validateProfileData(data);
    expect(result).toEqual([]);
  });
  test('without first and lastname', async () => {
    const result = validateProfileData({ ...data, first: '', lastname: '' });
    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });
  test('incorrect age', async () => {
    const result = validateProfileData({ ...data, age: 0 });
    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });
  test('incorrect all', async () => {
    const result = validateProfileData({});
    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA, ValidateProfileError.INCORRECT_AGE]);
  });
});
