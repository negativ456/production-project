import { useTranslation } from 'react-i18next'
import { Text } from 'shared/ui/Text/Text'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch'
import { profileActions } from '../../model/slice/profileSlice'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'
import { getUserAuthData } from 'entities/User/model/selectors/getUserAuthData/getUserAuthData'
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData'
import { HStack } from 'shared/ui/Stack/HStack/HStack'

interface EditHeaderProps {
  className?: string
}
export const EditHeader: React.FC<EditHeaderProps> = ({ className }) => {
  const { t } = useTranslation('profile')
  const readonly = useSelector(getProfileReadonly)
  const authData = useSelector(getUserAuthData)
  const profileData = useSelector(getProfileData)
  const canEdit = authData?.id === profileData?.id
  const dispatch = useAppDispatch()
  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false))
  }, [dispatch])
  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit())
  }, [dispatch])

  const onSave = useCallback(() => {
    dispatch(updateProfileData())
  }, [dispatch])
  return (
      <HStack max justify={'between'}>
        <Text title={t('Профиль')} />
        {canEdit && <div>
          {readonly
            ? (<Button data-testid={'EditHeader.EditButton'} theme={ButtonTheme.OUTLINE} onClick={onEdit}>
                {t('Редактировать')}
              </Button>)
            : <HStack gap={'8'}>
                <Button data-testid={'EditHeader.CancelButton'} theme={ButtonTheme.OUTLINE_RED} onClick={onCancelEdit} >
                  {t('Отменить')}
                </Button>
                <Button data-testid={'EditHeader.SaveButton'} theme={ButtonTheme.OUTLINE} onClick={onSave}>
                  {t('Сохранить')}
                </Button>
              </HStack>}
        </div>
        }

      </HStack>
  )
}
