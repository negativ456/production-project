import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'
import React, { ChangeEvent, useMemo } from 'react'

export interface SelectOption<T extends string> {
  name: string
  value: T
}
interface SelectProps<T extends string> {
  className?: string
  label?: string
  options?: Array<SelectOption<T>>
  onChange?: (value: T) => void
  value?: string
  readonly?: boolean
}
export const Select = <T extends string>(props: SelectProps<T>) => {
  const { className, label, options, value, onChange, readonly } = props
  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T)
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
}
