import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleFilter } from './ArticleFilter';
import { storeDecorator } from '@/shared/config/storybook/storeDecorator';
import { ArticleSortField, ArticleView, ArticleType, Article, ArticleBlockType } from '@/entities/Article';

const article: Article = {
  id: '16',
  title: 'Javascript news 16',
  subtitle: 'Что нового в JS за 2022 год?',
  user: { id: '1', username: 'user' },
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '26.02.2022',
  type: [ArticleType.IT],
  blocks: [
    {
      id: '1',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок этого блока',
      paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
      ],
    },
  ],
};

export default {
  title: 'features/ArticleFilter',
  component: ArticleFilter,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleFilter>;

const Template: ComponentStory<typeof ArticleFilter> = (args) => <ArticleFilter {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
  storeDecorator({
    articlesList: {
      isLoading: true,
      error: '',
      view: ArticleView.TILE,
      ids: ['1'],
      entities: {
        1: article,
      },
      page: 1,
      hasMore: true,
      mounted: false,
      search: '',
      sortOrder: 'asc',
      sort: ArticleSortField.VIEWS,
      type: ArticleType.ALL,
    },
  }),
];
