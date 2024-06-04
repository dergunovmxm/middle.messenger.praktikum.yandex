import { selectScript } from '../utils/selectScript';
import { selectStylesName } from '../utils/selectStyleName';
import { Route } from './route';

class Router {
  private _routes: Route[] = [];

  private _history: History | null = null;

  private _currentRoute?: Route | null = null;

  private _rootQuery: string = '';

  private static __instance: Router | null;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }
    this._routes = [];
    this._history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  public updateCssFileLink(route: Route) {
    const linkElement = document.querySelector('link[rel="stylesheet"]');

    if (linkElement) {
      linkElement.setAttribute('href', `.${selectStylesName(route)}.scss`);
    } else {
      const newLinkElement = document.createElement('link');
      newLinkElement.setAttribute('rel', 'stylesheet');
      newLinkElement.setAttribute('href', `.${selectStylesName(route)}.scss`);
      document.head.appendChild(newLinkElement);
    }
  }

  public use(pathname: string, block: () => { hide: () => void }) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this._routes.push(route);
    return this;
  }

  public start(): void {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute === route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    if (route) {
      route.render();
      this.updateCssFileLink(route);

      const scriptPath = `${selectScript(route)}.ts`;
      const scriptElement = document.querySelector('script[router="true"]');
      if (scriptElement) {
        scriptElement.setAttribute('src', scriptPath);
      }
    }
  }

  public go(pathname: string) {
    this._history?.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  private getRoute(pathname: string): Route | undefined {
    return this._routes.find((route) => route.match(pathname));
  }

  public back() {
    this._history?.back();
  }

  forward() {
    this._history?.forward();
  }
}

export const router = new Router('#root');
