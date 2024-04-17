import {
  Title, Label, Input,
} from '../../components';
import { render } from '../../app';
import {
  IInput, ILabel, ITitle,
} from '../../interfaces';

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
  label: 'Пользователь',
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
