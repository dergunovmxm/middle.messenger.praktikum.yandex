import { Block } from "../app";
import { selectScript } from "../utils/selectScript";
import { selectStylesName } from "../utils/selectStyleName";

const renderPage = (_: string, block: () => void): void => {
	block()
}

export class Route {
	_pathname: string;
	_block: () => { hide: () => void };
	_props: { rootQuery: string };
	constructor(pathname: string, view: () => { hide: () => void }, props: { rootQuery: string }) {
		this._pathname = pathname;
		this._block = view;
		this._props = props;
	}

	navigate(pathname: string) {
		if (this.match(pathname) && pathname !== this._pathname) {
			this._pathname = pathname;
			renderPage(this._props.rootQuery, this._block);
		}
	}

	leave() {
		if (this._block && typeof this._block().hide === 'function') {
			this._block().hide();
		}
	}

	match(pathname: string) {
		return pathname === this._pathname;
	}

	render() {
		renderPage(this._props.rootQuery, this._block);
	}
}

class Router {

	routes: Route[];
	history: History;
	_currentRoute?: Route | null;
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

	updateCssFileLink(route: Route) {
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

	start() {
		window.onpopstate = (event: PopStateEvent) => {
			const target = event.currentTarget as Window;
			if (target) {
				this._onRoute(target.location.pathname);
			}
		}
		this._onRoute(window.location.pathname)
	}

	_onRoute(pathname: string) {
		const route = this.getRoute(pathname);

		if (this._currentRoute && this._currentRoute !== route) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		if (route) {
			route.render();
			this.updateCssFileLink(route);

			const scriptPath = selectScript(route) + ".ts";
			const scriptElement = document.querySelector(`script[router="true"]`);
			if (scriptElement) {
				scriptElement.setAttribute('src', scriptPath);
			}
		}
	}

	go(pathname: string) {
		this.history.pushState({}, '', pathname);
		this._onRoute(pathname);
	}

	getRoute(pathname: string) {
		return this.routes.find((route) => route.match(pathname))
	}

	back() {
		this.history.back();
	}

	forward() {
		this.history.forward();
	}
}


export const router = new Router('#root');
