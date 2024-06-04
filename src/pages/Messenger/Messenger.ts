import { getAllChats } from '../../api/repositories/messenger';
import { render } from '../../app';
import { goTo } from '../../app/router';
import { messageValidation } from '../../app/validation';
import {
  Dialog, Input, Label, Title,
} from '../../components';
import { Button } from '../../components/Button';
import { useMessenger } from '../../hooks/useMessenger';
import {
  IDialog, IInput, ILabel, ITitle,
} from '../../interfaces';
import { IButton } from '../../interfaces/IButton';
import { hideContent } from '../../utils/hideContent';
import { renderNavbar } from '../../utils/renderNavbar';
import { view } from './view';

export const Messenger = () => {
  const root = document.querySelector('#root');
  const { onCreateChat } = useMessenger();
  if (root) {
    root.insertAdjacentHTML('afterbegin', view);
  }
  const navbar = renderNavbar();
  const { getChatList, onClickChat } = useMessenger()

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

  const sendButton = new Button<IButton>({
    id: 'send',
    button: 'Отправить',
    buttonClass: 'send-button',
    type: 'button',
    events: {
      click: () => {
        console.log('send');
      }
    }
  })

  const addUserButton = new Button<IButton>({
    id: 'addUserToChat',
    button: 'Добавить',
    buttonClass: 'add-user-to-chat-button',
    type: 'button',
    events: {
      click: onCreateChat
    }
  })

  const addUserInput = new Input<IInput>({
    type: 'text',
    name: 'addUser',
    inputClass: 'add-user-to-chat-input',
    placeholder: 'Введите название чата',
  });

  render<ITitle>('.messenger-title', title);
  render<IButton>('.dialog-title', toUser);
  render<IInput>('.dialog-search', serchInput);
  render<IInput>('.messenger-input', messageInput);
  render<ILabel>('.messenger-chat-detail', label);
  render<IButton>('.messenger-input', sendButton);
  render<IInput>('.dialog-create', addUserInput);
  render<IButton>('.dialog-create', addUserButton);

  getChatList().then((chatList) => chatList.map((item: IDialogItem) => {
    const dialog = new Dialog<IDialog>({
      title: item.title,
      className: 'dialog-container',
      events: {
        click: onClickChat(item?.id, item.title)
      }
    });
    render<IDialog>('.dialogs-container', dialog);
  }));

  navbar.map((item) => {
    const navLink = new Button<IButton>(item)
    render<IButton>('.navigation-panel', navLink)
  })
  return {
    hide: hideContent(root),
  }
}

