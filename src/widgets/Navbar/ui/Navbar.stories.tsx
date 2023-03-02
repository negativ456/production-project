import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Navbar } from './Navbar'
import { storeDecorator } from 'shared/config/storybook/storeDecorator'
export default {
  title: 'widgets/Navbar',
  component: Navbar,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Navbar>

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />

export const Primary = Template.bind({})
Primary.decorators = [
  storeDecorator({})
]
export const AuthNavbar = Template.bind({})
AuthNavbar.decorators = [
  storeDecorator({
    user: {
      userData: {
        id: 1,
        username: ''
      }
    }
  })
]

// export const Dark = Template.bind({})
// Light.args = {
// }
