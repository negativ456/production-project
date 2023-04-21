import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import AdminPanelPage from './AdminPanelPage'
import { storeDecorator } from 'shared/config/storybook/storeDecorator'
export default {
  title: 'pages/AboutPage',
  component: AdminPanelPage,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof AdminPanelPage>

const Template: ComponentStory<typeof AdminPanelPage> = (args) => <AdminPanelPage/>

export const Normal = Template.bind({})
// export const Dark = Template.bind({})
// Light.args = {
// }
Normal.decorators = [
  storeDecorator({})
]
