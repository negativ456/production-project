import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AddNewComment } from './AddNewComment';
import { action } from '@storybook/addon-actions';
import { storeDecorator } from '@/shared/config/storybook/storeDecorator';

export default {
  title: 'features/AddNewComment',
  component: AddNewComment,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AddNewComment>;

const Template: ComponentStory<typeof AddNewComment> = (args) => <AddNewComment {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  onSendComment: action('onSendComment'),
};
Normal.decorators = [storeDecorator({})];
