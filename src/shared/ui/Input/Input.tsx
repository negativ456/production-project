import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Input.module.scss'
import React, { InputHTMLAttributes, memo, useEffect, useRef } from 'react'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>
interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  autofocus?: boolean
  type?: string
}
export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autofocus,
    ...otherProps
  } = props
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (autofocus) {
      inputRef.current?.focus()
    }
  }, [])
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
      <div className={classNames(cls.Input, {}, [className])}>
        {placeholder && <div>{`${placeholder}>`}</div>}
        <input
            type={type}
            value={value}
            onChange={onChangeHandler}
            ref={inputRef}
            {...otherProps}
        />
      </div>
  )
})
