import { router } from '../router';

export const goTo = (path: string) => {
  router.go(path);
};
