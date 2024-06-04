import { changePassword } from '../api/repositories/user';
import { getFormData } from '../app/formData';
import { goTo } from '../app/router';
import { IChangePassword, IUpdateUser } from '../interfaces/IUser';
import { updateAvatarStore, updateUserStore } from '../store/user';

export const useSettings = () => {
  const onChangePassword = async () => {
    const passwordForm = document.querySelector('#change-password');
    const password: IChangePassword = getFormData(passwordForm as HTMLFormElement);
    try {
      await changePassword({
        oldPassword: password.oldPassword,
        newPassword: password.newPassword,
      });
      alert('Данные обновлены');
    } catch (e) {
      alert(e);
    }
  };

  const onChangeProfile = async () => {
    const form = document.querySelector('form') as HTMLFormElement;
    const data: IUpdateUser = getFormData(form);
    try {
      await updateUserStore(data);
      alert('Данные обновлены');
    } catch (e) {
      alert(e);
    }
  };

  const onChangeAvatar = async () => {
    const form = document.querySelector('form') as HTMLFormElement;
    const data = getFormData<any>(form);
    const formData = new FormData();
    formData.append('avatar', data.avatar as unknown as string);
    try {
      await updateAvatarStore(formData);
      goTo('/profile');
      alert('Аватар обновлен');
    } catch (e) {
      alert(e);
    }
  };

  const resetForm = () => {
    const form = document.querySelector('form') as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };

  return {
    onChangePassword,
    onChangeProfile,
    onChangeAvatar,
    resetForm,
  };
};
