import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ArticlesTabFilter } from './ArticlesTabFilter'
import { ArticleType } from '../../../../entities/Article/model/consts/articleConsts'

export default {
  title: 'features/ArticleFilter/ArticlesTabFilter',
  component: ArticlesTabFilter,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ArticlesTabFilter>

const Template: ComponentStory<typeof ArticlesTabFilter> = (args) => <ArticlesTabFilter {...args} />

export const Normal = Template.bind({})
Normal.args = {
  value: ArticleType.ALL
}
