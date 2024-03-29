import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CommentList.module.scss';
import { useTranslation } from 'react-i18next';
import { CommentTypes } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';

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
    <VStack gap={'16'} max className={classNames('', {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard isLoading={isLoading} className={cls.comment} key={comment.id} comment={comment} />
        ))
      ) : (
        <ToggleFeatures
          feature={'isAppRedesigned'}
          on={<Text text={t('Комментарии отсутствуют')} />}
          off={<TextDeprecated text={t('Комментарии отсутствуют')} />}
        />
      )}
    </VStack>
  );
};
