import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ArticleListItem } from './ArticleListItem'
import { Article, ArticleView, ArticleBlockType, ArticleType } from '@/entities/Article'

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
  title: 'pages/ArticlesPage/ArticleListItem',
  component: ArticleListItem,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ArticleListItem>

const Template: ComponentStory<typeof ArticleListItem> = (args) => <ArticleListItem {...args} />

export const List = Template.bind({})
List.args = {
  article,
  view: ArticleView.LIST
}

export const Tile = Template.bind({})
Tile.args = {
  article,
  view: ArticleView.TILE
}
