import { createSocket } from "../api/websocket";


export const createWSStore = (userId: number, chatId: number, token: string) => createSocket(userId, chatId, token)