import { signIn } from '../api/repositories/auth';
import { getFormData } from '../app/formData';
import { goTo } from '../app/router';
import { ILoginUser } from '../interfaces/IUser';

export const useAuth = () => {
  const signin = async () => {
    const form = document.querySelector('#auth-form');
    const data = getFormData<ILoginUser>(form as HTMLFormElement);
    try {
      await signIn(data);
      await goTo('/messenger');
    } catch (e) {
      const error = JSON.parse(e);
      if (error.reason && error.reason.includes('User already in system')) {
        goTo('/messenger');
      } else {
        alert(e);
      }
    }
  };
  return {
    signin,
  };
};
