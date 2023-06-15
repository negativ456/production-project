import { ArticleBlock } from '../../model/types/article';
import React, { ReactNode } from 'react';

import cls from './ArticleDetails.module.scss';
import { ArticleBlockType } from '../../model/consts/articleConsts';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';

export const renderBlock = (block: ArticleBlock): ReactNode | null => {
  switch (block.type) {
    case ArticleBlockType.CODE:
      return <ArticleCodeBlockComponent className={cls.block} block={block} key={block.id} />;
    case ArticleBlockType.TEXT:
      return <ArticleTextBlockComponent className={cls.block} block={block} key={block.id} />;
    case ArticleBlockType.IMAGE:
      return <ArticleImageBlockComponent className={cls.block} block={block} key={block.id} />;
    default:
      return null;
  }
};
