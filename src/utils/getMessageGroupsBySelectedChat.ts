import type {objectType} from '../types/objectType';
import type {ChatMessageUI, MessageGroup, MessagesByChatId} from '../types/messages';
import type {User} from '../types/user';
import {formatMessageDate, formatMessageTime, getMessageDateKey} from '../services/formats/formatMessage';
import {sanitizeUserContent} from "./sanitaizeFunctions";

export function getMessageGroupsBySelectedChat(state: objectType): MessageGroup[] {
  const selectedChatId = state.selectedChatId as number | undefined;

  if (!selectedChatId) {
    return [];
  }

  const messagesByChatId =
    (state.messagesByChatId as MessagesByChatId | undefined) ?? {};
  const user = state.user as User | null | undefined;

  const messages = [...(messagesByChatId[selectedChatId] ?? [])].sort(
    (firstMessage, secondMessage) =>
      new Date(firstMessage.time).getTime() -
      new Date(secondMessage.time).getTime(),
  );

  const groups: MessageGroup[] = [];

  let currentDateKey = '';
  let currentGroup: MessageGroup | null = null;

  messages.forEach((message) => {
    const messageDateKey = getMessageDateKey(message.time);

    if (messageDateKey !== currentDateKey) {
      currentDateKey = messageDateKey;

      currentGroup = {
        date: formatMessageDate(message.time),
        messages: [],
      };

      groups.push(currentGroup);
    }

    const messageUI: ChatMessageUI = {
      ...message,
      content:sanitizeUserContent(message.content),
      time: formatMessageTime(message.time),
      isMine: Number(message.user_id) === user?.id,
    };

    currentGroup?.messages.push(messageUI);
  });

  return groups;
}
