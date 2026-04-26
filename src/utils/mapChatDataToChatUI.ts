import type {ChatData, ChatUI} from "../types/chats";

export const mapChatDataToChatUI = (chat: ChatData): ChatUI => ({
  id: chat.id,
  title: chat.title,
  avatar: chat.avatar,
  unread: chat.unread_count,
  message: chat.last_message?.content ?? '',
  time: chat.last_message?.time ?? '',
  active: false,
});
