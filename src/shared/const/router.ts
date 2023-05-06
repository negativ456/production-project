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

export const routes = {
  [AppRoutes.MAIN]: () => '/',
  [AppRoutes.ABOUT]: () => '/about',
  [AppRoutes.PROFILE]: (id: string) => `/profile/${id}`,
  [AppRoutes.ARTICLES]: () => '/articles',
  [AppRoutes.ARTICLES_DETAILS]: (id: string) => `/articles/${id}`,
  [AppRoutes.ARTICLE_CREATE]: () => '/articles/new',
  [AppRoutes.ARTICLE_EDIT]: (id: string) => `/articles/${id}/edit`,
  [AppRoutes.ADMIN_PANEL]: () => '/admin-panel',
  [AppRoutes.FORBIDDEN]: () => '/forbidden',
  [AppRoutes.NOT_FOUND]: () => '*'
}
