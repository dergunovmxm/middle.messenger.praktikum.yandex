import { getChatById } from '../api/repositories/messenger';
import { render } from '../app';
import { getFormData } from '../app/formData';
import { Dialog, DialogUserItem, Label } from '../components';
import { Message } from '../components/Message';
import { IDialog, ILabel, IMessage } from '../interfaces';
import { IDialogUserItem } from '../interfaces/IDialog';
import { renderDialog } from '../pages/Messenger/Dialog';
import {
  addUserToChatStore, createChatStore, deleteUserFromChatStore, getAllChatsStore, getChatsUsersStore,
} from '../store/messenger';
import { getUserStore } from '../store/user';
import { callWSStore, createWSStore } from '../store/websocket';

export const useMessenger = () => {
  const formMessage = document.querySelector('.messenger-input') as HTMLFormElement;
  const formAddToChat = document.querySelector('.messenger-add-user') as HTMLFormElement;
  const getUserForChat = async () => {
    const user = await getUserStore();
    return user;
  };

  const getChatList = async () => {
    const chatList = await getAllChatsStore();
    return chatList;
  };

  const getChatUsers = async (chatId: number) => {
    const chatUsers = await getChatsUsersStore(chatId);
    return chatUsers;
  };

  const sendMessage = (socket: WebSocket) => () => {
    const data = getFormData<any>(formMessage as HTMLFormElement);

    socket.send(JSON.stringify({
      content: data.message,
      type: 'message',
    }));
    try {
      const message = new Message<IMessage>({

        mClass: 'message',
        message: data.message,
      });
      render<IMessage>(".messenger-chat-detail", message);
    } catch (e) {
      alert('Не удалось отправить сообщение');
    }
    formMessage?.reset();
  };

  const onAddToChat = (chatId: number) => async () => {
    const list = document.querySelector('.messenger-chat-list-items');
    if (list) {
      list.textContent = '';
    }
    if (formAddToChat) {
      const { addUser } = getFormData<{ addUser: string }>(formAddToChat as HTMLFormElement);
      try {
        await addUserToChatStore([Number(addUser)], chatId);
        const chatUsers = await getChatUsers(chatId);
        chatUsers.map((user: any) => {
          const userItem = new DialogUserItem<IDialogUserItem>({
            login: user.login,
            className: 'user-item-container',
            src: '../assets/delete.svg',
            events: {
              click: onDeleteFromChat(user.id, chatId),
            },
          });
          render<IDialogUserItem>('.messenger-chat-list-items', userItem);
        });

        alert('Пользователь добавлен в чат');
      } catch (e) {
        alert('Не удалось добавить пользователя в чат');
      }
    }
  };
  // TODO: убрать any
  const onClickChat = (id: number, title: string) => async (e: Event) => {
    e.preventDefault();
    const user: any = await getUserForChat();
    const token = await getChatById(id);
    const socket = await createWSStore(user.id, id, token);
    callWSStore(socket);
    renderDialog(sendMessage(socket), title, onAddToChat(id), id);
  };

  const onCreateChat = async (e: Event) => {
    e.preventDefault();
    const input = document.querySelector('.dialog-create input') as HTMLInputElement;
    const title = input.value;
    try {
      const id = await createChatStore(title);
      const dialog = new Dialog<IDialog>({
        title,
        className: 'dialog-container',
        events: {
          click: onClickChat(id, title),
        },
      });
      render<IDialog>('.dialogs-container', dialog);
      input.value = '';
    } catch (e) {
      alert('Не удалось создать чат');
    }
  };

  const onDeleteFromChat = (userId: number, chatId: number) => async (e: Event) => {
    e.preventDefault();
    const list = document.querySelector('.messenger-chat-list-items');
    const form = document.querySelector('dialog-message-input') as HTMLFormElement;
    if (list) {
      list.textContent = '';
    }
    try {
      deleteUserFromChatStore([userId], chatId);

      const chatUsers = await getChatUsers(chatId);
      await alert('Пользователь удален из чата');
      await chatUsers.map((user: any) => {
        const userItem = new DialogUserItem<IDialogUserItem>({
          login: user.login,
          className: 'user-item-container',
          src: '../assets/delete.svg',
          events: {
            click: onDeleteFromChat(user.id, chatId),
          },
        });
        render<IDialogUserItem>('.messenger-chat-list-items', userItem);
      });

      form.reset();
    } catch (e) {
      alert('Не удалось удалить пользователя');
    }
  };

  return {
    getUserForChat,
    getChatList,
    getChatUsers,
    onCreateChat,
    onClickChat,
    onDeleteFromChat,
    sendMessage,
  };
};
