import {
  Title, Label, Input,
} from '../../components';
import { render } from '../../app';
import {
  IInput, ILabel, ITitle,
} from '../../interfaces';
import { hideContent } from '../../utils/hideContent';
import { view } from './view';
import { renderNavbar } from '../../utils/renderNavbar';
import { IButton } from '../../interfaces/IButton';
import { Button } from '../../components/Button';
import { goTo } from '../../app/router';
import { useLogout } from '../../hooks/useLogout';
import { getProfile } from '../../hooks/useProfile';
import { IUser } from '../../interfaces/IUser';
import { getUser } from '../../api/repositories/auth';


export const Profile = () => {
  const root = document.querySelector('#root');
  const navbar = renderNavbar();
  const { logout } = useLogout();
  const { user } = getProfile();
  console.log("Profile", user);
  if (root) {
    root.insertAdjacentHTML('afterbegin', view);
  }

  const title = new Title<ITitle>({
    title: 'Профиль',
  });

  const firstNameKey = new Label<ILabel>({
    name: 'firstname-key',
    labelClass: 'profile-label',
    label: 'Имя: ',
  });

  const secondNameKey = new Label<ILabel>({
    name: 'secondname-key',
    labelClass: 'profile-label',
    label: 'Фамилия: ',
  });


  const firstname = new Label<ILabel>({
    name: 'firstname',
    labelClass: 'profile-value',
    label: 'user.first_name',
  });

  const secondname = new Label<ILabel>({
    name: 'secondname',
    labelClass: 'profile-value',
    label: 'Пользователь',
  });

  const loginKey = new Label<ILabel>({
    name: 'loginKey',
    labelClass: 'profile-value',
    label: 'Логин: ',
  });

  const login = new Label<ILabel>({
    name: 'login',
    labelClass: 'profile-value',
    label: 'Пользователь',
  });

  const emailKey = new Label<ILabel>({
    name: 'emailKey',
    labelClass: 'profile-value',
    label: 'Почта: ',
  });

  const email = new Label<ILabel>({
    name: 'email',
    labelClass: 'profile-value',
    label: 'Пользователь',
  });

  const phoneKey = new Label<ILabel>({
    name: 'phoneKey',
    labelClass: 'profile-value',
    label: 'Телефон: ',
  });

  const phone = new Label<ILabel>({
    name: 'phone',
    labelClass: 'profile-value',
    label: 'Пользователь',
  });

  const chatNameKey = new Label<ILabel>({
    name: 'chatNameKey',
    labelClass: 'profile-value',
    label: 'Имя в чате: ',
  });

  const chatName = new Label<ILabel>({
    name: 'chatName',
    labelClass: 'profile-value',
    label: 'Пользователь',
  });

  const oldPasswordKey = new Label<ILabel>({
    name: 'oldPasswordKey',
    labelClass: 'profile-value',
    label: 'Старый пароль: ',
  });

  const oldPassword = new Input<IInput>({
    type: 'password',
    name: 'oldPassword',
    inputClass: 'profile-form-input',
  });

  const newPasswordKey = new Label<ILabel>({
    name: 'oldPasswordKey',
    labelClass: 'profile-value',
    label: 'Новый пароль: ',
  });

  const newPassword = new Input<IInput>({
    type: 'password',
    name: 'newPassword',
    inputClass: 'profile-form-input',
  });

  const confirmPasswordKey = new Label<ILabel>({
    name: 'confirmPasswordKey',
    labelClass: 'profile-value',
    label: 'Подтвердите пароль: ',
  });

  const confirmPassword = new Input<IInput>({
    type: 'password',
    name: 'confirmPassword',
    inputClass: 'profile-form-input',
  });

  const logoutButton = new Button<IButton>({
    id: 'logout',
    button: 'Выход',
    buttonClass: 'profile-button',
    type: 'button',
    events: {
      click: logout
    },
  })

  const editButton = new Button<IButton>({
    id: 'edit',
    button: 'Редактировать профиль',
    buttonClass: 'profile-button',
    type: 'button',
    events: {
      click: () => goTo('/settings'),
    },
  })


  render<ITitle>('.profile-title', title);

  render<ILabel>('.firtname', firstNameKey);
  render<ILabel>('.secondname', secondNameKey);
  render<ILabel>('.firtname', firstname);
  render<ILabel>('.secondname', secondname);
  render<ILabel>('.login', loginKey);
  render<ILabel>('.login', login);
  render<ILabel>('.email', emailKey);
  render<ILabel>('.email', email);
  render<ILabel>('.phone', phoneKey);
  render<ILabel>('.phone', phone);
  render<ILabel>('.chatName', chatNameKey);
  render<ILabel>('.chatName', chatName);
  render<ILabel>('.old-password-container', oldPasswordKey);
  render<IInput>('.old-password-container', oldPassword);
  render<ILabel>('.new-password-container', newPasswordKey);
  render<IInput>('.new-password-container', newPassword);
  render<ILabel>('.confirm-password-container', confirmPasswordKey);
  render<IInput>('.confirm-password-container', confirmPassword);
  navbar.map((item) => {
    const navLink = new Button<IButton>(item)
    render<IButton>('.navigation-panel', navLink)
  })
  render<IButton>('.actions', logoutButton)
  render<IButton>('.actions', editButton)

  return {
    hide: () => hideContent(root),
  }
}


