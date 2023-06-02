import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import LogoSvg from '@/shared/assets/icons/logo.svg';
import { HStack } from '../Stack';
interface AppLogoProps {
  className?: string;
}
/**
 * Deprecated, you should use new components from redesigned folder
 * @deprecated
 */
export const AppLogo = ({ className }: AppLogoProps) => {
  return (
    <HStack max justify={'center'} className={classNames(cls.AppLogo, {}, [className])}>
      <div className={cls.gradient_big}></div>
      <div className={cls.gradient_small}></div>
      <LogoSvg width={55} height={60} className={cls.icon} />
    </HStack>
  );
};
