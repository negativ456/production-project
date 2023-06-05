import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import LogoSvg from '@/shared/assets/icons/logo.svg';
import { HStack } from '../Stack';
interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo = ({ className, size = 50 }: AppLogoProps) => {
  return (
    <HStack max justify={'center'} className={classNames(cls.AppLogo, {}, [className])}>
      <div className={cls.gradient_big}></div>
      <div className={cls.gradient_small}></div>
      <LogoSvg width={size} height={size} className={cls.icon} />
    </HStack>
  );
};
