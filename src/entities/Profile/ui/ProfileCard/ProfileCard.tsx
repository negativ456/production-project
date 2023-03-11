import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfileCard.module.scss'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text'
import { Input } from 'shared/ui/Input/Input'
import { Profile } from '../../model/types/profile'
import { Loader } from 'shared/ui/Loader/Loader'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Currency } from 'entities/Currency/model/types/currency'
import { CurrencySelect } from 'entities/Currency'
import { Country, CountrySelect } from 'entities/Country'

interface ProfileCardProps {
  className?: string
  data: Profile | null
  error?: string
  isLoading?: boolean
  readonly?: boolean
  onChangeFirstname?: (value: string) => void
  onChangeLastname?: (value: string) => void
  onChangeAge?: (value: string) => void
  onChangeCity?: (value: string) => void
  onChangeUsername?: (value: string) => void
  onChangeAvatar?: (value: string) => void
  onChangeCurrency?: (value: Currency) => void
  onChangeCountry?: (value: Country) => void
}
export const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  const {
    className,
    data,
    error,
    isLoading,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCurrency,
    onChangeCountry
  } = props
  const { t } = useTranslation('profile')
  if (isLoading) {
    return (<div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
      <Loader/>
    </div>)
  }
  if (error) {
    return (<div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
      <Text
          theme={TextTheme.ERROR}
          title={t('Произошла ошибка при загрузке')}
          text={t('Попробуйте обновить страницу')}
          align={TextAlign.CENTER}
      />
    </div>)
  }
  return (
      <div className={classNames(cls.ProfileCard, { [cls.editing]: !readonly }, [className])}>
        <div className={cls.data}>
          {data?.avatar && (
              <div className={cls.avatarWrapper}>
                <Avatar src={data?.avatar}/>
              </div>
          )}
          <Input
              value={data?.first}
              placeholder={t('Ваше имя')}
              className={cls.input}
              onChange={onChangeFirstname}
              readonly={readonly}
          />
          <Input
              className={cls.input}
              value={data?.lastname}
              placeholder={t('Ваша фамилия')}
              onChange={onChangeLastname}
              readonly={readonly}
          />
          <Input
              className={cls.input}
              value={data?.age}
              type='number'
              placeholder={t('Ваш возраст')}
              onChange={onChangeAge}
              readonly={readonly}
          />
          <Input
              className={cls.input}
              value={data?.city}
              placeholder={t('Ваш город')}
              onChange={onChangeCity}
              readonly={readonly}
          />
          <Input
              className={cls.input}
              value={data?.username}
              placeholder={t('Имя пользователя')}
              onChange={onChangeUsername}
              readonly={readonly}
          />
          <Input
              className={cls.input}
              value={data?.avatar}
              placeholder={t('Аватар')}
              onChange={onChangeAvatar}
              readonly={readonly}
          />
          <CurrencySelect
              className={cls.input}
              value={data?.currency}
              onChange={onChangeCurrency}
              readonly={readonly}
          />
          <CountrySelect
              value={data?.country}
              onChange={onChangeCountry}
              readonly={readonly}
          />
        </div>
      </div>
  )
}
