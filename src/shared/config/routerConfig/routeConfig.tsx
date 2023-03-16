import { type RouteProps } from 'react-router-dom'
import { MainPage } from 'pages/MainPage'
import { AboutPage } from 'pages/AboutPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { ProfilePage } from 'pages/ProfilePage'
import { ArticlesPage } from 'pages/ArticlesPage'
import { ArticlesDetailsPage } from 'pages/ArticlesDetailsPage'

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
}
export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLES_DETAILS = 'articles_details',
  NOT_FOUND = 'not_found'
}
export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.ARTICLES]: '/articles',
  [AppRoutes.ARTICLES_DETAILS]: '/articles/',
  [AppRoutes.NOT_FOUND]: '*'
}
export const routeConfig: AppRoutesProps[] = [
  {
    path: RoutePath.main,
    element: <MainPage/>
  },
  {
    path: RoutePath.about,
    element: <AboutPage/>
  },
  {
    path: RoutePath.profile,
    element: <ProfilePage/>,
    authOnly: true
  },
  {
    path: RoutePath.articles,
    element: <ArticlesPage/>,
    authOnly: true
  },
  {
    path: RoutePath.articles_details + ':id',
    element: <ArticlesDetailsPage/>,
    authOnly: true
  },
  {
    path: RoutePath.not_found,
    element: <NotFoundPage/>
  }
]
