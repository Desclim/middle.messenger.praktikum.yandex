import Block, {type BlockOwnProps} from '../../core/Component/Block';
import template from './messenger-content.hbs?raw';
import './messenger-content.scss';
import type {ContextMenuItem} from '../../components/context-menu/context-menu';
import {PostMessage} from '../../components/post-message/post-message';
import {getComponentByName} from '../../utils/getComponentByName';
import UsersController from '../../controllers/UsersController';
import ChatsController from '../../controllers/ChatsController';
import type {ChatUI} from "../../types/chats";
import type {MessageGroup} from "../../types/messages";
import MessagesController from "../../controllers/MessagesController";

type UserActionType = 'add-user' | 'remove-user';

interface ChatContentProps extends BlockOwnProps {
  selectedChat: ChatUI | null;
  menuItems?: ContextMenuItem[];
  isUserActionModalOpen: boolean;
  userActionType: UserActionType;
  userActionTitle: string;
  userActionButtonText: string;
  closeUserActionModal?: () => void;
  submitUserActionModal?: (login: string) => Promise<void>;
  messageGroups?: MessageGroup[];
}

export class MessengerContent extends Block<ChatContentProps> {
  static componentName = 'MessengerContent';
  protected template = template;
  constructor(props: ChatContentProps) {
    super({
      ...props,
      menuItems: [
        {label: 'Добавить пользователя', action: 'add-user', icon: '/icons/icon-add.svg'},
        {label: 'Удалить пользователя', action: 'remove-user', icon: '/icons/icon-delete.svg'},
      ],

      isUserActionModalOpen: false,
      userActionType: 'add-user',
      userActionTitle: 'Добавить пользователя',
      userActionButtonText: 'Добавить',

      closeUserActionModal: () => {
        this.setProps({isUserActionModalOpen: false});
      },

      submitUserActionModal: async (login: string) => {
        if (!this.props.selectedChat) {
          throw new Error('Чат не выбран');
        }

        const users = await UsersController.searchByLogin(login);

        if (!Array.isArray(users) || users.length === 0) {
          throw new Error('Пользователь не найден');
        }
        const userId = users[0].id;
        const chatId = Number(this.props.selectedChat.id);

        if (this.props.userActionType === 'add-user') {
          await ChatsController.addUsersToChat([userId], chatId);
        } else {
          await ChatsController.removeUsersFromChat([userId], chatId);
        }

        await ChatsController.getChats();
      },
    });
  }

  protected componentDidMount(): void {
    this.scrollToBottom();
  }

  protected events = {
    submit: (event: Event) => {
      event.preventDefault();

      if (!this.props.selectedChat) {
        return;
      }

      const messageInput = getComponentByName(this.children, PostMessage, 'message');

      if (!messageInput) {
        return;
      }

      const isMessageValid = messageInput.validate();

      if (!isMessageValid) {
        return;
      }

      MessagesController.sendMessage(
        this.props.selectedChat.id,
        messageInput.getValue(),
      );

      messageInput.setValue('');
    },

    click: (event: Event) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const actionButton = target.closest('.context-menu__item');

      if (!(actionButton instanceof HTMLElement)) {
        return;
      }

      const action = actionButton.dataset.action;

      if (!this.props.selectedChat) {
        return;
      }

      if (action === 'add-user') {
        this.setProps({
          isUserActionModalOpen: true,
          userActionType: 'add-user',
          userActionTitle: 'Добавить пользователя',
          userActionButtonText: 'Добавить',
        });
      }

      if (action === 'remove-user') {
        this.setProps({
          isUserActionModalOpen: true,
          userActionType: 'remove-user',
          userActionTitle: 'Удалить пользователя',
          userActionButtonText: 'Удалить',
        });
      }
    },
  };

  private scrollToBottom(): void {
    requestAnimationFrame(() => {
      const rootChatContent = this.refs['chat-content'];

      if (!(rootChatContent instanceof HTMLElement)) {
        return;
      }

      const messagesContainer = rootChatContent.querySelector('.chat-content__messages');

      if (!(messagesContainer instanceof HTMLElement)) {
        return;
      }

      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
  }
}
