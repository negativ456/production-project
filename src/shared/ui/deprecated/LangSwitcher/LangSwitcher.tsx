import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LangSwitcher.module.scss';
import React, { memo } from 'react';
import { Button as ButtonDeprecated, ButtonTheme } from '../Button/Button';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '../../redesigned/Button/Button';

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}
/**
 * Deprecated, you should use new components from redesigned folder
 * @deprecated
 */
export const LangSwitcher: React.FC<LangSwitcherProps> = memo(({ className, short }: LangSwitcherProps) => {
  const { t } = useTranslation();
  const toggle = async () => {
    await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={
        <Button onClick={toggle} variant={'clear'}>
          {t(short ? 'Короткий язык' : 'Язык')}
        </Button>
      }
      off={
        <ButtonDeprecated
          onClick={toggle}
          theme={ButtonTheme.CLEAR}
          className={classNames(cls.LangSwitcher, {}, [className])}>
          {t(short ? 'Короткий язык' : 'Язык')}
        </ButtonDeprecated>
      }
    />
  );
});
