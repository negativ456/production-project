import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticlesFilter } from './ArticlesFilter';

export default {
  title: 'shared/ArticlesFilter',
  component: ArticlesFilter,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesFilter>;

const Template: ComponentStory<typeof ArticlesFilter> = (args) => <ArticlesFilter {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
