export interface ChatMessage {
  id: string;
  content: string;
  time: string;
  isMine: boolean;
}

export interface Chat {
  id: string;
  title: string;
  message: string;
  time: string;
  active: boolean;
  unread?: number;
  avatar?: string;
  messages: ChatMessage[];
}
