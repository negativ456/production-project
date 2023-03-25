import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ArticleCommentList } from './ArticleCommentList'
import { storeDecorator } from 'shared/config/storybook/storeDecorator'

export default {
  title: 'features/ArticleCommentList',
  component: ArticleCommentList,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ArticleCommentList>

const Template: ComponentStory<typeof ArticleCommentList> = (args) => <ArticleCommentList {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [
  storeDecorator({
    articleComments: {
      ids: ['1'],
      isLoading: false,
      entities: {
        1: {
          id: '1',
          user: { id: 1, username: 'user' },
          text: 'text'
        }
      }
    }
  })
]
