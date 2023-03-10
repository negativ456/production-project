import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import AboutPage from './AboutPage'
export default {
  title: 'pages/AboutPage',
  component: AboutPage,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof AboutPage>

const Template: ComponentStory<typeof AboutPage> = (args) => <AboutPage/>

export const Light = Template.bind({})
// export const Dark = Template.bind({})
// Light.args = {
// }
