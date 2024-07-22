import { Link, Title } from '../../components';
import { render } from '../../app';
import { ILink, ITitle } from '../../interfaces';
import { hideContent } from '../../utils/hideContent';
import { view } from './view';
import { renderNavbar } from '../../utils/renderNavbar';
import { Button } from '../../components/Button';
import { IButton } from '../../interfaces/IButton';

export const NotFound = () => {
  const root = document.querySelector('#root');
  if (root) {
    root.insertAdjacentHTML('afterbegin', view);
  }
  const navbar = renderNavbar();
  const title = new Title<ITitle>({
    title: 'Страница не найдена',
  });

  const link = new Link<ILink>({
    id: 'link',
    link: 'Назад к чатам',
    href: '/pages/Messenger/index.html',
    linkClass: 'not-found-link',
  });

  render('.not-found-container', title);
  render('.not-found-container', link);

  navbar.map((item) => {
    const navLink = new Button<IButton>(item);
    render<IButton>('.navigation-panel', navLink);
  });
  return {
    hide: hideContent(root),
  };
};
