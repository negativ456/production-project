import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Header } from './Header'

export default {
  title: 'shared/Header',
  component: Header,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

export const Normal = Template.bind({})
Normal.args = {}
