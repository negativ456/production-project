import { screen } from '@testing-library/react'
import { EditableProfileCard } from './EditableProfileCard'
import { componentRender } from 'shared/config/tests/componentRender/componentRender'
import { Profile } from 'entities/Profile/model/types/profile'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { profileReducer } from '../../model/slice/profileSlice'
import userEvent from '@testing-library/user-event'
import { $api } from 'shared/api/api'

const profile: Profile = {
  id: '1',
  first: 'admin',
  lastname: 'admin',
  age: 12,
  city: 'Mosc',
  username: 'admin123',
  currency: Currency.CNY,
  country: Country.China
}

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile
    },
    user: {
      userData: { id: '1', username: 'admin' }
    }
  },
  asyncReducers: {
    profile: profileReducer
  }
}
describe('feature/EditableProfileCard', () => {
  test('readonly should switch', async () => {
    componentRender(<EditableProfileCard id={'1'}/>, options)
    await userEvent.click(screen.getByTestId('EditHeader.EditButton'))
    expect(screen.getByTestId('EditHeader.CancelButton')).toBeInTheDocument()
  })

  test('field should reset', async () => {
    componentRender(<EditableProfileCard id={'1'}/>, options)
    await userEvent.click(screen.getByTestId('EditHeader.EditButton'))
    await userEvent.clear(screen.getByTestId('ProfileCard.firstName'))
    await userEvent.clear(screen.getByTestId('ProfileCard.lastName'))
    await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'user')
    await userEvent.type(screen.getByTestId('ProfileCard.lastName'), 'user')
    expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('user')
    expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue('user')

    await userEvent.click(screen.getByTestId('EditHeader.CancelButton'))

    expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('admin')
    expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue('admin')
  })

  test('error should appear', async () => {
    componentRender(<EditableProfileCard id={'1'}/>, options)
    await userEvent.click(screen.getByTestId('EditHeader.EditButton'))
    await userEvent.clear(screen.getByTestId('ProfileCard.firstName'))

    await userEvent.click(screen.getByTestId('EditHeader.SaveButton'))

    expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument()
  })

  test('no errors, request should be sent', async () => {
    const mockPutReq = jest.spyOn($api, 'put')
    componentRender(<EditableProfileCard id={'1'}/>, options)
    await userEvent.click(screen.getByTestId('EditHeader.EditButton'))
    await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'user')

    await userEvent.click(screen.getByTestId('EditHeader.SaveButton'))

    expect(mockPutReq).toHaveBeenCalled()
  })
})
