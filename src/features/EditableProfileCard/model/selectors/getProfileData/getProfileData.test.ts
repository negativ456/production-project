import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileData } from './getProfileData';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
describe('getProfileData.test', () => {
  test('should return value', () => {
    const data = {
      first: 'name',
      lastname: 'surname',
      age: 23,
      currency: Currency.RUB,
      country: Country.Russia,
      city: 'Mos',
      username: '123',
    };
    const state: DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
