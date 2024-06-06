import { getChatById } from '../api/repositories/messenger';
import { render } from '../app';
import { getFormData } from '../app/formData';
import { Dialog, DialogUserItem } from '../components';
import { IDialog } from '../interfaces';
import { IMessage } from '../interfaces/IChat';
import { IDialogItem, IDialogUserItem } from '../interfaces/IDialog';
import { renderDialog } from '../pages/Messenger/Dialog';
import { addUserToChatStore, createChatStore, deleteUserFromChatStore, getAllChatsStore, getChatsUsersStore } from '../store/messenger';
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
    console.log(data);
    socket.send(JSON.stringify({
      content: data.message,
      type: 'message',
    }));
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
        const chatUsers = await getChatUsers(chatId)
        chatUsers.map((user: any) => {
          const userItem = new DialogUserItem<IDialogUserItem>({
            login: user.login,
            className: 'user-item-container',
            src: '../assets/delete.svg',
            events: {
              click: onDeleteFromChat(user.id, chatId),
            }
          });
          render<IDialogUserItem>(`.messenger-chat-list-items`, userItem);
        })

        alert('Пользователь добавлен в чат');
      } catch (e) {
        alert('Не удалось добавить пользователя в чат');
      }
    }
  };
  // TODO: убрать any
  const onClickChat = (id: number, title: string) => async () => {
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


  const onDeleteFromChat = (userId: number, chatId: number) => async (event: Event) => {
    const item = document.querySelector('.user-item-container');
    const icon = document.querySelector('#delete');
    const list = document.querySelector('.messenger-chat-list-items');
    const chats = document.querySelector('.dialogs-container');
    if (list) {
      list.textContent = '';
    }
    try {
      deleteUserFromChatStore([userId], chatId)
      const chatUsers = await getChatUsers(chatId)
      chatUsers.map((user: any) => {
        const userItem = new DialogUserItem<IDialogUserItem>({
          login: user.login,
          className: 'user-item-container',
          src: '../assets/delete.svg',
          events: {
            click: onDeleteFromChat(user.id, chatId),
          }
        });
        render<IDialogUserItem>(`.messenger-chat-list-items`, userItem);
      })

      alert('Пользователь удален из чата');
    } catch (e) {
      alert('Не удалось удалить пользователя');
    }
  }

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
