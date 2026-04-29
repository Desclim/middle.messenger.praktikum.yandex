import ChatsAPI from '../api/ChatsAPI';
import store from '../core/Store/Store';
import type {ChatMessage, MessagesByChatId} from '../types/messages';
import type {User} from '../types/user';

const WS_BASE_URL = 'wss://ya-praktikum.tech/ws/chats';
const PING_INTERVAL = 10000;

type ServiceMessage = {
  type: 'pong' | 'user connected';
  content?: string;
};

type SendMessageData = {
  type: 'message';
  content: string;
} | {
  type: 'get old';
  content: string;
} | {
  type: 'ping';
};

class MessagesController {
  private socket: WebSocket | null = null;

  private currentChatId: number | null = null;

  private pingInterval: ReturnType<typeof setInterval> | null = null;

  public async connect(chatId: number): Promise<void> {
    this.close();

    const user = store.getState().user as User | null | undefined;

    if (!user?.id) {
      console.error('ws: Не найден id пользователя');
      return;
    }

    try {
      const {token} = await ChatsAPI.getToken(chatId);

      this.currentChatId = chatId;

      const socketUrl = `${WS_BASE_URL}/${user.id}/${chatId}/${token}`;

      this.socket = new WebSocket(socketUrl);

      this.socket.addEventListener('open', this.handleOpen);
      this.socket.addEventListener('message', this.handleMessage);
      this.socket.addEventListener('error', this.handleError);
      this.socket.addEventListener('close', this.handleClose);
    } catch (error) {
      console.error('ws: Ошибка подключения', error);
    }
  }

  public sendMessage(chatId: number, content: string): void {
    if (chatId !== this.currentChatId) {
      console.error('ws: Нельзя отправить сообщение не в текущий чат');
      return;
    }

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      return;
    }

    this.send({
      type: 'message',
      content: trimmedContent,
    });
  }

  public getOldMessages(): void {
    this.send({
      type: 'get old',
      content: '0',
    });
  }

  public close(): void {
    this.stopPing();

    if (!this.socket) {
      this.currentChatId = null;
      return;
    }

    this.socket.removeEventListener('open', this.handleOpen);
    this.socket.removeEventListener('message', this.handleMessage);
    this.socket.removeEventListener('error', this.handleError);
    this.socket.removeEventListener('close', this.handleClose);

    if (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING) {
      this.socket.close(1000, 'Закрытие соединения');
    }

    this.socket = null;
    this.currentChatId = null;
  }

  public closeAll(): void {
    this.close();
  }

  private send(data: SendMessageData): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error('ws: Соединение не установлено');
      return;
    }

    this.socket.send(JSON.stringify(data));
  }

  private handleOpen = (): void => {
    this.startPing();
    this.getOldMessages();
  };

  private handleMessage = (event: MessageEvent): void => {
    if (!this.currentChatId) {
      return;
    }

    try {
      const data = JSON.parse(event.data) as | ChatMessage | ChatMessage[] | ServiceMessage;

      if (Array.isArray(data)) {
        this.addMessages(this.currentChatId, data.reverse());
        return;
      }

      if (data.type === 'pong' || data.type === 'user connected') {
        return;
      }

      if (data.type === 'message') {
        this.addMessages(this.currentChatId, [data]);
      }
    } catch (error) {
      console.error('ws: Не удалось обработать сообщение', error);
    }
  };

  private handleError = (event: Event): void => {
    console.error('ws: Ошибка', event);
  };

  private handleClose = (event: CloseEvent): void => {
    this.stopPing();

    if (!event.wasClean) {
      console.error('ws: Соединение оборвано');
    }
  };

  private addMessages(chatId: number, newMessages: ChatMessage[]): void {
    if (newMessages.length === 0) {
      return;
    }

    const messagesByChatId =
      (store.getState().messagesByChatId as MessagesByChatId | undefined) ?? {};

    const currentMessages = messagesByChatId[chatId] ?? [];

    const messagesMap = new Map<string, ChatMessage>();

    [...currentMessages, ...newMessages].forEach((message) => {
      messagesMap.set(String(message.id), message);
    });

    const messages = Array.from(messagesMap.values()).sort(
      (firstMessage, secondMessage) =>
        new Date(firstMessage.time).getTime() -
        new Date(secondMessage.time).getTime(),
    );

    store.setState('messagesByChatId', {
      ...messagesByChatId,
      [chatId]: messages,
    });
  }

  private startPing(): void {
    this.stopPing();

    this.pingInterval = setInterval(() => {
      this.send({
        type: 'ping',
      });
    }, PING_INTERVAL);
  }

  private stopPing(): void {
    if (!this.pingInterval) {
      return;
    }

    clearInterval(this.pingInterval);
    this.pingInterval = null;
  }
}

export default new MessagesController();
