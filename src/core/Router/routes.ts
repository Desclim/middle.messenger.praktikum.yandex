export const APP_ROUTES = {
  LOGIN: '/',
  SIGN_UP: '/sign-up',
  MESSENGER: '/messenger',
  PROFILE: '/profile',
  EDIT_PROFILE: '/edit-profile',
  EDIT_PASSWORD: '/edit-password',
  NOT_FOUND: '/404',
  SERVER_ERROR: '/500',
} as const;

export type AppPathname = typeof APP_ROUTES[keyof typeof APP_ROUTES];
