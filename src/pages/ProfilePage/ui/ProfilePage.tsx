import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfilePage.module.scss'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { DynamicModuleLoader } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { profileReducer } from 'entities/Profile'
const reducers = {
  profile: profileReducer
}
interface ProfileProps {
  className?: string
}
const ProfilePage: React.FC<ProfileProps> = ({ className }) => {
  const { t } = useTranslation()
  return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <div className={classNames(cls.ProfilePage, {}, [className])}>
          {t('Профиль')}
        </div>
      </DynamicModuleLoader>

  )
}
export default ProfilePage
