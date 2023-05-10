import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentCard.module.scss';
import { CommentTypes } from '../../model/types/comment';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Text } from '@/shared/ui/Text/Text';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { VStack } from '@/shared/ui/Stack';
import { AppRoutes, routes } from '@/shared/const/router';

interface CommentCardProps {
  className?: string;
  comment?: CommentTypes;
  isLoading: boolean;
}

export const CommentCard = ({ className, comment, isLoading }: CommentCardProps) => {
  if (isLoading) {
    return (
      <div data-testid={'CommentCard.Loading'} className={classNames(cls.CommentCard, {}, [className, cls.loading])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton height={16} width={100} />
        </div>
        <Skeleton className={cls.content} width={'100%'} height={50} />
      </div>
    );
  }
  if (!comment) {
    return null;
  }
  return (
    <VStack data-testid={'CommentCard.Content'} gap={'8'} className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink to={routes[AppRoutes.PROFILE](comment.user.id)} className={cls.header}>
        {comment.user.avatar && <Avatar size={30} src={comment.user.avatar} />}
        <Text title={comment.user.username} />
      </AppLink>
      <div className={cls.content}>
        <Text text={comment.text} />
      </div>
    </VStack>
  );
};
