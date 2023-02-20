import React from 'react'
import { Button } from 'shared/ui/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { counterActions } from '../model/slice/counterSlice'
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue'

interface CounterProps {
  className?: string
}
export const Counter: React.FC<CounterProps> = () => {
  const dispatch = useDispatch()
  const counterValue = useSelector(getCounterValue)
  const increment = () => {
    dispatch(counterActions.increment())
  }
  const decrement = () => {
    dispatch(counterActions.decrement())
  }
  return (
      <div>
        <h1 data-testid="value-title">{counterValue}</h1>
        <Button data-testid="increment-button" onClick={increment}>+</Button>
        <Button data-testid="decrement-button" onClick={decrement}>-</Button>
      </div>
  )
}
