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
import { RoutePath } from '@/shared/const/router'

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
