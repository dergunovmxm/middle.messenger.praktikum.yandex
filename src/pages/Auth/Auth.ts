import {
  Input, Label, Link, Title,
} from '../../components';
import { render } from '../../app';
import {
  IInput, ITitle, ILabel, ILink,
} from '../../interfaces';
import { getFormData } from '../../app/formData';
import { loginValidation, passwordValidation } from '../../app/validation';
import { hideContent } from '../../utils/hideContent';
import { view } from './view';
import { IButton } from '../../interfaces/IButton';
import { Button } from '../../components/Button';
import { goTo } from '../../app/router';
import { renderAuthNavbar } from '../../utils/renderNavbar';
import { getUser } from '../../api/repositories/auth';
import { useAuth } from '../../hooks/useAuth';

export const Auth = () => {
  const root = document.querySelector('#root');
  if (root) {
    root.insertAdjacentHTML('afterbegin', view);
  }

  const { signin } = useAuth();

  const navbar = renderAuthNavbar()
  const title = new Title<ITitle>({
    title: 'Авторизация',
  });

  const login = new Input<IInput>({
    type: 'text',
    name: 'login',
    inputClass: 'auth-form-input',
    events: {
      blur: loginValidation,
      submit: loginValidation,
    },
    eventInterception: true,
  });

  const password = new Input<IInput>({
    type: 'password',
    name: 'password',
    inputClass: 'auth-form-input',
    events: {
      blur: passwordValidation,
      submit: passwordValidation,
    },
    eventInterception: true,
  });

  const loginLabel = new Label<ILabel>({
    name: 'login',
    labelClass: 'auth-form-label',
    label: 'Логин',
  });

  const passwordLabel = new Label<ILabel>({
    name: 'password',
    labelClass: 'auth-form-label',
    label: 'Пароль',
  });

  const toRegisterButton = new Button<IButton>({
    id: 'toRegister',
    button: 'Регистрация',
    buttonClass: 'to-registration-button',
    type: 'button',
    events: {
      click: () => goTo('/sign-up'),
    }
  })

  const user = new Button<IButton>({
    id: 'test',
    button: 'Пользователь',
    buttonClass: 'to-registration-button',
    type: 'button',
    events: {
      click: () => getUser(),
    }
  })

  const toRegistrationLabel = new Label<ILabel>({
    name: 'to-registration',
    labelClass: 'auth-form-label',
    label: 'Нет аккаунта?',
  });

  const auth = new Button<IButton>({
    id: 'auth',
    button: 'Войти',
    buttonClass: 'auth-button',
    type: 'button',
    events: {
      click: signin,
    },
  });

  render<ITitle>('.title-container', title);
  render<ILabel>('.login-container', loginLabel);
  render<IInput>('.login-container', login);
  render<ILabel>('.password-container', passwordLabel);
  render<IInput>('.password-container', password);
  render<ILabel>('.link-container', toRegistrationLabel);
  render<IButton>('.link-container', toRegisterButton);
  render<IButton>('.button-container', auth);
  render<IButton>('.link-container', user);
  navbar.map((item) => {
    const navLink = new Button<IButton>(item)
    render<IButton>('.navigation-panel', navLink)
  })
  return {
    hide: hideContent(root),
  }
}
