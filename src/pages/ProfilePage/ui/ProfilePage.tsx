import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ProfilePage.module.scss'
import React from 'react'
import { EditableProfileCard } from 'features/EditableProfileCard'

interface ProfileProps {
  className?: string
}
const ProfilePage: React.FC<ProfileProps> = ({ className }) => {
  return (
    <div className={classNames(cls.ProfilePage, {}, [className])}>
      <EditableProfileCard/>
    </div>
  )
}
export default ProfilePage
