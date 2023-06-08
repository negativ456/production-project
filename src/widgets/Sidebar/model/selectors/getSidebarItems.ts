import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import MainIconDeprecated from '@/shared/assets/icons/main.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile.svg';
import ArticlesIconDeprecated from '@/shared/assets/icons/articles.svg';

import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/info.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import ArticlesIcon from '@/shared/assets/icons/articles-new.svg';

import { SidebarItemType } from '../types/sidebarTypes';
import { AppRoutes, routes } from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features/lib/toggleFeatures';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: routes[AppRoutes.MAIN](),
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        off: () => MainIconDeprecated,
        on: () => MainIcon,
      }),
      text: 'Главная',
    },
    {
      path: routes[AppRoutes.ABOUT](),
      Icon: toggleFeatures({
        name: 'isAppRedesigned',
        off: () => ArticlesIconDeprecated,
        on: () => AboutIcon,
      }),
      text: 'О сайте',
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: routes[AppRoutes.PROFILE](userData.id),
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          off: () => ProfileIconDeprecated,
          on: () => ProfileIcon,
        }),
        text: 'Профиль',
        authOnly: true,
      },
      {
        path: routes[AppRoutes.ARTICLES](),
        Icon: toggleFeatures({
          name: 'isAppRedesigned',
          off: () => ArticlesIconDeprecated,
          on: () => ArticlesIcon,
        }),
        text: 'Статьи',
        authOnly: true,
      }
    );
  }

  return sidebarItemsList;
});
