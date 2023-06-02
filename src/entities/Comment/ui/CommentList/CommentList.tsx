import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentList.module.scss';
import { useTranslation } from 'react-i18next';
import { CommentTypes } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { VStack } from 'src/shared/ui/deprecated/Stack';

interface CommentListProps {
  className?: string;
  comments?: CommentTypes[];
  isLoading?: boolean;
}

export const CommentList = ({ className, comments, isLoading = true }: CommentListProps) => {
  const { t } = useTranslation('article-details');
  if (isLoading) {
    return (
      <VStack gap={'16'} max className={classNames(cls.CommentList, {}, [className])}>
        <CommentCard isLoading={true} />
        <CommentCard isLoading={true} />
        <CommentCard isLoading={true} />
      </VStack>
    );
  }
  return (
    <VStack gap={'16'} max className={classNames(cls.CommentList, {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard isLoading={isLoading} className={cls.comment} key={comment.id} comment={comment} />
        ))
      ) : (
        <Text text={t('Комментарии отсутствуют')} />
      )}
    </VStack>
  );
};
