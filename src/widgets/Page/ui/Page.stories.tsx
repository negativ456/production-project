import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Page } from './Page'
import { storeDecorator } from '@/shared/config/storybook/storeDecorator'

export default {
  title: 'shared/Page',
  component: Page,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Page>

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [
  storeDecorator({})
]
