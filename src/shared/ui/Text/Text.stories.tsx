import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Text, TextTheme } from './Text'
export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

export const Primary = Template.bind({})
Primary.args = {
  title: 'Title test',
  text: 'Title test'
}
export const OnlyTitle = Template.bind({})
OnlyTitle.args = {
  title: 'Title test'
}
export const OnlyText = Template.bind({})
OnlyText.args = {
  text: 'Title test'
}
export const Error = Template.bind({})
Error.args = {
  text: 'Error ex',
  title: 'Error ex',
  theme: TextTheme.ERROR
}
