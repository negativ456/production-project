import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentCard.module.scss';
import { CommentTypes } from '../../model/types/comment';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink/AppLink';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { AppRoutes, routes } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { toggleFeatures } from '@/shared/lib/features/lib/toggleFeatures';
import { Card } from '@/shared/ui/redesigned/Card/Card';

interface CommentCardProps {
  className?: string;
  comment?: CommentTypes;
  isLoading: boolean;
}

export const CommentCard = ({ className, comment, isLoading }: CommentCardProps) => {
  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

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
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={
        <Card padding={'24'} borderRadius={'12'} max>
          <VStack
            data-testid={'CommentCard.Content'}
            gap={'8'}
            className={classNames(cls.CommentCardRedesigned, {}, [className])}>
            <AppLink to={routes[AppRoutes.PROFILE](comment.user.id)} className={cls.header}>
              {comment.user.avatar && <Avatar size={30} src={comment.user.avatar} />}
              <Text text={comment.user.username} bold />
            </AppLink>
            <div className={cls.content}>
              <Text text={comment.text} />
            </div>
          </VStack>
        </Card>
      }
      off={
        <VStack data-testid={'CommentCard.Content'} gap={'8'} className={classNames(cls.CommentCard, {}, [className])}>
          <AppLinkDeprecated to={routes[AppRoutes.PROFILE](comment.user.id)} className={cls.header}>
            {comment.user.avatar && <AvatarDeprecated size={30} src={comment.user.avatar} />}
            <TextDeprecated title={comment.user.username} />
          </AppLinkDeprecated>
          <div className={cls.content}>
            <TextDeprecated text={comment.text} />
          </div>
        </VStack>
      }
    />
  );
};
