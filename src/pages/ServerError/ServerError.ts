import { Title } from '../../components';
import { render } from '../../app';
import { ITitle } from '../../interfaces';
import { hideContent } from '../../utils/hideContent';
import { view } from './view';
import { renderNavbar } from '../../utils/renderNavbar';
import { IButton } from '../../interfaces/IButton';
import { Button } from '../../components/Button';

export const ServerError = () => {

  const navbar = renderNavbar()
  const root = document.querySelector('#root');
  if (root) {
    root.insertAdjacentHTML('afterbegin', view);
  }
  const title = new Title<ITitle>({
    title: 'Ошибка сервера',
  });

  navbar.map((item) => {
    const navLink = new Button<IButton>(item)
    render<IButton>('.navigation-panel', navLink)
  })

  render<ITitle>('.server-error-container', title);


  return {
    hide: () => hideContent(root),
  }
}
