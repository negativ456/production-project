import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';
import { memo } from 'react';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import ThemeIconDeprecated from '@/shared/assets/icons/theme-icon.svg';
import ThemeIcon from '@/shared/assets/icons/swap-theme.svg';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { Theme } from '@/shared/const/theme';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';

interface ThemeSwitcherProps {
  className?: string;
}
export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const onToggleHandler = () => {
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }));
    });
  };
  return (
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={<Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />}
      off={
        <Button
          theme={ButtonTheme.CLEAR}
          className={classNames(cls.ThemeSwitcher, {}, [className])}
          onClick={onToggleHandler}>
          <ThemeIconDeprecated width={40} height={40} fill={theme === Theme.LIGHT ? '#FFC700' : '#0115C6'} />
        </Button>
      }
    />
  );
});
