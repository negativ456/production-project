import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesDetailsPage.module.scss';
import React from 'react';
import { ArticleDetails } from '@/entities/Article';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { Header } from '../Header/Header';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleRecommendations } from '@/features/articleRecommendations';
import { ArticleCommentList } from '@/features/ArticleCommentList';
import { ArticleRating } from '@/features/articleRating';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/ui/layouts/StickyContentLayout/StickyContentLayout';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';

interface ArticlesDetailsPageProps {
  className?: string;
}

const ArticlesDetailsPage: React.FC<ArticlesDetailsPageProps> = ({ className }) => {
  const { id } = useParams();
  const { t } = useTranslation();

  if (!id) {
    return null;
  }

  return (
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={
        <StickyContentLayout
          content={
            <Page className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
              <VStack align={'stretch'} gap={'16'} max>
                <DetailsContainer />
                <ArticleRating articleId={id} />
                <ArticleRecommendations />
                <ArticleCommentList articleID={id} />
              </VStack>
            </Page>
          }
          right={<AdditionalInfoContainer />}
        />
      }
      off={
        <Page className={classNames('', {}, [className])}>
          <Header />
          <VStack className={cls.wrapper} align={'stretch'} gap={'16'} max>
            <ArticleDetails id={id} />
            <ToggleFeatures
              feature={'isArticleRatingEnabled'}
              on={<ArticleRating articleId={id} />}
              off={<Card>{t('Оценка статей скоро появится')}</Card>}
            />
            <ArticleRecommendations />
            <ArticleCommentList articleID={id} />
          </VStack>
        </Page>
      }
    />
  );
};
export default ArticlesDetailsPage;
