import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'
import React, { ChangeEvent, memo, useMemo } from 'react'

interface SelectOption {
  name: string
  value: string
}
interface SelectProps {
  className?: string
  label?: string
  options?: SelectOption[]
  onChange?: (value: string) => void
  value?: string
  readonly?: boolean
}
export const Select = memo((props: SelectProps) => {
  const { className, label, options, value, onChange, readonly } = props
  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value)
  }
  const optionsList = useMemo(() => {
    return options?.map((opt) => (
        <option
          value={opt.value}
          key={opt.value}
        >
          {opt.name}
        </option>
    ))
  }, [options])
  return (
      <div className={classNames(cls.Select, {}, [className])}>
        {label && <span className={cls.label}>
          {label}
        </span>}
        <select
            disabled={readonly}
            value={value}
            onChange={onChangeHandler}
        >
          {optionsList}
        </select>
      </div>
  )
})
