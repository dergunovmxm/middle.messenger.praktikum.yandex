import { format } from 'date-fns/format';
import { createSocket } from '../api/websocket';
import { render } from '../app';
import { Message } from '../components/Message';
import { IMessage } from '../interfaces';

export const createWSStore = (userId: number, chatId: number, token: string) => createSocket(userId, chatId, token);

export const callWSStore = (socket: WebSocket) => {
  socket.addEventListener('open', () => {
    console.log('Соединение установлено');
    socket.send(JSON.stringify({
      type: 'get old',
      content: '0',
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
      if (Array.isArray(data)) {
        data.map((el) => {
          const message = new Message<IMessage>({
            message: el.content,
            mClass: 'message',
            time: format(el.time, 'dd.MM.yyyy HH:mm'),
          });
          render<IMessage>('.messenger-chat-detail', message);
        });
        const chatDetail = document.querySelector('.messenger-chat-detail');
        if (chatDetail) {
          chatDetail.scrollTop = chatDetail.scrollHeight;
        }
      }
    } catch (event) {
      console.log(`[error] Ошибка ${event}`);
    }
  });

  socket.addEventListener('error', (event) => {
    console.log(`[error] Ошибка ${event}`);
  });
};
