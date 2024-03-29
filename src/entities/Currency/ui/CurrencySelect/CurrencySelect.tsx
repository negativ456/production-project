import { useTranslation } from 'react-i18next';
import { Currency } from '../../model/types/currency';
import React, { memo, useCallback } from 'react';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups/ui/ListBox/ListBox';
import { ListBox } from '@/shared/ui/redesigned/Popups/ui/ListBox/ListBox';
import { ToggleFeatures } from '@/shared/lib/features';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}
const currencyList = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.USD, content: Currency.USD },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.CNY, content: Currency.CNY },
];
export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const { value, onChange, readonly, className } = props;
  const { t } = useTranslation();
  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency);
    },
    [onChange]
  );

  const propsSelect = {
    label: t('Валюта'),
    readonly,
    className,
    value,
    items: currencyList,
    defaultValue: t('Укажите валюту'),
    onChange: onChangeHandler,
  };

  return (
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={<ListBox {...propsSelect} />}
      off={<ListBoxDeprecated {...propsSelect} />}
    />
  );
});
