import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItem.module.scss';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { ArticleView } from '../../model/consts/articleConsts';
import { toggleFeatures } from '@/shared/lib/features/lib/toggleFeatures';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}
export const ArticleListItemSkeleton = ({ className, view }: ArticleListItemSkeletonProps) => {
  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => cls.ArticleListRedesigned,
    off: () => cls.ArticleListItem,
  });

  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

  const Card = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => CardRedesigned,
    off: () => CardDeprecated,
  });

  if (view === ArticleView.LIST) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Card>
          <div className={cls.top}>
            <div className={cls.user}>
              <Skeleton border={'50%'} width={40} height={40} />
              <Skeleton width={40} height={17} />
            </div>
          </div>
          <div className={cls.info}>
            <Skeleton width={400} height={17} />
            <Skeleton width={100} height={17} className={cls.title} />
          </div>
          <Skeleton width={'100%'} height={200} className={cls.image} />
          <Skeleton width={'100%'} height={170} className={cls.text_block} />
          <div className={cls.bottom}>
            <Skeleton width={100} height={33} />
          </div>
        </Card>
      </div>
    );
  }
  return (
    <Card padding={'0'} borderRadius={'40'} className={classNames(mainClass, {}, [className, cls[view]])}>
      <Skeleton width={'100%'} height={140} />
      <VStack gap={'8'} className={cls.article_bottom}>
        <Skeleton width={'100%'} height={130} />
        <HStack max justify={'between'}>
          <Skeleton width={85} height={20} />
          <Skeleton width={85} height={20} />
        </HStack>
        <HStack gap={'8'}>
          <Skeleton border={'50%'} width={32} height={32} />
          <Skeleton width={85} height={20} />
        </HStack>
      </VStack>
    </Card>
  );
};
