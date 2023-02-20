import { Counter } from './Counter'
import { componentRender } from 'shared/config/tests/componentRender/componentRender'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
const user = userEvent.setup()
describe('Counter', () => {
  test('button with text ', () => {
    componentRender(<Counter/>, {
      initialState: {
        counter: { value: 0 }
      }
    })
    expect(screen.getByTestId('value-title')).toHaveTextContent('0')
  })
  test('increment ', async () => {
    componentRender(<Counter/>, {
      initialState: {
        counter: { value: 0 }
      }
    })
    await user.click(screen.getByTestId('increment-button'))
    expect(screen.getByTestId('value-title')).toHaveTextContent('1')
  })
  test('decrement', async () => {
    componentRender(<Counter/>, {
      initialState: {
        counter: { value: 0 }
      }
    })
    await user.click(screen.getByTestId('decrement-button'))
    expect(screen.getByTestId('value-title')).toHaveTextContent('-1')
  })
})
