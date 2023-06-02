import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItem.module.scss';
import { useTranslation } from 'react-i18next';
import { ArticleBlockType, ArticleView } from '../../model/consts/articleConsts';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Icon } from '@/shared/ui/deprecated/Icon/Icon';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { Avatar } from '@/shared/ui/deprecated/Avatar/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink/AppLink';

import { AppRoutes, routes } from '@/shared/const/router';
import { AppImage } from '@/shared/ui/deprecated/AppImage/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem = ({ className, article, view }: ArticleListItemProps) => {
  const { t } = useTranslation();
  const types = <Text text={article.type.join(', ')} className={cls.types} />;
  const viewBlock = (
    <div className={cls.view}>
      <Text text={String(article.views)} />
      <Icon Svg={EyeIcon} />
    </div>
  );
  const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
  if (view === ArticleView.LIST) {
    return (
      <div data-testid={'ArticleList.Item'} className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Card>
          <div className={cls.top}>
            <div className={cls.user}>
              <Avatar src={article.user.avatar} size={40} />
              <Text text={article.user.username} />
            </div>
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <AppImage
            fallback={<Skeleton width={'100%'} height={250} />}
            src={article.img}
            alt={article.title}
            className={cls.image}
          />
          {textBlock && <ArticleTextBlockComponent className={cls.text_block} block={textBlock} />}
          <div className={cls.bottom}>
            <AppLink theme={AppLinkTheme.NO_UNDERLINE} to={article.id}>
              <Button theme={ButtonTheme.OUTLINE}>{t('Читать далее')}</Button>
            </AppLink>
            {viewBlock}
          </div>
        </Card>
      </div>
    );
  }
  return (
    <AppLink
      theme={AppLinkTheme.NO_UNDERLINE}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      to={routes[AppRoutes.ARTICLES_DETAILS](article.id)}>
      <Card data-testid={'ArticleList.Item'}>
        <div className={cls.article_top}>
          <AppImage
            fallback={<Skeleton width={170} height={170} />}
            src={article.img}
            alt={article.subtitle}
            className={cls.image}
          />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.article_bottom}>
          <div className={cls.info}>
            {types}
            {viewBlock}
          </div>
          <Text className={cls.title} text={article.title} />
        </div>
      </Card>
    </AppLink>
  );
};
