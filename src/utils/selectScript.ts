import { Route } from '../router/route';

export const selectScript = (route: Route) => {
  if (route._pathname === '/') {
    return './homePage';
  } if (route._pathname === '/sign-in') {
    return '../pages/Auth/Auth';
  } if (route._pathname === '/sign-up') {
    return '../pages/Register/Register';
  } if (route._pathname === '/messenger') {
    return '../pages/Messenger/Messenger';
  } if (route._pathname === '/profile') {
    return '../pages/Profile/Profile';
  } if (route._pathname === '/settings') {
    return '../pages/Settings/style';
  } if (route._pathname === '*') {
    return '../pages/NotFound/style';
  } if (route._pathname === '/server-error') {
    return '../pages/ServerError/style';
  }
};
