import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProfilePage from './ProfilePage'
import { storeDecorator } from '@/shared/config/storybook/storeDecorator'
export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ProfilePage>

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />

export const Primary = Template.bind({})
Primary.decorators = [
  storeDecorator({
  })
]
