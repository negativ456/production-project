import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ArticleFilter } from './ArticleFilter'

export default {
  title: 'shared/ArticleFilter',
  component: ArticleFilter,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ArticleFilter>

const Template: ComponentStory<typeof ArticleFilter> = (args) => <ArticleFilter {...args} />

export const Normal = Template.bind({})
Normal.args = {}
