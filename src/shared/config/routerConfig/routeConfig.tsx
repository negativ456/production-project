import { type RouteProps } from 'react-router-dom'
import { MainPage } from 'pages/MainPage'
import { AboutPage } from 'pages/AboutPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { ProfilePage } from 'pages/ProfilePage'
import { ArticlesPage } from 'pages/ArticlesPage'
import { ArticlesDetailsPage } from 'pages/ArticlesDetailsPage'
import { ArticleEditPage } from 'pages/ArticleEditPage'
import { AdminPanelPage } from 'pages/AdminPanelPage'
import { ForbiddenPage } from 'pages/ForbiddenPage'
import { UserRole } from 'entities/User/model/const/userConsts'

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
  roles?: UserRole[]
}
export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLES_DETAILS = 'articles_details',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_EDIT = 'article_edit',
  ADMIN_PANEL = 'admin_panel',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found'
}
export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.PROFILE]: '/profile/',
  [AppRoutes.ARTICLES]: '/articles',
  [AppRoutes.ARTICLES_DETAILS]: '/articles/',
  [AppRoutes.ARTICLE_CREATE]: '/articles/new',
  [AppRoutes.ARTICLE_EDIT]: '/articles/:id/edit',
  [AppRoutes.ADMIN_PANEL]: '/admin-panel',
  [AppRoutes.FORBIDDEN]: '/forbidden',
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
    path: RoutePath.profile + ':id',
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
    path: RoutePath.article_edit,
    element: <ArticleEditPage/>,
    authOnly: true
  },
  {
    path: RoutePath.article_create,
    element: <ArticleEditPage/>,
    authOnly: true
  },
  {
    path: RoutePath.admin_panel,
    element: <AdminPanelPage/>,
    authOnly: true,
    roles: [UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: RoutePath.forbidden,
    element: <ForbiddenPage/>
  },
  {
    path: RoutePath.not_found,
    element: <NotFoundPage/>
  }
]
