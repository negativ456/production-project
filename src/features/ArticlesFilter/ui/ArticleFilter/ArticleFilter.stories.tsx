import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ArticleFilter } from './ArticleFilter'
import { storeDecorator } from '@/shared/config/storybook/storeDecorator'

export default {
  title: 'features/ArticleFilter',
  component: ArticleFilter,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ArticleFilter>

const Template: ComponentStory<typeof ArticleFilter> = (args) => <ArticleFilter {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [
  storeDecorator({})
]
