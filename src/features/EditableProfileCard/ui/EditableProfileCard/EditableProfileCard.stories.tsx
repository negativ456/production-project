import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EditableProfileCard } from './EditableProfileCard';
import { storeDecorator } from '@/shared/config/storybook/storeDecorator';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
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
        avatar:
          'https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=',
      },
    },
  }),
];
