import { getUser, updateAvatar, updateProfile } from '../api/repositories/user';
import { IUpdateUser } from '../interfaces/IUser';

export const getUserStore = () => getUser();
export const updateUserStore = (data: IUpdateUser) => updateProfile(data);
export const updateAvatarStore = (data: FormData) => updateAvatar(data);
