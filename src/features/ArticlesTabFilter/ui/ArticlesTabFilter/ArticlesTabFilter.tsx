import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesTabFilter.module.scss';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { TabItem, Tabs } from '@/shared/ui/deprecated/Tabs/Tabs';
import { ArticleType } from '../../../../entities/Article/model/consts/articleConsts';

interface ArticlesTabFilterProps {
  className?: string;
  value: ArticleType;
  onChangeTab: (type: TabItem<ArticleType>) => void;
}

export const ArticlesTabFilter = ({ className, onChangeTab, value }: ArticlesTabFilterProps) => {
  const { t } = useTranslation();

  const tabList = useMemo<Array<TabItem<ArticleType>>>(
    () => [
      {
        value: ArticleType.ALL,
        content: t('Все статьи'),
      },
      {
        value: ArticleType.IT,
        content: t('Айти'),
      },
      {
        value: ArticleType.ECONOMICS,
        content: t('Экономика'),
      },
      {
        value: ArticleType.SCIENCE,
        content: t('Наука'),
      },
    ],
    [t]
  );

  return (
    <Tabs
      value={value}
      onTabClick={onChangeTab}
      tabs={tabList}
      className={classNames(cls.ArticlesTabFilter, {}, [className])}
    />
  );
};
