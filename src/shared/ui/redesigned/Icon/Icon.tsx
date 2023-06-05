import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';
import React from 'react';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
  clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
  clickable: true;
  onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableIconProps;

export const Icon = (props: IconProps) => {
  const { className, Svg, clickable, width = 20, height = 20, ...otherProps } = props;
  const svg = (
    <Svg
      onClick={undefined}
      width={width}
      height={height}
      className={classNames(cls.Icon, {}, [clickable ? '' : className])}
      {...otherProps}
    />
  );
  if (clickable) {
    return (
      <button
        style={{ width, height }}
        type={'button'}
        className={classNames(cls.button, {}, [className])}
        onClick={props.onClick}>
        {svg}
      </button>
    );
  }
  return svg;
};
