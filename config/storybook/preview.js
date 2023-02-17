import { addDecorator } from '@storybook/react'
import { StyleDecorator } from '../../src/shared/config/storybook/styleDecorator'
import { routerDecorator } from '../../src/shared/config/storybook/routerDecorator'
import { themeDecorator } from '../../src/shared/config/storybook/themeDecorator'
import { withThemes } from 'storybook-addon-themes/react'
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  themes: {
    default: 'light',
    list: [
      { name: 'light', class: 'light', color: '#fff' },
      { name: 'dark', class: 'dark', color: '#000' }
    ],
    Decorator: themeDecorator,
    target: 'root'
  }
}
addDecorator(StyleDecorator)
addDecorator(routerDecorator)
addDecorator(withThemes)
