import { getAllChats } from '../../api/repositories/messenger';
import { render } from '../../app';
import { goTo } from '../../app/router';
import { messageValidation } from '../../app/validation';
import {
  Dialog, Input, Label, Link, Title,
} from '../../components';
import { Button } from '../../components/Button';
import {
  IDialog, IInput, ILabel, ILink, ITitle,
} from '../../interfaces';
import { IButton } from '../../interfaces/IButton';
import { getChats } from '../../utils/chatSelector';
import { hideContent } from '../../utils/hideContent';
import { renderNavbar } from '../../utils/renderNavbar';
import { view } from './view';

export const Messenger = () => {
  const root = document.querySelector('#root');
  if (root) {
    root.insertAdjacentHTML('afterbegin', view);
  }
  const navbar = renderNavbar();
  const chatList = getChats();
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
    }
  })

  const serchInput = new Input<IInput>({
    type: 'text',
    name: 'search',
    inputClass: 'dialog-message-input',
    placeholder: 'Поиск...',
  });

  const messageInput = new Input<IInput>({
    type: 'text',
    name: 'message',
    inputClass: 'dialog-message-input',
    placeholder: 'Введите сообщение...',
    events: {
      blur: messageValidation,
      submit: messageValidation,
    },
    eventInterception: true,
  });

  const label = new Label<ILabel>({
    name: 'label',
    labelClass: 'dialog-message-label',
    label: 'Ваше сообщение',
  });

  const getChatsList = new Button<IButton>({
    id: 'getChats',
    button: 'Получить чаты',
    buttonClass: 'get-chats-button',
    type: 'button',
    events: {
      click: () => {
        getAllChats();
      }
    }
  })

  render<ITitle>('.messenger-title', title);
  render<IButton>('.dialog-title', toUser);
  render<IInput>('.dialog-search', serchInput);
  render<IInput>('.messenger-input', messageInput);
  render<ILabel>('.messenger-chat-detail', label);
  render<IButton>('.dialog-title', getChatsList);
  // TODO: убрать any
  chatList.map((item: any) => {
    const dialog = new Dialog<IDialog>(item);
    render<IDialog>('.dialogs-container', dialog);
  });

  navbar.map((item) => {
    const navLink = new Button<IButton>(item)
    render<IButton>('.navigation-panel', navLink)
  })
  return {
    hide: () => hideContent(root),
  }
}

