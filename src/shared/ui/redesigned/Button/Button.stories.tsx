import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';
export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
  children: 'Text',
  variant: 'clear',
};
export const Square = Template.bind({});
Square.args = {
  children: '>',
  variant: 'outline',
  square: true,
};
export const SquareSizeM = Template.bind({});
SquareSizeM.args = {
  children: '>',
  variant: 'outline',
  square: true,
  size: 'm',
};
export const SquareSizeL = Template.bind({});
SquareSizeL.args = {
  children: '>',
  variant: 'outline',
  square: true,
  size: 'l',
};
export const SquareSizeXL = Template.bind({});
SquareSizeXL.args = {
  children: '>',
  variant: 'outline',
  square: true,
  size: 'xl',
};
