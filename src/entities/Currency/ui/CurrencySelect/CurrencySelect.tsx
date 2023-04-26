import { useTranslation } from 'react-i18next'
import { Currency } from '../../model/types/currency'
import React, { memo, useCallback } from 'react'
import { ListBox } from '@/shared/ui/Popups/ui/ListBox/ListBox'

interface CurrencySelectProps {
  className?: string
  value?: Currency
  onChange?: (value: Currency) => void
  readonly?: boolean
}
const currencyList = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.USD, content: Currency.USD },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.CNY, content: Currency.CNY }
]
export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const { value, onChange, readonly, className } = props
  const { t } = useTranslation()
  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency)
  }, [onChange])

  return (
      <ListBox
          label={t('Валюта')}
          readonly={readonly}
          className={className}
          value={value}
          items={currencyList}
          defaultValue={t('Укажите валюту')}
          onChange={onChangeHandler}/>
  )
})
