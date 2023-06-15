import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Button } from '@/shared/ui/redesigned/Button/Button';

interface ArticleAdditionalInfoProps {
  className?: string;
  author: User;
  createdAt: string;
  views: number;
  onEdit: () => void;
}

export const ArticleAdditionalInfo = ({ className, author, views, createdAt, onEdit }: ArticleAdditionalInfoProps) => {
  const { t } = useTranslation();
  return (
    <VStack gap={'32'} className={classNames('', {}, [className])}>
      <HStack gap={'8'}>
        <Avatar size={40} src={author.avatar} />
        <Text text={author.username} />
        <Text text={createdAt} />
      </HStack>
      <Button onChange={onEdit}>{t('Редактировать')}</Button>
      <Text text={t('{{count}} просмотров', { count: views })} />
    </VStack>
  );
};
