import { Card } from '@/shared/ui/redesigned/Card/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from '@/entities/Article';
import cls from './AdditionalInfoContainer.module.scss';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, routes } from '@/shared/const/router';

export const AdditionalInfoContainer = () => {
  const article = useSelector(getArticleDetailsData);
  const navigate = useNavigate();

  const inEditArticle = () => {
    if (article) {
      navigate(routes[AppRoutes.ARTICLES_DETAILS](article.id));
    }
  };

  if (!article) {
    return null;
  }
  return (
    <Card padding={'24'} borderRadius={'40'} className={cls.card}>
      <ArticleAdditionalInfo
        onEdit={inEditArticle}
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
      />
    </Card>
  );
};
