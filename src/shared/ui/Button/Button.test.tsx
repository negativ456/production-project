import { render, screen } from '@testing-library/react'
import { Button, ButtonTheme } from './Button'

describe('Button', () => {
  test('button with text ', () => {
    render(<Button>TEST</Button>)
    expect(screen.getByText('TEST')).toBeInTheDocument()
  })
  test('button with clear theme ', () => {
    render(<Button theme={ButtonTheme.CLEAR}>TEST</Button>)
    expect(screen.getByText('TEST')).toHaveClass('clear')
    screen.debug()
  })
})
