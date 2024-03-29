import { classNames } from '@/shared/lib/classNames/classNames';
import React from 'react';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { Page } from '@/widgets/Page';
import { useParams } from 'react-router-dom';

interface ProfileProps {
  className?: string;
}
const ProfilePage: React.FC<ProfileProps> = ({ className }) => {
  const { id } = useParams<{ id: string }>();

  return (
    <Page data-testid={'ProfilePage'} className={classNames('', {}, [className])}>
      <EditableProfileCard id={id} />
    </Page>
  );
};
export default ProfilePage;
