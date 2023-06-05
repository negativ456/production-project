import { ArticleViewSwitcher } from '@/features/ArticleViewSwitcher';
import React from 'react';
import { useArticlesFilter } from '../../lib/hooks/useArticlesFilter';

interface ViewSelectorContainerProps {
  className?: string;
}

export const ViewSelectorContainer = ({ className }: ViewSelectorContainerProps) => {
  const { view, onChangeView } = useArticlesFilter();

  return <ArticleViewSwitcher className={className} view={view} onViewClick={onChangeView} />;
};
