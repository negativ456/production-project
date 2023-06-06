import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { Country } from '../../model/types/country';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups/ui/ListBox/ListBox';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}
const countryList = [
  { content: Country.Russia, value: Country.Russia },
  { content: Country.USA, value: Country.USA },
  { content: Country.China, value: Country.China },
];
export const CountrySelect = memo((props: CountrySelectProps) => {
  const { value, onChange, readonly, className } = props;
  const { t } = useTranslation();
  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange]
  );
  const countryProps = {
    className,
    defaultValue: t('Укажите страну'),
    items: countryList,
    label: t('Страна'),
    value,
    readonly,
    onChange: onChangeHandler,
  };
  return (
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={<ListBox {...countryProps} />}
      off={<ListBoxDeprecated {...countryProps} />}
    />
  );
});
