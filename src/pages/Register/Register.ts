import {
  Input, Label, Link, Title,
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
  title: 'Регистрация',
});

const firstNameLabel = new Label<ILabel>({
  name: 'first_name',
  labelClass: 'register-form-label',
  label: 'Имя',
});

const firstName = new Input<IInput>({
  type: 'text',
  name: 'first_name',
  inputClass: 'register-form-input',
  events: {
    blur: nameValidation,
    submit: nameValidation,
  },
  eventInterception: true,
});

const lastNameLabel = new Label<ILabel>({
  name: 'second_name',
  labelClass: 'register-form-label',
  label: 'Фамилия',
});

const lastName = new Input<IInput>({
  type: 'text',
  name: 'second_name',
  inputClass: 'register-form-input',
  events: {
    blur: nameValidation,
    submit: nameValidation,
  },
  eventInterception: true,
});

const loginLabel = new Label<ILabel>({
  name: 'login',
  labelClass: 'register-form-label',
  label: 'Логин',
});

const login = new Input<IInput>({
  type: 'text',
  name: 'login',
  inputClass: 'register-form-input',
  events: {
    blur: loginValidation,
    submit: loginValidation,
  },
  eventInterception: true,
});

const emailLabel = new Label<ILabel>({
  name: 'email',
  labelClass: 'register-form-label',
  label: 'Эл.почта',
});

const email = new Input<IInput>({
  type: 'text',
  name: 'email',
  inputClass: 'register-form-input',
  events: {
    blur: emailValidation,
    submit: emailValidation,
  },
  eventInterception: true,
});

const passwordLabel = new Label<ILabel>({
  name: 'password',
  labelClass: 'register-form-label',
  label: 'Пароль',
});

const password = new Input<IInput>({
  type: 'password',
  name: 'password',
  inputClass: 'register-form-input',
  events: {
    blur: passwordValidation,
    submit: passwordValidation,
  },
  eventInterception: true,
});

const phoneLabel = new Label<ILabel>({
  name: 'phone',
  labelClass: 'register-form-label',
  label: 'Телефон',
});

const phone = new Input<IInput>({
  type: 'phone',
  name: 'phone',
  inputClass: 'register-form-input',
});

const toAuth = new Link<ILink>({
  id: 'auth',
  link: 'Войти',
  href: '../Auth/index.html',
});

const toAuthLabel = new Label<ILabel>({
  name: 'to-auth',
  labelClass: 'register-form-label',
  label: 'Уже есть аккаунт?',
});

const register = new Link<ILink>({
  id: 'register',
  link: 'Регистранция',
  // href: "../Auth/index.html",
  linkClass: 'register-button',
  events: {
    click: formData,
  },
});

render('.title-container', title);
render('.firstname-container', firstNameLabel);
render('.firstname-container', firstName);
render('.lastname-container', lastNameLabel);
render('.lastname-container', lastName);
render('.login-container', loginLabel);
render('.login-container', login);
render('.email-container', emailLabel);
render('.email-container', email);
render('.password-container', passwordLabel);
render('.password-container', password);
render('.phone-container', phoneLabel);
render('.phone-container', phone);
render('.link-container', toAuthLabel);
render('.link-container', toAuth);
render('.button-container', register);
