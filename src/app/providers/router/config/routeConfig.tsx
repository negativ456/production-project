import { MainPage } from '@/pages/MainPage'
import { AboutPage } from '@/pages/AboutPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { ArticlesPage } from '@/pages/ArticlesPage'
import { ArticlesDetailsPage } from '@/pages/ArticlesDetailsPage'
import { ArticleEditPage } from '@/pages/ArticleEditPage'
import { AdminPanelPage } from '@/pages/AdminPanelPage'
import { UserRole } from '@/entities/User'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { AppRoutesProps } from '@/shared/types/router'
import { AppRoutes, routes } from '@/shared/const/router'

export const routeConfig: AppRoutesProps[] = [
  {
    path: routes[AppRoutes.MAIN](),
    element: <MainPage/>
  },
  {
    path: routes[AppRoutes.ABOUT](),
    element: <AboutPage/>
  },
  {
    path: routes[AppRoutes.PROFILE](':id'),
    element: <ProfilePage/>,
    authOnly: true
  },
  {
    path: routes[AppRoutes.ARTICLES](),
    element: <ArticlesPage/>,
    authOnly: true
  },
  {
    path: routes[AppRoutes.ARTICLES_DETAILS](':id'),
    element: <ArticlesDetailsPage/>,
    authOnly: true
  },
  {
    path: routes[AppRoutes.ARTICLE_EDIT](':id'),
    element: <ArticleEditPage/>,
    authOnly: true
  },
  {
    path: routes[AppRoutes.ARTICLE_CREATE](),
    element: <ArticleEditPage/>,
    authOnly: true
  },
  {
    path: routes[AppRoutes.ADMIN_PANEL](),
    element: <AdminPanelPage/>,
    authOnly: true,
    roles: [UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: routes[AppRoutes.FORBIDDEN](),
    element: <ForbiddenPage/>
  },
  {
    path: routes[AppRoutes.NOT_FOUND](),
    element: <NotFoundPage/>
  }
]
