export interface CreateChatRequest {
  title: string;
}

export interface ChatUsersRequest {
  users: number[];
  chatId: number;
}

export interface ChatData {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  last_message: LastMessage | null;
}

export interface LastMessage {
  user: ChatUser;
  time: string;
  content: string;
}

export interface ChatUser {
  first_name: string;
  second_name: string;
  avatar: string | null;
  email: string;
  login: string;
  phone: string;
}

export interface ChatUI {
  id: number;
  title: string;
  avatar: string | null;
  unread: number;
  message: string;
  time: string;
  active: boolean;
}
