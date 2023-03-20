import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { CommentList } from './CommentList'

export default {
  title: 'entities/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof CommentList>

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />

export const Normal = Template.bind({})
Normal.args = {
  isLoading: false,
  comments: [
    {
      id: '1',
      user: { id: 1, username: 'username' },
      text: 'text'
    },
    {
      id: '2',
      user: { id: 2, username: 'username 2' },
      text: 'text 2'
    }
  ]
}
export const Loading = Template.bind({})
Loading.args = {
  isLoading: true
}
