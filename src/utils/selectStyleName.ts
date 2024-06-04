import { Route } from '../router/route';

export const selectStylesName = (route: Route) => {
  if (route._pathname === '/') {
    return '/style';
  } if (route._pathname === '/sign-in') {
    return './pages/Auth/style';
  } if (route._pathname === '/sign-up') {
    return './pages/Register/style';
  } if (route._pathname === '/messenger') {
    return './pages/Messenger/style';
  } if (route._pathname === '/profile') {
    return './pages/Profile/style';
  } if (route._pathname === '/settings') {
    return './pages/Settings/style';
  } if (route._pathname === '*') {
    return './pages/NotFound/style';
  } if (route._pathname === '/server-error') {
    return './pages/ServerError/style';
  }
};
