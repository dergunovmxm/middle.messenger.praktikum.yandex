import {
  Input, Label, Title, Link,
} from '../../components';
import { render } from '../../app';
import {
  IInput, ILabel, ILink, ITitle,
} from '../../interfaces';
import {
  emailValidation, loginValidation, nameValidation, passwordValidation,
} from '../../app/validation';
import { formData } from '../../app/formData';

const title = new Title<ITitle>({
  title: 'Настройки пользователя',
});

const firstNameLabel = new Label<ILabel>({
  name: 'first_name',
  labelClass: 'settings-form-label',
  label: 'Имя',
});

const firstName = new Input<IInput>({
  type: 'text',
  name: 'first_name',
  inputClass: 'settings-form-input',
  events: {
    blur: nameValidation,
    submit: nameValidation,
  },
  eventInterception: true,
});

const lastNameLabel = new Label<ILabel>({
  name: 'second_name',
  labelClass: 'settings-form-label',
  label: 'Фамилия',
});

const lastName = new Input<IInput>({
  type: 'text',
  name: 'second_name',
  inputClass: 'settings-form-input',
  events: {
    blur: nameValidation,
    submit: nameValidation,
  },
  eventInterception: true,
});

const loginLabel = new Label<ILabel>({
  name: 'login',
  labelClass: 'settings-form-label',
  label: 'Логин',
});

const login = new Input<IInput>({
  type: 'text',
  name: 'login',
  inputClass: 'settings-form-input',
  events: {
    blur: loginValidation,
    submit: loginValidation,
  },
  eventInterception: true,
});

const emailLabel = new Label<ILabel>({
  name: 'email',
  labelClass: 'settings-form-label',
  label: 'Эл.почта',
});

const email = new Input<IInput>({
  type: 'text',
  name: 'email',
  inputClass: 'settings-form-input',
  events: {
    blur: emailValidation,
    submit: emailValidation,
  },
  eventInterception: true,
});

const passwordLabel = new Label<ILabel>({
  name: 'password',
  labelClass: 'settings-form-label',
  label: 'Пароль',
});

const password = new Input<IInput>({
  type: 'password',
  name: 'password',
  inputClass: 'settings-form-input',
  events: {
    blur: passwordValidation,
    submit: passwordValidation,
  },
  eventInterception: true,
});

const phoneLabel = new Label<ILabel>({
  name: 'phone',
  labelClass: 'settings-form-label',
  label: 'Телефон',
});

const phone = new Input<IInput>({
  type: 'phone',
  name: 'phone',
  inputClass: 'settings-form-input',
});

const button = new Link<ILink>({
  id: 'button',
  link: 'Сохранить',
  linkClass: 'button-group',
  events: {
    click: formData,
  },
});

render<ITitle>('.title-container', title);
render<ILabel>('.firstname-container', firstNameLabel);
render<IInput>('.firstname-container', firstName);
render<ILabel>('.secondname-container', lastNameLabel);
render<IInput>('.secondname-container', lastName);
render<ILabel>('.login-container', loginLabel);
render<IInput>('.login-container', login);
render<ILabel>('.email-container', emailLabel);
render<IInput>('.email-container', email);
render<ILabel>('.password-container', passwordLabel);
render<IInput>('.password-container', password);
render<ILabel>('.phone-container', phoneLabel);
render<IInput>('.phone-container', phone);
render<ILink>('.button-container', button);
