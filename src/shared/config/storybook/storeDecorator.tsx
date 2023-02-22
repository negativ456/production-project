import { StoreProvider } from 'app/providers/StoreProvider'
import { Story } from '@storybook/react'

export const storeDecorator = (story: () => Story) => {
  return <StoreProvider>
    {story()}
  </StoreProvider>
}
