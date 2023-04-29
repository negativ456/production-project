import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import LoginForm from './LoginForm'
import { storeDecorator } from '@/shared/config/storybook/storeDecorator'
export default {
  title: 'features/AuthByUsername/LoginForm',
  component: LoginForm,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof LoginForm>

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />

export const Primary = Template.bind({})
Primary.args = {}
Primary.decorators = [
  storeDecorator({
    loginForm: { username: '123', password: 'asd' }
  })
]
export const WithError = Template.bind({})
WithError.args = {}
WithError.decorators = [
  storeDecorator({
    loginForm: { username: '123', password: 'asd', error: 'Error' }
  })
]
export const Loading = Template.bind({})
Loading.args = {}
Loading.decorators = [
  storeDecorator({
    loginForm: { username: '123', password: 'asd', isLoading: true }
  })
]
