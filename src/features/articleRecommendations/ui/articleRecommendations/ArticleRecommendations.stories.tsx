import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ArticleRecommendations } from './ArticleRecommendations'
import { storeDecorator } from 'shared/config/storybook/storeDecorator'

export default {
  title: 'shared/ArticleRecommendations',
  component: ArticleRecommendations,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ArticleRecommendations>

const Template: ComponentStory<typeof ArticleRecommendations> = (args) => <ArticleRecommendations {...args} />

export const Normal = Template.bind({})
Normal.args = {}

Normal.decorators = [
  storeDecorator({})
]
