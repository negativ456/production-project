import React, { useCallback, useEffect, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { useTranslation } from 'react-i18next';
import { LoginModal } from '@/features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { AppLink } from '@/shared/ui/deprecated/AppLink/AppLink';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { NotificationButton } from '@/features/NotificationButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { AppRoutes, routes } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { toggleFeatures } from '@/shared/lib/features/lib/toggleFeatures';

interface NavBarProps {
  className?: string;
}
export const Navbar: React.FC<NavBarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const userData = useSelector(getUserAuthData);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);
  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => cls.Navbar_redesigned,
    off: () => cls.Navbar,
  });
  if (userData) {
    return (
      <ToggleFeatures
        feature={'isAppRedesigned'}
        on={
          <header className={classNames(cls.Navbar_redesigned, {}, [className])}>
            <HStack gap={'16'}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
        off={
          <header className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.links}>
              <Text className={cls.app_name} theme={TextTheme.INVERTED} title={t('Project title')} />
              <HStack justify={'between'} max>
                <AppLink to={routes[AppRoutes.ARTICLE_CREATE]()}>{t('Создать статью')}</AppLink>
                <HStack gap={'16'}>
                  <NotificationButton />
                  <AvatarDropdown />
                </HStack>
              </HStack>
            </div>
          </header>
        }
      />
    );
  }
  return (
    <header className={classNames(mainClass, {}, [className])}>
      <div className={cls.links}>
        <ToggleFeatures
          feature={'isAppRedesigned'}
          on={
            <Button variant={'clear'} onClick={openModal}>
              {t('Войти')}
            </Button>
          }
          off={
            <ButtonDeprecated theme={ButtonTheme.CLEAR_INVERTED} onClick={openModal}>
              {t('Войти')}
            </ButtonDeprecated>
          }
        />

        {isOpen && <LoginModal open={isOpen} onClose={closeModal} />}
      </div>
    </header>
  );
};
