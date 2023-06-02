import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';
import React from 'react';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error',
  INVERTED = 'inverted',
}
export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

export enum TextSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
}

type HeaderTag = 'h1' | 'h2' | 'h3';
const mapSizeToHeaderTag: Record<TextSize, HeaderTag> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
};
interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  size?: TextSize;
  theme?: TextTheme;
  align?: TextAlign;
  'data-testid'?: string;
}
/**
 * Deprecated, you should use new components from redesigned folder
 * @deprecated
 */
export const Text: React.FC<TextProps> = (props) => {
  const {
    className,
    text,
    title,
    size = TextSize.M,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    'data-testid': dataTestId = 'Text',
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];
  return (
    <div className={classNames(cls.Text, {}, [className, cls[theme], cls[align], cls[size]])}>
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
