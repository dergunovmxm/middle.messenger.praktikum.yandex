import { WS_URL } from './url';

export const createSocket = (userId: number, chatId: number, token: string) => new WebSocket(`${WS_URL}/chats/${userId}/${chatId}/${token}`);
