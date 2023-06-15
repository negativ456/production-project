import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleDetails.module.scss';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import React, { useEffect } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { fetchArticleByID } from '../../model/services/fetchArticleByID/fetchArticleByID';
import { useSelector } from 'react-redux';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsLoading,
} from '../../model/selectors/getArticleDetailsData';
import { Text as TextDeprecated, TextSize, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { renderBlock } from './renderBlock';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppImage } from '@/shared/ui/redesigned/AppImage/AppImage';
import { toggleFeatures } from '@/shared/lib/features/lib/toggleFeatures';

const Deprecated = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <HStack justify={'center'} max className={cls.avatar_wrapper}>
        <AvatarDeprecated fallbackInverted={true} src={article?.img} size={200} className={cls.avatar} />
      </HStack>
      <VStack data-testid={'ArticleDetails.Content'} gap={'4'} max>
        <TextDeprecated size={TextSize.L} title={article?.title} text={article?.subtitle} />
        <HStack className={cls.article_info}>
          <IconDeprecated Svg={EyeIcon} />
          <TextDeprecated text={String(article?.views)} />
        </HStack>
        <HStack className={cls.article_info}>
          <IconDeprecated Svg={CalendarIcon} />
          <TextDeprecated text={String(article?.createdAt)} />
        </HStack>
      </VStack>
      {article?.blocks.map(renderBlock)}
    </>
  );
};

const Redesigned = () => {
  const article = useSelector(getArticleDetailsData);

  return (
    <>
      <Text size={'l'} title={article?.title} bold />
      <Text title={article?.subtitle} />
      <AppImage
        className={cls.img}
        fallback={<SkeletonRedesigned width={'100%'} height={420} border={16} />}
        src={article?.img}
      />

      {article?.blocks.map(renderBlock)}
    </>
  );
};

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}
const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};
export const ArticleDetails: React.FC<ArticleDetailsProps> = ({ className, id }) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsLoading);
  const error = useSelector(getArticleDetailsError);

  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleByID(id));
    }
  }, [dispatch, id]);
  let content;
  if (isLoading) {
    content = (
      <>
        <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
        <Skeleton className={cls.skeleton} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width={'100%'} height={200} />
        <Skeleton className={cls.skeleton} width={'100%'} height={200} />
      </>
    );
  } else if (error) {
    content = <TextDeprecated theme={TextTheme.ERROR} title={'Произошла ошибка'} />;
  } else {
    content = <ToggleFeatures feature={'isAppRedesigned'} on={<Redesigned />} off={<Deprecated />} />;
  }
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack gap={'16'} align={'stretch'} className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
};
