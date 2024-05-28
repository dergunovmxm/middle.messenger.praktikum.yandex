import { Route } from "../router";
export const selectScript = (route: Route) => {
	if (route._pathname === '/') {
		return './homePage';
	} else if (route._pathname === '/sign-in') {
		return '../pages/Auth/Auth';
	} else if (route._pathname === '/sign-up') {
		return '../pages/Register/Register';
	} else if (route._pathname === '/messenger') {
		return '../pages/Messenger/Messenger';
	} else if (route._pathname === '/profile') {
		return '../pages/Profile/Profile';
	} else if (route._pathname === '/settings') {
		return '../pages/Settings/style';
	} else if (route._pathname === '*') {
		return '../pages/NotFound/style';
	} else if (route._pathname === '/server-error') {
		return '../pages/ServerError/style';
	}
}