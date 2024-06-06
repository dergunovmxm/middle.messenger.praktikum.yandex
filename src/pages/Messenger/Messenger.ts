import { render } from '../../app';
import { goTo } from '../../app/router';
import {
  Dialog, Input, Label, Title,
} from '../../components';
import { Button } from '../../components/Button';
import { useMessenger } from '../../hooks/useMessenger';
import {
  IDialog, IInput, ILabel, ITitle,
} from '../../interfaces';
import { IButton } from '../../interfaces/IButton';
import { IDialogItem } from '../../interfaces/IDialog';
import { hideContent } from '../../utils/hideContent';
import { renderNavbar } from '../../utils/renderNavbar';
import { view } from './view';

export const Messenger = () => {
  const root = document.querySelector('#root');
  if (root) {
    root.insertAdjacentHTML('afterbegin', view);
  }
  const navbar = renderNavbar();
  const { getChatList, onClickChat, onCreateChat } = useMessenger();

  const title = new Title<ITitle>({
    title: 'Мессенджер',
  });

  const toUser = new Button<IButton>({
    id: 'toAuth',
    button: 'Профиль',
    buttonClass: 'to-user-button',
    type: 'button',
    events: {
      click: () => goTo('/profile'),
    },
  });

  const serchInput = new Input<IInput>({
    type: 'text',
    name: 'search',
    inputClass: 'dialog-message-input',
    placeholder: 'Поиск...',
  });

  const label = new Label<ILabel>({
    name: 'label',
    labelClass: 'dialog-message-label',
    label: 'Начните диалог',
  });

  const addUserButton = new Button<IButton>({
    id: 'addUserToChat',
    button: 'Добавить',
    buttonClass: 'add-user-to-chat-button',
    type: 'button',
    events: {
      click: (e: Event) => onCreateChat(e),
    },
  });

  const addUserInput = new Input<IInput>({
    type: 'text',
    name: 'addUser',
    inputClass: 'add-user-to-chat-input',
    placeholder: 'Введите название чата',
  });

  const userListTitle = new Label<ILabel>({
    name: 'label',
    labelClass: 'dialog-message-label',
    label: 'Список пользователей',
  });

  render<ILabel>('.messenger-chat-list-title', userListTitle);
  render<ITitle>('.messenger-title', title);
  render<IButton>('.dialog-title', toUser);
  render<IInput>('.dialog-search', serchInput);
  render<ILabel>('.messenger-chat-detail', label);
  render<IInput>('.dialog-create', addUserInput);
  render<IButton>('.dialog-create', addUserButton);

  getChatList().then((chatList) => chatList.map((item: IDialogItem) => {
    const dialog = new Dialog<IDialog>({
      title: item.title,
      className: 'dialog-container',
      events: {
        click: onClickChat(item?.id, item.title),
      },
    });
    render<IDialog>('.dialogs-container', dialog);
  }));

  navbar.map((item) => {
    const navLink = new Button<IButton>(item);
    render<IButton>('.navigation-panel', navLink);
  });
  return {
    hide: hideContent(root),
  };
};
