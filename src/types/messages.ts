export type ChatMessageType = 'message';

export interface ChatMessage {
  id: number | string;
  chat_id?: number;
  time: string;
  type: ChatMessageType;
  user_id: number | string;
  content: string;
}

export interface ChatMessageUI extends ChatMessage {
  isMine: boolean;
}

export interface MessageGroup {
  date: string;
  messages: ChatMessageUI[];
}

export type MessagesByChatId = Record<number, ChatMessage[]>;
