import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Text, TextSize, TextTheme } from './Text'

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
export const SizeL = Template.bind({})
SizeL.args = {
  title: 'Title test',
  text: 'Title test',
  size: TextSize.L
}
export const Error = Template.bind({})
Error.args = {
  text: 'Error ex',
  title: 'Error ex',
  theme: TextTheme.ERROR
}
