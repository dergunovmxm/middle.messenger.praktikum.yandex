import { ICreateUser, ILoginUser } from '../../interfaces/IUser';
import { service } from '../fetch';
import { URL } from '../url';

export const signUp = (data: ICreateUser) => {
  const response = service.post(`${URL}/auth/signup`, {
    data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then((data) => data);
  return response;
};

export const signIn = (data: ILoginUser) => {
  const response = service.post(`${URL}/auth/signin`, {
    data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
  return response;
};

export const signOut = () => {
  const response = service.post(`${URL}/auth/logout`, {});
  return response;
};
