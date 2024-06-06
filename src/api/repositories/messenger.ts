import { service } from '../fetch';
import { URL } from '../url';

export const getAllChats = () => {
  const response = service.get(`${URL}/chats`, {
    data: {},
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then((data: any) => data);
  return response;
};

export const getChatsUsers = (chatId: number) => {
  const response = service.get(`${URL}/chats/${chatId}/users`, {
    data: {
      chatId,
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then((data: any) => data);
  return response;
};

export const getChatById = (id: number) => {
  const response = service.post(`${URL}/chats/token/${id}`, {
    data: {},
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then((data: { token: string }) => data.token);
  return response;
};

export const createChat = (title: string) => {
  const response = service.post(`${URL}/chats`, {
    data: {
      title,
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then((data: { id: number }) => data.id);
  return response;
};

export const deleteChat = (chatId: number) => {
  const response = service.delete(`${URL}/chats`, {
    data: {
      chatId: chatId || 0,
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then((data) => data);

  return response;
};

export const addUserToChat = (users: number[], chatId: number) => {
  const response = service.put(`${URL}/chats/users`, {
    data: {
      users,
      chatId,
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then((data) => data);

  return response;
};

export const deleteUserFromChat = (users: number[], chatId: number) => {
  const response = service.delete(`${URL}/chats/users`, {
    data: {
      users,
      chatId,
    },
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then((data) => data);

  return response;
};
