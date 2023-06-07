import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItemDeprecated.module.scss';
import { useTranslation } from 'react-i18next';
import { ArticleListItemProps } from '../ArticleListItem';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { Icon } from '@/shared/ui/deprecated/Icon/Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { ArticleBlockType, ArticleView } from '../../../model/consts/articleConsts';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { Avatar } from '@/shared/ui/deprecated/Avatar/Avatar';
import { AppImage } from '@/shared/ui/redesigned/AppImage/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { AppRoutes, routes } from '@/shared/const/router';
import { ArticleTextBlock } from '../../../model/types/article';
import { ArticleTextBlockComponent } from '../../../ui/ArticleTextBlockComponent/ArticleTextBlockComponent';

export const ArticleListItemDeprecated = (props: ArticleListItemProps) => {
  const { className, article, view } = props;
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
