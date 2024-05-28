import { Route } from "../router";
export const selectStylesName = (route: Route) => {
	if (route._pathname === '/') {
		return '/style';
	} else if (route._pathname === '/sign-in') {
		return './pages/Auth/style';
	} else if (route._pathname === '/sign-up') {
		return './pages/Register/style';
	} else if (route._pathname === '/messenger') {
		return './pages/Messenger/style';
	} else if (route._pathname === '/profile') {
		return './pages/Profile/style';
	} else if (route._pathname === '/settings') {
		return './pages/Settings/style';
	} else if (route._pathname === '*') {
		return './pages/NotFound/style';
	} else if (route._pathname === '/server-error') {
		return './pages/ServerError/style';
	}
}