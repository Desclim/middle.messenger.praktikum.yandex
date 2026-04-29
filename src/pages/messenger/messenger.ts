import Block, {type BlockOwnProps} from '../../core/Component/Block';
import template from './messenger.hbs?raw';
import './messenger.scss';
import {getComponentByName} from '../../utils/getComponentByName';
import {Search} from '../../components/search/search';
import ChatsController from '../../controllers/ChatsController';
import {connect} from '../../core/Component/connect';
import type {objectType} from '../../types/objectType';
import store from '../../core/Store/Store';
import type {ChatUI} from "../../types/chats";
import type {MessageGroup} from "../../types/messages";
import MessagesController from "../../controllers/MessagesController";
import {getMessageGroupsBySelectedChat} from "../../utils/getMessageGroupsBySelectedChat";

interface MessengerPageProps extends BlockOwnProps {
  chats?: ChatUI[];
  selectedChat?: ChatUI | null;
  isCreateChatModalOpen?: boolean;
  closeCreateChatModal?: () => void;
  submitCreateChatModal?: (title: string) => Promise<void>;
  messageGroups?: MessageGroup[];
}

class MessengerPageBase extends Block<MessengerPageProps> {
  static componentName = 'MessengerPage';
  protected template = template;

  constructor(props: Partial<MessengerPageProps> = {}) {
    super({
      ...props,
      isCreateChatModalOpen: false,

      closeCreateChatModal: () => {
        this.setProps({isCreateChatModalOpen: false});
      },

      submitCreateChatModal: async (title: string) => {
        await ChatsController.createChat(title);
        await ChatsController.getChats();

        this.setProps({
          isCreateChatModalOpen: false,
        });
      },
    });
  }

  protected async componentDidMount(): Promise<void> {
    await ChatsController.getChats();
  }

  protected async componentWillUnmount(): Promise<void> {
    MessagesController.closeAll()
  }

  protected events = {
    click: (event: Event) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const createChatButton = target.closest('[name="create-chat"]');
      if (createChatButton instanceof HTMLElement) {
        this.setProps({
          isCreateChatModalOpen: true,
        });
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

      const selectedChatId = Number(chatId);

      store.setState('selectedChatId', selectedChatId);

      const storeChats: ChatUI[] = store.getState().chats as ChatUI[]
      const readCurrentChat = storeChats.map(chat => {
        if (chat.id === selectedChatId) {
          return {...chat, unread: 0}
        }
        return {...chat}
      })
      store.setState('chats', readCurrentChat);

      void MessagesController.connect(selectedChatId);
    },

    input: (event: Event) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (!target.closest('.search')) {
        return;
      }

      const searchInput = getComponentByName(this.children, Search, 'search');

      if (!searchInput) {
        return;
      }

      console.log({search: searchInput.getValue()});
    },
  };
}

const mapStateToProps = (state: objectType): Partial<MessengerPageProps> => {
  const chats = ((state.chats as ChatUI[] | undefined) ?? []).map((chat) => ({
    ...chat,
    active: chat.id === state.selectedChatId,
  }));

  const selectedChat =
    chats.find((chat) => chat.id === state.selectedChatId) ?? null;

  return {
    chats,
    selectedChat,
    messageGroups: getMessageGroupsBySelectedChat(state),
    isCreateChatModalOpen: false,
  };
};

export const MessengerPage = connect(mapStateToProps)(MessengerPageBase);
