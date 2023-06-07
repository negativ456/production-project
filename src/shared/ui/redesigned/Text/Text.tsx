import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';
import React from 'react';

export type TextVariant = 'primary' | 'accent' | 'error';
export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 's' | 'm' | 'l';

type HeaderTag = 'h1' | 'h2' | 'h3';

const mapSizeToClass: Record<string, string> = {
  s: 'size_s',
  m: 'size_m',
  l: 'size_l',
};
const mapSizeToHeaderTag: Record<string, HeaderTag> = {
  s: 'h3',
  m: 'h2',
  l: 'h1',
};
interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  size?: TextSize;
  variant?: TextVariant;
  align?: TextAlign;
  bold?: boolean;
  'data-testid'?: string;
}

export const Text: React.FC<TextProps> = (props) => {
  const {
    className,
    text,
    title,
    size = 'm',
    variant = 'primary',
    bold,
    align = 'left',
    'data-testid': dataTestId = 'Text',
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];
  const sizeClass = mapSizeToClass[size];
  return (
    <div className={classNames(cls.Text, { [cls.bold]: bold }, [className, cls[variant], cls[align], cls[sizeClass]])}>
      {title && (
        <HeaderTag data-testid={`${dataTestId}.Header`} className={cls.title}>
          {title}
        </HeaderTag>
      )}
      {text && (
        <p data-testid={`${dataTestId}.Paragraph`} className={cls.text}>
          {text}
        </p>
      )}
    </div>
  );
};
