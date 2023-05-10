import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getProfileForm } from './getProfileForm';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
describe('getProfileForm.test', () => {
  const form = {
    first: 'name',
    lastname: 'surname',
    age: 23,
    currency: Currency.RUB,
    country: Country.Russia,
    city: 'Mos',
    username: '123',
  };
  test('should return value', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        form,
      },
    };
    expect(getProfileForm(state as StateSchema)).toEqual(form);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
