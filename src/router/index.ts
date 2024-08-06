import { selectStylesName } from '../utils/selectStyleName';
import { Route } from './route';

export class Router {
  routes: Array<Route>;

  history: History;

  _currentRoute?: null | Route;

  _rootQuery: string;

  static __instance: Router;

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

  use(pathname: string, block: () => { hide: () => void }) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      if (target) {
        this._onRoute(target.location.pathname);
      }
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string): void {
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
      // this.updateCssFileLink(route);

      // const scriptPath = `${selectScript(route)}.ts`;
      // const scriptElement = document.querySelector('script[router="true"]');
      // if (scriptElement) {
      //   scriptElement.setAttribute('src', scriptPath);
      // }
    }
  }

  public go(pathname: string) {
    this.history?.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }

  public back() {
    this.history?.back();
  }

  forward() {
    this.history?.forward();
  }
}

export const router = new Router('#root');
