import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Sidebar } from './Sidebar'
import { storeDecorator } from 'shared/config/storybook/storeDecorator'
import { User } from 'entities/User'
const user: User = {
  id: 1,
  username: 'user'
}
export default {
  title: 'widgets/Sidebar',
  component: Sidebar,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Sidebar>

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />

export const WithAuth = Template.bind({})
WithAuth.args = {}
WithAuth.decorators = [
  storeDecorator({
    user: { userData: user }
  })
]
export const NoAuth = Template.bind({})
NoAuth.args = {}
NoAuth.decorators = [
  storeDecorator({
    user: { userData: null }
  })
]
