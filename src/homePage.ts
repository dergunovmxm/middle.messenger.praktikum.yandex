import { render } from './app/render';
import { goTo } from './app/router';
import { Title } from './components';
import { Button } from './components/Button';
import { ITitle } from './interfaces';
import { IButton } from './interfaces/IButton';

export const HomePage = () => {
  const root = document.querySelector('#root');
  const button = new Button<IButton>({
    id: 'auth',
    button: 'Войти в систему',
    buttonClass: 'auth-button',
    type: 'button',
    events: {
      click: () => goTo('/sign-in'),
    },
  });

  const title = new Title<ITitle>({
    title: 'Добро пожаловать в мессенджер',
  });

  const goToAuth = new Title<ITitle>({
    title: 'Необходима авторизация',
  });

  if (root) {
    render<ITitle>('.root-container', title);
    render<ITitle>('.root-container', goToAuth);
    render<IButton>('.root-container', button);
  }

  const hide = () => {
    if (root) {
      root.textContent = '';
    }
  };

  return {
    hide,
  };
};
