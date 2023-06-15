import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItemRedesigned.module.scss';
import { useTranslation } from 'react-i18next';
import { ArticleListItemProps } from '../ArticleListItem';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { ArticleBlockType, ArticleView } from '../../../model/consts/articleConsts';
import { ArticleTextBlock } from '../../../model/types/article';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { AppImage } from '@/shared/ui/redesigned/AppImage/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import EyeIcon from '@/shared/assets/icons/eye-new.svg';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { AppRoutes, routes } from '@/shared/const/router';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

export const ArticleListItemRedesigned = (props: ArticleListItemProps) => {
  const { className, article, view } = props;
  const { t } = useTranslation();
  const viewBlock = (
    <HStack gap={'16'}>
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} />
    </HStack>
  );
  console.log(article);
  const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
  if (view === ArticleView.LIST) {
    return (
      <Card padding={'24'} className={cls[view]}>
        <VStack gap={'16'} max>
          <HStack gap={'8'}>
            <Avatar src={article.user.avatar} size={32} />
            <Text bold text={article.user.username} />
            <Text text={article.createdAt} className={cls.date} />
          </HStack>
          <Text title={article.title} size={'l'} bold className={cls.title} />
          <Text text={article.subtitle} size={'l'} />
          <AppImage
            fallback={<Skeleton width={'100%'} height={420} />}
            src={article.img}
            alt={article.title}
            className={cls.image}
          />
          {textBlock && <Text text={textBlock.paragraphs.slice(0, 2).join(' ')} className={cls.text_block} />}
          <HStack max justify={'between'}>
            <Button variant={'outline'}>
              <AppLink to={article.id}>{t('Читать далее')}</AppLink>
            </Button>
            {viewBlock}
          </HStack>
        </VStack>
      </Card>
    );
  }
  return (
    <AppLink className={classNames('', {}, [className, cls[view]])} to={routes[AppRoutes.ARTICLES_DETAILS](article.id)}>
      <Card className={cls.ArticleListItem} padding={'0'} borderRadius={'40'} data-testid={'ArticleList.Item'}>
        <AppImage
          fallback={<Skeleton width={'100%'} height={140} />}
          src={article.img}
          alt={article.subtitle}
          className={cls.image}
        />
        <VStack className={cls.article_info} justify={'between'}>
          <Text className={cls.title} text={article.title} size={'l'} />
          <VStack max gap={'8'}>
            <HStack max justify={'between'}>
              <Text text={article.createdAt} />
              {viewBlock}
            </HStack>
            <HStack gap={'4'}>
              <Avatar src={article.user.avatar} size={32} />
              <Text bold text={article.user.username} />
            </HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  );
};
