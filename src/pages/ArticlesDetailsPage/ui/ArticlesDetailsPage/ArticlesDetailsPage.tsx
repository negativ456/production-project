import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesDetailsPage.module.scss';
import React from 'react';
import { ArticleDetails } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { Header } from '../Header/Header';
import { VStack } from '@/shared/ui/Stack';
import { ArticleRecommendations } from '@/features/articleRecommendations';
import { ArticleCommentList } from '@/features/ArticleCommentList';
import { ArticleRating } from '@/features/articleRating';
import { toggleFeatures } from '@/shared/lib/features/toggleFeatures';
import { Card } from '@/shared/ui/Card/Card';
import { useTranslation } from 'react-i18next';

interface ArticlesDetailsPageProps {
  className?: string;
}

const ArticlesDetailsPage: React.FC<ArticlesDetailsPageProps> = ({ className }) => {
  const { id } = useParams();
  const { t } = useTranslation();

  if (!id) {
    return null;
  }

  const rating = toggleFeatures({
    name: 'isArticleRatingEnabled',
    on: () => <ArticleRating articleId={id} />,
    off: () => <Card>{t('Оценка статей скоро появится')}</Card>,
  });

  return (
    <Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
      <Header />
      <VStack align={'stretch'} gap={'16'} max>
        <ArticleDetails id={id} />
        {rating}
        <ArticleRecommendations />
        <ArticleCommentList articleID={id} />
      </VStack>
    </Page>
  );
};
export default ArticlesDetailsPage;
