import Route from './Route';
import Block from '../Component/Block';
import store from '../Store/Store';
import { APP_ROUTES, type AppPathname } from './routes';

type BlockConstructable = new () => Block;

const noAuthRoutes: AppPathname[] = [
  APP_ROUTES.LOGIN,
  APP_ROUTES.SIGN_UP,
];

const authRoutes: AppPathname[] = [
  APP_ROUTES.MESSENGER,
  APP_ROUTES.PROFILE,
  APP_ROUTES.EDIT_PROFILE,
  APP_ROUTES.EDIT_PASSWORD,
];

export default class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | null = null;
  private _rootQuery = '';

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  public use(pathname: AppPathname, block: BlockConstructable): this {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);

    return this;
  }

  public start(): void {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const user = store.getState()['user'];

    const isNoAuthRoute = noAuthRoutes.includes(pathname as AppPathname);
    const isAuthRoute = authRoutes.includes(pathname as AppPathname);

    if (isAuthRoute && !user && pathname !== APP_ROUTES.LOGIN) {
      this.replace(APP_ROUTES.LOGIN);
      return;
    }

    if (isNoAuthRoute && user && pathname !== APP_ROUTES.MESSENGER) {
      this.replace(APP_ROUTES.MESSENGER);
      return;
    }

    let route = this.getRoute(pathname);

    if (!route) {
      route = this.getRoute(APP_ROUTES.NOT_FOUND);
    }

    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  public go(pathname: AppPathname): void {
    if (window.location.pathname === pathname) {
      return;
    }

    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public replace(pathname: AppPathname): void {
    if (window.location.pathname === pathname) {
      return;
    }

    this.history.replaceState({}, '', pathname);
    this._onRoute(pathname);
  }

  public getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}
