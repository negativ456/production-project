import { useTranslation } from 'react-i18next';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { getUserAuthData } from '@/entities/User';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card/Card';

interface EditHeaderProps {
  className?: string;
}
export const EditHeader: React.FC<EditHeaderProps> = ({ className }) => {
  const { t } = useTranslation('profile');
  const readonly = useSelector(getProfileReadonly);
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;
  const dispatch = useAppDispatch();
  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);
  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);
  return (
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={
        <Card padding={'24'} borderRadius={'12'}>
          <HStack max justify={'between'}>
            <Text title={t('Профиль')} />
            {canEdit && (
              <div>
                {readonly ? (
                  <Button data-testid={'EditHeader.EditButton'} variant={'outline'} onClick={onEdit}>
                    {t('Редактировать')}
                  </Button>
                ) : (
                  <HStack gap={'8'}>
                    <Button
                      data-testid={'EditHeader.CancelButton'}
                      color={'error'}
                      variant={'outline'}
                      onClick={onCancelEdit}>
                      {t('Отменить')}
                    </Button>
                    <Button
                      data-testid={'EditHeader.SaveButton'}
                      color={'success'}
                      variant={'outline'}
                      onClick={onSave}>
                      {t('Сохранить')}
                    </Button>
                  </HStack>
                )}
              </div>
            )}
          </HStack>
        </Card>
      }
      off={
        <HStack max justify={'between'}>
          <TextDeprecated title={t('Профиль')} />
          {canEdit && (
            <div>
              {readonly ? (
                <ButtonDeprecated data-testid={'EditHeader.EditButton'} theme={ButtonTheme.OUTLINE} onClick={onEdit}>
                  {t('Редактировать')}
                </ButtonDeprecated>
              ) : (
                <HStack gap={'8'}>
                  <ButtonDeprecated
                    data-testid={'EditHeader.CancelButton'}
                    theme={ButtonTheme.OUTLINE_RED}
                    onClick={onCancelEdit}>
                    {t('Отменить')}
                  </ButtonDeprecated>
                  <ButtonDeprecated data-testid={'EditHeader.SaveButton'} theme={ButtonTheme.OUTLINE} onClick={onSave}>
                    {t('Сохранить')}
                  </ButtonDeprecated>
                </HStack>
              )}
            </div>
          )}
        </HStack>
      }
    />
  );
};
