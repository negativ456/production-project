import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import React from 'react';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';

export const ProfileCardRedesignedSkeleton = () => {
  return (
    <Card padding={'24'} max>
      <VStack gap={'32'}>
        <HStack max justify={'center'}>
          <Skeleton border={'100%'} width={120} height={120} />
        </HStack>
        <HStack gap={'32'} max>
          <VStack gap={'16'} max>
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
          </VStack>
          <VStack gap={'16'} max>
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
            <Skeleton width={'100%'} height={38} />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation('profile');

  return (
    <HStack justify={'center'}>
      <Text
        variant={'error'}
        title={t('Произошла ошибка при загрузке')}
        text={t('Попробуйте обновить страницу')}
        align={'center'}
      />
    </HStack>
  );
};

export const ProfileCardRedesigned = (props: ProfileCardProps) => {
  const { t } = useTranslation('profile');
  const {
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
  return (
    <Card padding={'24'} max>
      <VStack gap={'32'} max>
        {data?.avatar && (
          <HStack max justify={'center'}>
            <Avatar src={data?.avatar} />
          </HStack>
        )}
        <HStack gap={'24'} max>
          <VStack gap={'16'} max>
            <Input
              value={data?.first}
              data-testid={'ProfileCard.firstName'}
              label={t('Ваше имя')}
              placeholder={t('Ваше имя')}
              onChange={onChangeFirstname}
              readonly={readonly}
            />
            <Input
              value={data?.lastname}
              data-testid={'ProfileCard.lastName'}
              label={t('Ваша фамилия')}
              placeholder={t('Ваша фамилия')}
              onChange={onChangeLastname}
              readonly={readonly}
            />
            <Input
              value={data?.age}
              type="number"
              label={t('Ваш возраст')}
              placeholder={t('Ваш возраст')}
              onChange={onChangeAge}
              readonly={readonly}
            />
            <Input
              value={data?.city}
              label={t('Ваш город')}
              placeholder={t('Ваш город')}
              onChange={onChangeCity}
              readonly={readonly}
            />
          </VStack>
          <VStack gap={'16'} max>
            <Input
              value={data?.username}
              label={t('Имя пользователя')}
              placeholder={t('Имя пользователя')}
              onChange={onChangeUsername}
              readonly={readonly}
            />
            <Input
              value={data?.avatar}
              label={t('Аватар')}
              placeholder={t('Аватар')}
              onChange={onChangeAvatar}
              readonly={readonly}
            />
            <CurrencySelect value={data?.currency} onChange={onChangeCurrency} readonly={readonly} />
            <CountrySelect value={data?.country} onChange={onChangeCountry} readonly={readonly} />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};
