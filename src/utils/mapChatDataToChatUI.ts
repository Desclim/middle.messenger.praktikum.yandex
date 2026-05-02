import type {ChatData, ChatUI} from "../types/chats";
import {getAvatarUrl} from "./getAvatarUrl";
import {formatMessageFullDate} from "../services/formats/formatMessage";
import {sanitizeUserContent} from "./sanitaizeFunctions";

export const mapChatDataToChatUI = (chat: ChatData): ChatUI => ({
  id: chat.id,
  title: sanitizeUserContent(chat.title),
  avatar: getAvatarUrl(chat.avatar),
  unread: chat.unread_count,
  message: sanitizeUserContent(chat.last_message?.content ?? ''),
  time: chat.last_message?.time ? formatMessageFullDate(chat.last_message.time) :  '',
  active: false,
});
