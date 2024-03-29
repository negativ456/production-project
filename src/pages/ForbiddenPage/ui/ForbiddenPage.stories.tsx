import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ForbiddenPage from './ForbiddenPage';
import { storeDecorator } from '@/shared/config/storybook/storeDecorator';

export default {
  title: 'pages/ForbiddenPage',
  component: ForbiddenPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ForbiddenPage>;

const Template: ComponentStory<typeof ForbiddenPage> = (args) => <ForbiddenPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [storeDecorator({})];
