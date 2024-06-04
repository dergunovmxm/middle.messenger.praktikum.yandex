import { createSocket } from '../api/websocket';

export const createWSStore = (userId: number, chatId: number, token: string) => createSocket(userId, chatId, token);

export const callWSStore = (socket: WebSocket) => {
  socket.addEventListener('open', () => {
    console.log('Соединение установлено');
    socket.send(JSON.stringify({
      type: 'ping',
      content: 'ping',
    }));
  });

  socket.addEventListener('close', (event) => {
    if (event.wasClean) {
      console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
    } else {
      console.log('[close] Обрыв соединения');
    }
    console.log(`[close] Код=${event.code} причина=${event.reason}`);
  });

  socket.addEventListener('message', (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log('[message] Данные получены', data);
    } catch (e) {
      alert(e);
    }
  });

  socket.addEventListener('error', (event) => {
    console.log(`[error] Ошибка ${event}`);
  });
};
