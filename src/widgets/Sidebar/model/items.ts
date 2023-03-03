import React from 'react'
import MainIcon from 'shared/assets/icons/main.svg'
import AboutIcon from 'shared/assets/icons/about.svg'
import ProfileIcon from 'shared/assets/icons/profile.svg'
import { RoutePath } from 'shared/config/routerConfig/routeConfig'

export interface SidebarItemType {
  path: string
  text: string
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    text: 'Главная',
    Icon: MainIcon
  },
  {
    path: RoutePath.about,
    text: 'О нас',
    Icon: AboutIcon
  },
  {
    path: RoutePath.profile,
    text: 'Профиль',
    Icon: ProfileIcon
  }
]
