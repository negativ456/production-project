import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ProfileCardDeprecated.module.scss';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import React from 'react';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { Loader as LoaderDeprecated } from '@/shared/ui/deprecated/Loader/Loader';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text/Text';

export const ProfileCardDeprecatedLoader = () => {
  return (
    <HStack justify={'center'} className={classNames(cls.ProfileCard, {}, [cls.loading])}>
      <LoaderDeprecated />
    </HStack>
  );
};

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation('profile');
  return (
    <HStack justify={'center'} className={classNames(cls.ProfileCard, {}, [cls.error])}>
      <Text
        theme={TextTheme.ERROR}
        title={t('Произошла ошибка при загрузке')}
        text={t('Попробуйте обновить страницу')}
        align={TextAlign.CENTER}
      />
    </HStack>
  );
};

export const ProfileCardDeprecated = (props: ProfileCardProps) => {
  const {
    className,
    data,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCurrency,
    onChangeCountry,
  } = props;
  const { t } = useTranslation('profile');
  return (
    <VStack gap={'8'} max className={classNames(cls.ProfileCard, { [cls.editing]: !readonly }, [className])}>
      {data?.avatar && (
        <HStack max justify={'center'} className={cls.avatarWrapper}>
          <AvatarDeprecated src={data?.avatar} />
        </HStack>
      )}
      <InputDeprecated
        value={data?.first}
        data-testid={'ProfileCard.firstName'}
        placeholder={t('Ваше имя')}
        onChange={onChangeFirstname}
        readonly={readonly}
      />
      <InputDeprecated
        value={data?.lastname}
        data-testid={'ProfileCard.lastName'}
        placeholder={t('Ваша фамилия')}
        onChange={onChangeLastname}
        readonly={readonly}
      />
      <InputDeprecated
        value={data?.age}
        type="number"
        placeholder={t('Ваш возраст')}
        onChange={onChangeAge}
        readonly={readonly}
      />
      <InputDeprecated value={data?.city} placeholder={t('Ваш город')} onChange={onChangeCity} readonly={readonly} />
      <InputDeprecated
        value={data?.username}
        placeholder={t('Имя пользователя')}
        onChange={onChangeUsername}
        readonly={readonly}
      />
      <InputDeprecated value={data?.avatar} placeholder={t('Аватар')} onChange={onChangeAvatar} readonly={readonly} />
      <CurrencySelect value={data?.currency} onChange={onChangeCurrency} readonly={readonly} />
      <CountrySelect value={data?.country} onChange={onChangeCountry} readonly={readonly} />
    </VStack>
  );
};
