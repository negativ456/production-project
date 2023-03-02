import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { LoginFormAsync } from './LoginForm.async'
import { storeDecorator } from 'shared/config/storybook/storeDecorator'
export default {
  title: 'features/LoginForm',
  component: LoginFormAsync,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof LoginFormAsync>

const Template: ComponentStory<typeof LoginFormAsync> = (args) => <LoginFormAsync {...args} />

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
