import { useTranslation } from 'react-i18next'
import { Select } from 'shared/ui/Select/Select'
import React, { memo, useCallback } from 'react'
import { Country } from '../../model/types/country'

interface CountrySelectProps {
  className?: string
  value?: Country
  onChange?: (value: Country) => void
  readonly?: boolean
}
const countryList = [
  { name: Country.Russia, value: Country.Russia },
  { name: Country.USA, value: Country.USA },
  { name: Country.China, value: Country.China }
]
export const CountrySelect = memo((props: CountrySelectProps) => {
  const { value, onChange, readonly, className } = props
  const { t } = useTranslation()
  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country)
  }, [onChange])
  return (
      <Select
          className={className}
          label={t('Страна')}
          value={value}
          options={countryList}
          onChange={onChangeHandler}
          readonly={readonly}
      />
  )
})
