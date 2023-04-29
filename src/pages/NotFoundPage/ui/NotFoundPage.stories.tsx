import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NotFoundPage } from './NotFoundPage'
import { storeDecorator } from '@/shared/config/storybook/storeDecorator'
export default {
  title: 'pages/NotFoundPage',
  component: NotFoundPage,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof NotFoundPage>

const Template: ComponentStory<typeof NotFoundPage> = (args) => <NotFoundPage {...args} />

export const Normal = Template.bind({})
Normal.decorators = [
  storeDecorator({})
]
// export const Dark = Template.bind({})
// Light.args = {
// }
