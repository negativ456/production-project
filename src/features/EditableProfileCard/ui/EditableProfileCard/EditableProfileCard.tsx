import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError'
import { getProfileLoading } from '../../model/selectors/getProfileLoading/getProfileLoading'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { profileActions, profileReducer } from '../../model/slice/profileSlice'
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { ProfileCard } from 'entities/Profile'
import { EditHeader } from 'features/EditableProfileCard/ui/EditHeader/EditHeader'
import { getProfileReadonly } from 'features/EditableProfileCard/model/selectors/getProfileReadonly/getProfileReadonly'
import { getProfileForm } from 'features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import {
  getProfileValidateErrors
} from 'features/EditableProfileCard/model/selectors/getProfileValidateErrors/getProfileValidateErrors'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { ValidateProfileError } from 'features/EditableProfileCard/model/types/ProfileSchema'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect'
import { useParams } from 'react-router-dom'

const reducers: ReducersList = {
  profile: profileReducer
}
interface EditableProfileCardProps {
  className?: string
}

export const EditableProfileCard: React.FC<EditableProfileCardProps> = ({ className }) => {
  const { t } = useTranslation('profile')
  const formData = useSelector(getProfileForm) ?? null
  const error = useSelector(getProfileError)
  const isLoading = useSelector(getProfileLoading)
  const readonly = useSelector(getProfileReadonly)
  const validateErrors = useSelector(getProfileValidateErrors)
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()

  const validateErrorTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Ошибка данных пользователя'),
    [ValidateProfileError.NO_DATA]: t('Нет данных'),
    [ValidateProfileError.INCORRECT_AGE]: t('Неверный возраст')
  }

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id))
    }
  })

  const onChangeFirstname = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ first: value }))
  }, [dispatch])

  const onChangeLastname = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ lastname: value }))
  }, [dispatch])

  const onChangeAge = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ age: Number(value) }))
  }, [dispatch])

  const onChangeCity = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ city: value }))
  }, [dispatch])

  const onChangeAvatar = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ avatar: value }))
  }, [dispatch])

  const onChangeUsername = useCallback((value: string) => {
    dispatch(profileActions.updateProfile({ username: value }))
  }, [dispatch])

  const onChangeCurrency = useCallback((value: Currency) => {
    dispatch(profileActions.updateProfile({ currency: value }))
  }, [dispatch])

  const onChangeCountry = useCallback((value: Country) => {
    dispatch(profileActions.updateProfile({ country: value }))
  }, [dispatch])
  return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <div className={classNames('', {}, [className])}>
          <EditHeader/>
          {validateErrors?.length && validateErrors.map(err =>
              <Text key={err} theme={TextTheme.ERROR} text={validateErrorTranslates[err]} />
          )}
          <ProfileCard
              readonly={readonly}
              data={formData}
              error={error}
              isLoading={isLoading}
              onChangeFirstname={onChangeFirstname}
              onChangeLastname={onChangeLastname}
              onChangeAge={onChangeAge}
              onChangeCity={onChangeCity}
              onChangeAvatar={onChangeAvatar}
              onChangeUsername={onChangeUsername}
              onChangeCurrency={onChangeCurrency}
              onChangeCountry={onChangeCountry}
          />
        </div>
      </DynamicModuleLoader>
  )
}
