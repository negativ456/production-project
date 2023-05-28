import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticlePageGreeting } from './ArticlePageGreeting';

export default {
  title: 'shared/ArticlePageGreeting',
  component: ArticlePageGreeting,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlePageGreeting>;

const Template: ComponentStory<typeof ArticlePageGreeting> = (args) => <ArticlePageGreeting {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
