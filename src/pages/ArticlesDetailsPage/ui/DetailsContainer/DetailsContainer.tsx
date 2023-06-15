import { ArticleDetails } from '@/entities/Article';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/shared/ui/redesigned/Card/Card';
interface DetailsContainerProps {
  className?: string;
}

export const DetailsContainer = ({ className }: DetailsContainerProps) => {
  const { id } = useParams<{ id: string }>();

  return (
    <Card max borderRadius={'40'} className={className} padding={'24'}>
      <ArticleDetails id={id} />
    </Card>
  );
};
