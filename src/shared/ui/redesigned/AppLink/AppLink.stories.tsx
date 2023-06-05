import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AppLink } from './AppLink';
export default {
  title: 'shared/AppLink',
  component: AppLink,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Link',
};
export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'red',
  children: 'Link',
};
// export const Dark = Template.bind({})
// Light.args = {
// }
