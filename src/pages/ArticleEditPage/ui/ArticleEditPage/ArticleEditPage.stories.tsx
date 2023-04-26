import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ArticleEditPage from './ArticleEditPage'
import { storeDecorator } from '@/shared/config/storybook/storeDecorator'

export default {
  title: 'pages/ArticleEditPage',
  component: ArticleEditPage,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ArticleEditPage>

const Template: ComponentStory<typeof ArticleEditPage> = (args) => <ArticleEditPage {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [
  storeDecorator({})
]
