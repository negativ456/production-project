import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ArticlesDetailsPage from './ArticlesDetailsPage';
import { storeDecorator } from '@/shared/config/storybook/storeDecorator';

export default {
  title: 'pages/ArticlesDetailsPage',
  component: ArticlesDetailsPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesDetailsPage>;

const Template: ComponentStory<typeof ArticlesDetailsPage> = (args) => <ArticlesDetailsPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [storeDecorator({})];
