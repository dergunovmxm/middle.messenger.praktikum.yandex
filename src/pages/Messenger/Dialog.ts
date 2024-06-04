import { render } from '../../app';
import { messageValidation } from '../../app/validation';
import { Dialog, Input, Label } from '../../components';
import { Button } from '../../components/Button';
import { IDialog, IInput, ILabel } from '../../interfaces';
import { IButton } from '../../interfaces/IButton';

export const renderDialog = (onSendMessage: () => void, title: string, onAddToChat: () => void) => {
  const dialogTitle = document.querySelector('.messenger-chat-title');
  const messengerInput = document.querySelector('.messenger-input');
  const chatDetail = document.querySelector('.messenger-chat-detail');
  const addUser = document.querySelector('.messenger-add-user');
  const chatListTitle = document.querySelector('.messenger-chat-list-title');

  if (dialogTitle) {
    dialogTitle.textContent = '';
  }

  if (messengerInput) {
    messengerInput.textContent = '';
  }

  if (chatDetail) {
    chatDetail.textContent = '';
  }

  if (addUser) {
    addUser.textContent = '';
  }

  if (chatListTitle) {
    chatListTitle.textContent = '';
  }

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
  const sendButton = new Button<IButton>({
    id: 'send',
    button: 'Отправить',
    buttonClass: 'send-button',
    type: 'button',
    events: {
      click: onSendMessage,
    },
  });

  const chatTitle = new Dialog<IDialog>({
    title,
    className: 'chat-title',
  });

  const userListTitle = new Label<ILabel>({
    name: 'label',
    labelClass: 'dialog-message-label',
    label: 'Список пользователей',
  });

  const addUserButton = new Button<IButton>({
    id: 'addUserToChat',
    button: 'Добавить',
    buttonClass: 'add-user-to-chat-button',
    type: 'button',
    events: {
      click: onAddToChat,
    },
  });

  const addUserInput = new Input<IInput>({
    type: 'text',
    name: 'addUser',
    inputClass: 'dialog-message-input',
    placeholder: 'Введите id пользователя',
  });
  render<IInput>('.messenger-input', messageInput);
  render<IButton>('.messenger-input', sendButton);
  render<IDialog>('.messenger-chat-title', chatTitle);
  render<IInput>('.messenger-add-user', addUserInput);
  render<IButton>('.messenger-add-user', addUserButton);
  render<ILabel>('.messenger-chat-list-title', userListTitle);
};
