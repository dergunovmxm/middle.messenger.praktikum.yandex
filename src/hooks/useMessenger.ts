import { format } from 'date-fns';
import { getChatById } from '../api/repositories/messenger';
import { render } from '../app';
import { getFormData } from '../app/formData';
import { Dialog, DialogUserItem } from '../components';
import imgUrl from '../../assets/delete.svg';
import { Message } from '../components/Message';
import { IDialog, IMessage } from '../interfaces';
import { IDialogUserItem } from '../interfaces/IDialog';
import { renderDialog } from '../pages/Messenger/Dialog';
import {
  addUserToChatStore, createChatStore, deleteUserFromChatStore, getAllChatsStore, getChatsUsersStore,
} from '../store/messenger';
import { getUserStore } from '../store/user';
import { callWSStore, createWSStore } from '../store/websocket';
import { IUser } from '../interfaces/IUser';

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
    const data = getFormData<{ message: string }>(formMessage as HTMLFormElement);
    if (data.message === '') {
      return;
    }
    socket.send(JSON.stringify({
      content: data.message,
      type: 'message',
    }));
    try {
      const message = new Message<IMessage>({

        mClass: 'message',
        message: data.message,
        time: format(new Date(), 'dd.MM.yyyy HH:mm'),
      });
      render<IMessage>('.messenger-chat-detail', message);
      const chatDetailElement = document.querySelector('.messenger-chat-detail') as HTMLElement;
      chatDetailElement.scrollTo(0, chatDetailElement.scrollHeight);
    } catch (e) {
      alert('Не удалось отправить сообщение');
    }
    formMessage?.reset();
  };

  const onAddToChat = (chatId: number) => async () => {
    const list = document.querySelector('.messenger-chat-list-items');
    const form = document.querySelector('.messenger-add-user') as HTMLFormElement;
    if (list) {
      list.textContent = '';
    }
    if (formAddToChat) {
      const { addUser } = getFormData<{ addUser: string }>(formAddToChat as HTMLFormElement);
      form?.reset();
      try {
        await addUserToChatStore([Number(addUser)], chatId);
        const chatUsers = await getChatUsers(chatId);
        chatUsers.map((user: IUser) => {
          const userItem = new DialogUserItem<IDialogUserItem>({
            login: user.display_name ? user.display_name : `${user.first_name} ${user.second_name}`,
            className: 'user-item-container',
            src: imgUrl,
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
  const onClickChat = (id: number, title: string) => async () => {
    const user: IUser | unknown = await getUserForChat();
    const token = await getChatById(id);
    const userId = (user as IUser).id;
    const socket = await createWSStore(userId, id, token);
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

  const onDeleteFromChat = (userId: number, chatId: number) => async () => {
    const list = document.querySelector('.messenger-chat-list-items');
    if (list) {
      list.textContent = '';
    }

    try {
      await deleteUserFromChatStore([userId], chatId);
      alert('Пользователь удален из чата');
      const chatUsers = await getChatUsers(chatId);
      chatUsers.map((user: IUser) => {
        const userItem = new DialogUserItem<IDialogUserItem>({
          login: user.display_name ? user.display_name : `${user.first_name} ${user.second_name}`,
          className: 'user-item-container',
          src: imgUrl,
          events: {
            click: onDeleteFromChat(user.id, chatId),
          },
        });
        render<IDialogUserItem>('.messenger-chat-list-items', userItem);
      });
    } catch (e) {
      alert('Не удалось удалить пользователя из чата');
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
