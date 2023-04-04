import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfilePage.module.scss'
import React from 'react'
import { EditableProfileCard } from 'features/EditableProfileCard'
import { Page } from 'widgets/Page/ui/Page'

interface ProfileProps {
  className?: string
}
const ProfilePage: React.FC<ProfileProps> = ({ className }) => {
  return (
    <Page className={classNames(cls.ProfilePage, {}, [className])}>
      <EditableProfileCard/>
    </Page>
  )
}
export default ProfilePage
