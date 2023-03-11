import { useTranslation } from 'react-i18next'
import { Currency } from '../../model/types/currency'
import { Select } from 'shared/ui/Select/Select'
import React, { memo, useCallback } from 'react'

interface CurrencySelectProps {
  className?: string
  value?: Currency
  onChange?: (value: Currency) => void
  readonly?: boolean
}
const currencyList = [
  { value: Currency.RUB, name: Currency.RUB },
  { value: Currency.USD, name: Currency.USD },
  { value: Currency.EUR, name: Currency.EUR },
  { value: Currency.CNY, name: Currency.CNY }
]
export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const { value, onChange, readonly, className } = props
  const { t } = useTranslation()
  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency)
  }, [onChange])
  return (
      <Select
          className={className}
          label={t('Валюта')}
          value={value}
          options={currencyList}
          onChange={onChangeHandler}
          readonly={readonly}
      />
  )
})
