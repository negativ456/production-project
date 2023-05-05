import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ArticleRecommendations } from './ArticleRecommendations'
import { storeDecorator } from '@/shared/config/storybook/storeDecorator'
import withMock from 'storybook-addon-mock'
import { Article, ArticleBlockType, ArticleType } from '@/entities/Article'

const article: Article = {
  id: '16',
  title: 'Javascript news 16',
  subtitle: 'Что нового в JS за 2022 год?',
  user: { id: '1', username: 'user' },
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '26.02.2022',
  type: [
    ArticleType.IT
  ],
  blocks: [
    {
      id: '1',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок этого блока',
      paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.'
      ]
    }
  ]
}
export default {
  title: 'features/ArticleRecommendations',
  component: ArticleRecommendations,
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  decorators: [withMock]
} as ComponentMeta<typeof ArticleRecommendations>

const Template: ComponentStory<typeof ArticleRecommendations> = (args) => <ArticleRecommendations {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [
  storeDecorator({})
]
Normal.parameters = {
  mockData: [
    {
      url: __API__ + '/articles?_limit=3',
      method: 'GET',
      status: 200,
      response: [
        { ...article, id: '1' },
        { ...article, id: '2' }
      ]
    }
  ]
}
