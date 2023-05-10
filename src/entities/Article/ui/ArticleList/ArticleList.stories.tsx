import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleList } from './ArticleList';
import { Article } from '../../model/types/article';
import { ArticleView, ArticleBlockType, ArticleType } from '../../model/consts/articleConsts';

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
  title: 'pages/ArticlesPage/ArticleList',
  component: ArticleList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => <ArticleList {...args} />;

export const List = Template.bind({});
List.args = {
  articles: [article, article],
  view: ArticleView.LIST,
};
export const Tile = Template.bind({});
Tile.args = {
  articles: [article, article],
  view: ArticleView.TILE,
};
