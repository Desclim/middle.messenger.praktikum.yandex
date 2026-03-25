import Block, {type BlockOwnProps} from '../../core/Block';
import template from './chats.hbs?raw';
import './chats.scss';
import type {Chat} from './type';
import {chatsMock} from '../../mocks/mockChats';
import {getComponentByName} from "../../utils/getComponentByName";
import {Search} from "../../components/search/search";

interface ChatsPageProps extends BlockOwnProps {
  chats: Chat[];
  selectedChat: Chat | null;
}

export class ChatsPage extends Block<ChatsPageProps> {
  static componentName = 'ChatsPage';
  protected template = template;

  constructor() {
    const initialChats = chatsMock.map((chat) => ({
      ...chat,
      active: false,
    }));

    super({
      chats: initialChats,
      selectedChat: null,
    });
  }

  protected events = {
    click: (event: Event) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const chatItem = target.closest('[data-chat-id]');

      if (!(chatItem instanceof HTMLElement)) {
        return;
      }

      event.preventDefault();

      const chatId = chatItem.dataset.chatId;

      if (!chatId) {
        return;
      }

      const updatedChats = this.props.chats.map((chat) => ({
        ...chat,
        active: chat.id === chatId,
      }));

      const selectedChat =
        updatedChats.find((chat) => chat.id === chatId) ?? null;

      this.setProps({
        chats: updatedChats,
        selectedChat,
      });
    },
    input: () => {
      const searchInput = getComponentByName(this.children, Search, 'search')
      if (!searchInput) {
        return
      }

      console.log({search: searchInput.getValue()})
    }
  };
}
