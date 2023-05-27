import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ArticleRating from './ArticleRating';
import withMock from 'storybook-addon-mock';
import { storeDecorator } from '@/shared/config/storybook/storeDecorator';

export default {
  title: 'features/ArticleRating',
  component: ArticleRating,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock],
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  articleId: '1',
};
Normal.decorators = [
  storeDecorator({
    user: {
      userData: { id: '1', username: 'user' },
    },
  }),
];
Normal.parameters = {
  mockData: [
    {
      url: __API__ + '/article-ratings?userId=1&articleId=1',
      method: 'GET',
      status: 200,
      response: [
        {
          rate: 4,
        },
      ],
    },
  ],
};

export const WithoutRate = Template.bind({});
WithoutRate.args = {
  articleId: '1',
};
WithoutRate.decorators = [
  storeDecorator({
    user: {
      userData: { id: '1', username: 'user' },
    },
  }),
];
WithoutRate.parameters = {
  mockData: [
    {
      url: __API__ + '/article-ratings?userId=1&articleId=1',
      method: 'GET',
      status: 200,
      response: [],
    },
  ],
};
