import { getUserStore } from '../store/user';

export const useProfile = () => {
  const getProfile = async () => {
    const user = await getUserStore();
    return user;
  };
  return {
    getProfile,
  };
};
