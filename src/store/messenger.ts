import {
  addUserToChat, createChat, deleteChat, deleteUserFromChat, getAllChats, getChatById,
} from '../api/repositories/messenger';

export const getAllChatsStore = () => getAllChats().then((chats) => chats);
export const getChatByIdStore = (id: number) => getChatById(id);
export const createChatStore = (title: string) => createChat(title);
export const deleteChatStore = (chatId: number) => deleteChat(chatId);
export const addUserToChatStore = (users: number[], chatId: number) => addUserToChat(users, chatId);
export const deleteUserFromChatStore = (users: number[], chatId: number) => deleteUserFromChat(users, chatId);
