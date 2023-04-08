import { classNames } from 'shared/lib/classNames/classNames'
import cls from './EditHeader.module.scss'
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
      <div className={classNames(cls.EditHeader, {}, [className])}>
        <Text title={t('Профиль')} />
        {canEdit && <div>
          {readonly
            ? (<Button theme={ButtonTheme.OUTLINE} onClick={onEdit}>
                {t('Редактировать')}
              </Button>)
            : <div>
                <Button theme={ButtonTheme.OUTLINE_RED} onClick={onCancelEdit} className={cls.edit}>
                  {t('Отменить')}
                </Button>
                <Button theme={ButtonTheme.OUTLINE} onClick={onSave}>
                  {t('Сохранить')}
                </Button>
              </div>}
        </div>
        }

      </div>
  )
}
