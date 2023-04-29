import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AvatarDropdown } from './AvatarDropdown'
import { storeDecorator } from '@/shared/config/storybook/storeDecorator'
import { UserRole } from '@/entities/User/model/const/userConsts'

export default {
  title: 'features/AvatarDropdown',
  component: AvatarDropdown,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof AvatarDropdown>

const Template: ComponentStory<typeof AvatarDropdown> = (args) => <AvatarDropdown {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [
  storeDecorator({
    user: {
      userData: {
        id: '1',
        username: 'user',
        roles: [UserRole.ADMIN, UserRole.MANAGER]
      }
    }
  })
]
