import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EditableProfileCard } from './EditableProfileCard';
import { storeDecorator } from '@/shared/config/storybook/storeDecorator';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import avatar from '@/shared/assets/tests/storybook.jpg';
export default {
  title: 'features/EditableProfileCard',
  component: EditableProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof EditableProfileCard>;

const Template: ComponentStory<typeof EditableProfileCard> = (args) => <EditableProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
  storeDecorator({
    profile: {
      form: {
        first: 'name',
        lastname: 'surname',
        age: 23,
        currency: Currency.RUB,
        country: Country.Russia,
        city: 'Mos',
        username: '123',
        avatar,
      },
    },
  }),
];
