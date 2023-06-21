export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  SETTINGS = 'settings',
  ARTICLES_DETAILS = 'articles_details',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_EDIT = 'article_edit',
  ADMIN_PANEL = 'admin_panel',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found',
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
  [AppRoutes.SETTINGS]: () => '/settings',
  [AppRoutes.FORBIDDEN]: () => '/forbidden',
  [AppRoutes.NOT_FOUND]: () => '*',
};

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [routes[AppRoutes.MAIN]()]: AppRoutes.MAIN,
  [routes[AppRoutes.ABOUT]()]: AppRoutes.ABOUT,
  [routes[AppRoutes.PROFILE](':id')]: AppRoutes.PROFILE,
  [routes[AppRoutes.ARTICLES]()]: AppRoutes.ARTICLES,
  [routes[AppRoutes.ARTICLES_DETAILS](':id')]: AppRoutes.ARTICLES_DETAILS,
  [routes[AppRoutes.ARTICLE_CREATE]()]: AppRoutes.ARTICLE_CREATE,
  [routes[AppRoutes.ARTICLE_EDIT](':id')]: AppRoutes.ARTICLE_EDIT,
  [routes[AppRoutes.ADMIN_PANEL]()]: AppRoutes.ADMIN_PANEL,
  [routes[AppRoutes.SETTINGS]()]: AppRoutes.SETTINGS,
  [routes[AppRoutes.FORBIDDEN]()]: AppRoutes.FORBIDDEN,
};
