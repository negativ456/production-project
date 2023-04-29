import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import MainPage from './MainPage'
import { storeDecorator } from '@/shared/config/storybook/storeDecorator'
export default {
  title: 'pages/MainPage',
  component: MainPage,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof MainPage>

const Template: ComponentStory<typeof MainPage> = (args) => <MainPage />

export const Normal = Template.bind({})
Normal.decorators = [
  storeDecorator({})
]
// export const Dark = Template.bind({})
// Light.args = {
// }
