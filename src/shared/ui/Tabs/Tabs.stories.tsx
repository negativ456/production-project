import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Tabs } from './Tabs'
import { action } from '@storybook/addon-actions'

export default {
  title: 'shared/Tabs',
  component: Tabs,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Tabs>

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />

export const Normal = Template.bind({})
Normal.args = {
  tabs: [
    {
      value: 'val 1',
      content: 'val 1'
    },
    {
      value: 'val 2',
      content: 'val 2'
    }
  ],
  value: 'val 2',
  onTabClick: action('onTabClick')
}
