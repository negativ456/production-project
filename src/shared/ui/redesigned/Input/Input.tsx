import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import React, { InputHTMLAttributes, memo, ReactNode, useEffect, useRef } from 'react';
import { HStack } from '../Stack';
import { Text } from '../Text/Text';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>;
interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  autofocus?: boolean;
  type?: string;
  readonly?: boolean;
  label?: string;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    addonRight,
    addonLeft,
    type = 'text',
    placeholder,
    label,
    autofocus,
    readonly = false,
    ...otherProps
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (autofocus) {
      inputRef.current?.focus();
    }
  }, []);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const input = (
    <div
      className={classNames(
        cls.Input,
        { [cls.readonly]: readonly, [cls.withAddonLeft]: !!addonLeft, [cls.withAddonRight]: !!addonRight },
        [className]
      )}>
      <div className={cls.addonLeft}>{addonLeft}</div>
      <input
        type={type}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        ref={inputRef}
        {...otherProps}
        readOnly={readonly}
      />
      <div className={cls.addonRight}>{addonRight}</div>
    </div>
  );

  if (label) {
    return (
      <HStack max gap={'8'}>
        <Text text={label} />
        {input}
      </HStack>
    );
  }

  return input;
});
