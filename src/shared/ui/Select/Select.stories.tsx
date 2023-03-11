import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Select } from './Select'
export default {
  title: 'shared/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />

export const Primary = Template.bind({})
Primary.args = {
  label: 'Укажите значение',
  options: [
    { name: 'First option', value: '1' },
    { name: 'Second option', value: '2' }
  ]
}
