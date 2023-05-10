import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import MainIcon from '@/shared/assets/icons/main.svg';
import AboutIcon from '@/shared/assets/icons/about.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import ArticlesIcon from '@/shared/assets/icons/articles.svg';
import { SidebarItemType } from '../types/sidebarTypes';
import { AppRoutes, routes } from '@/shared/const/router';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: routes[AppRoutes.MAIN](),
      Icon: MainIcon,
      text: 'Главная',
    },
    {
      path: routes[AppRoutes.ABOUT](),
      Icon: AboutIcon,
      text: 'О сайте',
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        path: routes[AppRoutes.PROFILE](userData.id),
        Icon: ProfileIcon,
        text: 'Профиль',
        authOnly: true,
      },
      {
        path: routes[AppRoutes.ARTICLES](),
        Icon: ArticlesIcon,
        text: 'Статьи',
        authOnly: true,
      }
    );
  }

  return sidebarItemsList;
});
