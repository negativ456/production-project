import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ProfileCard } from './ProfileCard'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import avatar from 'shared/assets/tests/storybook.jpg'
export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ProfileCard>

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />

export const Primary = Template.bind({})
Primary.args = {
  data: {
    first: 'name',
    lastname: 'surname',
    age: 23,
    currency: Currency.RUB,
    country: Country.Russia,
    city: 'Mos',
    username: '123',
    avatar
  }
}
export const Loading = Template.bind({})
Loading.args = {
  isLoading: true
}
export const Error = Template.bind({})
Error.args = {
  error: 'error'
}
